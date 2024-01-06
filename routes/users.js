const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById } = require('../controllers/user')

router.get('/', getAllUsers)
router.get('/users/:id', getUserById)

module.exports = router
