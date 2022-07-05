var inputCity = "Houston";

var getLatLong = function(cityName) { 
    // the API offers One Call API 1.0 that allows the user to fetch once and the response return all the current, hourly, daily data at once.
    // but it only allows lat,long as query parameters- so I use the current weather api call so I can search by city name then pass the returned lat/long to One Call API 1.0
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=8750441917e6ca1d96a12baea082a59e";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var cityLong = data.coord.lon;
                    var cityLat = data.coord.lat;
                    oneCall(cityLat,cityLong);
                });
            } else {
                alert("Error.");
            }
        });
};

// uses latitude and longitudes to use One Call API 1.0 for complete weather information
var oneCall = function(latitude,longitude) {
    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=8750441917e6ca1d96a12baea082a59e";
    
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    
                });
            } else {
                alert("Error.");
            }
        });
}

getLatLong(inputCity);