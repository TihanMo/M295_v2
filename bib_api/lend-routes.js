const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

let lends = []

try {
    lends = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/lends.json'), 'utf8'))
} catch (err) {
    console.error('Error reading data', err)
}

router.get('/', async (req, res) => {
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

router.get('/:isbn', async (req, res) => {
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

router.post('', (req, res) => {
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

router.delete('/:isbn', (req, res) =>{
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

module.exports = router