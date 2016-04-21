/**
 * Created by akselreiten on 16/04/16.
 */

var pkAksel = "0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898";
var pkAksel2 = "0x67A6443f760866722ca0F44ae7dc55243b462Db2";
var pkAksel3 = "0x1f82dE5CCEE343E0D663e2E1D82D69642362F736";
var pkAllan = "0x70a5C2DC9abFAf62AfF603D1ba99f3A9032841d4";
var pkKristoffer = "0x183fBACe28e683d8b1632777eFadB34E6d357d7E";
var pkFrancis = "0xCd6a2d83699444203A172FcB6EFFb611e00206DC";

//  Instantiating web3
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

//  Defining variables
var eth = web3.eth;
var personal = web3.personal;

//  Set default account
web3.eth.defaultAccount = pkAksel;
var defaultAccount = web3.eth.defaultAccount;

var address = "0xb158B7d49CC38f3864589847EDF018f1C02a0649";

var myContract = web3.eth.contract(abi);
var myContractInstance = myContract.at(address);
var result = myContractInstance.getBalance.call(pkFrancis).toNumber();

//  Gets all requests and returns array
function getRequests(){
    var requestsIDs = myContractInstance.getAllRequests.call();
    var requestArray = [];
    requestsIDs.forEach(function(d){
        var curr_request = myContractInstance.getRequest.call(d);
        var request = new Object();
        request.public_key = curr_request[0];
        request.id = d;
        request.amount = curr_request[1].toNumber();
        request.duration = curr_request[2].toNumber();
        request.bonus = curr_request[3].toNumber();
        request.name = curr_request[4];
        requestArray.push(request);
    });
    return requestArray;
}

//  (Returns Boolean) Fulfil a request given the ID of the request
function fulfillRequest(id,fromAddress){
    if (myContractInstance.fulfillRequest.call(id,{from:fromAddress})){
        var gas = myContractInstance.fulfillRequest.estimateGas(id);
        myContractInstance.fulfillRequest.sendTransaction(id,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}

//  Issues a request for a loan (returns boolean)
function issueRequest(amount,duration,bonus,name,fromAddress){
    if (myContractInstance.issueRequest.call(amount,duration,bonus,name,{from:fromAddress})){
        var gas = myContractInstance.issueRequest.estimateGas(amount,duration,bonus,name);
        myContractInstance.issueRequest.sendTransaction(amount,duration,bonus,name,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}

//  Pays back a loan given its ID (returns boolean)
function paybackLoan(id,fromAddress){
    if (myContractInstance.payback.call(id,{from:fromAddress})){
        var gas = myContractInstance.payback.estimateGas(id);
        myContractInstance.payback.sendTransaction(id,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}

//  Triggers default on a loan (returns boolean)
function triggerDefault(id,fromAddress){
    if (myContractInstance.trigger_default.call(id,{from:fromAddress})){
        var gas = myContractInstance.trigger_default.estimateGas(id);
        myContractInstance.trigger_default.sendTransaction(id,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}

//  Extends duration of a loan
function extendDuration(id,duration,fromAddress){
    if (myContractInstance.extend.call(id,duration,{from:fromAddress})){
        var gas = myContractInstance.extend.estimateGas(id,duration);
        myContractInstance.extend.sendTransaction(id,duration,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}


//  Gets balance of public key
function getBalance(public_key) {
    return myContractInstance.getBalance.call(public_key).toNumber();
}

//  Gets outstanding loans given a public key
function getUserLoans(public_key){
    var loans = myContractInstance.getOutstandingLoans.call(public_key);
    var borrowed = [];
    var lent = [];
    loans.forEach(function(d){
        var curr_loan = myContractInstance.getSingleLoan.call(d);
        var loan = new Object();
        loan.lender = curr_loan[0];
        loan.borrower = curr_loan[1];
        loan.amount = curr_loan[2].toNumber();
        loan.end_time = curr_loan[3].toNumber();
        loan.bonus = curr_loan[4].toNumber();
        loan.name = curr_loan[5];
        loan.id = d;
        if (loan.lender == public_key){lent.push(loan);}
        else{borrowed.push(loan);}
    });

    var userLoan = new Object();
    userLoan.borrowed = borrowed;
    userLoan.lent = lent;

    return userLoan;
}

//  Looks up user by public key and returns name as string
function getUserName(public_key){
    return myContractInstance.getName.call(public_key);
}

//  Returns public keys of all users on the chain
function getAllUsers(){
    return myContractInstance.getAllUsers.call();
}

//  Returns reputation of a public key
function getReputation(public_key) {

    var curr_rep = myContractInstance.getReputation.call();
    var reputation = new Object();
    reputation.cash_rep = curr_rep[0].toNumber();
    reputation.defaulted = curr_rep[1].toNumber();
    reputation.paid = curr_rep[2].toNumber();
    reputation.outstanding = curr_rep[3].toNumber();
    reputation.amount = curr_rep[4].toNumber();
    return reputation
}


///////////////////////////////////////
//              HTML SPECIFIC   ///////
///////////////////////////////////////

function fillUserTable() {
    var x = $("#input-publicKey").val().toString();
    if (x == null || x == "") {
        alert("Public Key must be filled out");
        return false;
    }else{
        $("#user-publicKey").html(x)
        $("#user-name").html(getUserName(x));
        $("#user-balance").html(getBalance(x))
    }
}
