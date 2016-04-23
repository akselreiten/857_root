contract Mortal {
	address owner;
	
	function Mortal() {
		owner = msg.sender;
	}
	
	function kill() {
		if (msg.sender == owner) suicide(owner);
	}
}

contract MicroChain is Mortal {
	
	struct Loan {
		address lender;
		address borrower;
		uint amount;
		uint endTime;
		uint bonus;
		uint certTarget; // Target number of certifications
		uint curCert; // Current number of certifications
		string description;
	}
	
	struct Request {
		address borrower;
		uint amount;
		uint duration;
		uint bonus;
		uint certifications;
		string description;
	}
	
	struct Reputation {
		int cashRep; // Total amount paid back minus total amount defaulted on
		uint defaulted; // Number of loans defaulted
		uint failed; // Number of projects failed (not enough certifications)
		uint paid; // Number of loans paid
		uint succeeded; // Number of projects succeeded (enough certifications)
		uint outstanding; // Outstanding number of loans/projects
		uint amt; // Amount of loaned cash held
	}
	
	// For use in user and project history
	struct History {
		address user;
		bytes8 project;
		uint time;
		string description;
	}
	
	// Request info
	bytes8[] public requestIDs;
	mapping(bytes8 => Request) public requests;
	
	// Loan info
	mapping(address => bytes8[]) public userLoans;
	mapping(bytes8 => Loan) public allLoans;
	
	// Aggregate user info
	address[] public allUsers;
	mapping(address => string) public userMap;
	
	// User-specific information
	mapping(address => Reputation) public reputation;
	mapping (address => uint) public balanceOf;
	mapping(address => uint) public debt;
	
	// History information
	mapping(address => bytes8[]) public userHistory;
	mapping(bytes8 => bytes8[]) public projectHistory;
	mapping(bytes8 => History) public allHistory;
	bytes8[] public allProjects;
	
	// Certifiers
	mapping(bytes8 => address[]) public certifiers;
	
	// Trusted verifier
	address public admin;
	
	/*
	/
	/ INITIALIZATION AND BASICS
	/
	*/
	
	function MicroChain() {
        admin = msg.sender;
    }
	
	/*
	Owner creates a new user with some initial amount of digital currency
	*/
	function register(address _user, string _name, uint _initial) {
		if (msg.sender != admin) throw;
		if (bytes(userMap[_user]).length == 0) {
			allUsers.push(_user);
			userMap[_user] = _name;
			balanceOf[_user] = _initial;
			return;
		}
		throw;
	}
	
	/*
	Owner gives a new user more currency (conversion to digital).
	*/
	function deposit(address _target, uint _amount) {
		if (msg.sender != admin) throw;
		if (bytes(userMap[_target]).length == 0) throw;	
		balanceOf[_target] += _amount;
		return;
	}
	
	/*
	Owner takes a user's currency (conversion from digital).
	*/
	function withdraw(address _target, uint _amount) {
		if (msg.sender != admin) throw;
		if (bytes(userMap[_target]).length == 0) throw;	
		balanceOf[_target] -= _amount;
		return;
	}
	
	/*
	Move money from one place to another.
	*/
	function transfer(address _to, uint _value) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
        if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
		return;
    }

	/*
	/
	/ REQUESTS
	/
	*/
	
	/*
	"I want money for this purpose, on these terms."
	*/
	function issueRequest(uint _amount, uint _duration, uint _bonus, uint _certifications, string _description) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var newReq = Request({borrower: msg.sender, amount: _amount, duration: _duration, bonus: _bonus,
							  certifications: _certifications, description: _description});
		var newHash = bytes8(sha3(msg.sender, now, _amount, _duration, _bonus, _certifications, _description));
		requestIDs.push(newHash);
		requests[newHash] = newReq;
		return;
	}
	
	/*
	Lender calls to lend to a borrower.
	*/
	function fulfillRequest(bytes8 _id) {
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
							endTime: now + theReq.duration, bonus: theReq.bonus, certTarget: theReq.certifications,
							curCert: 0, description: theReq.description});
		userLoans[theBorrower].push(_id);
		userLoans[theLender].push(_id);
		allLoans[_id] = theLoan;
		
		// Move cash and debt
		transfer(theBorrower, theReq.amount);
		debt[theLender] += theReq.amount;
		
		// Update reputation
		reputation[theBorrower].outstanding += 1;
		reputation[theBorrower].amt += theReq.amount;
		
		addHistory(msg.sender, _id, "fulfilled request and started project");
		allProjects.push(_id);
		
		delete requests[_id];
		
		return;
	}
	
	/*
	/
	/ LOANS
	/
	*/
	
	/*
	"I have your money."
	Pays back a loan.
	Certification impact assessed.
	*/
	function finish(bytes8 _id) {
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
		reputation[theLoan.borrower].cashRep += int(theLoan.amount + theLoan.bonus);
		reputation[theLoan.borrower].paid += 1;
		reputation[theLoan.borrower].outstanding -= 1;
		reputation[theLoan.borrower].amt -= theLoan.amount;
		
		addHistory(theLoan.borrower, _id, "repaid loan and marked project as finished");
		
		processCert(_id, theLoan, theLoan.borrower);
		
		return;
	}
	
	/*
	If past the deadline, defaults the loan (called by the lender)
	Assesses certification impact.
	*/
	function terminate(bytes8 _id) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		var theLoan = allLoans[_id];
		if (msg.sender != theLoan.lender) throw;
		if (now < theLoan.endTime) throw;
		
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
		
		var toPay = theLoan.amount + theLoan.bonus;
		
		// Update reputations
		reputation[theLoan.borrower].cashRep -= int(toPay);
		reputation[theLoan.borrower].defaulted += 1;
		reputation[theLoan.borrower].outstanding -= 1;
		reputation[theLoan.borrower].amt -= theLoan.amount;
		// Debt is no longer relevant
		debt[theLoan.lender] -= theLoan.amount;
		
		addHistory(msg.sender, _id, "marked loan as defaulted and terminated project");
		
		processCert(_id, theLoan, theLoan.borrower);
		
		return;
	}
	
	/*
	Give a loan more time.
	*/
	function extend(bytes8 _id, uint duration) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		
		var theLoan = allLoans[_id];
		if (msg.sender != theLoan.lender) throw;
		theLoan.endTime += duration;
		addHistory(msg.sender, _id, "extended deadline");
		return;
	}
	
	/*
	/
	/ CERTIFICATIONS
	/
	*/
	
	function certify(bytes8 _id) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var theLoan = allLoans[_id];
		if (msg.sender == theLoan.lender) throw;
		if (msg.sender == theLoan.borrower) throw;
		
		var theList = certifiers[_id];
		for (var i = 0; i < theList.length; i++) {
			if (theList[i] == msg.sender) throw;
		}
		theList.push(msg.sender);
		theLoan.curCert++;
		addHistory(msg.sender, _id, "certified project completion");
		return;
	}
	
	function processCert(bytes8 _id, Loan _theLoan, address _borrower) private {
		if (_theLoan.curCert < _theLoan.certTarget) {
			reputation[_borrower].failed += 1;
			addHistory(_borrower, _id, "failed to get enough certifications");
			return;
		}
		reputation[_borrower].succeeded += 1;
		addHistory(_borrower, _id, "got enough certifications");
	}

	
	/*
	/
	/ HISTORY
	/
	*/
	
	function addHistory(address _user, bytes8 _id, string _description) {
		var newHistory = History({user: _user, project: _id, time: now, description: _description});
		var histHash = bytes8(sha3(newHistory.user, newHistory.project, newHistory.time, newHistory.description));
		allHistory[histHash] = newHistory;
		userHistory[_user].push(histHash);
		projectHistory[_id].push(histHash);
		return;
	}
	
	/*
	/
	/ GETTERS
	/
	*/
	
	function getAllRequests() returns (bytes8[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return requestIDs;
	}
	
	function getRequest(bytes8 _id) returns (address, uint, uint, uint, uint, string) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var theReq = requests[_id];
		return (theReq.borrower, theReq.amount, theReq.duration, theReq.bonus, theReq.certifications, theReq.description);
	}
	
	function getBalance(address _target) returns (uint) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return balanceOf[_target];
	}
	
	function getDebt(address _target) returns (uint) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return debt[_target];
	}
	
	function getAllUsers() returns (address[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return allUsers;
	}
	
	function getName(address _name) returns (string) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return userMap[_name];
	}
	
	function getOutstandingLoans(address _name) returns (bytes8[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return userLoans[_name];
	}
	
	function getSingleLoan(bytes8 _id) returns (address, address, uint, uint, uint, uint, uint, string) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var theLoan = allLoans[_id];
		return (theLoan.lender, theLoan.borrower, theLoan.amount, theLoan.endTime, theLoan.bonus,
				theLoan.certTarget, theLoan.curCert, theLoan.description);
	}
	
	function getReputation(address _name) returns (int, uint, uint, uint, uint, uint, uint) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var theRep = reputation[_name];
		return(theRep.cashRep, theRep.defaulted, theRep.failed, theRep.paid,
			   theRep.succeeded, theRep.outstanding, theRep.amt);
	}
	
	function getAllProjects() returns (bytes8[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return allProjects;
	}
	
	function getProjectHistories(bytes8 _project) returns (bytes8[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return projectHistory[_project];
	}
	
	function getUserHistories(address _user) returns (bytes8[]) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		return userHistory[_user];
	}
	
	function getSingleHistory(bytes8 _id) returns (address, bytes8, uint, string) {
		if (bytes(userMap[msg.sender]).length == 0) throw;
		var theHist = allHistory[_id];
		return (theHist.user, theHist.project, theHist.time, theHist.description);
	}
}