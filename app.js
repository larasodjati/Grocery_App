const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./routes/users')
const db = require('./db/db')

// middleware
app.use(cors())
app.use(bodyParser.json())

// connection to database
// app.get('/', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM users')
//         res.json(result.rows)
//     } catch (err) {
//         console.error(err)
//         res.status(500).send('Internal Server Error')
//     }
// })

app.use('/', userRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
