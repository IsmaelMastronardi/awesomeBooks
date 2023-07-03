const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addBtn = document.querySelector('#addButton');
const booksDiv = document.querySelector('#booksDiv');
let books;

if(localStorage.getItem('books')!= null){
  books = JSON.parse(localStorage.getItem('books'))
}else {
  books = [{
    title : "Stormligth Archive",
    author : "Brandon Sanderson"
  }]
}



function book(title, author){
  this.title = title;
  this.author = author;
}

function createBook(){
  let newBook = new book(titleInput.value,authorInput.value);
  books.push(newBook);
  display(newBook);
  titleInput.value = "";
  authorInput.value = "";
  updateStorage();
}
function display(obj){
  let aBook = document.createElement('div');
  aBook.id = "a"+Date.now();
  let aBookId = aBook.id;
  let buttonId = "a"+Date.now();
  aBook.innerHTML = `
  <p>${obj.title}</p>
  <p>${obj.author}</p>
  <button id="${buttonId}">Remove</button>
  `;
  booksDiv.appendChild(aBook);
  let removeBtn = document.querySelector('#'+buttonId);
  removeBtn.addEventListener('click',(evt) =>{evt.stopPropagation();removeBook(aBookId,obj);} );
}
function removeBook(bookId,obj){
  books.splice(books.indexOf(obj),1)
  const bookToRemove = document.querySelector('#'+bookId)
  booksDiv.removeChild(bookToRemove);
  updateStorage();
}
function updateStorage(){
  localStorage.setItem('books', JSON.stringify(books));
}
window.onload = books.forEach(display)
addBtn.addEventListener('click',createBook);
