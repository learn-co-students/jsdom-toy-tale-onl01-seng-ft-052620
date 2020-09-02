
let addToy = false;
let toyCollection = document.querySelector('#toy-collection')

// fetch function defined
function fetchToyObj() {
  fetch("http://localhost:3000/toys")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json){
      json.forEach(toy => renderToyObj(toy))
    })
;}
//add toy info to card. 
function renderToyObj(toy) {
  let div = document.createElement('div')
    div.className = "card"
  let h2 = document.createElement('h2')
    h2.innerText = toy["name"]
  let img = document.createElement('img')
    img.className = "toy-avatar"
    img.src = toy["image"]
  let likes = document.createElement('p')
    likes.innerText = toy["likes"] + " Likes";
  let likeBtn = document.createElement('button')
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like <3"
    likeBtn.addEventListener('click', (e) => {
      likes(toy, e)
    })
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(likes)
    div.appendChild(likeBtn)
    toyCollection.appendChild(div)
}

// Fetch Andy's Toys call
document.addEventListener('DOMContentLoaded', function() {
  fetchToyObj()
})
// code below added by learn.co 

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
});
