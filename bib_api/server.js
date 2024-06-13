const express = require('express')
const path = require('path')
const session = require('express-session')
const fs = require('fs')
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const { v4: uuidv4 } = require('uuid')

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

let books = []
let lends = []
const users = [
    { email: 'admin', password: 'password' },
    { email: 'user', password: '123456' },
    { email: 'desk@library.example', password: 'm295' },
    { email: 'zli', password: 'zli1234'}
]

try {
    books = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/books.json'), 'utf8'))
    lends = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/lends.json'), 'utf8'))
} catch (err) {
    console.error('Error reading data', err)
}

app.get('/', (req, res) => {
    res.status(301).redirect('/swagger-api')
})

app.post('/login', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to login a user.'
        #swagger.parameters['user'] = {
            in: 'body',
            description: 'Details of the user to add.',
            required: true,
            schema: {
                email: 'desk@library.example',
                password: 'm295'
            }
        } */
    const { email, password } = req.body

    const user = users.find((user) => user.email === email && user.password === password)

    if (user) {
        req.session.user = email
        res.status(201).send('Login successful')
    } else {
        res.status(401).send('Invalid email or password')
    }
})

app.get('/verify', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to verify if the user is logged in.' */
    if (req.session.user != null) {
        res.status(200).send(`User ${req.session.user} is logged in`)
    } else {
        res.status(401).send('User not logged in')
    }
})

app.delete('/logout', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to logout a user.' } */
    req.session.destroy((err) => {
        if (err) {
        console.error('Error destroying session:', err)
        res.sendStatus(500)
        } else {
        res.status(204).send('Logged out successfully')
        }
    })
})

app.get('/books', (req, res) => {
    /*  #swagger.tags = ['Book']
        #swagger.description = 'Endpoint to get the list of books.'
        #swagger.parameters['isbn'] = {
            in: 'query',
            description: 'ISBN of the book to search for.',
            required: false,
            type: 'string'
    } */
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

app.post('/books', (req, res) => {
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

app.put('/books/:isbn', (req, res) => {
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

app.delete('/books/:isbn', (req, res) =>{
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

app.patch('/books/:isbn', (req, res) => {
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

app.get('/lends', async (req, res) => {
    /*  #swagger.tags = ['Lend']
        #swagger.description = 'Endpoint to get the list of lends.' */
    if (req.session.user == null) {
        return res.sendStatus(403)
    }
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
    /*  #swagger.tags = ['Lend']
        #swagger.description = 'Endpoint to get a lend by ISBN.' 
        #swagger.parameters['isbn'] = {
            in: 'path',
            description: 'ISBN of the lend.',
            required: true,
            type: 'string'
        } */
    if (req.session.user == null) {
        return res.sendStatus(403)
    }
    const isbn = req.params.isbn
    const lend = await lends.find(l => l.isbn === isbn)

    if(lend){
        res.status(200).json(lend)
    } else {
        res.status(404).send('Lend not fund')
    }
    
})

app.post('/lends', (req, res) => {
    /*  #swagger.tags = ['Lend']
        #swagger.description = 'Endpoint to add a new lend.'
        #swagger.parameters['lend'] = {
            in: 'body',
            description: 'Details of the lend to add.',
            required: true,
            schema: {
                customer_id: 1,
                isbn: '724895934-0'
            } 
        } */
    if (req.session.user == null) {
        return res.sendStatus(403)
    }
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
    /*  #swagger.tags = ['Lend']
        #swagger.description = 'Endpoint to delete a lend by ISBN.'
        #swagger.parameters['lend'] = {
            in: 'body',
            description: 'Details of the lend to add.',
            required: true,
            schema: {
                customer_id: 1,
                isbn: '724895934-0'
            } 
        } */ 
    if (req.session.user == null) {
        return res.sendStatus(403)
    }
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

app.use('/swagger-api', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})