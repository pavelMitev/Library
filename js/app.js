const addBookButton = document.getElementById("addBookButton");
const closeFormButton = document.getElementById("closeFormButton");
const modal = document.getElementById("inputModal");
const submitButton = document.getElementById("submitButton");
const bookCard = document.getElementsByClassName("bookCard");
const overlay = document.getElementById("overlay");

let bookCounter = 0;
let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = bookCounter++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not Read");
const theBrothersKaramazov = new Book(
  "The Brothers Karamazov",
  "Fyodor Dostoyevsky",
  824,
  "Not Read"
);
const clashOfKings = new Book(
  "A Clash of Kings",
  "George R. R. Martin",
  761,
  "Read"
);
myLibrary.push(theHobbit, theBrothersKaramazov, clashOfKings);

addBookButton.addEventListener("click", function () {
  modal.style.display = "flex";
  overlay.style.display = "flex";
});
closeFormButton.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});

function addBookToLibrary(event) {
  event.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let radios = document.querySelectorAll(".radio");

  let read;
  for (const radio of radios) {
    if (radio.checked) {
      read = radio.value;
    }
  }

  let book = new Book(title, author, pages, read);
  myLibrary.push(book);

  console.log(JSON.stringify(myLibrary));
  for (const book of myLibrary) {
    console.log(book.info());
  }

  document.getElementById("bookForm").reset();
  showBooks();
}

function showBooks() {
  let bookCards = document.querySelector(".bookCards");
  bookCards.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    let li = document.createElement("li");
    li.setAttribute("data-book-index", i);
    li.innerHTML =
      '<div class="IndividualCard"><div class="titleAndAuthor"><h2>' +
      book.title +
      " </h2><h6> Author: " +
      book.author +
      ' </h6></div><div class="pagesAndRead"><h6> Pages: ' +
      book.pages +
      " </h6><h6> " +
      book.read +
      "</h6></div>" +
      '<button class="removeButton">Remove</button></div>';
    bookCards.appendChild(li);
    console.log(book.title);

    let removeButton = li.querySelector(".removeButton");
    removeButton.addEventListener("click", function (event) {
      let bookIndex = parseInt(
        event.target.parentElement.getAttribute("data-book-index")
      );
      myLibrary.splice(bookIndex, 1);
      event.target.parentElement.parentElement.remove();
    });
  }
}

showBooks();
