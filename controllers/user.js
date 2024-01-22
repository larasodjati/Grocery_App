const db = require('../db/db')

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error(err.message)
        res.status(500).send('Internal server error')

        next(error)
    })
// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const result = await db.query('SELECT row_to_json(users) FROM users')
    res.json(result.rows)
})

// get user by id
const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id

    const result = await db.query(
        'SELECT row_to_json (users) FROM users WHERE id = $1',
        [userId]
    )
    if (result.rows.length === 0) {
        res.status(404).json({ err: 'User not found' })
    } else {
        res.json(result.rows[0])
    }
})

module.exports = {
    getAllUsers,
    getUserById,
}
