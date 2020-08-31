let addToy = false;
const toys_path = "http://localhost:3000/toys"
const toy_name_field = document.getElementById('toy-name')
const toy_image_field = document.getElementById('toy-image')
const toy_collection = document.getElementById('toy-collection')

function getToys(){
fetch(toys_path)
.then(resp => resp.json())
.then(json => renderToys(json))
}


function renderToys(toys){

toys.forEach((toy, i) => {

  const card = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const but = document.createElement('BUTTON')
  but.class = "like-btn"
  but.innerText = "Like <3"
  but.id = i + 1
  card.class = "card"
  h2.textContent = toy["name"]
  p.textContent = `${toy["likes"]} likes`
  p.id = `p${i + 1}`
  img.src = toy["image"]
  img.class = "toy-avatar"
  toy_collection.appendChild(card)
  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(but)

});
listen_to_like_buttons()
}


function listen_to_like_buttons(){
  let buttons = document.querySelectorAll('BUTTON', 'div')
  buttons.forEach((btn, i) => {
    if(btn.id.length < 3){
      btn.addEventListener("click", function(event){
        let p = document.getElementById(`p${event.target.id}`)
        let likes = parseInt(p.innerText, 10)
        p.innerText = `${likes += 1} likes`
        let config = {
          method: 'PATCH',
          headers:
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          body: JSON.stringify({
              "likes": `${likes}`
            })
        };
        fetch(`http://localhost:3000/toys/${event.target.id}`, config)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          console.log(object);
        });
      })
    }
  });
}




document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the for
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      getToys()
    } else {
      toyFormContainer.style.display = "none";
    }

  });
});
