export default function removeCard(event){
    const card = event.target.parentElement.parentElement.parentElement;
    card.remove();
}