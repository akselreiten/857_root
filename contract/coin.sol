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
    uint public decimals;
	
    mapping (address => uint) public balanceOf;
	
    event Transfer(address indexed from, address indexed to, uint value);
	
    function MicroCoin(uint initialSupply, string tokenName, uint decimalUnits, string tokenSymbol) {
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
        decimals = decimalUnits;                            // Amount of decimals for display purposes
    }
	
	function getBalance(address _target) returns (uint) {
		return balanceOf[_target];
	}

    function transfer(address _to, uint _value) {
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
