document.addEventListener('DOMContentLoaded', function() {
    const cities = [
      "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Pune", 
      "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Patna", 
      "Indore", "Thane", "Bhopal", "Visakhapatnam", "Vadodara", "Firozabad", 
      "Ludhiana", "Rajkot", "Agra", "Siliguri", "Nashik", "Faridabad", "Patiala", 
      "Meerut", "Kalyan-Dombivali", "Varanasi", "Allahabad", "Coimbatore", 
      "Madurai", "Ranchi", "Chandigarh", "Kochi", "Mysore", "Guwahati", 
      "Jamshedpur", "Tiruchirappalli", "Bhubaneswar", "Salem", "Tiruppur", 
      "Jodhpur", "Vijayawada", "Gwalior", "Amritsar", "Mangalore", "Dehradun", 
      "Dhanbad", "Raipur", "Kota", "Bareilly", "Moradabad", "Gorakhpur", "Bhilai", 
      "Rajahmundry", "Warangal", "Jalandhar", "Tirupati", "Aligarh", "Guntur", 
      "Jhansi", "Saharanpur", "Nellore", "Kollam", "Udaipur", "Bilaspur", 
      "Shillong", "Nanded", "Rourkela", "Jamnagar", "Ajmer", "Bikaner", 
      "Belgaum", "Hisar", "Tirunelveli", "Davanagere", "Akola", "Kurnool", 
      "Rajapalayam", "Bijapur", "Amravati", "Kadapa", "Karimnagar", "Bhavnagar", 
      "Cuttack", "Kakinada", "Kanpur", "Lucknow", "Ghaziabad", "Agra", "Varanasi", "Meerut", 
      "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", 
      "Gorakhpur", "Noida", "Jhansi", "Muzaffarnagar", "Mathura", 
      "Budaun", "Rampur", "Shahjahanpur", "Farrukhabad", "Hapur", 
      "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", 
      "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", 
      "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", 
      "Banda", "Pilibhit", "Barabanki", "Faizabad", "Mughalsarai", 
      "Khurja", "Deoria", "Hathras", "Azamgarh", "Nanda", "Loni", 
      "Sultanpur", "Ghazipur", "Gonda", "Mainpuri", "Jehanabad", 
      "Basti", "Mau", "Chandausi", "Orai", "Tanda", "Sahaswan", 
      "Sultanpur", "Mirzapur", "Lalitpur", "Pilkhuwa", "Rae Bareli", 
      "Ujhani", "Gola Gokarannath", "Rudauli", "Tilhar", "Utraula", 
      "Soron", "Nagina", "Noorpur", "Pihani", "Sadabad", "Puranpur", 
      "Laharpur", "Shikarpur", "Tilhar", "Sandila", "Shamsabad", 
      "Sahaswan", "Sarai Mir", "Reoti", "Zaidpur", "Puranpur", 
      "Tundla", "Tikaitnagar", "Thakurdwara", "Nawabganj", 
      "Nautanwa", "Nanpara", "Naraura", "Naugawan Sadat", 
      "Niwai", "Nawabganj", "Narayanpur", "Nautanwa", 
      "Nawabganj", "Naraura", "Navalpur", "Narauli", 
      "Niwai", "Sisauli", "Nawabganj", "Nawabganj", 
      "Naraura", "Navalpur", "Narauli", "Niwai", 
      "Sisauli", "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", 
      "Kashipur", "Rishikesh", "Pithoragarh", "Ramnagar", "Kotdwar", 
      "Manglaur", "Mussoorie", "Tehri", "Pauri", "Sitarganj", 
      "Nainital", "Jaspur", "Rudraprayag", "Almora", "Didihat", 
      "Champawat", "Bageshwar", "Srinagar", "Bhowali", "Lansdowne", "Ladakh"
    ];

    const locationInput = document.getElementById('searchInput');
    const dataList = document.getElementById('cities');

    function populateDataList(cityArray) {
      dataList.innerHTML = '';
      cityArray.forEach(city => {
        const option = document.createElement('option');
        option.textContent = city;
        option.value = city;
        dataList.appendChild(option);
      });
    }

    populateDataList(cities);

    const form = document.getElementById('locationForm');
    const weatherInfo = document.getElementById('weatherInfo');
    const weeklyForecastContainer = document.getElementById('weeklyForecast');
    const activitySuggestion = document.getElementById('activitySuggestion');
    const currentDateElement = document.getElementById('date');

    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      const location = locationInput.value;
      getWeather(location);
    });

    async function getWeather(location) {
      const apiKey = '646322ca0c237b0f4003598eb75c4628';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          displayWeather(data);
          displayWeeklyForecast(data);
          suggestActivity(data);
        } else {
          showError(data.message);
        }
      } catch (error) {
        showError('An error occurred while fetching weather data.');
      }
    }

    function displayWeather(data) {
      const temperature = data.list[0].main.temp;
      const description = data.list[0].weather[0].description;
      const iconCode = data.list[0].weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

      // Define emojis based on weather conditions
      let weatherEmoji;
      if (description.includes('clear')) {
        weatherEmoji = '☀️'; // Sun emoji
      } else if (description.includes('cloud')) {
        weatherEmoji = '☁️'; // Cloud emoji
      } else if (description.includes('rain')) {
        weatherEmoji = '🌧️'; // Rain emoji
      } else if (description.includes('storm')) {
        weatherEmoji = '⛈️'; // Thunderstorm emoji
      } else {
        weatherEmoji = '❓'; // Question mark emoji for unknown weather
      }

      weatherInfo.innerHTML = `
        <img class="weather-icon" src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperature}°C ${weatherEmoji}</p>
        <p>Description: ${description}</p>
      `;
    }

    function displayWeeklyForecast(data) {
      weeklyForecastContainer.innerHTML = '<h2>Weekly Forecast</h2>';

      const dailyForecasts = data.list.filter((forecast, index) => index % 8 === 0); // Selecting every 8th element for daily forecast

      dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        // Define emojis based on weather conditions
        let weatherEmoji;
        if (description.includes('clear')) {
          weatherEmoji = '☀️'; // Sun emoji
        } else if (description.includes('cloud')) {
          weatherEmoji = '☁️'; // Cloud emoji
        } else if (description.includes('rain')) {
          weatherEmoji = '🌧️'; // Rain emoji
        } else if (description.includes('storm')) {
          weatherEmoji = '⛈️'; // Thunderstorm emoji
        } else {
          weatherEmoji = '❓'; // Question mark emoji for unknown weather
        }

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('daily-forecast');
        forecastElement.innerHTML = `
          <div>${day}</div>
          <img src="${iconUrl}" alt="Weather Icon">
          <div>${temperature}°C ${weatherEmoji}</div>
          <div>${description}</div>
        `;
        weeklyForecastContainer.appendChild(forecastElement);
      });
    }

    function suggestActivity(data) {
      const description = data.list[0].weather[0].description;
      let suggestion;

      if (description.includes('clear')) {
        suggestion = "It's clear skies! Perfect weather for outdoor activities like hiking or picnics.";
      } else if (description.includes('cloud')) {
        suggestion = "It's a cloudy day. You might enjoy a leisurely walk or indoor activities like reading.";
      } else if (description.includes('rain')) {
        suggestion = "It's raining! Stay indoors and enjoy some hot chocolate or watch a movie.";
      } else if (description.includes('storm')) {
        suggestion = "There's a thunderstorm! It's best to stay indoors and stay safe.";
      } else {
        suggestion = "Weather conditions are uncertain. Choose your activity wisely.";
      }

      activitySuggestion.textContent = suggestion;
    }

    function showError(message) {
      weatherInfo.innerHTML = `<p class="error">${message}</p>`;
    }

    // Function to update current date
    function updateCurrentDate() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      currentDateElement.textContent = formattedDate;
    }

    // Call the function initially to display the current date
    updateCurrentDate();
  });