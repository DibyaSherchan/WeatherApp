let weather = {
    apiKey: "ff7aab6e63442efabcd19c7346e5802e",
    fetchWeather: function (city) {
      // Check if data is already stored in local storage
      const storedData = localStorage.getItem(city);
      if (storedData) {
        console.log("Data taken from local storage");
        this.displayWeather(JSON.parse(storedData));
      } else {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
          .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Data taken from API");
            this.saveToLocalStorage(city, data);
            this.displayWeather(data);
          });
      }
    },
    fetchForecast: function (city) {
      fetch(
        "http://localhost/FinalWeather/DibyaSherchan_2334057_connection.php?city=${city}"
      )
        .then((response) => {
          if (!response.ok) {
            alert("No forecast data found.");
            throw new Error("No forecast data found.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Forecast data taken from API");
          this.appendForecastToLocalStorage(city, data);
        });
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    saveToLocalStorage: function (city, data) {
      localStorage.setItem(city, JSON.stringify(data));
    },
    appendForecastToLocalStorage: function (city, forecastData) {
      const storedData = localStorage.getItem(city);
      let weatherData = storedData ? JSON.parse(storedData) : {};
      weatherData.forecast = forecastData;
      localStorage.setItem(city, JSON.stringify(weatherData));
    },
    search: function () {
      const city = document.querySelector(".search-bar").value;
      if (city.trim() !== "") {
        this.fetchWeather(city);
        this.fetchForecast(city);
      }
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });
  
  weather.fetchWeather("Suffolk");
  