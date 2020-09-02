let addToy = false;
let toyCollection = document.getElementById('toy-collection')

const submitButton = document.getElementById('new-toy-btn')

function getToyInfo() {
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    json.forEach(toy => enterToyInfo(toy))
  })
}

function enterToyInfo(toy) {
  let toyDiv = document.createElement('div')
    toyDiv.className = "card"
  let toyName = document.createElement('h2')
    toyName.innerText = toy["name"]
  let toyImg = document.createElement('img')
    toyImg.className = "toy-image"
    toyImg.src = toy["image"]
  let toyLikes = document.createElement('p')
    toyLikes.innerText = toy["likes"]
  let likesBttn = document.createElement('button')
    likesBttn.className = "like-bttn"
    likesBttn.innerText = "Like <3"
    likesBttn.addEventListener("Click", (event) => {
      likes(toy, event)
    })
  toyDiv.appendChild(toyName)
  toyDiv.appendChild(toyImg)
  toyDiv.appendChild(toyLikes)
  toyDiv.appendChild(likesBttn)
  toyCollection.appendChild(toyDiv)
}

function submitToy(name, image, likes) {
  
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      name,
      image,
      likes
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    console.log(object);
    enterToyInfo(object)
  })
  .catch(function(error) {
    document.body.innerHTML = error.message
  })
}

submitButton.addEventListener("click", function(event) {
  let toyName = document.querySelectorAll(".input-text")[1]
  let toyImg = document.querySelectorAll(".input-text")[2]
  submitToy(toyName, toyImg, 0)
  toyName.value = ""
  toyImg.value = ""
})

function likes(toy, event) {
  event.preventDefault()

  let increase = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": increase
    })
  })
  .then(response => response.json())
  .then((liked_obj => {
    event.target.previousElementSibling.innerText = `${increase}`
  }))
}


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToyInfo()
});
