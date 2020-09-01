let addToy = false;

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

  fetchToys()

  const toyForm = document.querySelector(".add-toy-form")

  toyForm.addEventListener("submit", function(e) {
    let formInput = toyForm.querySelectorAll("input")
    let formData = {likes:0}

    for(const input of formInput){
        formData[input.name] = input.value
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/toys", configObj)
      .then(resp => resp.json())
      .then(obj => console.log(obj))

    e.preventDefault()
  })

});

function fetchToys(){
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(function(obj){
      renderToys(obj)
    })
}

function renderToys(toys){
  const toyCollection = document.querySelector("#toy-collection")

  for(const toy of toys){
    const div = createToyDiv(toy)
    toyCollection.append(div)
  }
}

function createToyDiv(toy){
  const div = document.createElement("div")
  div.className = "card"

  // Add name
  const h2 = document.createElement("h2")
  h2.innerHTML = toy["name"]
  div.appendChild(h2)

  // Add img
  const img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"
  div.appendChild(img)

  // Add likes
  const p = document.createElement("p")
  p.innerHTML = toy.likes + " likes"
  div.appendChild(p)

  // Add like button
  const btn = document.createElement("button")
  btn.className = "like-btn"
  btn.innerHTML = "Like"
  btn.addEventListener("click", function(e){
    likeToy(toy)

    toy.likes += 1

    p.innerHTML = toy.likes + " likes"

    e.preventDefault()
  })

  div.appendChild(btn)

  return div
}

function likeToy(toy) {
  let body = {
    "likes": toy.likes+1
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }

  return fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
}
