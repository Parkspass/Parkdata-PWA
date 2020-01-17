document.getElementById("dateField").valueAsDate = new Date();

var latText = document.getElementById("latitude");
var longText = document.getElementById("longitude");


navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    latText.innerText = lat.toFixed(2);
    longText.innerText = long.toFixed(2);
});

var upButton = document.getElementById("upButton");
var clicksUp = 0;
upButton.addEventListener('click', function (){
    console.log("upButton pushed");
    clicksUp += 1;
    document.getElementById("upCount").placeholder = clicksUp;
});

var downButton = document.getElementById("downButton");
var clicksDown = 0;
downButton.addEventListener('click', function (){
    console.log("downButton pushed");
    clicksDown += 1;
    document.getElementById("downCount").placeholder = clicksDown;
});