let addToy = false;
const toy_collection = () => document.querySelector('div#toy-collection')
const inputName = () => document.querySelector('input[name="name"]')
const inputImage = () => document.querySelector('input[name="image"]')
let toys = []
let toy = null

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector("form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener("submit", addToyFromForm)
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => {
    toys = json
    console.log(json)
    displayToys(json)
  });
}

function addToyFromForm() {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${inputName().value}`,
      "image": `${inputImage().value}`,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(json => {
    debugger
    toys.push(json)
    console.log(json)
    displayToy(json)})
  .catch( error => {
    alert("Bad things! Ragnarők!");
    console.log(error.message);
  })
}

function displayToys(json) {
  for (const toy of json) {
    displayToy(toy);
  }
}

function displayToy(toy) {
  let card = document.createElement('div')
  card.className = "card"
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  img.className = "toy-avatar"
  let p = document.createElement('p')
  let button = document.createElement('button')
  button.className = "like-btn"
  h2.innerText = toy.name
  img.src = toy.image
  p.innerText = `${toy.likes} Likes`
  button.innerText = "Like <3"

  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)
  toy_collection().appendChild(card)
  button.addEventListener("click", addLikes)
}

function addLikes() {
  for (const element of toys) {
    if (element["name"] === this.parentNode.childNodes[0].textContent) {
      toy = element
    }
  }
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": `${++toy.likes}`
    })
  })
  .then(response => response.json())
  .then(json => {
    this.parentNode.childNodes[2].innerText = `${json.likes} Likes`
  })
}