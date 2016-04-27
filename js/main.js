/**
 * Created by akselreiten on 16/04/16.
 */

var pkAksel = "0x3E1f6a79635dB65564DAEDB58E46EF75B3A0D898";
var pkAksel2 = "0x67A6443f760866722ca0F44ae7dc55243b462Db2";
var pkAksel3 = "0x1f82dE5CCEE343E0D663e2E1D82D69642362F736";
var pkAllan = "0x70a5C2DC9abFAf62AfF603D1ba99f3A9032841d4";
var pkKristoffer = "0x183fBACe28e683d8b1632777eFadB34E6d357d7E";
var pkFrancis = "0xCd6a2d83699444203A172FcB6EFFb611e00206DC";
var pkFrancis2 = "0xb2fF7408BC8C6f95E3eB515B6E549bAbfA62FD67";


/////////////////////////////////
//      Initiate web3          //
/////////////////////////////////

//  Instantiating web3
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

//  Instantiate contract
var contractAddress = "0xf2cb6Ad5002244b73a5ba006E64c8aD8C544d1F3";
var microChain = web3.eth.contract(abi);
var myContractInstance = microChain.at(contractAddress);

web3.eth.defaultAccount = getPK();
var defaultAccount = web3.eth.defaultAccount;

// http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
function getPK() {
    var data = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    pkData = data[0].split('=');
    return pkData[1].split('#')[0];
}


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

//  Returns balance of public key
function getBalance(public_key) {
    return myContractInstance.getBalance.call(public_key).toNumber();
}

// Returns owned debt of public key
function getDebt(public_key) {
    return myContractInstance.getDebt.call(public_key).toNumber();
}

//  Returns reputation of a public key
function getReputation(public_key) {
    var curr_rep = myContractInstance.getReputation.call(public_key);
    var reputation = new Object();
    reputation.cash_rep = curr_rep[0].toNumber();
    reputation.defaulted = curr_rep[1].toNumber();
    reputation.failed = curr_rep[2].toNumber();
    reputation.paid = curr_rep[3].toNumber();
    reputation.succeeded = curr_rep[4].toNumber();
    reputation.outstanding = curr_rep[5].toNumber();
    reputation.amount = curr_rep[6].toNumber();
    return reputation;
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
        request.certifications = curr_request[4].toNumber();
        request.description = curr_request[5];
        requestArray.push(request);
    });
    return requestArray;
}

//  Issues a request for a loan (returns boolean)
function issueRequest(amount,duration,bonus,certifications,description,fromAddress){
    var gas = myContractInstance.issueRequest.estimateGas(amount,duration,bonus,certifications,description);
    myContractInstance.issueRequest.sendTransaction(amount,duration,bonus,certifications,description,{from:fromAddress, gas:gas*2});
    return true;
}

function checkFulfill(id, fromAddress) {
    return true;
}

//  Fulfil a request given the ID of the request and publicKey from fulfiller
function fulfillRequest(id,fromAddress){
    if (myContractInstance.fulfillRequest.call(id,{from:fromAddress})){
        var gas = myContractInstance.fulfillRequest.estimateGas(id);
        myContractInstance.fulfillRequest.sendTransaction(id,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}

//  Returns outstanding loans given a public key
function getUserLoans(public_key){
    var loans = myContractInstance.getOutstandingLoans.call(public_key);
    var borrowed = [];
    var lent = [];
    loans.forEach(function(d) {
        var loan = getSingleLoan(d);
        if (loan.lender.toLowerCase() == public_key.toLowerCase()) {lent.push(loan);}
        if (loan.borrower.toLowerCase() == public_key.toLowerCase()) {borrowed.push(loan);}
    });
    var userLoan = new Object();
    userLoan.borrowed = borrowed;
    userLoan.lent = lent;
    return userLoan;
}

function getAllProjects() {
    return myContractInstance.getAllProjects.call();
}

function getUserProjects(public_key) {
    return myContractInstance.getUserProjects.call(public_key);
}

function getCertifiers(id) {
    return myContractInstance.getCertifiers.call(id);
}

function getSingleLoan(hash) {
    var curr_loan = myContractInstance.getSingleLoan.call(hash);
    var loan = new Object();
    loan.lender = curr_loan[0];
    loan.borrower = curr_loan[1];
    loan.amount = curr_loan[2].toNumber();
    loan.end_time = curr_loan[3].toNumber();
    loan.bonus = curr_loan[4].toNumber();
    loan.cert_target = curr_loan[5].toNumber();
    loan.cur_cert = curr_loan[6].toNumber();
    loan.description = curr_loan[7];
    loan.done = curr_loan[8];
    loan.id = hash;
    return loan;
}

//  Pays back a loan given its ID (returns boolean)
function finish(id,fromAddress){
    if (myContractInstance.finish.call(id,{from:fromAddress})){
        var gas = myContractInstance.finish.estimateGas(id);
        myContractInstance.finish.sendTransaction(id,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}

//  Triggers default on a loan (returns boolean)
function terminate(id,fromAddress){
    if (myContractInstance.terminate.call(id,{from:fromAddress})){
        var gas = myContractInstance.terminate.estimateGas(id);
        myContractInstance.terminate.sendTransaction(id,{from:fromAddress, gas:gas*2});
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

function certify(id,fromAddress){
    if (myContractInstance.certify.call(id,{from:fromAddress})){
        var gas = myContractInstance.certify.estimateGas(id);
        myContractInstance.certify.sendTransaction(id,{from:fromAddress, gas:gas*2});
        return true;
    }return false;
}



///////////////////////////////////////
////      UTILITY FUNCTIONS         ///
///////////////////////////////////////

// Pass in amount and bonus; returns percent as string
function toPercent(amount, bonus) {
    var percentInterest = ((bonus / amount) * 100).toString();
    var ind = percentInterest.indexOf('.');
    if (ind > -1) {
        percentInterest = percentInterest.substr(0,Math.min(ind + 3, percentInterest.length));
    }
    return percentInterest + "%";
}

//  Pass in UNIX timestamp; returns time as string
function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        time;
    time = mm + '-' + dd + '-' + yyyy;

    return time;
}

///////////////////////////////////////
////      HTML SPECIFIC         ///////
///////////////////////////////////////


$(document).ready(function() {
    populateHeader();
    $("#btn-request").click(function() {nextPage("requests");});
    $("#btn-lent").click(function() {nextPage("lent");});
    $("#btn-borrowed").click(function() {nextPage("borrowed");});
    $("#btn-users").click(function() {nextPage("users");});
    $("#btn-projects").click(function() {nextPage("projects");});
    $("#btn-logOut").click(function() {
        location.assign("index.html");
    });
});

function nextPage(dest) {
    var finalDest = dest + ".html?pk=" + defaultAccount;
    location.assign(finalDest);
}

function populateHeader() {
    var userName = getUserName(defaultAccount);
    $("#welcome").text("Welcome, " + userName + "!");
    $("#username").text(userName);

    var balance = getBalance(defaultAccount);
    var debt = getDebt(defaultAccount);

    $("#table-user-balance").text(balance.toString() + " BTC");
    $("#table-user-debt").text(debt.toString() + " BTC");
}
