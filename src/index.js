let addToy = false;
let id;
const requestUrl = 'http://localhost:3000/toys'
const patchUrl = () => 'http://localhost:3000/toys'
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

document.addEventListener('DOMContentLoaded', function(e){
    fetchAllToys()
})

function fetchAllToys(){
  fetch(requestUrl)
  .then(function(response){
    return response.json();
  }).then(function(json){
    buildYourToyCard(json)
  })
}

function buildYourToyCard(toys){
  for(const toy of toys){
    const createDiv = document.createElement('div')
    createDiv.className = 'card'
    const createToyName = document.createElement('h2')
    createToyName.innerHTML = toy['name']
    const transferToyImage = document.createElement('img')
    transferToyImage.src = toy['image']
    transferToyImage.className = 'toy-avatar'
    const likesAccumulated = document.createElement('p')
    likesAccumulated.innerHTML = `${toy['likes']} Likes`
    const buttonForLikes = document.createElement('button')
    buttonForLikes.className = 'like-btn'
    buttonForLikes.innerHTML = 'Like '
    createDiv.appendChild(createToyName)
    createDiv.appendChild(transferToyImage)
    createDiv.appendChild(likesAccumulated)
    createDiv.appendChild(buttonForLikes)
    const buildToyAvar = document.getElementById('toy-collection')
    buildToyAvar.appendChild(createDiv)
    buttonForLikes.addEventListener('click', function(e){
      id = toy['id']     
      updateLikes(id)
    })
  }
}
const getSubmit = document.querySelector('input[name="submit"]')
getSubmit.addEventListener('click', function(e){
  submitNewToy()
  e.preventDefault
})
function submitNewToy(){
  const newToyName = document.querySelector('input[name="name"]').value
  const newToyImage = document.querySelector('input[name="image"]').value

  createNewToy(newToyName, newToyImage)
}


function createNewToy(toyName, toyImage){
  const configurationObj = {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: '0'
    })
  }
  fetch(requestUrl, configurationObj)
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    console.log(object)
  })
}

//find toy id
function findName(inputName){
  for(const name in id){
    console.log(name)
    inputName
  }
}

// increase toy likes
function updateLikes(id, currentLikeCount){
  const patchConfigurationObj = {
    method: 'Patch',
    // mode: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": `${patchUrl()}/${id}`
    },
    body: JSON.stringify({
      "likes": updtateCurrentLikeCount(currentLikeCount)
    })
  }
  fetch(`${patchUrl()}/${id}`, patchConfigurationObj)
  .then(function(response){
    return response.json();
  }).then(function(object){
    console.log(object);
  })

}
function updtateCurrentLikeCount(number){
  number++;
  return number;
}