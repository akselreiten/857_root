/**
 * Created by akselreiten on 16/04/16.
 */

/*  variables
var arg = 2;
console.log(arg);
console.log("hey");
*/

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var con = web3.isConnected()
console.log(con);
