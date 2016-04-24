/**
 * Created by akselreiten on 24/04/16.
 */

$(document).ready(function() {

    fillBorrowedTable();

    $(".btn-select").click(function() {
        var id = ($(this).prop("id"));
        if (myContractInstance.finish.call(id,{from:defaultAccount})){
            alert(finish(id,defaultAccount));
            $(this).prop('disabled',true);
        } else {alert("Error")}
    });

});


function fillBorrowedTable(){
    var loans = getUserLoans(defaultAccount);

    $('.table-borrowed-tbody').empty();
    $('#borrowed-headline').text("You currently have " + loans.borrowed.length + " borrowed loans.");

    loans.borrowed.forEach(function(d){
        var lender = getUserName(d.lender);
        var htmlString = '<tr>';
        var percentInterest = toPercent(d.amount, d.bonus);
        var time = convertTimestamp(d.end_time);
        htmlString += '<td class="td-text">' + lender + '</td><td class="td-text">' + d.description + '</td>';
        htmlString += '<td class="td-text">' + d.amount + " BTC" + '</td><td class="td-text">' + percentInterest + '</td>';
        htmlString += '<td class="td-text">' + time + '</td>';
        htmlString += '<td> <button class="btn btn-select" id="' + d.id + '">Pay back</button></td>';
        htmlString += '</tr>';
        $('#table-borrowed-tbody').append(htmlString);

        //  Checks if balance is high enough
        if (myContractInstance.finish.call(d.id,{from:defaultAccount}) == false){
            $("#"+d.id).prop('disabled',true);
            $("#"+d.id).css('background-color',"red");
            $("#"+d.id).text("Can't fulfil");
        }

    });

}