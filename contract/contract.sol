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

contract MicroCoin is Mortal {
    string public name;
    string public symbol;
    uint8 public decimals;
	
    mapping (address => uint256) public balanceOf;
	
    event Transfer(address indexed from, address indexed to, uint256 value);
	
    function MyToken(uint256 initialSupply, string tokenName, uint8 decimalUnits, string tokenSymbol) {
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
        decimals = decimalUnits;                            // Amount of decimals for display purposes
    }

    function transfer(address _to, uint256 _value) {
        if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
        Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
    }

    /* This unnamed function is called whenever someone tries to send ether to it */
    function () {
        throw;     // Prevents accidental sending of ether
    }
}

contract MicroChain is Mortal {
	
	struct Loan {
		address lender;
		address borrower;
		uint amount;
		uint duration;
		uint reward;
		string name;
	}
	
	struct LoanID {
		address lender;
		address borrower;
		uint timestamp;
	}
	
	struct Request {
		address borrower;
		uint amount;
		uint duration;
		uint reward;
		string name;
	}
	
	struct RequestID {
		address lender;
		uint timestamp;
	}
	
	struct Reputation {
		int cash_rep;
		uint defaulted;
		uint paid;
		uint outstanding;
		uint amt;
	}
	
	// All requestIDs
	bytes8[] public requestIDs;
	// requestID => request
	mapping(bytes8 => Request) requests;
	
	mapping(address => bytes8[]) userLoans;
	mapping(bytes8 => Loan) allLoans;
	
	mapping(address => Reputation) public reputation;
	
	mapping(address => uint) public debt;
	mapping(address => string) public id;
	
	/*
	Posts a request for a loan, making it publicly viewable.
	*/
	function issueRequest(uint _amount, uint _duration, uint _reward, string _name) {
		var newReq = Request({borrower: msg.sender, amount: _amount,
							  duration: _duration, reward: _reward, name: _name});
		var newHash = bytes8(sha3(msg.sender, now));
		requestIDs.push(newHash);
		requests[newHash] = newReq;
	}
	
	/*
	Return array of all requestIDs (can't return mappings)
	*/
	function getAllRequests() returns (bytes8[]) {
		return requestIDs;
	}
	
	/*
	Returns all information for a single request.
	*/
	function getRequest(bytes8 _id) returns (address, uint, uint, uint, string) {
		var theReq = requests[_id];
		return (theReq.borrower, theReq.amount, theReq.duration, theReq.reward, theReq.name);
	}
	
	
	function fulfillRequest(bytes8 _id) {
		// Remove request from all requests
		for (var i = 0; i < requestIDs.length; i++) {
			if (requestIDs[i] == _id)
				requestIDs[i] = 0;
		}
		
		var theReq = requests[_id];
		var theLender = msg.sender;
		var theBorrower = theReq.borrower;
		
		var theLoan = Loan({lender: theLender, borrower: theBorrower, amount: theReq.amount,
							duration: theReq.duration, reward: theReq.reward, name: theReq.name});
		
		// Add request to outstanding
		userLoans[theLender].push(_id);
		userLoans[theBorrower].push(_id);
		allLoans[_id] = theLoan;
		
		// Transfer cash and debt.
		transfer(theBorrower, theReq.amount);
		
	
	// Update reputation.
	}
	
	function payback(bytes32 _id) {
		
	}
	
	function collect(bytes32 _id) {
		
	}
	
	function update(bytes32 _id, int duration) {
		
	}
	
	/* This unnamed function is called whenever someone tries to send ether to it */
    function () {
        throw;     // Prevents accidental sending of ether
    }
}