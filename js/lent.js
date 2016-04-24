
$(document).ready(function() {

    fillLentTable();

});

function fillLentTable(){
    var loans = getUserLoans(defaultAccount);
    console.log(loans);

}

    /*var curr_requests = getRequests();

    curr_requests.forEach(function(d){
        if (d.id != '0x0000000000000000') {
            var requester = getUserName(d.public_key);
            var htmlString = '<tr>';
            var percentInterest = toPercent(d.amount, d.bonus);
            htmlString += '<td class="td-text">' + requester + '</td><td class="td-text">' + d.description + '</td>';
            htmlString += '<td class="td-text">' + d.amount + " BTC" + '</td><td class="td-text">' + percentInterest + '</td>';
            htmlString += '<td class="td-text">' + d.duration + '</td><td class="td-text">' + d.certifications + '</td>';
            htmlString += '<td> <button class="btn btn-select" id="' + d.id + '">Fulfill Request</button></td>';
            $('#table-requests-tbody').append(htmlString);

            //  Checks if balance is high enough
            if (myContractInstance.fulfillRequest.call(d.id,{from:defaultAccount}) == false){
                $("#"+d.id).prop('disabled',true)
                $("#"+d.id).css('background-color',"red")
                $("#"+d.id).text("Not enough money");
            }

        }

};*/