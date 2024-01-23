const db = require('../db/db')
const cookieParser = require('cookie-parser')

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error(err.message)
        res.status(500).send('Internal server error')

        next(error)
    })

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await db.query(
        'SELECT username from users WHERE username = $1 AND password = $2',
        [username, password]
    )
    if (user.rows.length === 0) {
        return res.status(401).json({ err: 'Invalid username or password' })
    }
    res.cookie('username', user.rows[0].username, { httpOnly: true })

    res.json({ message: 'Login successful' })
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, name, birthday } = req.body

    const existingUser = await db.query(
        'SELECT username from users WHERE username = $1',
        [username]
    )
    if (existingUser.rows.length > 0) {
        return res.status(400).json({ err: 'Username already registered' })
    }
    await db.query(
        `INSERT INTO users (username, password, name, birthday) 
        VALUES ($1, $2, $3, $4)`,
        [username, password, name, birthday]
    )
    res.cookie('username', username, { httpOnly: true })

    res.status(201).json({
        message: 'Congrats, user registered successfully!',
    })
})

module.exports = {
    loginUser,
    registerUser,
}
