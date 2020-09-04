let addToy = false;
let toyContainer = () => document.querySelector("#toy-collection")
let submitBtn = () => document.querySelector("input.submit")

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

});

function submitToys(){

  submitBtn().addEventListener("click", function(e){
    e.preventDefault()

    
    function displayNewToy(){
      fetch("http://localhost:3000/toys", configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(object){
        console.log(object)
      })
    }

    displayNewToy()
  });
  
}

let configObj = {
  method: "POST", 
  headers: {
    "Content-Type": "application/json", 
    "Accept": "application/json"
  }, 
  body: JSON.stringify({
    name: "name",
    image: "image"
  })
}









/////////////////FETCHING AND DISPLAYING TOYS//////////////////////
function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => toyCards(json))

}

function toyCards(toys){
  for( const toy of toys){

  let card = document.createElement('div')
  card.classList.add("card")
  toyContainer().appendChild(card)
  
  let img = document.createElement('img')
  img.src = toy.image
  img.classList.add("toy-avatar")
  card.appendChild(img)
  
  let toyheader = document.createElement('h2')
  toyheader.textContent = toy.name
  card.appendChild(toyheader)
  
  let button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "Like"
  card.appendChild(button)

  let p = document.createElement("p")
  p.textContent = "This cutie has " + toy.likes + " likes"
  card.appendChild(p)
  }
}


