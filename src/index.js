let addToy = false;
let divToyCollection = document.querySelector('#toy-collection');


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
        event.target[0].value = ""
        event.target[1].value = ""
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys(){
  return fetch('http://localhost:3000/toys')
    .then(resp =>resp.json())
    .then(toys => {
      toys.forEach(toy => {
        renderToy(toy);
      })
    });
}

function renderToy(toy) {
   let h2 = document.createElement('h2')
   h2.innerText = toy.name

   let img = document.createElement('img')
   img.setAttribute('src', toy.image)
   img.setAttribute('class', 'toy-avatar')

   let p = document.createElement('p')
   p.innerText = `${toy.likes} likes`

   let likeButton = document.createElement('button')
   likeButton.setAttribute('class', 'like-btn')
   likeButton.setAttribute('is', toy.id)
   likeButton.innerText = "Like"
   
   let divCard = document.createElement('div')
   divCard.setAttribute('class', 'card')
   divCard.append(h2, img, p, likeButton)
   divToyCollection.append(divCard)
}

function postToy(inputs) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": inputs.name.value, 
      "image": inputs.image.value, 
      "likes": 0
    })
  })
  .then ( resp => resp.json() )
  .then ( (obj_toy) => {
    console.log(obj_toy)
    renderToy(obj_toy)
  })
}