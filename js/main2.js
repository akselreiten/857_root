var pkAksel = "0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898"
var pkAllan = "0x70a5C2DC9abFAf62AfF603D1ba99f3A9032841d4"
var pkKristoffer = "0x183fBACe28e683d8b1632777eFadB34E6d357d7E"
var pkFrancis = "0xCd6a2d83699444203A172FcB6EFFb611e00206DC"

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var con = web3.isConnected()
console.log(con);

web3.eth.defaultAccount = '0xCd6a2d83699444203A172FcB6EFFb611e00206DC';
console.log(web3.eth.defaultAccount);

var primary = web3.eth.defaultAccount;
console.log(web3.eth.accounts);
var secondary = web3.eth.accounts[1];

var balance = web3.fromWei(web3.eth.getBalance(primary), "ether");
console.log(balance.toNumber());

// You need to run personal.unlockAccount('PK') from geth console before you can send a transaction
web3.eth.sendTransaction({from: secondary, to: '0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898', value: web3.toWei(1, "ether")});