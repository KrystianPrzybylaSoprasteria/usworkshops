const apiKey = "1fcc02e7ff3943bfb6c95358221012";
addEventListeners();

async function makeHttpQuery(url) {
    const response = await fetch(url)
        .then((response) => response.json())
        .then((data) => data);

    return response;
}

async function getWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const data = await makeHttpQuery(url);

    return translateApiData(data);
}

function translateApiData(data) {
    const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        image: "https:" + data.current.condition.icon,
    }
    console.log(weatherData.image);

    return weatherData;
}

function selectedItem() {
    const select = document.getElementById("id_location");
    let selectedText = select.options[select.selectedIndex].value;

    return selectedText;
}

async function updateWeatherInfo() {
    const data = await getWeatherData(selectedItem());
    const weatherCountry = document.getElementById("weather_location");
    const weatherTemperature = document.getElementById("weather_temperature");
    const weatherImage = document.getElementById("weather_img");
    
    weatherImage.src = data.image;
    weatherCountry.innerText = `${data.city}, ${data.country}`;
    weatherTemperature.innerText = `${data.temperature}`;
    
    showWeatherInfo();
}

function showWeatherInfo(){
    const weatherInfo = document.getElementById("id_weather_info");
    weatherInfo.className = "";
}

function addEventListeners() {
    const button = document.getElementById("id_weather");
    button.addEventListener("click", async () => await updateWeatherInfo());
}
