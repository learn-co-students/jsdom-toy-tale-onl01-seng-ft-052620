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
  fetchToys();
});

const submitButton = document.getElementsByClassName("submit")[0]
const container = () => document.querySelector(".container")
const form = () => document.querySelector(".add-toy-form")
const h2 = document.createElement("h2")
function fetchToys (){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => renderToys(toys));
}
function renderToys(toys){
  const collection = document.getElementById("toy-collection")
  toys.forEach(toy => {
    const card = document.createElement("div")
        card.className = "card" 
    const h2 = document.createElement("h2")
        h2.innerText = toy["name"] 
    const img = document.createElement("img")
        img.className = "toy-avatar"
        img.src = toy['image'] 
    const p = document.createElement("p")
        p.innerText = toy['likes']
    const btn = document.createElement("button")
        btn.className = "like-btn"
        btn.innerHTML = "like <3"
        btn.addEventListener("click", (e) => {
          likes(toy, e)
        })
        card.appendChild(h2)
        card.appendChild(img)
        card.appendChild(p)
        card.appendChild(btn)
        collection.appendChild(card)
  })
}

function submitToy(name,image,likes){
  return fetch("http://localhost:3000/toys",{
    method:'POST',
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  body: JSON.stringify({
    name,
    image,
    likes
  })
})
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
    renderToys(object);
  })
  .catch(function(error) {
      document.body.innerHTML = (error.message)
    });
  }
submitButton.addEventListener("click", function(e){
  let toyName = e.target.parentNode.children[1].value;
  let toyImg = e.target.parentNode.children[3].value;
  submitToy(toyName, toyImg, 0)
  toyName.value = ""
  toyImg.value = ""
  e.preventDefault();
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
    .then((like_obj => {
      event.target.previousElementSibling.innerText = `${increase}`;
    }))
}





