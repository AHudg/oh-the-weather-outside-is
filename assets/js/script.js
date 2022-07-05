// the API offers One Call API 1.0 that allows the user to fetch once and the response return all the current, hourly, daily data at once.
// but it only allows lat,long as query parameters- so I use the current weather api call so I can search by city name then pass the returned lat/long to One Call API 1.0
var getLatLong = function(event) { 
    // event.preventDefault();

    // grabs the city from the input
    var cityName = $('input')[0].value;
    // if Search! button is hit but no text is inside the input...
    if (!cityName) {
        alert("You need to search for a city first!");
        return;
    }

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
                alert("Error. The city was not found. Please check your spelling and try again.");
            }
        });
};

var enterButton = function(event) {
    if (event.which == 13) {
        event.preventDefault();
        getLatLong();
    }
};

// uses latitude and longitudes to use One Call API 1.0 for complete weather information
var oneCall = function(latitude,longitude) {
    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=8750441917e6ca1d96a12baea082a59e";
    
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    currentWeather(data);
                    // forecastWeather(data);
                });
            } else {
                alert("Error.");
            }
        });
}

// populates the current weather section
var currentWeather = function(data) {
    var currentTemp = data.current.temp;
    var currentHumidity = data.current.humidity;
    var currentWindSpeed = data.current.wind_speed;
    var currentUVI = data.current.uvi;
    console.log(currentTemp, currentHumidity, currentWindSpeed, currentUVI);
}

// populates the five day forecast section
var forecastWeather = function(data) {
    console.log(data);
    console.log(data.daily[0].temp.day);
    console.log(data.daily[0].humidity);
    console.log(data.daily[0].wind_speed);
    console.log(data.daily[0].uvi);
}

$(".searchBtn").click(getLatLong);
$("#cityName").keypress(enterButton);




