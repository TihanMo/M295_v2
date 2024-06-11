const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'example.html'))
})

app.get('/now', (req, res) => {
    const now = new Date()
    const nowStr = now.toLocaleTimeString()
    res.send(nowStr)
})

app.get('/zli', (req, res) => {
    res.status(301).redirect('https://www.zli.ch')
})

app.get('/name', (req, res) => {
    const names = ["Hans Peter", "Julia Müller", "Peter Schmidt", "Anna Fischer", "Markus Wagner", "Sabine Bauer", "Thomas Becker", "Kerstin Meier", "Stefan Schulz", "Katja Hofmann", "Michael Lehmann", "Petra Neumann", "Daniel Weber", "Martina Richter", "Andreas König", "Claudia Braun", "Jürgen Schröder", "Sandra Wolf", "Christian Krause", "Birgit Mayer"];
    function chooseName() {
        const name = names[Math.floor(Math.random() * names.length)];
        return name;
    }
    const randomName = chooseName();
    res.status(200).send(randomName)
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

app.get('/xml', (req,res) => {
    res.sendFile(__dirname + '/example.xml')
})

app.get('/me', (req,res) => {
    const me = {
        vorname : "Nils",
        nachname : "Zimmermann",
        alter: 19,
        Wohnort: "Berlin, Deutschland",
        PLZ: "10719",
        Augenfarbe: "hellgrün"
    }

    res.status(200).send(me)
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})