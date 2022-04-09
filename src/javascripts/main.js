// Required by Webpack - do not touch
require.context('../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import 'bootstrap'

// creating a variable for default cards
let initial_cards = [
    {
        place: "Salt Lake City, Utah",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas atque itaque quod facere vel nostrum, quae illo alias consequatur voluptatem. Laboriosam quod possimus nulla sequi dolorem expedita aut voluptatibus asperiores!",
        poster: "https://images.unsplash.com/photo-1597778602022-f2d97b8c1493?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80"
    }, {
        place: "Ancient Cathedral, Salt Lake City, Utah",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dignissimos fugiat aperiam, doloribus eius deleniti dicta labore repellendus, eaque odit ut nam? Id autem est voluptatem, dicta dolores voluptates nisi.",
        poster: "https://images.unsplash.com/photo-1603937372023-251acb738be8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80"
    }
]


localStorage.setItem('card',JSON.stringify(initial_cards))
// creating a fucntion
function hideForm(){
  document.querySelector('#myForm').classList.add('d-none');
  document.querySelector('#cards').classList.remove('d-none');
}
function hideCards(){
  document.querySelector('#myForm').classList.remove('d-none');
  document.querySelector('#cards').classList.add('d-none');
}
function getCards(){
  // creating a conditionals
 if(localStorage.getItem('card')!='[]'){
   return JSON.parse(localStorage.getItem('card'));
 }
 else{
   return initial_cards;
 }

}
// creating a function for documents
function addNewCard(event){
  event.preventDefault();
  let t=document.querySelector('#place').value
  let d=document.querySelector('#description').value
  let p=document.querySelector('#poster').value
  let cards=getCards();
  // creating a conditionals
  if(t && d &&p){
    let card={place :t,description:d,poster:p}
    cards.push(card);
    localStorage.setItem('card',JSON.stringify(cards))
  }
  this.reset();
  DisplayCards();
}
// creating a funciton
function DisplayCards() {
    let cards = getCards();
    let cards_html = ''
    let ndx = 0;
    // using for loop
    for (let c of cards) {
        cards_html += `
 <div class="card col mb-3" data-ndx="${ndx}">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${c.poster}" class="img-fluid rounded-start" alt="${c.place}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${c.place}</h5>
        <p class="card-text">${c.description}</p>
        <p class="card-text">
            <button class ="btn btn-danger to-delete">Delete</button>
        </p>
      </div>
    </div>
  </div>
</div>
          `
        ndx++;
    }
    document.querySelector("#cards").innerHTML = cards_html;
    document.querySelectorAll(".to-delete").forEach(function(btn){
      btn.onclick=function(event){
        if(confirm("Are u sure?")){
          cards.splice(event.target.closest('.col').dataset.ndx,1);
          localStorage.setItem('card',JSON.stringify(cards));
          DisplayCards();
        }
      }
    })
    hideForm();
}
document.querySelector("#myForm").onsubmit=addNewCard
document.querySelector("#new_card").onclick=hideCards
document.querySelector(".to-cancel").onclick=hideForm

// calling a function below.
DisplayCards()