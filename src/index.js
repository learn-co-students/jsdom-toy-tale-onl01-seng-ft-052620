let addToy = false;
const baseUrl = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection");
const form = document.querySelector('.add-toy-form');

document.addEventListener("DOMContentLoaded", () => {
  fetch(baseUrl)
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
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
  form.addEventListener("submit", function(e){
    let formData = {likes:0}
    let inputs = document.querySelectorAll('input');
    for(input of inputs){
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
    createToy(configObj);
    addToy = false;
    toyFormContainer.style.display = "none";
    e.preventDefault();
  })
});

function renderToys(toys){
  for(toy of toys){
    renderCard(toy);
  }
};

function renderCard(toy){
  const card = document.createElement("div.card");
  card.classList = "card";
  h2 = document.createElement("h2");
  h2.innerText = toy["name"];
  const img = document.createElement("img");
  img.src = toy["image"];
  img.classList = "toy-avatar";
  p = document.createElement('p');
  p.innerText = toy["likes"] + " Likes";
  btn = document.createElement('button');
  btn.innerText = "Like <3";
  btn.classList = "like-btn";
  btn.addEventListener("click", (e) => {
    addLike(toy);
  })
  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(btn);
  toyCollection.appendChild(card);
}

function createToy(configObj){
  fetch(baseUrl, configObj)
  .then(resp => resp.json())
  .then(toy => renderCard(toy))
  .catch(error => console.log(error.message))
}

function addLike(toy){
  const id = toy.id;
  const likes = toy.likes + 1;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  }
  fetch(baseUrl + `/${id}`, configObj)
  .then(resp => resp.json())
  .then(reRender())
  .catch(error => console.log(error.message));
}

function reRender(){
  toyCollection.innerHTML = "";
  fetch(baseUrl)
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
  .catch(error => console.log(error.message));
}


