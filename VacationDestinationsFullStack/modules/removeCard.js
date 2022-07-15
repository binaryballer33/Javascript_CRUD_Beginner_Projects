  /**
   * this function removes the card objects from the dom after first removing it from the database
   */
export default function removeCard(event){
    const card = event.target.parentElement.parentElement.parentElement;
    const cardId = event.target.parentElement.parentElement.parentElement.id;
    const destinationName = event.target.parentElement.parentElement.children[0].innerText;

    fetch("http://localhost:3000/destinations", {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id: cardId,
          destinationName: destinationName
        })
      })
    .then((response) => {
      card.remove();
      return response.json;
    })
    .catch((error) => console.error(error))
}