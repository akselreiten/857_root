/**
 * Created by akselreiten on 16/04/16.
 */

/*  variables
var arg = 2;
console.log(arg);
console.log("hey");
*/

if(typeof web3 !== 'undefined')
    web3 = new Web3(web3.currentProvider);
else
// set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

