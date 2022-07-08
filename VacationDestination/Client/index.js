import createCard from "../modules/createCard.js";
import getWeather from "../modules/getWeather.js";

const addToListButton = document.querySelector(".btn");
addToListButton.addEventListener("click", createCard);
getWeather();