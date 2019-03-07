import axios from "axios";

const openWeatherKey = "bf41eed7776d7c7082c8493f2a5871bf";
// const openWeatherKey = "0ab7e7df216fa41ab13de079149ea4c5";
const baseURL = "https://api.openweathermap.org/data/2.5/";

function prepRouteParams(queryStringData) {
  return Object.keys(queryStringData)
    .map(key => {
      return key + "=" + encodeURIComponent(queryStringData[key]);
    })
    .join("&");
}

function prepUrl(type, queryStringData) {
  return baseURL + type + "?" + prepRouteParams(queryStringData);
}

function getQueryStringData(city) {
  return {
    q: city,
    type: "accurate",
    APPID: openWeatherKey,
    units: "metric",
    cnt: 7
  };
}

export function getCurrentWeather(city) {
  const queryStringData = getQueryStringData(city);
  const url = prepUrl("weather", queryStringData);
  return axios.get(url).then(function(currentWeatherData) {
    return currentWeatherData.data;
  });
}

export function getForecast(city) {
  const queryStringData = getQueryStringData(city);
  const url = prepUrl("forecast/daily", queryStringData);
  return axios.get(url).then(function(forecastData) {
    return forecastData.data;
  });
}
