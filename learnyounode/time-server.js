const express = require('express')
const app = express()

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  
const port = process.argv[2]
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})