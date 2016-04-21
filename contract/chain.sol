contract Mortal {
	address owner;
	
	function Mortal() {
		owner = msg.sender;
	}
	
	function kill() {
		if (msg.sender == owner)
			suicide(owner);
	}
}

contract MicroChain is Mortal {
	
	struct Loan {
		address lender;
		address borrower;
		uint amount;
		uint end_time;
		uint bonus;
		string name;
	}
	
	struct Request {
		address borrower;
		uint amount;
		uint duration;
		uint bonus;
		string name;
	}
	
	struct Reputation {
		int cash_rep; // Total amount paid back - total amount defaulted on
		uint defaulted; // Number of loans defaulted
		uint paid; // Number of loans paid
		uint outstanding; // Outstanding number of loans
		uint amt; // Amount of loaned cash held
	}
	
	bytes8[] public requestIDs;
	mapping(bytes8 => Request) public requests;
	
	mapping(address => bytes8[]) public userLoans;
	mapping(bytes8 => Loan) public allLoans;
	
	address[] public allUsers;
	mapping(address => string) public userMap;
	
	mapping(address => Reputation) public reputation;
	mapping (address => uint) public balanceOf;
	mapping(address => uint) public debt;
	
	address public owner;
	
	function MicroChain() {
        owner = msg.sender;
    }
	
	/*
	Owner creates a new user with some initial amount of digital currency
	*/
	function register(address _user, string _name, uint _initial) returns (bool) {
		if (msg.sender != owner) throw;
		if (bytes(userMap[_user]).length == 0) {
			allUsers.push(_user);
			userMap[_user] = _name;
			balanceOf[_user] = _initial;
			return true;
		}
		throw;
	}
	
	/*
	Owner gives a new user more currency (conversion to digital).
	*/
	function deposit(address _target, uint _amount) returns (bool) {
		if (msg.sender != owner) throw;
		if (bytes(userMap[_target]).length == 0) throw;	
		balanceOf[_target] += _amount;
		return true;
	}
	
	/*
	Owner takes a user's currency (conversion from digital).
	*/
	function withdraw(address _target, uint _amount) returns (bool) {
		if (msg.sender != owner) throw;
		if (bytes(userMap[_target]).length == 0) throw;	
		balanceOf[_target] -= _amount;
		return true;
	}
	
	function getBalance(address _target) returns (uint) {
		return balanceOf[_target];
	}
	
	function getDebt(address _target) returns (uint) {
		return debt[_target];
	}
	
	event Transfer(address indexed from, address indexed to, uint value);

	function transfer(address _to, uint _value) returns (bool) {
        if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
        Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
		return true;
    }

	
	/*
	"I want money for this purpose, on these terms."
	*/
	function issueRequest(uint _amount, uint _duration, uint _bonus, string _name) returns (bool) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		var newReq = Request({borrower: msg.sender, amount: _amount, duration: _duration, bonus: _bonus, name: _name});
		var newHash = bytes8(sha3(msg.sender, now, _amount, _duration, _bonus, _name));
		requestIDs.push(newHash);
		requests[newHash] = newReq;
		return true;
	}
	
	/*
	8-byte hashes of all requests.
	*/
	function getAllRequests() returns (bytes8[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		return requestIDs;
	}
	
	/*
	All information for a specific request.	
	*/
	function getRequest(bytes8 _id) returns (address, uint, uint, uint, string) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		var theReq = requests[_id];
		return (theReq.borrower, theReq.amount, theReq.duration, theReq.bonus, theReq.name);
	}
	
	/*
	Lender calls to lend to a borrower.
	*/
	function fulfillRequest(bytes8 _id) returns (bool) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		// Remove request from array
		for (var i = 0; i < requestIDs.length; i++) {
			if (requestIDs[i] == _id)
				requestIDs[i] = 0;
		}
		
		// Add to outstanding
		var theReq = requests[_id];
		var theBorrower = theReq.borrower;
		var theLender = msg.sender;
		
		var theLoan = Loan({lender: theLender, borrower: theBorrower, amount: theReq.amount,
							end_time: now + theReq.duration, bonus: theReq.bonus, name: theReq.name});
		userLoans[theBorrower].push(_id);
		userLoans[theLender].push(_id);
		allLoans[_id] = theLoan;
		
		// Move cash and debt
		transfer(theBorrower, theReq.amount);
		debt[theLender] += theReq.amount;
		
		// Update reputation
		reputation[theBorrower].outstanding += 1;
		reputation[theBorrower].amt += theReq.amount;
		
		delete requests[_id];
		
		return true;
	}
	
	/*
	"I have your money."
	*/
	function payback(bytes8 _id) returns (bool) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		var theLoan = allLoans[_id];
		if (msg.sender != theLoan.borrower) throw;
		
		// Remove from outstanding lists
		var theList = userLoans[theLoan.borrower];
		for (var i = 0; i < theList.length; i++) {
			if (theList[i] == _id)
				theList[i] = 0;
		}
		theList = userLoans[theLoan.lender];
		for (var j = 0; j < theList.length; j++) {
			if (theList[j] == _id)
				theList[j] = 0;
		}
		
		// Move cash and debt back
		transfer(theLoan.lender, theLoan.amount + theLoan.bonus);
		debt[theLoan.lender] -= theLoan.amount;
		
		// Update reputation
		reputation[theLoan.borrower].cash_rep += int(theLoan.amount + theLoan.bonus);
		reputation[theLoan.borrower].paid += 1;
		reputation[theLoan.borrower].outstanding -= 1;
		reputation[theLoan.borrower].amt -= theLoan.amount;
		
		delete allLoans[_id];
		
		return true;
	}
	
	/*
	If past the deadline, defaults the loan (called by the lender)
	*/
	function triggerDefault(bytes8 _id) returns (bool) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		var theLoan = allLoans[_id];
		if (msg.sender != theLoan.lender) throw;
		if (now < theLoan.end_time) throw;
		
		var toPay = theLoan.amount + theLoan.bonus;
		
		// Remove from outstanding lists
		var theList = userLoans[theLoan.borrower];
		for (var i = 0; i < theList.length; i++) {
			if (theList[i] == _id)
				theList[i] = 0;
		}
		theList = userLoans[theLoan.lender];
		for (var j = 0; j < theList.length; j++) {
			if (theList[j] == _id)
				theList[j] = 0;
		}
		
		// Update reputations
		reputation[theLoan.borrower].cash_rep -= int(toPay);
		reputation[theLoan.borrower].defaulted += 1;
		reputation[theLoan.borrower].outstanding -= 1;
		reputation[theLoan.borrower].amt -= theLoan.amount;
		// Debt is no longer relevant
		debt[theLoan.lender] -= theLoan.amount;
		
		delete allLoans[_id];
		
		return true;
	}
	
	/*
	Give a loan more time.
	*/
	function extend(bytes8 _id, uint duration) returns (bool) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		var theLoan = allLoans[_id];
		if (msg.sender != theLoan.lender) throw;
		theLoan.end_time += duration;
		return true;
	}
	
	function getName(address _name) returns (string) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		return userMap[_name];
	}
	
	function getOutstandingLoans(address _name) returns (bytes8[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		return userLoans[_name];
	}
	
	function getSingleLoan(bytes8 _id) returns (address, address, uint, uint, uint, string) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var theLoan = allLoans[_id];
		return (theLoan.lender, theLoan.borrower, theLoan.amount, theLoan.end_time, theLoan.bonus, theLoan.name);
	}
	
	function getAllUsers() returns (address[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return allUsers;
	}
	
	function getReputation(address _name) returns (int, uint, uint, uint, uint) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var theRep = reputation[_name];
		return(theRep.cash_rep, theRep.defaulted, theRep.paid, theRep.outstanding, theRep.amt);
	}
}