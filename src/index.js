let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitToy = document.querySelector('input[name="submit"]');
  const toysDisplay = document.querySelector('#toy-collection');
  fetchToys();
  
  function fetchToys(){
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(json => displayToys(json));
  }

  function displayToy(toy){
    const toyDisplay = document.createElement('div');
    toyDisplay.className = "card";
    toyDisplay.id = `toy-${toy.id}`
    toyDisplay.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} Likes</p>
    `;
    likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.textContent = 'Like <3';
    toyDisplay.appendChild(likeBtn);
    toysDisplay.prepend(toyDisplay);
    likeBtn.addEventListener('click', ()=> postLikes(toy.likes + 1, toy.id));
  }

  function displayToys(toys){
    for (const toy of toys){
      displayToy(toy);
    }
  }

  function postLikes(numLikes, toyId){
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: numLikes})
    };
    
    fetch(`http://localhost:3000/toys/${toyId}`, configObj)
      .then(response => response.json())
      .then(json => displayNewLike(json))
      .catch(error => console.log(error.message));
  }

  function displayNewLike(toy){
    toyLikes = document.querySelector(`#toy-${toy.id} p`)
    toyLikes.textContent = `${toy.likes} Likes`;
  }
  
  function postNewToy(name, image){
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image
      })
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(json => displayToy(json))
      .catch((error) => console.log(error.message));
  }
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  submitToy.addEventListener('click', (e) => {
    e.preventDefault();
    const toyName = document.querySelector('input[name="name"]').value;
    const url = document.querySelector('input[name="image"]').value;
    postNewToy(toyName, url);
  });
});
