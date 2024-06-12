const express = require('express')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let books = []
let lends = []

try {
    books = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/books.json'), 'utf8'))
    lends = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/lends.json'), 'utf8'))
} catch (err) {
    console.error('Error reading data', err)
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

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
        fs.writeFile(path.join(__dirname, 'data/books.json'), JSON.stringify(books, null, 2), (err) => {
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

    fs.writeFile(path.join(__dirname, 'data/books.json'), JSON.stringify(books, null, 2), (err) => {
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
        res.status(400).send('Pls provide ISBN')
    }

    const bookIndex = books.findIndex(b => b.isbn === isbn)

    if (bookIndex === -1) {
        return res.sendStatus(404)
    }

    const bookToDelete = books[bookIndex];

    books.splice(bookIndex, 1)

    fs.writeFile(path.join(__dirname, 'data/books.json'), JSON.stringify(books, null, 2), (err) => {
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

    fs.writeFile(path.join(__dirname, 'data/books.json'), JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error('Error writing books', err)
            return res.sendStatus(500)
        }
        return res.status(200).json(bookToUpdate)
    })
})

app.get('/lends', async (req, res) => {
    const isbn = req.query.isbn
    
    if (isbn){
        const lend = await lends.find(l => l.isbn === isbn)
        if (lend){
            res.status(200).json(lend)
        } else {
            res.status(404).send('Lend not found')
        }
    }
    res.status(200).json(lends)
})

app.get('/lends/:isbn', async (req, res) => {
    const isbn = req.params.isbn
    const lend = await lends.find(l => l.isbn === isbn)

    if(lend){
        res.status(200).json(lend)
    } else {
        res.status(404).send('Lend not fund')
    }
    
})

app.post('/lends', (req, res) => {
    const { customer_id, isbn } = req.body

    if (!customer_id || !isbn) {
        return res.status(422).send('Please provide customer_id and isbn')
    }

    const bookLent = lends.find(l => l.isbn === isbn && l.returned_at === null)
    if (bookLent) {
        return res.status(422).send('This book is already lent out')
    }

    const openLends = lends.filter(l => l.customer_id === customer_id && l.returned_at === null)
    if (openLends.length >= 3) {
        return res.status(422).send('Customer already has 3 open lends')
    }

    const newLend = {
        id: uuidv4(),
        customer_id,
        isbn,
        borrowed_at: new Date().toISOString(),
        returned_at: null
    }

    lends.push(newLend)

    fs.writeFile(path.join(__dirname, 'data/lends.json'), JSON.stringify(lends, null, 2), (err) => {
        if (err) {
            console.error('Error writing lends', err)
            return res.sendStatus(500)
        }
        return res.status(200).send(`Lend for book with ISBN ${newLend.isbn} has been added`)
    })
})


app.delete('/lends/:isbn', (req, res) =>{
    const isbn = req.params.isbn

    if(!isbn){
        res.status(400).send('Pls provide ISBN')
    }

    const lendIndex = lends.findIndex(l => l.isbn === isbn)

    if (lendIndex === -1) {
        return res.sendStatus(404)
    }

    const lendToDelete = lends[lendIndex];

    lends.splice(lendIndex, 1)

    fs.writeFile(path.join(__dirname, 'data/lends.json'), JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error('Error deleting lends', err)
            return res.sendStatus(500)
        }
        return res.status(200).send(`${lendToDelete.isbn} has been deleted :(`)
    })
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})