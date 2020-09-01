let addToy = false;

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  // .then(json => console.log(json))
  .then(json => showToys(json));
}

function showToys(toys) {
  toys.forEach(toy => {
    renderToy(toy)
  })
}

function renderToy(toy) {
  const collection = document.getElementById('toy-collection')
  const newDiv = document.createElement('div')
  newDiv.className = "card";
  const newh2 = document.createElement('h2')
  newh2.innerHTML = toy.name
  const newImg = document.createElement('img')
  newImg.className = "toy-avatar";
  newImg.src = toy.image
  newImg.innerHTML = "Image Element Added."
  const newP = document.createElement('p')
  newP.innerHTML = toy.likes
  const newButton = document.createElement('button')
  newButton.className = "like-btn"
  newButton.innerHTML = "Like"
  newButton.addEventListener('click', function(event){
    updateLikes(toy)
    })
  newDiv.appendChild(newh2)
  newDiv.appendChild(newImg)
  newDiv.appendChild(newP)
  newDiv.appendChild(newButton)
  collection.appendChild(newDiv)
}

function updateLikes(toy) {
  const newId = toy.id
  const newLikes = (parseInt(toy.likes) + 1)
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  };

  fetch(`http://localhost:3000/toys/${newId}`, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
      console.log(object)
      const targetLikes = document.getElementsByTagName('p')[object.id]
      targetLikes.innerHTML = object.likes;
  })
  .catch(function(error) {
      alert("Bad things! Ragnarok!");
      document.body.innerHTML = error.message;
  }) 
}

function submitData(toyName, toyImg) {

  let formData = {
    name: toyName,
    image: toyImg,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      renderToy(object)
    })
    .catch(function(error) {
      alert("Bad things!");
      console.log(error.message)
    })
}

document.addEventListener("DOMContentLoaded", () => {
  
  fetchToys()
  

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const submit = document.getElementsByClassName('submit')[0]
      submit.addEventListener("click", () => {
        toyName = document.getElementsByTagName('input')[0].value
        toyImg = document.getElementsByTagName('input')[1].value
        submitData(toyName, toyImg)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});
