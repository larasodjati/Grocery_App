const db = require('../db/db')

const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await db.query(
            'SELECT username from users WHERE username=$1 AND password=$2',
            [username, password]
        )
        if (user.rows.length === 0) {
            return res.status(401).json({ err: 'Invalid username or password' })
        }
        res.json({ message: 'Login successful' })
    } catch (error) {
        console.err(err)
        res.status(500).send('Internal server error')
    }
}

const registerUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const existingUser = await db.query(
            'SELECT username from users WHERE username=$1',
            [username]
        )
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ err: 'Username already registered' })
        }
        await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, password]
        )
        res.status(201).json({
            message: 'Congrats, user registered successfully!',
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    loginUser,
    registerUser,
}
