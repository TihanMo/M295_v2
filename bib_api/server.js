const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let books

try {
    books = JSON.parse(fs.readFileSync(__dirname + '/books.json'))
} catch (err) {
    console.error('Error reading books.json', err)
}

app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const book = books.find(b => b.isbn === isbn)

    if(book){
        res.send(book)
    } else {
        res.status(404).send('Book not found')
    }
})

app.get('/books', (req, res) => {
    const isbn = req.query.isbn
    const book = books.find(b => b.isbn === isbn)

    if(book){
        res.send(book)
    } else {
        res.status(404).send('Book not found')
    }
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})