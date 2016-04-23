$(document).ready(function() {
    fillRequestTable();

    $(".btn-select").click(function() {
        var id = ($(this).prop("id"));
    });
});

function fillRequestTable(){
    var curr_requests = getRequests();

    curr_requests.forEach(function(d){
        var requester = getUserName(d.public_key);
        var htmlString = '<tr>';
        var percentInterest = toPercent(d.amount,d.bonus);
        htmlString += '<td class="td-text">' + requester + '</td><td class="td-text">' + d.description + '</td>';
        htmlString += '<td class="td-text">'+d.amount + " BTC" +'</td><td class="td-text">'+percentInterest+'</td>';
        htmlString += '<td class="td-text">'+d.duration+'</td><td class="td-text">'+d.certifications+'</td>';
        htmlString += '<td> <button class="btn btn-select" id="' + d.id + '">Fulfill Request</button></td>';
        $('#table-requests-tbody').append(htmlString);

        //alert(checkFulfill(d.id, defaultAccount));

        
    });
}




