$(document).ready(function() {
    populateDropdown();
    $(".repUser").click(function() {
        $(".repContent").remove();
        $("#project-tbody").empty();
        var id = ($(this).prop("id"));
        populateRep(id);
        populateProj(id);
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
    console.log(id);
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

function populateProj(id) {
    var projects = getUserProjects(id);
    console.log(id);
    console.log(projects);
    projects.forEach(function(d) {
        var descrip = getSingleLoan(d).description;
        $("#project-tbody").append("<tr><td>" + descrip + "</td></tr>");
    });
}