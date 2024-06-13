const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

let books = []

try {
    books = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/books.json'), 'utf8'))
    lends = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/lends.json'), 'utf8'))
} catch (err) {
    console.error('Error reading data', err)
}

router.get('/', (req, res) => {
    /*  #swagger.tags = ['Book']
        #swagger.description = 'Endpoint to get the list of books.'
        #swagger.parameters['isbn'] = {
            in: 'query',
            description: 'ISBN of the book to search for.',
            required: false,
            type: 'string'
    } */
    const isbn = req.query.isbn

    if (isbn) {
        const book = books.find(b => b.isbn === isbn)

        if (book) {
            return res.status(200).send(book)
        } else {
            return res.status(404).send('Book not found')
        }
    } else {
        return res.status(200).json(books)
    }
})

router.get('/:isbn', (req, res) => {
    /*  #swagger.tags = ['Book']
        #swagger.description = 'Endpoint to get a book by ISBN.' 
        #swagger.parameters['isbn'] = {
            in: 'path',
            description: 'ISBN of the book.',
            required: true,
            type: 'string'
        }
    */
    const isbn = req.params.isbn
    const book = books.find(b => b.isbn === isbn)

    if(book){
        res.send(book)
    } else {
        res.status(404).send('Book not found')
    }
})

router.post('/', (req, res) => {
    /*  #swagger.tags = ['Book']
        #swagger.description = 'Endpoint to add a new book.'
        #swagger.parameters['book'] = {
            in: 'body',
            description: 'Details of the book to add.',
            required: true,
            schema: {
                isbn: '978-3-16-148410-0',
                title:'The Great Gatsby',
                author:'F. Scott Fitzgerald',
                publisher:'Scribner',
                year: 1925
            }
        } */
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

router.put('/:isbn', (req, res) => {
/*  #swagger.tags = ['Book']
    #swagger.description = 'Endpoint to update a book.'
    #swagger.parameters['isbn'] = {
        in: 'path',
        description: 'ISBN of the book.',
        required: false,
        type: 'string'
    }
    #swagger.parameters['book'] = {
        in: 'body',
        description: 'Updated details of the book.',
        required: true,
        schema: {
            isbn:'9781234567890',
            title:'idk',
            author:'molmol',
            publisher:'Unknown Publisher',
            year:2069
        }
    } */
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

router.delete('/:isbn', (req, res) =>{
    /*  #swagger.tags = ['Book']
        #swagger.description = 'Endpoint to delete a book by ISBN.'
        #swagger.parameters['isbn'] = {
            in: 'path',
            description: 'ISBN of the book.',
            required: true,
            type: 'string'
        } */
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

router.patch('/:isbn', (req, res) => {
    /*  #swagger.tags = ['Book']
        #swagger.description = 'Endpoint to partially update a book.'
        #swagger.parameters['isbn'] = {
            in: 'path',
            description: 'ISBN of the book.',
            required: true,
            type: 'string'
        }
        #swagger.parameters['book'] = {
            in: 'body',
            description: 'Details of the book to update.',
            required: true,
            schema: {
                title: 'The bad Gatsby' 
            }
        } */
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

module.exports = router