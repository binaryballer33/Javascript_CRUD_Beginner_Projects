import createCard from "../modules/createCard.js";
import removeCard from "../modules/removeCard.js";
import editCard from "../modules/editCard.js";
import getWeather from "../modules/getWeather.js";

/**
 * this script is being loaded by the index.html file and when it is loaded it calls the getWeather function 
 * along with making a HTTP GET Request to the database to populate the page with cards from the database
 * also estblishes a event listener that when click can POST new cards to the page.
 */
const addToListButton = document.querySelector(".btn");
addToListButton.addEventListener("click", createCard);
getWeather();
window.onload = async () => {
    // mainContainer & form user input constants
    const myWishListContainerDiv = document.querySelector("#destinations_container");

    //when the windows loads I want to do a HTTP Get Request to the server which
    // will return whats in my database as a array of data
    fetch("http://localhost:3000/destinations")
    .then((response) => response.json())
    .then((data) => {
        for(let card of data.response) {
            // change the value of this tag
            let enterDestinationDetails = document.querySelector("#title");
            enterDestinationDetails.innerText = "My WishList";
        
            // create the main div for the dynamically create vacation div's
            let vacationDiv = document.createElement("div");
            vacationDiv.classList.add("card");
            vacationDiv.style.width = "15rem";
            vacationDiv.style.height = "fit-content";
        
            // create the img tag inside of the vacationDiv
            let img = document.createElement("img");
            img.classList.add("card-img-top", "img-fluid");
            img.style.height = "150px";
        
            // create the card body, then create it's child tags
            let cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card-body");
            // h5 tag
            let cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
        
            // h6 tag
            let cardSubTitle = document.createElement("h6");
            cardSubTitle.classList.add("card-subtitle", "mb-2", "text-muted");
        
            // div tag
            let buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("buttons_container");
        
            // edit the div you click "edit" on
            let editButton = document.createElement("button");
            editButton.classList.add("btn", "btn-warning");
            editButton.innerText = "Edit";
            // this will allow you to edit the values of vacationDiv
            editButton.addEventListener("click", editCard);
        
            // remove the div you click "remove" on
            let removeButton = document.createElement("button");
            removeButton.classList.add("btn", "btn-danger");
            removeButton.innerText = "Remove";
            removeButton.addEventListener("click", removeCard);

            let seeMoreLink = document.createElement("p");
            seeMoreLink.classList.add("card-text");
            seeMoreLink.innerText = "Click Me to See More";
            seeMoreLink.addEventListener("click", (event) => {
            window.open("/VacationDestinationsFullStack/layouts/cardBodyDiv.html", "_blank");
            localStorage.setItem("card", vacationDiv.outerHTML);
            });

            // append everything to it's place
            cardTitle.innerText = card.destinationName;
            cardBodyDiv.appendChild(cardTitle);
            cardSubTitle.innerText = card.destinationLocation;
            cardBodyDiv.appendChild(cardSubTitle);
            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(removeButton);
            cardBodyDiv.appendChild(buttonsContainer);
            cardBodyDiv.appendChild(seeMoreLink);
            img.setAttribute("src", card.imageUrl)
            vacationDiv.setAttribute("id", card._id)
            vacationDiv.appendChild(img);
            vacationDiv.appendChild(cardBodyDiv);
            myWishListContainerDiv.appendChild(vacationDiv); 
        }
    })
}