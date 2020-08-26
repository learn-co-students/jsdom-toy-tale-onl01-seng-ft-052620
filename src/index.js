let addToy = false;
let toyCollection = document.getElementById('toy-collection')

const submitButton = document.getElementsByClassName("submit")[0]




function getToyInfo(){
fetch("http://localhost:3000/toys")
.then(function(response) {
  return response.json();
})
.then(function(json){
  json.forEach(toy => deployToyInfo(toy))
})
}

function deployToyInfo(toy){
let toyDiv = document.createElement('div')
  toyDiv.className = "card"
let toyName = document.createElement('h2')
  toyName.innerText = toy["name"]
let toyImg = document.createElement('img')
  toyImg.className = "toy-avatar"
  toyImg.src = toy["image"]
let toyLikes = document.createElement('p')
  toyLikes.innerText = toy["likes"]
let likesBttn = document.createElement('button')
  likesBttn.className = "like-btn"
  likesBttn.innerText = "Like <3"
  likesBttn.addEventListener("click", (event) => {
    // let noOfLikes = event.target.parentNode.children[2]
    // let likesNumber= parseInt(noOfLikes.innerText)
    // toyLikes.innerText = likesNumber+=1
    
    likes(toy, event)
  })
toyDiv.appendChild(toyName)
toyDiv.appendChild(toyImg)
toyDiv.appendChild(toyLikes)
toyDiv.appendChild(likesBttn)
toyCollection.appendChild(toyDiv)
}



function submitToy(name, image, likes){

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
       } )
   } )
   .then(function(response) {
       return response.json();
   } )
   .then( function ( object ) {
       console.log(object);
       deployToyInfo(object);
   } )
   .catch( function ( error ) {
       document.body.innerHTML = error.message
     } )

}


submitButton.addEventListener("click", function(event){
  let toyName = event.target.parentNode.children[1].value;
  let toyImg = event.target.parentNode.children[3].value;
submitToy(toyName, toyImg, 0)
toyName.value = ""
toyImg.value = ""
event.preventDefault();
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


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getToyInfo();
  addBtn.addEventListener("click", () => {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
