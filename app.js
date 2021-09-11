
const submitBook = document.querySelector('submit')
const output = document.querySelectorAll('.card')
const form = document.querySelector('form')

const books = []
let book
// Creating Class Books
class Books {
  constructor(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
  }
}



addBook = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const addTitle = document.querySelector('#title').value
    const addAuthor = document.querySelector('#author').value
    const numPages = document.querySelector('#pages').value
    book = new Books(addTitle, addAuthor, numPages)
    books.push(book)
    console.log(book)
    return book
  })
}
addBook()

// clearInput = () => {
//   title = ''
//   author = ''
//   pages = ''
// }
// clearInput()