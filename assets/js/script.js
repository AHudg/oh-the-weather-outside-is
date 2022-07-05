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
                    forecastWeather(data);
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

    var cityName = $('input')[0].value;
    var cityEl = $("<h2>" + cityName + "</h2>");
    // style City Name here and write the city name in Title Case somehow
    $('#currentWeather').append(cityEl);
    var getDate = new Date();
    var currentDate = getDate.toLocaleString('en-US',{
        weekday: 'long',
        day:'numeric',
        year:'numeric',
        month:'long',
    });
    var timeEl = $("<span>");
    timeEl.text(currentDate);
    $('#currentWeather').append(timeEl);

    var currentList = $('<ul>');
    currentList.attr('style','list-style:none');

    var currentListTemp = $('<li>');
    currentListTemp.text("Temperature: " + currentTemp + " °F");

    var currentListHumid = $('<li>');
    currentListHumid.text("Humidity: " + currentHumidity + "%");

    var currentListUVI = $('<li>');
    currentListUVI.text("UV Index: " + currentUVI);

    var currentListWind = $('<li>');
    currentListWind.text("Wind Speed: " + currentWindSpeed + " mph");

    $("#currentWeather").append(currentList);
    currentList.append(currentListTemp);
    currentList.append(currentListHumid);
    currentList.append(currentListUVI);
    currentList.append(currentListWind);
};

// populates the five day forecast section
var forecastWeather = function(data) {

    for (var i = 0; i < 5; i++) {
        forecastTemp = data.daily[i].temp.day;
        forecastHumid = data.daily[i].humidity;
        forecastWind = data.daily[i].wind_speed;

        var forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + i + 1);
        var formatDate = forecastDate.toLocaleString('en-US',{
            weekday: 'long',
            day:'numeric',
            year:'numeric',
            month:'long',
        });

        var forecastList = $('<ul>');
        forecastList.attr('style','list-style:none');
        forecastList.attr('class','cell small-12 medium-4 large-2');
        $("#forecastWeather").append(forecastList);

        var forcastDateEl = $('<li>')
        forcastDateEl.text(formatDate);
        forecastList.append(forcastDateEl);

        var forecastTempLiEl = $('<li>');
        forecastTempLiEl.text("Temperature: " + forecastTemp + " °F");

        var forecastHumidLiEl = $('<li>');
        forecastHumidLiEl.text("Humidity: " + forecastHumid + "%");

        var forecastWindLiEl = $('<li>');
        forecastWindLiEl.text("Wind Speed: " + forecastWind + " mph");

        forecastList.append(forecastTempLiEl);
        forecastList.append(forecastHumidLiEl);
        forecastList.append(forecastWindLiEl);
    };
}

$(".searchBtn").click(getLatLong);
$("#cityName").keypress(enterButton);




