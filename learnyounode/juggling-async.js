const http = require('http')
const bl = require('bl')

const urls = process.argv.slice(2)
const results = []
let count = 0

function printResults() {
  for (let i = 0; i < results.length; i++) {
    console.log(results[i])
  }
}

function httpGet(index) {
  http.get(urls[index], (res) => {
    res.pipe(bl((err, data) => {
      if (err) {
        return console.error(err)
      }
      results[index] = data.toString()
      count++
      if (count === urls.length) {
        printResults()
      }
    }))
  })
}

for (let i = 0; i < urls.length; i++) {
  httpGet(i)
}
