const fs = require('fs')
const file = process.argv[2]

fs.readFile(file, 'utf-8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  const lines = data.toString().split('\n').length - 1
  console.log(lines)
})