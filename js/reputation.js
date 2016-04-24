$(document).ready(function() {
    populateDropdown();

    $(".repUser").click(function() {
        $(".repContent").remove();
        var id = ($(this).prop("id"));
        populateRep(id);
        populateHist(id);
    });
});

function populateDropdown() {
    var allUsers = getAllUsers();
    allUsers.forEach(function(d) {
        var user = getUserName(d);
        var htmlString = '<li class="repUser" id="';
        htmlString += d + '"><a href="#">' + user + '</a></li>';
        $('.dropdown-menu').append(htmlString);
    });
}

function populateRep(id) {
    var rep = getReputation(id);
    console.log(rep);
    var htmlPrefix = '<td class="repContent">';
    var htmlSuffix = '</td>';
    $("#cashRep").append(htmlPrefix + rep.cash_rep + htmlSuffix);
    $("#paid").append(htmlPrefix + rep.paid + htmlSuffix);
    $("#defaulted").append(htmlPrefix + rep.defaulted + htmlSuffix);
    $("#succeeded").append(htmlPrefix + rep.succeeded + htmlSuffix);
    $("#failed").append(htmlPrefix + rep.failed + htmlSuffix);
    $("#outstanding").append(htmlPrefix + rep.outstanding + htmlSuffix);
    $("#amount").append(htmlPrefix + rep.amount + htmlSuffix);
}

function populateHist(id) {
    var allHist = getUserHistories(id);
    console.log(allHist);
    allHist.forEach(function(d) {
        var curr = getHistory(d);
        console.log(curr);
        var project = getSingleLoan(curr.project).description;
        var f = '<td>';
        var b = '</td>';

        var html = f + curr.time + b + f + project + b + f + curr.description + b;
        $("#history-tbody").append('<tr>' + html + '</tr>');
    });
}