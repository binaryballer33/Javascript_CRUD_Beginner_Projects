import API_KEY from "../ApiKeys/unsplashKey.js";
import getDestionationPic from "./getDestinationPic.js";


export default async function editCard(event) {
    const cardTitle = event.target.parentElement.parentElement.children[0];
    let newName = prompt("Enter new name");

    const cardSubTitle = event.target.parentElement.parentElement.children[1];
    let newLocation = prompt("Enter new location");

    // const destinationName = document.querySelector("#name");
    const img = event.target.parentElement.parentElement.parentElement.children[0];
    let endpoint = `https://api.unsplash.com/search/photos?query=${newName}&client_id=${API_KEY}`;
    const imageUrl = await getDestionationPic(endpoint);
    const id = event.target.parentElement.parentElement.parentElement.getAttribute("id");

    fetch("http://localhost:3000/destinations", {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          destinationName: newName,
          destinationLocation: newLocation,
          imageUrl: imageUrl,
        })
      })
      .then(() => {
        cardTitle.innerText = newName;
        cardSubTitle.innerText = newLocation;
        img.setAttribute("src", imageUrl)
      })
}