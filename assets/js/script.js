// the API offers One Call API 1.0 that allows the user to fetch once and the response return all the current, hourly, daily data at once.
// but it only allows lat,long as query parameters- so I use the current weather api call so I can search by city name then pass the returned lat/long to One Call API 1.0
var getLatLong = function(event) { 

    var cityName = $('input')[0].value.trim().toUpperCase();

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
                    buttonSave(cityName);
                });
            } else {
                alert("Error. The city was not found. Please check your spelling and try again.");
            };
        })
        .catch(function(error) {
            alert("Unable to connect to API.");
        });
};

// eventListener keypress to validate "enter"
var enterButton = function(event) {
    if (event.which == 13) {
        event.preventDefault();
        getLatLong();
    };
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
        })
        .catch(function(error) {
            alert("Cannot connect to API.");
        });
};

var currentWeather = function(data) {
    $('#currentWeather').empty();
    $('#currentWeather').addClass('parent border');
    var currentIcon = data.current.weather[0].icon;
    var currentTemp = data.current.temp;
    var currentHumidity = data.current.humidity;
    var currentWindSpeed = data.current.wind_speed;
    var currentUVI = data.current.uvi;

    var cityName = $('input')[0].value.trim().toUpperCase();
    var cityEl = $("<h2>");
    $(cityEl).text(cityName);
    $('#currentWeather').append(cityEl);

    var currentImg = $('<img>').attr('src',"http://openweathermap.org/img/w/" + currentIcon + ".png");
    cityEl.append(currentImg);

    var getDate = new Date();
    var currentDate = getDate.toLocaleString('en-US',{
        weekday: 'long',
        day:'numeric',
        year:'numeric',
        month:'long',
    });
    var timeEl = $("<span>");
    timeEl.text(currentDate);
    timeEl.addClass('time');
    $('#currentWeather').append(timeEl);

    var currentList = $('<ul>');
    currentList.attr('style','list-style:none');

    var currentListTemp = $('<li>');
    currentListTemp.text("Temperature: " + currentTemp + " °F");

    var currentListHumid = $('<li>');
    currentListHumid.text("Humidity: " + currentHumidity + "%");

    var currentListUVI = $('<li>');
    currentListUVI.text("UV Index: " + currentUVI);
    switch(Math.floor(currentUVI)) {
        case 0:
        case 1:
        case 2:
            currentListUVI.attr('class','uvi-low');
            break;
        case 3:
        case 4:
        case 5:
            currentListUVI.attr('class','uvi-moderate');
            break;
        case 6:
        case 7:
            currentListUVI.attr('class','uvi-high');
            break;
        case 8:
        case 9:
        case 10:
            currentListUVI.attr('class','uvi-veryhigh');
            break;
        case 11:
            currentListUVI.attr('class','uvi-extreme');
            break;
        default:
            alert("error");
            break;
    };

    var currentListWind = $('<li>');
    currentListWind.text("Wind Speed: " + currentWindSpeed + " mph");

    $("#currentWeather").append(currentList);
    currentList.append(currentListTemp);
    currentList.append(currentListHumid);
    currentList.append(currentListUVI);
    currentList.append(currentListWind);
};

var forecastWeather = function(data) {
    $('#forecastWeather').empty();
    $('#forecastWeather').addClass('parent border');
    $('#forecastWeather').append($('<h4>').attr('class','cell small-12 parent').text("Five Day Forecast:"));


    for (var i = 0; i < 5; i++) {
        var forecastIcon = data.daily[i].weather[0].icon;
        forecastTemp = data.daily[i].temp.day;
        forecastHumid = data.daily[i].humidity;
        forecastWind = data.daily[i].wind_speed;

        var forecastImg = $('<img>').attr('src',"http://openweathermap.org/img/w/" + forecastIcon + ".png");

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
        forecastList.attr('class','cell small-12 medium-5 large-2 parent forecast');
        $("#forecastWeather").append(forecastList);

        forecastList.append(forecastImg);

        var forcastDateEl = $('<li>')
        forcastDateEl.text(formatDate);
        forcastDateEl.addClass('forecast-time');
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
    $('input').val("");
};

var buttonSave = function(cityName) {
    previousCities = JSON.parse(localStorage.getItem("Cities"));

    if (!previousCities) {
        previousCities = [];
        previousCities.push(cityName);
    } else {
        var filteredCities = storageCheck(previousCities,cityName);
        for (var i = 0; i < filteredCities.length; i++) {
            if (filteredCities[i] === true) {
                var match = true;
                return match;
            };
        };

        if (!match) {
            previousCities.push(cityName);
        };
    };

    localStorage.setItem("Cities", JSON.stringify(previousCities));
    populateButtons();
}

var populateButtons = function() {
    $('#buttonList').empty();

    previousCities = JSON.parse(localStorage.getItem("Cities"));

    if (previousCities) {
        for (var i = 0; i < previousCities.length; i++) {
            var buttonEl = $("<button type='button' id='"+ previousCities[i] + "'>");
            buttonEl.attr('class','historyBtn');
            buttonEl.text(previousCities[i]);
            $('#buttonList').append(buttonEl);
        };
    };
};

var storageCheck = function(array,query) {
    var filteredCities = [];

    array.filter(function(array) {
        filteredCities.push(array.indexOf(query) !== -1);
        return filteredCities;
    });
    return filteredCities;
};

var recallWeather = function(event) {
    var cityName = event.target.id;
    $('input').val(cityName);
    getLatLong();
}

populateButtons();

$(".searchBtn").click(getLatLong);

$("#cityName").keypress(enterButton);

$('#buttonList').on("click",'.historyBtn', recallWeather);