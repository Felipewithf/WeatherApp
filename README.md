# Ghibli Weather Dashboard

Weather dashboard inspired by the Studio Ghibli animation studio  

## Description

- This weather dashboard uses two apis (current weather and 5 days forecast) both from OpenWeather.
- The user is able to search any city or use the pre existing buttons to select a city.
- Information display are: City name, temperature in Celsius, wind speed, humidity percentage, and instead of an icon an image inspired by the Studio Ghibli will display to match the weather.
- The latest city is saved in localstorage
- I decided to pre-select some cities instead of showing the history for the user to be able to easily change cities and see different images

## Image instead of Icons

Using the 18 icons that the api returns, I swap them, for images to display in the background

 ![OpenWeather default icons](assets/img/s5.png)
  ![OpenWeather default icons](assets/img/s18.png)


## Environments

You can view the live demo using this link https://felipewithf.github.io/WeatherApp/

## Screenshots

Image background matches the current weather of the city

 ![searchign for Athens and showing clouds](assets/img/s0.png)
  ![searching for Istanbul and showing thunderstorms](assets/img/s1.png)
   ![searching for Toronto and showing clear skies at night](assets/img/s2.png)

## Tests

- Check the demo at different times of the day ( day and night) to view image change from day to night
- Check different cities across the world to see their weather
- Type any city in the search box to see that city's weather
- Select from the pre-selected buttons to the city's weather
- Refresh the page and see how the latest city searched is stored in your browser
- Type an invalid city and an Error toast UI will appear -  handling respons 404 from api
 ![Error toast UI on invalid city](assets/img/s3.png)

## time estimates

7 hours