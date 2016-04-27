
$(document).ready(function() {

    fillLentTable();

    //  Default loan
    $(".btn-select").click(function() {
        var id = ($(this).prop("id"));
        if (myContractInstance.terminate.call(id,{from:defaultAccount})){
            console.log(terminate(id,defaultAccount));
            $(this).prop('disabled',true);
        } else {
            console.log("Error")}
    });

});

function fillLentTable(){
    var loans = getUserLoans(defaultAccount);
    console.log(loans);

    $('.table-lent-tbody').empty();
    $('#lent-headline').text("You currently have " + loans.lent.length + " outstanding loans.");

    loans.lent.forEach(function(d){
        var borrower = getUserName(d.borrower);
        var htmlString = '<tr>';
        var percentInterest = toPercent(d.amount, d.bonus);
        var time = convertTimestamp(d.end_time);
        htmlString += '<td class="td-text">' + borrower + '</td><td class="td-text">' + d.description + '</td>';
        htmlString += '<td class="td-text">' + d.amount + " BTC" + '</td><td class="td-text">' + percentInterest + '</td>';
        htmlString += '<td class="td-text">' + time + '</td>';
        htmlString += '<td> <button class="btn btn-select" id="' + d.id + '">Default Loan</button></td>';
        htmlString += '</tr>';
        $('#table-lent-tbody').append(htmlString);

        console.log(d.end_time + " ( "+ time + ")" +": "+ Math.floor(Date.now())/1000);
        console.log(d.end_time < Math.floor(Date.now())/1000);

        if(d.end_time > Math.floor(Date.now())/1000){
            $("#"+d.id).prop('disabled',true);
            $("#"+d.id).css('background-color',"gray");
            $("#"+d.id).text("Time remaining");
        }

    });
}
