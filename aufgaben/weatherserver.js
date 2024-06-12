const axios = require('axios')
const express = require('express')
const app = express()

async function getTemperature(plz){
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`
    console.log(url)

    try {
        const response = await axios.get(url)
        if (response.code !== 200) {
            return response.data.currentWeather.temperature
        }
        else {
            const data = await response.json()
            console.log(data)
    }
    } catch(error) {
        console.error(error)
    }
}

app.get('/temperature/:plz', async (req, res)=>{
    const plz = req.params.plz
    const temperature = await getTemperature(plz)
    res.json({temperature})
})

const port = 3000
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})