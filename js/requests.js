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
            console.log(fulfillRequest(id,defaultAccount));
            $(this).prop('disabled',true);
        }
        else {
            console.log("Error")}
    });

    //  Apply for loan
    $("#submit-loan").click(function() {
        var curr_description = $("#popup-input-description").val();
        var curr_amount = $("#popup-input-amount").val();
        var curr_interest = $("#popup-input-interest").val() * curr_amount / 100;
        var curr_duration = $("#popup-input-duration").val() * 60 * 60 * 24;
        var curr_certifications = $("#popup-input-certification").val();
        if (issueRequest(curr_amount,curr_duration,curr_interest,curr_certifications,curr_description,defaultAccount)){
            console.log("Successfully submitted request");
            $('.popup').hide();
            $('#cover').hide();
        }
        else {console.log("Request did not go through")}
    });

    $("#btn-explore").click(function() {nextPage();});
});

function fillRequestTable(){
    var curr_requests = getRequests();

    curr_requests.forEach(function(d){
        if (d.id != '0x0000000000000000') {
            var requester = getUserName(d.public_key);
            var htmlString = '<tr>';
            var percentInterest = toPercent(d.amount, d.bonus);
            var timeDays = (d.duration / 60 / 60 / 24).toString().split('.')[0];
            htmlString += '<td class="td-text">' + requester + '</td><td class="td-text">' + d.description + '</td>';
            htmlString += '<td class="td-text">' + d.amount + " BTC" + '</td><td class="td-text">' + percentInterest + '</td>';
            htmlString += '<td class="td-text">' + timeDays + ' days</td><td class="td-text">' + d.certifications + '</td>';
            htmlString += '<td> <button class="btn btn-select" id="' + d.id + '">Fulfill Request</button></td>';
            $('#table-requests-tbody').append(htmlString);

            //  Checks if balance is high enough
            if (myContractInstance.fulfillRequest.call(d.id,{from:defaultAccount}) == false){
                $("#"+d.id).prop('disabled',true);
                $("#"+d.id).css('background-color',"red");
                $("#"+d.id).text("Can't fulfill");
            }

        }

        //alert(checkFulfill(d.id, defaultAccount));

        
    });
}
