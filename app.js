const express = require('express')
const app = express()
const port = 8897
const getEvents = require('./storage')

app.get('/', async (req, res) => {
    console.log(42)
    const e = await getEvents()
    console.log(e)
    res.json(e)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})