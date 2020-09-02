
let addToy = false;
let toyCollection = document.querySelector('#toy-collection')

const submitButton = document.getElementsByClassName("submit")[0]

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
      addLikes(toy, e)
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


// add new toy section
function addNewToy(name, image, likes){

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
  .then(function(resp) {
       return resp.json();
  } )
  .then( function ( object ) {
       console.log(object);
       renderToyObj(object);
  })
  .catch( function ( error ) {
       document.body.innerHTML = error.message
  })

}
//submitting action for new toy
submitButton.addEventListener('click', function(e){
    let tName = e.target.parentNode.children[1].value; 
    let tImg = e.target.parentNode.children[2].value;
  addNewToy(tName, tImg, 0)
  tName.value = ""
  tImg.value = ""
  e.preventDefault();
})

//increase toy likes
function addLikes(toy, e) {
  e.preventDefault()

  let increaseLikes = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "likes": increaseLikes
    })
  })
  .then(resp => resp.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${increaseLikes} Likes`;
  }))
}


// code below added by learn.co 

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // fetchToyObj();
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
