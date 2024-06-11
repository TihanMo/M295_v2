const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let books = []
let lends = []

try {
    books = JSON.parse(fs.readFileSync(path.join(__dirname, 'books.json'), 'utf8'))
} catch (err) {
    console.error('Error reading books.json', err)
}

app.get('/books', (req, res) => {
    const isbn = req.query.isbn

    if(isbn){
        const book = books.find(b => b.isbn === isbn)
    
        if(book){
            res.send(book)
        } else {
            res.status(404).send('Book not found')
        }
    }
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

app.post('/books', (req, res) => {
    const newBook = req.body

    if (newBook) {
        books.push(newBook)
        fs.writeFile(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2), (err) => {
            if (err) {
                console.error('Error writing books', err)
                return res.sendStatus(500)
            }
            return res.status(200).send(`${newBook.title} has been added`)
        })
    } else {
        return res.sendStatus(400)
    }
})

app.put('/books/:isbn', (req, res) => {
    const updatedBook = req.body
    const isbn = req.params.isbn

    if (!updatedBook || !updatedBook.isbn) {
        return res.sendStatus(400).send('Pls provide book in body')
    }

    const bookIndex = books.findIndex(b => b.isbn === isbn)

    if (bookIndex === -1) {
        return res.sendStatus(404)
    }

    books[bookIndex] = updatedBook

    fs.writeFile(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error('Error writing books', err)
            return res.sendStatus(500)
        }
        return res.status(200).json(updatedBook)
    })
})

app.delete('/books/:isbn', (req, res) =>{
    const isbn = req.params.isbn

    if(!isbn){
        res.status(400).send('Pls provide book in body')
    }

    const bookIndex = books.findIndex(b => b.isbn === isbn)

    if (bookIndex === -1) {
        return res.sendStatus(404)
    }

    const bookToDelete = books[bookIndex];

    books.splice(bookIndex, 1)

    fs.writeFile(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error('Error deleting books', err)
            return res.sendStatus(500)
        }
        return res.status(200).send(`${bookToDelete.title} has been deleted :(`)
    })
})

app.patch('/books/:isbn', (req, res) => {
    const updatedFields = req.body
    const isbn = req.params.isbn

    if (!updatedFields || Object.keys(updatedFields).length === 0) {
        return res.status(400).send('Please provide valid fields to update')
    }

    const bookIndex = books.findIndex(b => b.isbn === isbn)

    if (bookIndex === -1) {
        return res.sendStatus(404)
    }

    const bookToUpdate = books[bookIndex]

    Object.keys(updatedFields).forEach(key => {
        bookToUpdate[key] = updatedFields[key]
    })

    fs.writeFile(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error('Error writing books', err)
            return res.sendStatus(500)
        }
        return res.status(200).json(bookToUpdate)
    })
})


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})