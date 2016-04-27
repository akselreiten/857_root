$(document).ready(function() {
    populateDropdown();
    var id = "";
    $(".oneProj").click(function() {
        $(".projContent").remove();
        $("#cert-tbody").empty();
        id = ($(this).prop("id"));
        $("#curr-user").text(getUserName(id));
        populateTable(id);
        populateCert(id);

        if (myContractInstance.certify.call(id,{from:defaultAccount})) {
            $("#cert").prop('disabled', false);
        }
    });

    $("#cert").prop('disabled', true);

    $("#cert").click(function() {
        console.log(certify(id, defaultAccount));
        $("#cert").prop('disabled', true);
    });

});

function populateDropdown() {
    var allProjects = getAllProjects();
    allProjects.forEach(function(d) {
        var proj = getSingleLoan(d);
        var htmlString = '<li class="oneProj" id="';
        htmlString += d + '"><a href="#">' + proj.description + '</a></li>';
        $('.dropdown-menu').append(htmlString);
    });
}

function populateTable(id) {
    var proj = getSingleLoan(id);
    var htmlPrefix = '<td class="projContent">';
    var htmlSuffix = '</td>';
    $("#curr-proj").text(proj.description);
    $("#lender").append(htmlPrefix + getUserName(proj.lender) + htmlSuffix);
    $("#borrower").append(htmlPrefix + getUserName(proj.borrower) + htmlSuffix);
    $("#amount").append(htmlPrefix + proj.amount + htmlSuffix);
    $("#endTime").append(htmlPrefix + convertTimestamp(proj.end_time) + htmlSuffix);
    $("#interest").append(htmlPrefix + toPercent(proj.amount, proj.bonus) + htmlSuffix);
    $("#certTarget").append(htmlPrefix + proj.cert_target + htmlSuffix);
    $("#curCert").append(htmlPrefix + proj.cur_cert + htmlSuffix);
    var status = "Ongoing"
    if (proj.done) {
        status = "Finished"
    }
    $("#done").append(htmlPrefix + status + htmlSuffix);
}

function populateCert(id) {
    var certifiers = getCertifiers(id);
    certifiers.forEach(function(d) {
        var user = getUserName(d);
        $("#cert-tbody").append("<tr><td>" + user + "</td></tr>");
    });
}