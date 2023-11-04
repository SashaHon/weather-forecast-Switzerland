import { helpers } from "./helpers.js";

async function renderWeatherDataResponse() {
  const {
    getForecastDataJson,
    getCurrentHour,
    getCurrentTemperature,
    getCurrentRelativeHumidity,
    getCurrentWindSpeed10m,
    getCurrentRain,
    renderForecastData,
  } = {
    ...helpers,
  };

  const response = await getForecastDataJson(
    "https://api.open-meteo.com/v1/forecast?latitude=47.0002&longitude=8.0143&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,windspeed_10m"
  );
  const weatherData = await response.json();
  const currentHour = getCurrentHour();
  const currentTemperature = getCurrentTemperature(weatherData, currentHour);
  const currentRelativeHumidity = getCurrentRelativeHumidity(
    weatherData,
    currentHour
  );
  const currentWindSpeed10m = getCurrentWindSpeed10m(weatherData, currentHour);
  const currentRain = getCurrentRain(weatherData, currentHour);

  renderForecastData(
    currentTemperature,
    currentRelativeHumidity,
    currentWindSpeed10m,
    currentRain
  );
}

renderWeatherDataResponse();
