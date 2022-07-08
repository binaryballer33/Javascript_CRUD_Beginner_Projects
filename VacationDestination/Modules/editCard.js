import API_KEY from "../ApiKeys/unsplashKey.js";
import getDestionationPic from "./getDestinationPic.js";


export default function editCard(event) {
    const cardTitle = event.target.parentElement.parentElement.children[0];
    let newName = prompt("Enter new name");
    cardTitle.innerText = newName;

    const cardSubTitle = event.target.parentElement.parentElement.children[1];
    let newLocation = prompt("Enter new location");
    cardSubTitle.innerText = newLocation;

    // const destinationName = document.querySelector("#name");
    const img = event.target.parentElement.parentElement.parentElement.children[0];
    let endpoint = `https://api.unsplash.com/search/photos?query=${newName}&client_id=${API_KEY}`;
    getDestionationPic(endpoint, img);
}