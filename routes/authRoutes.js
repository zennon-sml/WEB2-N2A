const express = require('express')
const { loginUser } = require('../controllers/authController')

const router = express.Router()

router.post('/logar', loginUser)

module.exports = router