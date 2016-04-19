/**
 * Created by akselreiten on 16/04/16.
 */


//  Instantiating web3
if(typeof web3 !== 'undefined')
    web3 = new Web3(web3.currentProvider);
else
// set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var eth = web3.eth;
var admin = web3.admin;
var personal = web3.personal;

//  Defining contracts
var address = "0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898";
//var microCoin = eth.contract([{ "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "MicroCoin", "displayName": "" } ], "type": "function", "displayName": "name" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "20", "displayName": "" } ], "type": "function", "displayName": "total Supply" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;from", "template": "elements_input_address" }, { "name": "_to", "type": "address", "index": 1, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;to", "template": "elements_input_address" }, { "name": "_value", "type": "uint256", "index": 2, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;value", "template": "elements_input_uint" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function", "displayName": "transfer From" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "10", "displayName": "" } ], "type": "function", "displayName": "decimals" }, { "constant": true, "inputs": [], "name": "version", "outputs": [ { "name": "", "type": "string", "value": "1.0", "displayName": "" } ], "type": "function", "displayName": "version" }, { "constant": true, "inputs": [ { "name": "", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "", "template": "elements_input_address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0", "displayName": "" } ], "type": "function", "displayName": "balance Of" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "MC", "displayName": "" } ], "type": "function", "displayName": "symbol" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;to", "template": "elements_input_address" }, { "name": "_value", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;value", "template": "elements_input_uint" } ], "name": "transfer", "outputs": [], "type": "function", "displayName": "transfer" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;spender", "template": "elements_input_address" }, { "name": "_value", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;value", "template": "elements_input_uint" }, { "name": "_extraData", "type": "bytes", "index": 2, "typeShort": "bytes", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;extra Data", "template": "elements_input_bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function", "displayName": "approve And Call" }, { "constant": true, "inputs": [ { "name": "", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "", "template": "elements_input_address" }, { "name": "", "type": "address", "index": 1, "typeShort": "address", "bits": "", "displayName": "", "template": "elements_input_address" } ], "name": "spentAllowance", "outputs": [ { "name": "", "type": "uint256", "value": "0", "displayName": "" } ], "type": "function", "displayName": "spent Allowance" }, { "constant": true, "inputs": [ { "name": "", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "", "template": "elements_input_address" }, { "name": "", "type": "address", "index": 1, "typeShort": "address", "bits": "", "displayName": "", "template": "elements_input_address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0", "displayName": "" } ], "type": "function", "displayName": "allowance" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "20" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "MicroCoin" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "value": "10" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "MC" }, { "name": "versionOfTheCode", "type": "string", "index": 4, "typeShort": "string", "bits": "", "displayName": "version Of The Code", "template": "elements_input_string", "value": "1.0" } ], "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]);
//var microCoinInstance = microCoin.at(addressMicroCoin);
//var info = web3.getContractInfo(address);
//var source = info.source;
//var abiDef = info.abiDefinition;
//console.log(abiDef);

//  Set default account
web3.eth.defaultAccount = "0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898";
var defaultAccount = web3.eth.defaultAccount;

//  Get balance
var balance = eth.getBalance("0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898")
console.log(balance.toString());

//  Transfer money from Aksel to Kristoffer
eth.sendTransaction({from: "0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898", to: "0x183fBACe28e683d8b1632777eFadB34E6d357d7E", value: web3.toWei(1,'ether')})