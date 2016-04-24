$(document).ready(function() {

    //  Init view
    fillRequestTable();
    $('.popup').hide();
    $('#cover').hide();

    //  Load issue loan page
    $('.btn-loan').click(function(){
        $('#cover').show();
        $('.popup').show();
    });

    //  Hide issue loan page
    $('.xButton').click(function(){
        $('.popup').hide();
        $('#cover').hide();
    });

    //  Hide issue loan page
    $('#cover').click(function(){
        $('.popup').hide();
        $('#cover').hide();
    });

    //  Fulfill loan
    $(".btn-select").click(function() {
        var id = ($(this).prop("id"));
        if (myContractInstance.fulfillRequest.call(id,{from:defaultAccount})){
            alert(fulfillRequest(id,defaultAccount));
            $(this).prop('disabled',true);
        }
        else {
            alert("Error")}
    });

    //  Apply for loan
    $("#submit-loan").click(function() {
        var curr_description = $("#popup-input-description").val();
        var curr_amount = $("#popup-input-amount").val();
        var curr_interest = $("#popup-input-interest").val();
        var curr_duration = $("#popup-input-duration").val();
        var curr_certifications = $("#popup-input-certification").val();
        if (issueRequest(curr_amount,curr_duration,curr_interest,curr_certifications,curr_description,defaultAccount)){
            alert("Successfully submitted request");
            $('.popup').hide();
            $('#cover').hide();
        }
        else {alert("Request did not go through")}
    });

    $("#btn-explore").click(function() {nextPage();});
});

function hideIssueRequest(){

}

function fillRequestTable(){
    var curr_requests = getRequests();

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
                $("#"+d.id).prop('disabled',true);
                $("#"+d.id).css('background-color',"red");
                $("#"+d.id).text("Can't fulfil");
            }

        }

        //alert(checkFulfill(d.id, defaultAccount));

        
    });
}
