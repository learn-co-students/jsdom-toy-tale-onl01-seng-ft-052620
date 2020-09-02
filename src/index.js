let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById("toy-collection");
const toyForm = document.querySelector("form");
const toyInputs = document.querySelectorAll('input.input-text')

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(result => {
      result.forEach(toy => toyCard(toy))
      })
    .catch((error) => console.log(error.message));
}

function addToys(event) {
  event.preventDefault();

  const toyData = {
    name: toyInputs[0].value,
    image: toyInputs[1].value,
    likes: 0 
  }

  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
      body: JSON.stringify(toyData)
  }
  fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(result => toyCard(result))
    .catch((error) => console.log(error.message));

  toyInputs[0].value = "";
  toyInputs[1].value = "";
}

function toyCard(toy) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  let toyName = document.createElement("h2")
  let cardImage = document.createElement("img");
  cardImage.setAttribute("class", "toy-avatar")
  let likes = document.createElement("p");
  let likeButton = document.createElement("button")
  likeButton.setAttribute("class", "like-btn")
  likeButton.textContent = "like"
  likeButton.addEventListener("click", event => {
    likeToy(event, toy)
  })

  toyName.textContent = `${toy.name}`;
  cardImage.src = `${toy.image}`;
  likes.textContent = (`${toy.likes} likes`)
  card.appendChild(toyName);
  card.appendChild(cardImage);
  card.appendChild(likes);
  card.appendChild(likeButton);
  toyCollection.appendChild(card);
}

function likeToy(event, toy) {
  event.preventDefault();

  let count = parseInt(event.target.previousElementSibling.innerText) + 1

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": count
        })
    }
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then(resp => resp.json())
    .then(result => event.target.previousElementSibling.innerText = `${count} likes`)
    .catch((error) => console.log(error.message));
    } 
         

  toyForm.addEventListener("submit", addToys)

document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys();
})