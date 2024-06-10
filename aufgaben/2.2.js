function leseDateiInhalt (filepath){
    const fs = require('node:fs').promises
    return fs.readFile(filepath, 'utf8')
}

const leseDateiInhalt2 = (filepath) => {
    const fs = require('node:fs')
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err){
                reject (err)
            } else {
                resolve(data)
            }
        })
    })
}

async function leseDateiInhalt3 (filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8')
        return data
    } catch (err) {
        console.error('Fehler', err)
    }
}

leseDateiInhalt ('2.1.js')
    .then(inhalt => {
        console.log('Inhalt von 2.1.js: ' + inhalt)
    })
    .catch(error => {
        console.error(error)
    })

leseDateiInhalt2 ('2.2.js')
.then(inhalt => {
    console.log(`Inhalt von 2.2.js: ${inhalt}`)
})
.catch(error => {
    console.error(error)
})

(async () =>{
    try {
        const inhalt = await leseDateiInhalt3('hello.js')
        console.log(`Inhalt von hello.js: ${inhalt}`)
    } catch (err) {
        console.error('Fehler beim lesen der Datei', err)
    }
})
    