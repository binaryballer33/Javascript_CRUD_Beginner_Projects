  // https://unsplash.com/documentation#search-photos
  
  /**
   * Reduces a sequence of names to initials.
   * @param  {String} endpoint the unsplash endpoint that you want to pull the random image from
   */
export default async function getDestinationPic(endpoint) {    
    const imgUrl = await fetch(endpoint)
        .then((response) => response.json())
        .then((jsonData) => {
            let randomNumber = Math.floor(Math.random() * jsonData.results.length);
            return jsonData.results[randomNumber].urls.thumb;
        })
        .catch((error) => {
            console.log("Error: " + error);
        })
    return imgUrl;
}