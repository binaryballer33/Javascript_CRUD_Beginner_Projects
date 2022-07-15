const update = document.querySelector("#update-button");
update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Shaquille Mandy',
            quote: 'Pain is weakness leaving the body'
        })
    })
    .then((res) => {
        if (res.ok) return res.json()
    })
    .then((response) => {
        window.location.reload(true)
    })
})

const messageDiv = document.querySelector('#message');
const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Shaquille Mandy',
        })
    })
    .then((res) => {
        if (res.ok) return res.json()
    })
    .then((response) => {
        if (response === "No quote to delete") {
            messageDiv.textContent = "No more Shaquille Mandy quote's to delete"
        } else {
            window.location.reload(true);
        }
    })
    .catch((error) => console.error(error))
})
