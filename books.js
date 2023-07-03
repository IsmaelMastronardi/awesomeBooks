const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addBtn = document.querySelector('#addButton');
const booksDiv = document.querySelector('#booksDiv');
let books;

if (localStorage.getItem('books') != null) {
  books = JSON.parse(localStorage.getItem('books'));
} else {
  books = [{
    title: 'Stormligth Archive',
    author: 'Brandon Sanderson',
  }];
}

function Book(title, author) {
  this.title = title;
  this.author = author;
}
function updateStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}
function removeBook(bookId, obj) {
  books.splice(books.indexOf(obj), 1);
  const bookToRemove = document.querySelector(`#${bookId}`);
  booksDiv.removeChild(bookToRemove);
  updateStorage();
}
function display(obj) {
  const oneBook = document.createElement('div');
  oneBook.id = `a${Date.now()}`;
  const bookId = oneBook.id;
  const buttonId = `a${Date.now()}`;
  oneBook.innerHTML = `
  <p>${obj.title}</p>
  <p>${obj.author}</p>
  <button id="${buttonId}">Remove</button>
  <div class="removeBtnBorder"></div>
  `;
  booksDiv.appendChild(oneBook);
  const removeBtn = document.querySelector(`#${buttonId}`);
  removeBtn.addEventListener('click', (evt) => { evt.stopPropagation(); removeBook(bookId, obj); });
}
function createBook() {
  const newBook = new Book(titleInput.value, authorInput.value);
  books.push(newBook);
  display(newBook);
  titleInput.value = '';
  authorInput.value = '';
  updateStorage();
}
window.onload = books.forEach(display);
addBtn.addEventListener('click', createBook);
