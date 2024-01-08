const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById } = require('../controllers/user')

router.get('/', getAllUsers)
router.get('/user/:id', getUserById)

module.exports = router
