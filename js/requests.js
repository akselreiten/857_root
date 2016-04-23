$(document).ready(function() {
    alert(getPK());
});

// http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
function getPK() {
    var data = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    pkData = data[0].split('=');
    return pkData[1];
}

