const express = require('express')
const path = require('path')
const axios = require('axios')
const fs = require('fs')

const app = express()
const port = 3000

const names = JSON.parse(fs.readFileSync( __dirname + '/names.json'))
let me = {
    vorname : "Nils",
    nachname : "Zimmermann",
    alter: 19,
    Wohnort: "Berlin, Deutschland",
    PLZ: "10719",
    Augenfarbe: "hellgrün"
}

app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'example.html'))
})

app.get('/now', (req, res) => {
    const now = new Date()
    const tz = ()=>{
        if (req.params.tz){
            return tz
        } else {
            return 'UTC'
        }
    } 
    const options = {
        tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }
    
    const formatter = new Intl.DateTimeFormat('de-DE', options)
    const formattedTime = formatter.format(now)
    res.json({tz, formattedTime})
})

app.get('/zli', (req, res) => {
    res.status(301).redirect('https://www.zli.ch')
})

app.get('/name', (req, res) => {
    function chooseName() {
        const name = names[Math.floor(Math.random() * names.length)]
        return name
    }
    const randomName = chooseName()
    res.status(200).send(randomName)
})

app.get('/names', (req, res) => {
    res.json(names)
})

app.post('/name', (req, res) => {
    const { firstName, lastName } = req.body
    if (firstName && lastName) {
        const newName = { firstName, lastName }
        names.push(newName)
        fs.writeFileSync(__dirname + '/names.json', JSON.stringify(names, null, 2))
        res.status(200).send(`${firstName} ${lastName} added successfully`)
    } else {
        res.sendStatus(400)
    }
})

app.delete('/name', (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.status(400).send('Please provide both firstName and lastName in the request body')
    }

    if (names.length !== 0) {
        const index = names.findIndex(name => name.firstName === firstName && name.lastName === lastName)
        if (index !== -1) {
            names.splice(index, 1);
            fs.writeFileSync(__dirname + '/names.json', JSON.stringify(names, null, 2))
            res.status(200).send(`${firstName} ${lastName} was successfully deleted`)
        } else {
            res.status(404).send(`${firstName} ${lastName} not found`)
        }
    } else {
        res.status(400).send('Name list is empty')
    }
})


app.get('/html', (req, res) => {
    res.sendFile( __dirname + '/example.html')
})

app.get('/image', async (req, res) => {
    try{
        const fetch = ((await import('node-fetch')).default)
        const response = await fetch('https://cataas.com/cat')
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        res.set('Content-Type', 'image/jpeg')
        res.send(buffer)
    } catch (error) {
        console.log("Fehler beim Laden des Bildes", error);
        res.status(500).send('Fehler beim Laden des Bildes');
    }
})

app.get('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot")
})

app.get('/user-agent', (req, res) => {
    const user_agent = req.headers['user-agent']
    res.send(user_agent)
})

app.get('/secret', (req, res) => {
    res.sendStatus(403)
})

app.get('/secret2', (req, res) => {
    const auth = req.headers.authorization
    if (auth === "Basic aGFja2VyOjEyMzQ="){
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

app.get('/chuck', async (req, res) => {
    const jokename = req.query.jokename
    try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random')
        let joke = response.data.value

        if (jokename) {
            joke = joke.replace(/Chuck Norris/g, jokename)
        }

        res.status(200).send(joke)
    } catch (error) {
        res.status(500).send('Error fetching joke')
    }
})

app.get('/xml', (req,res) => {
    res.sendFile(__dirname + '/example.xml')
})

app.get('/me', (req,res) => {
    res.status(200).json(me)
})

app.patch('/me', (req, res) => {
    const newMe = req.body
    me = { ...me, ...newMe}
    res.status(200).send(`${newMe.vorname} has been added`)
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})