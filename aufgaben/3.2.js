const express = require('express')
const app = express()
const port = 3000

const url = "https://jsonplaceholder.typicode.com/posts/1/comments"

app.get(url, (req, res)=>{

})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})
