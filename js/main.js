/**
 * Created by akselreiten on 16/04/16.
 */


if(typeof web3 !== 'undefined')
    web3 = new Web3(web3.currentProvider);
else
// set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


//  Using Callbacks
web3.eth.getBlock(48, function(error, result){
    if(!error)
        console.log(result)
    else
        console.error(error);
})


//  Batch requests
var batch = web3.createBatch();
batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
batch.add(web3.eth.contract(abi).at(address).balance.request(address, callback2));
batch.execute();