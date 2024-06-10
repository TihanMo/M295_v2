const fs = require('fs')
const path = require('path')

const dirPath = process.argv[2]
const fileExt = '.' + process.argv[3]

fs.readdir(dirPath, function (err, list){
    if (err) {
        return console.error(err)
    }
    list.forEach(function (file) {
        if (path.extname(file) === fileExt) {
            console.log(file)
        }
    })
})