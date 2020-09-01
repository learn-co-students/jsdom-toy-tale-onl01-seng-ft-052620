let addToy = false;
const constUrl = 'http://localhost:3000'
const cardCollection = document.getElementById('toy-collection')
const inputToyName = document.getElementById('name')
const inputToyImage = document.getElementById('image')
const newToySubButton = document.getElementById('submit')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetchToys()
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

function fetchToys() {
  return fetch(constUrl + '/toys') 
  .then(resp => resp.json())
  .then(json => addToyToTheCard(json))
}

function addToyToTheCard(toys) {
  for (toy of toys) {
    createCard(toy)
}
}

function createCard(toy) {
  let addDiv = document.createElement('div')
  let addDivH1 = document.createElement('h2')
  let addDivP = document.createElement('p')
  let addDivImg = document.createElement('img')
  let adddivButton = document.createElement('button')
  cardCollection.appendChild(addDiv)
  addDiv.className = 'card'
  addDiv.appendChild(addDivH1)
  addDiv.appendChild(addDivImg)
  addDiv.appendChild(addDivP)
  addDiv.appendChild(adddivButton)
  addDivH1.innerText = toy.name 
  addDivImg.src = toy.image
  addDivImg.className = 'toy-avatar'
  addDivP.innerText = toy.likes
  adddivButton.className = 'like-btn'
  adddivButton.innerText = "Like"
  adddivButton.addEventListener('click', function(e){
    addDivP.innerText++
    patchRequest(toy, addDivP)
    e.preventDefault()
 })
}

function patchRequest(toy, addDivP){

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
   likes: addDivP.innerText
  })
} 
fetch(constUrl + `/toys/${toy.id}`, configObj)
.then(resp => resp.json())
.then(data => { console.log('Success:', data) })
.catch((error) => {
  console.error('Error:', error);
});

}



submit.addEventListener('click', function(e){
  postRequest()
  e.preventDefault()
})

function postRequest(){
let  formData = {
  name: inputToyName.value,
  image: inputToyImage.value,
  likes: 0
}
let configObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
}

fetch(constUrl + '/toys', configObj)
.then( function ( response ) {
  return response.json()
} )
.then( function ( object ) {
console.log(object)
createCard(object)
} )
.catch( function ( error ) {
  document.body.innerHTML = error.message
} )

}


 