const express = require('express')
const router = express.Router()
const {
    getAllShoppingLists,
    getShoppingListById,
} = require('../controllers/shoppingList')

router.route('/').get(getAllShoppingLists)
router.route('/:id').get(getShoppingListById)

module.exports = router
