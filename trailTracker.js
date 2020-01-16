document.getElementById("dateField").valueAsDate = new Date();

var latText = document.getElementById("latitude");
var longText = document.getElementById("longitude");


navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    latText.innerText = lat.toFixed(2);
    longText.innerText = long.toFixed(2);
});

var upButton = document.querySelector("#upButton");
var clicks = 0;
upButton.onClick = function click() {
    clicks += 1;
    document.querySelector("#upCount").innerHTML = clicks;
};

$('.timepicker').pickatime();