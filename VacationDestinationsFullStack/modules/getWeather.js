import OPEN_WEATHER_API_KEY from "../ApiKeys/openWeatherKey.js";

/**
 * this function gets your current location and using the lattitude and longitude it returns the weather
 */
export default function getWeather() {
    window.addEventListener("load", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                let endpoint = 
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

                fetch(endpoint)
                .then((response) => response.json())
                .then((weatherData) => {
                    let temp = weatherData.main.temp;
                    const weatherH2Tag = document.querySelector("#weather");
                    weatherH2Tag.innerText = `Weather ${temp}ºF`;
                    return temp;
                })
                .catch((errors) => {
                    console.log(errors);
                })
            });
        }
    });
}