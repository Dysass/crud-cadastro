const express = require('express')
const app = express()
const cep = require('cep-promise')

app.listen(3000, function () {
    cep('05010000')
        .then(console.log)
})

