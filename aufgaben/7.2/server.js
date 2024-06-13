const express = require('express')
const session = require('express-session')

const app = express()
const port = 3000

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.status(301).redirect('/name')
})

app.post('/name', (req, res) => {
    const name = req.body.name
    req.session.name = name
    res.status(200).send(`Your name has been stored in session: ${name}`)
})

app.get('/name', (req, res) => {
    if(req.session.name){
        res.status(200).send(`Your name is ${req.session.name}`)
    } else {
        res.status(404).send('Name not found')
    }
})

app.delete('/name', (req, res) => {
    if (req.session.name){
        delete req.session.name
        res.status(200).send(`Name has been deleted`)
    } else {
        res.status(404).send('Name not found')
    }
})

app.listen(port, ()=>console.log(`Server listening on port ${port}`))