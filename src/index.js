let addToy = false;
const toyCollectionDiv = document.querySelector('#toy-collection')
const toyFormSubmit = document.querySelector('body > div.container > form > input.submit')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  catchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormSubmit.addEventListener('click', submitToy);
});




function submitToy(e) {
  e.preventDefault();
  
  const toyFormName = document.querySelector('body > div.container > form > input:nth-child(2)').value
  const toyFormImgUrl = document.querySelector('body > div.container > form > input:nth-child(4)').value
  
  const configObj = {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData(toyFormName, toyFormImgUrl)) 
  };
  
  fetch('http://localhost:3000/toys', configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object){
    const toyCard = document.createElement('div')
    const toyCardH2 = document.createElement('h2')
    const toyCardImage = document.createElement('IMG')
    const toyCardP = document.createElement('p')
    const toyCardButton = document.createElement('BUTTON')
    
    toyCard.classList.add('card')
    toyCardH2.innerText = object.name
    toyCardImage.src = object.image
    toyCardImage.classList.add('toy-avatar')
    toyCardP.innerText = object.likes
    toyCardButton.classList.add('like-btn')
    
    toyCollectionDiv.appendChild(toyCard)
    toyCard.appendChild(toyCardH2)
    toyCard.appendChild(toyCardImage)
    toyCard.appendChild(toyCardP)
    toyCard.appendChild(toyCardButton)
    toyFormContainer.style.display = "none";
  })
}

function formData(toyName, toyImgUrl) {
  return {
    name: toyName,
    image: toyImgUrl,
    likes: 0
  }
}

async function catchToys() {
  const response = await fetch('http://localhost:3000/toys');
  const json = await response.json();
  createToyCard(json)
}


function createToyCard(toys) {
  
  toys.forEach(toy => { 
    const toyCard = document.createElement('div')
    const toyCardH2 = document.createElement('h2')
    const toyCardImage = document.createElement('IMG')
    const toyCardP = document.createElement('p')
    const toyCardButton = document.createElement('BUTTON')
    
    toyCard.classList.add('card')
    toyCard.id = toy.id
    toyCardH2.innerText = toy.name
    toyCardImage.src = toy.image
    toyCardImage.classList.add('toy-avatar')
    toyCardP.innerText = toy.likes
    toyCardButton.classList.add('like-btn')
    
    toyCollectionDiv.appendChild(toyCard)
    toyCard.appendChild(toyCardH2)
    toyCard.appendChild(toyCardImage)
    toyCard.appendChild(toyCardP)
    toyCard.appendChild(toyCardButton)
    
    toyCardButton.addEventListener('click', () => {
      toyCardP.innerText = parseInt(toyCardP.innerText) + 1
      updateLikes(toyCardP.innerText, toyCard.id)
      

     
    })
    
    function updateLikes(cardLikes, id) {
      
      const configUpdateLikes = {
        method: "Patch",
        headers: {
          "Content-Type": "application/json",
         'Accept': "application/json"
         
        },
        body: JSON.stringify(updateLikesData(cardLikes)) 
      };
     
      fetch(`http://localhost:3000/toys/${parseInt(id)}`, configUpdateLikes)
    }
    
    function updateLikesData(CardLikes) {
      return { "likes": CardLikes
      }
    }
    
  });
}

