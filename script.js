let apiKey = '996513822471b1a94113e31bc557ef81';
// let history = localStorage.getItem('search') || [];
const userInput = $('#search-input').val();

$('#cityLast').text(history[0].toUpperCase())





$('#search-form').on('submit', function(event) {
    event.preventDefault();
  
    const userInput = $('#cityInput').val();
  
    const queryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    
    localStorage.setItem('search', userInput);
  
    $.ajax({ url: queryUrl })
    .then(function(response) {
      console.log(response);
  
      const lat = response[0].lat;
      const lon = response[0].lon;
  
      console.log(lat, lon);
  
      const weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey
      const news = `https://gnews.io/api/v4/search?apikey=d637a83839fdfa02561aecd225796c43&q=${userInput}`
      
//today's weather  
      $.ajax({ url: weatherQueryUrl })
      .then(function(weatherResponse) {
        //Icon URL --> "https://openweathermap.org/img/w/" + iconcode + ".png"
        console.log(weatherResponse);
  
        const weatherList = weatherResponse.list;
  
        const today = weatherList[0];
  
        const iconCode = today.weather[0].icon;
        const cityName = weatherResponse.city.name;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        const temperature = today.main.temp;
        const weatherDescription = today.weather[0].description;
        const windSpeed = today.wind.speed;
        const humidity = today.main.humidity;
  
        $('#today').html(`
        <h1 class=>${cityName}</h1>
        <p class="lead">${formattedDate}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p class="lead">${weatherDescription}</p>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>
        `);
  
      }).then(res=>{
      $.ajax( news )
      .then(function(newsResponse) {
console.log(newsResponse.articles[0])

const newsTitle = newsResponse.articles[0].title;
const newsDescreption = newsResponse.articles[0].description;
const newsContent = newsResponse.articles[0].content;
const newsUrl = newsResponse.articles[0].url;
const newsImage = newsResponse.articles[0].image;
        
// let history = localStorage.getItem('search') || [];
$('#cityLast').text(history[0].toUpperCase())  

        $('#today-news').html(`
        <h1 class=>${newsTitle}</h1>
        <p class="lead">${newsDescreption}</p>
        <img src="${newsImage}">
        <p class="lead">${newsContent}</p>
        <a href=${newsUrl}>Visit the article</a>
        `);


      });
      })
    });
  });