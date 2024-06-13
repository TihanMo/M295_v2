const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Bib API',
        description: 'Dokumentation für alle Endpunkte der Bibliotheks API'
    },
    host: 'localhost:3001',
    schemes: ['http']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./server.js', './swagger-docs.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server')
})
