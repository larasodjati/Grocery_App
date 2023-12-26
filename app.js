const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/db')

// middleware
app.use(cors())
app.use(bodyParser.json())

// connection to database
app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})
