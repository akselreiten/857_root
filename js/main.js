/**
 * Created by akselreiten on 16/04/16.
 */

var pkAksel = "0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898";
var pkAksel2 = "0x67A6443f760866722ca0F44ae7dc55243b462Db2";
var pkAksel3 = "0x1f82dE5CCEE343E0D663e2E1D82D69642362F736";
var pkAllan = "0x70a5C2DC9abFAf62AfF603D1ba99f3A9032841d4";
var pkKristoffer = "0x183fBACe28e683d8b1632777eFadB34E6d357d7E";
var pkFrancis = "0xCd6a2d83699444203A172FcB6EFFb611e00206DC";


/////////////////////////////////
//      Initiate web3          //
/////////////////////////////////

//  Instantiating web3
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

//  Defining variables
var eth = web3.eth;
var personal = web3.personal;

//  Set default account
web3.eth.defaultAccount = pkAksel2;
var defaultAccount = web3.eth.defaultAccount;

//  Instantiate contract
var address = "0xb158B7d49CC38f3864589847EDF018f1C02a0649";
var myContract = web3.eth.contract(abi);
var myContractInstance = myContract.at(address);


/////////////////////////////////
// Ethereum specific functions //
/////////////////////////////////

//  Look up user by public key and return name as string
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

//  Get all requests and return array
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

//  Returns balance of public key
function getBalance(public_key) {
    return myContractInstance.getBalance.call(public_key).toNumber();
}

//  Returns outstanding loans given a public key
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

//  Fulfil a request given the ID of the request and publicKey from fulfiller
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



///////////////////////////////////////
////      HTML SPECIFIC         ///////
///////////////////////////////////////

main();

function main(){

    var public_key = $("#input-publicKey").val().toString();

    clearTables();
    fillUserTable(public_key);
    fillBorrowedTable(public_key);
    fillLentTable(public_key);
    fillRequestTable();
    fillReputationTable();

}

function clearTables(){
    $("#table-requests-tbody").empty();
    $("#table-borrowed-tbody").empty();
    $("#table-lent-tbody").empty();
    $("#table-requests-tbody").empty();
    $("#table-reputation-tbody").empty();
}


//  Fills user table given a public key
function fillUserTable(x) {
    if (x == null || x == "") {
        alert("Public Key must be filled out");
        return false;
    }else{
        $("#table-user-publicKey").html(x)
        $("#table-user-name").html(getUserName(x));
        $("#table-user-balance").html(getBalance(x))
    }
    fillLentTable()
}

//  Fills request table regardless of public key
function fillRequestTable(){
    var curr_requests = getRequests();
    curr_requests.forEach(function(d){
        $('#table-requests').append('<tr><td>' + d.name+'</td><td>'+d.amount+'</td><td>'+d.bonus+'</td><td>'+d.duration+'</td></tr>');
    });
}

//  Fills out borrowed table given a public key
function fillBorrowedTable(public_key){
    var public_key = $("#input-publicKey").val().toString();
    var loans = getUserLoans(public_key);
    loans["borrowed"].forEach(function(d){
        var lender = getUserName(d.lender);
        $('#table-borrowed').append('<tr><td>'+d.name+'</td><td>'+lender+'</td><td>'+d.amount+'</td><td>'+d.end_time+'</td></tr>');
    })
}

//  Fills out borrowed table given a public key
function fillLentTable(public_key){
    var loans = getUserLoans(public_key);
    loans["lent"].forEach(function(d){
        var lender = getUserName(d.lender);
        $('#table-lent').append('<tr><td>'+d.name+'</td><td>'+lender+'</td><td>'+d.amount+'</td><td>'+d.end_time+'</td></tr>');
    })
}

//  Fills out reputation table for all users of the chain
function fillReputationTable(){
    var users = getAllUsers();
    users.forEach(function(pk){
        var reputation = getReputation(pk);
        var name = getUserName(pk);
        $('#table-reputation').append('<tr><td>'+name+'</td><td>'+reputation+'</td></tr>');
    });
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Cmd+C, Enter", text);
}

