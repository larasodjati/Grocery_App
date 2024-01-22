const db = require('../db/db')

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error(err.message)
        res.status(500).send('Internal server error')

        next(error)
    })

// get all shopping lists
const getAllShoppingLists = asyncHandler(async (req, res) => {
    const result = await db.query(
        'SELECT row_to_json(shopping_list) FROM shopping_list'
    )
    res.json(result.rows)
})

// get shopping list by id
const getShoppingListById = asyncHandler(async (req, res) => {
    const listId = req.params.id

    const result = await db.query(
        'SELECT row_to_json (shopping_list) FROM shopping_list WHERE id = $1',
        [listId]
    )
    if (result.rows.length === 0) {
        res.status(404).json({ err: 'The list can not be found' })
    } else {
        res.json(result.rows[0])
    }
})

module.exports = {
    getAllShoppingLists,
    getShoppingListById,
}
