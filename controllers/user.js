const db = require('../db/db')

// get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

// get user by id
const getUserById = async (req, res) => {
    const userId = req.params.id
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [
            userId,
        ])
        if (result.rows.length === 0) {
            res.status(404).json({ err: 'User not found' })
        } else {
            res.json(result.rows[0])
        }
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getAllUsers,
    getUserById,
}
