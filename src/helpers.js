export const helpers = {
  getForecastDataJson: function (address) {
    return fetch(address);
  },
  getCurrentHour: function () {
    const currentTime = new Date().toISOString();
    return +currentTime.slice(11, 13) + 1;
  },
  getCurrentTemperature: function (json, currentHour) {
    const currentTemperatureArray = json.hourly.temperature_2m;
    return currentTemperatureArray[currentHour];
  },
  getCurrentRelativeHumidity: function (json, currentHour) {
    const relativeHumidityArray = json.hourly.relativehumidity_2m;
    return relativeHumidityArray[currentHour];
  },
  getCurrentWindSpeed10m: function (json, currentHour) {
    const windSpeed10mArray = json.hourly.windspeed_10m;
    return windSpeed10mArray[currentHour];
  },
  getCurrentRain: function (json, currentHour) {
    let rainArr = json.hourly.rain;
    return rainArr[currentHour];
  },
  renderForecastData: function (
    currentTemperature,
    currentRelativeHumidity,
    currentWindSpeed10m,
    currentRain
  ) {
    const temperatureTag = document.querySelector("#temperature"),
      relativeHumidityTag = document.querySelector("#relativeHumidity"),
      windSpeedTag = document.querySelector("#windSpeed"),
      rainTag = document.querySelector("#rain");

    temperatureTag.textContent = `It's ${currentTemperature} °C now`;
    relativeHumidityTag.textContent = `Current relative humidity is ${currentRelativeHumidity}%`;
    windSpeedTag.textContent = `Current wind speed is ${currentWindSpeed10m} km/h`;
    rainTag.textContent = `Current rain is ${currentRain} mm`;
  },
};
