  // https://unsplash.com/documentation#search-photos
  
  /**
   * Reduces a sequence of names to initials.
   * @param  {String} endpoint the unsplash endpoint that you want to pull the random image from
   * @param  {HTML IMG ELEMENT} imgHtmlElement   A HTML IMG Tag Element that you want to change it's src attribute
   */
export default function getDestinationPic(endpoint, imgHtmlElement) {    
    fetch(endpoint)
    .then((response) => response.json())
    .then((jsonData) => {
        let randomNumber = Math.floor(Math.random() * jsonData.results.length);
        imgHtmlElement.setAttribute("src", jsonData.results[randomNumber].urls.thumb);
    })
    .catch((error) => {
        console.log("Error: " + error);
    })
}