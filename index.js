

/*Variable Declaration*/
var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempUnit;
var y = "3h";

/*docuemnt ready functions*/
$(document).ready(function() {
  
//show icon function
 function changeIcon(x) {
  $("#icon").attr('src', x);
}
if (navigator.geolocation) {        navigator.geolocation.getCurrentPosition(showPositionData);} 
else{
x.innerHTML = "Geolocation is not supported by this browser.";
    }
//geolocation trigger function
function showPositionData(position) {
    lat = "lat=" + position.coords.latitude;
    lon = "lon=" + position.coords.longitude;
    getWeather(lat, lon);
    }
//changing temperature unit
  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });

/*Functions*/

//getting api data
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      $("#pressure").text("Preassure: "+ result.main.pressure+ " kPa");
      $("#humidity").text("Humidity: "+ result.main.humidity + " %");
      changeIcon(result.weather[0].icon);
    }
  });
}
});


