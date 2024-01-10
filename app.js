const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const shoppingListRoutes = require('./routes/shoppingList')
const shoppingItemRoutes = require('./routes/shoppingItem')

// middleware
app.use(cors())
app.use(bodyParser.json())

// login page
app.get('/', (req, res) => {
    res.send('<h1>Login Page Temporary</h1>')
})

// routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/lists', shoppingListRoutes)
app.use('/items', shoppingItemRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
