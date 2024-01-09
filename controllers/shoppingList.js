const db = require('../db/db')

// get all shopping lists
const getAllShoppingLists = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT row_to_json(shopping_list) FROM shopping_list'
        )
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

// get shopping list by id
const getShoppingListById = async (req, res) => {
    const listId = req.params.id
    try {
        const result = await db.query(
            'SELECT row_to_json (shopping_list) FROM shopping_list WHERE id = $1',
            [listId]
        )
        if (result.rows.length === 0) {
            res.status(404).json({ err: 'The list can not be found' })
        } else {
            res.json(result.rows[0])
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getAllShoppingLists,
    getShoppingListById,
}
