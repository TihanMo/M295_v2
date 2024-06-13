const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Bib API',
        description: 'Dokumentation für alle Endpunkte der Bibliotheks API'
    },
    host: 'localhost:3001',
    schemes: ['http'],
    tags: []
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server')
})
