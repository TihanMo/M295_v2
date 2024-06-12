const express = require('express')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = 3000

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.set('WWW-Authenticate', 'Basic realm="example"')
        return res.status(401).send('Access denied, please provide authorization')
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const user = {
        name: credentials[0],
        pass: credentials[1]
    }

    if (user.name === process.env.USERNAME && user.pass === process.env.PASSWORD) {
        next()
    } else {
        res.set('WWW-Authenticate', 'Basic realm="example"')
        return res.status(401).send('Access denied, invalid credentials')
    }
}

app.get('/', (req, res) => {
    res.status(300).redirect('/public')
})

app.get('/public', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public.html'))
})

app.get('/private', auth, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'private.html'))
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
