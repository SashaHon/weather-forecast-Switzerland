export const helpers = {
  functionReturn: function (value, string) {
    return value ? value : string;
  },
  getForecastDataJson: function (address) {
    return fetch(address);
  },
  getCurrentHour: function () {
    const currentTime = new Date().toISOString();
    return +currentTime.slice(11, 13) + 1;
  },
  getCurrentTemperature: function (json, currentHour) {
    const currentTemperatureArray = json.hourly.temperature_2m;
    const currentTemperature = currentTemperatureArray[currentHour];
    return currentTemperature
      ? currentTemperature
      : "Information temporary is unavailable";
  },
  getCurrentRelativeHumidity: function (json, currentHour) {
    const relativeHumidityArray = json.hourly.relativehumidity_2m;
    const currentHumidity = relativeHumidityArray[currentHour];
    return currentHumidity
      ? currentHumidity
      : "Information temporary is unavailable";
  },
  getCurrentWindSpeed10m: function (json, currentHour) {
    const windSpeed10mArray = json.hourly.windspeed_10m;
    const currentWindSpeed10m = windSpeed10mArray[currentHour];
    return currentWindSpeed10m
      ? currentWindSpeed10m
      : "Information temporary is unavailable";
  },
  getCurrentRain: function (json, currentHour) {
    const rainArr = json.hourly.rain;
    const currentRain = rainArr[currentHour];
    return currentRain ? currentRain : "Information temporary is unavailable";
  },
  getIconClass: function (type, value) {
    switch (type) {
      case "temperature":
        if (value >= 38) {
          return "t-very-high";
        } else if (value >= 21 && value < 38) {
          return "t-high";
        } else if (value >= 10 && value < 21) {
          return "t-normal";
        } else if (value >= 0 && value < 10) {
          return "t-low";
        } else return "t-very-low";
      case "humidity":
        if (value > 65) {
          return "h-high";
        } else if (value >= 30 && value <= 65) {
          return "h-normal";
        } else return "h-low";
      case "rain":
        if (value > 5) {
          console.log(value);
          return "r-rain";
        } else if (value >= 2 && value <= 5) {
          return "r-cloud-sun-rain";
        } else if (value > 0.5 && value < 2) {
          return "r-cloud";
        } else return "r-sun";
    }
  },
  renderForecastData: function (
    getIconClassFunc,
    currentTemperature,
    currentRelativeHumidity,
    currentRain,
    currentWindSpeed10m
  ) {
    const temperatureTag = document.querySelector("#temperature"),
      relativeHumidityTag = document.querySelector("#relativeHumidity"),
      rainTag = document.querySelector("#rain"),
      windSpeedTag = document.querySelector("#windSpeed");

    const temperatureDiv = document.querySelector("#icon-temperature"),
      humidityDiv = document.querySelector("#icon-humidity"),
      rainDiv = document.querySelector("#icon-rain"),
      windDiv = document.querySelector("#icon-wind");

    temperatureDiv.classList.add(
      getIconClassFunc("temperature", currentTemperature)
    );
    temperatureTag.textContent = `${currentTemperature} °C`;

    humidityDiv.classList.add(
      getIconClassFunc("humidity", currentRelativeHumidity)
    );
    relativeHumidityTag.textContent = `${currentRelativeHumidity}%`;

    rainDiv.classList.add(getIconClassFunc("rain", currentRain));
    rainTag.textContent = `${currentRain} mm`;

    windSpeedTag.textContent = `${currentWindSpeed10m} km/h`;
  },
};
