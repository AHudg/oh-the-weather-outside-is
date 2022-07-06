# oh-the-weather-outside-is
## Description
This application revolves around the Open Weather Server API to populate weather information based off the user-input city. By searching for a specific city, the program populates the current weather, a five day forecast, and ties this information to a button so that the user can recall the city's weather without searching for it again.

## Built With:
* HTML
* CSS
    * [Foundation](https://get.foundation/sites/docs/) By Zurb Third-Party API
* JavaScript
    * [JQuery](https://api.jquery.com/) Third-Party API
    * Open Weather Server API
        * [Current Weather Data](https://openweathermap.org/current)
        * [One Call API 1.0](https://openweathermap.org/api/one-call-api)

## Key Features:
### Serve-Side APIs
This applications was developed to practice using a fetch request to a server API and how to then format and utilize said data for the user. In the image below, you can see how the cityName was taken from the input element and placed in the API url to receive the correct response data. This data was then formatted such that JavaScript could use it to send out to various functions for a page response.
![A screenshot showing how user input was used to send a fetch request using the API url.](./assets/images/serverAPI.png)

### Switch Case Fall Through
A switch case was used to color-code the UV Index according to the standardized breakpoints. The ability to "fall through" on the switch case allowed me to set a range of cases that will trigger specific code. I was proud of this logic, so I thought it deserved a shout-out.
![A screenshot of how a switch case was used with multiple cases not including a break to basically create a range of cases the code executes on.](./assets/images/switchCase.png)

### Using .filter() and returning information
To combat the same city being saved multiple times, .filter() was used as well as return *variable* such that the function returned a boolean array of equal length to saved cities. If any of the boolean logics returned as true, then an if statement would handle logic such that duplicated cities cannot be populated as previously searched city buttons.
![A screenshot of how I used .filter() to sort using .indexOf() and return the boolean array](./assets/images/filterFunction.png)

View the live page [here!](https://ahudg.github.io/oh-the-weather-outside-is/)

## Contributions
Made by Andrew Hudgins :)