const db = require('../db/db')

// get all shopping items

const getAllShoppingItems = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT row_to_json (shopping_item) FROM shopping_item'
        )
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

const getShoppingItemById = async (req, res) => {
    const itemId = parseInt(req.params.id, 10)

    try {
        const result = await db.query(
            'SELECT row_to_json (shopping_item) FROM shopping_item WHERE id = $1',
            [itemId]
        )
        if (result.rows.length === 0) {
            res.status(404).json({ err: 'The item can not be found' })
            return
        }
        const item = result.rows[0].row_to_json

        // shopping items refers to shopping list column
        const shoppingListId = item.shopping_list_id

        const shoppingListResult = await db.query(
            'SELECT id, list_name FROM shopping_list WHERE id= $1',
            [shoppingListId]
        )

        if (shoppingListResult.rows.length === 0) {
            res.status(500).send('Shopping list can not be found')
            return
        }
        const shoppingList = shoppingListResult.rows[0]

        const resultItem = {
            id: item.id,
            name: item.item_name,
            shopping_list: {
                id: shoppingList.id,
                name: shoppingList.list_name,
            },
        }
        res.json(resultItem)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getAllShoppingItems,
    getShoppingItemById,
}
