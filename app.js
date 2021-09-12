/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

const form = document.querySelector('form')
const h1 = document.querySelector('.header')

// Creating Class Books
class Books {
  constructor(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
  }
}

// Class UI for User Interface
class UI {
  // Add Display Book Function
  displayBook (book) {
    const cardGroup = document.querySelector('.card-group')
    // add display Card Text & HTML Element
    const card = document.createElement('div')
    card.classList.add('card')

    // Insert Card Text & HTML Element to UI
    card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${book.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
      <p class="card-text">${book.numPages}</p>
      <a href="#" class="btn btn-lg btn-success read">Read</a>
      <a href="#" class="btn btn-lg btn-danger delete">DEL</a>
    </div>
  `
    cardGroup.appendChild(card)
    form.reset()
  }

  // Add UI Alert Method
  showAlert (message, className) {
    // Create Div
    const div = document.createElement('div')
    // Add className
    div.className = `alert ${className}`
    // Add text
    div.appendChild(document.createTextNode(message))
    // get Parent
    const container = document.querySelector('.container')
    // Get form
    // eslint-disable-next-line no-shadow
    const form = document.querySelector('form')
    // Insert Alert
    container.insertBefore(div, h1)

    // set Time out 3 sec
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000)
  }
  
  deleteBook (target) {
    if (target.className === 'delete') {
      // DOM Treversing
      target.parentElement.parentElement.remove()
    }
  }

  markRead (target) {
    if (target.className === 'read') {
      target.parentElement.parentElement.classList.add('isRead')
    }
  }

}


// Class Store for localStorage

class Store {
  static getBooks () {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static displayBooks () {
    const books = Store.getBooks()
    // Loop thrugh the books to display each
    // eslint-disable-next-line prefer-arrow-callback
    books.forEach(function (book) {
      const ui = new UI()
      // add book to UI
      ui.displayBook (book)
    })
  }

  static addBook (book) {
  // Using className (Store) because it is static method
    const books = Store.getBooks()
    books.push(book)

    // Setting localStorage with added book
    localStorage.setItem('books', JSON.stringify(books))
}

  static removeBook (title) {
    const books = Store.getBooks()
    books.forEach(function (book, index) {
      if (book.title === title) {
        books.splice(index, 1)
      }
    })

    // Setting localStorage without deleted  book
    localStorage.setItem('books', JSON.stringify(books))
  }

}

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks)

  // EVENT LISTENER FOR ADD BOOK TO LIST
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    // getting input values
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const pages = document.querySelector('#pages').value

    // Instantiate book object from Book
    const book = new Books(title, author, pages)

    // Instantiate ui Object from UI constructor
    const ui = new UI()

    // Validation
    if (title === '' || author === '' || pages === '') {
      // Error
      ui.showAlert('Please fill all the neccessary fields', 'error')
    } else {
      ui.displayBook(book)
      // Add to Storage
      Store.addBook(book)
      // success
      ui.showAlert('Your book was successfully added', 'success')
    }
    e.preventDefault()
  })

