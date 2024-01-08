const express = require('express')
const router = express.Router()
const {
    getAllShoppingItems,
    getShoppingItemById,
} = require('../controllers/shoppingItem')

router.route('/').get(getAllShoppingItems)
router.route('/:id').get(getShoppingItemById)

module.exports = router
