$(document).ready(function() {
    $("#inputPK").keydown(function(event) {
        if (event.which == 13) {
            nextPage();
        }
    });
    $("#btn-explore").click(function() {
        nextPage();
    });
});

function nextPage() {
    var PK = $("#inputPK").val();
    alert(PK);
    var dest = "requests.html?pk=" + PK;
    location.assign(dest);
}