const searchRequest = $('#searchRequest')
const searchBtn = $('#searchBtn')
const prevSearch = $('#prevSearch')
let latAndLon

function retrieveAndAppendData() {
    for (let i = 0; i < localStorage.length; i++) {
      const cityName = localStorage.key(i);  
      if (!$(`#prevSearch button[val='${cityName}']`).length > 0) {
            $('#prevSearch').append(`<button val='${cityName}'>${cityName}</button>`);
        }
    }
}
  
  retrieveAndAppendData();
function getWeatherApi() {
    const getLatLon = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchRequest.val() + '&limit=1&appid=2a491b6c9ae1aaa4229bf858b10b21d5'
    fetch(getLatLon)
    .then(function(response) {
        return response.json()
    })
    .then(function (data) {
        $('#windSpeed').empty()
        $('#temps').empty()
        $('#weather').empty()
        console.log(data)
        latAndLon = [
            lat = data[0].lat,
            lon = data[0].lon
        ]

        
        const upperCase = searchRequest.val();
        const cityName = upperCase.replace(/\b[a-z]/g, function (cityName) {
          return cityName.toUpperCase();
        });
      if (!$(`#prevSearch button[val='${searchRequest.val()}']`).length > 0) {
  $('#prevSearch').append(`<button val='${cityName}'>${cityName}</button>`);
  localStorage.setItem(cityName, cityName)
}


        console.log(latAndLon[0])
        const requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latAndLon[0] + '&lon=' + latAndLon[1] + '&appid=2a491b6c9ae1aaa4229bf858b10b21d5&units=imperial'
        return fetch(requestUrl)
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        const temp = data.list[0].main.temp
        const feelsLike = data.list[0].main.feels_like
        const humidity = data.list[0].main.humidity
        const tempMin = data.list[0].main.temp_min
        const tempMax = data.list[0].main.temp_max
        const windSpeed = data.list[0].wind.speed
        const weather = data.list[0].weather[0].description
        const upperCase = searchRequest.val()
  		const cityName = upperCase.replace(/\b[a-z]/g, function(cityName) {
            return cityName.toUpperCase()
        })
        $('#temps').append(`<h1> ${cityName}`)
        $('#temps').append(`The current temperature is ${temp}°<br>`)
        $('#temps').append(`The Max Temperature for today is ${tempMax}°<br>`)
        $('#temps').append(`The Minimum Temperature for today is ${tempMin}°<br>`)
        $('#temps').append(`It feels like ${feelsLike}°<br>`)
        $('#temps').append(`The amount of humidity in the air is %${humidity}<rb>`)
        $('#windSpeed').append(`The windspeed is at ${windSpeed}/mph`)
        $('#weather').append(`The forecasted weather is ${weather}`)
        

    })
    .catch(function(error){
        console.log('Error fetching data', error)
    })
    
}
searchBtn.click(function(){
    getWeatherApi()
})
prevSearch.on('click', 'button', function(){
    searchRequest.val(this.textContent)
    getWeatherApi()
    return searchRequest
})

retrieveAndAppendData();