const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000

const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail"

app.get(url, async (req, res)=>{
    const plz = req.body.plz;

    if (plz.toString.length != 4){
        return res.status(400)
    }
})

app.fetch(url, async () => {
    const res = await fetch(url)
    const data = await res.json()
    const temperature = data.currentTemperature

    res.json({ plz, temperature })
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})
