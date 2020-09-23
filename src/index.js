let addToy = false;
const mainDiv = () => document.getElementById('toy-collection')
const submit = () => document.querySelector('input.submit')
const name = () => document.querySelector('input.input-text')
const imgURL = () => document.querySelector('input.input-text').nextElementSibling.nextElementSibling

submit().addEventListener('click', function(e){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json"
    },
    
    body: JSON.stringify({
      "name": name().value,
      "image": imgURL.value,
      "likes": 0
    })
  })
    .then(resp => resp.json())
    .then(toy => {
      console.log(toy)
      name().value = ""
      imgURL().value = ""
    })
})
const createEl = () => {
  let card  = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement("img")
  let p = document.createElement("p")
  let button = document.createElement("button")
  card.className = 'card'
  img.className = 'toy-avatar'
  button.className = 'like-btn'
  button.innerHTML = 'Like <3'

  return [card, h2, img, p, button]
}

const buttonEvent = () => button.addEventListener('click', function(e){
  e.preventDefault()
  fetch('http://localhost:3000/toys/' + button.id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      
      body: JSON.stringify({
        'likes': parseInt(p.innerHTML) + 1
      })
  })
    .then(resp => resp.json())
    .then(toy => {
      p.innerHTML = toy.likes
      console.log(toy.likes)
    })

})
  
const getAllToys = function(){

    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(toys => {
        console.log(toys)
        toys.forEach(toy => {
          [card, h2, img, p, button] = createEl()
          h2.innerHTML = toy.name
          img.src = toy.image
          p.innerHTML = toy.likes + " Likes "
          button.id = toy.id
          mainDiv().append(card)
          card.append(h2,img,p,button)
          buttonEvent()
        })
      })    
}

document.addEventListener("DOMContentLoaded", () => {
  getAllToys()
  
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
