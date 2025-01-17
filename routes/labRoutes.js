const express = require('express')
const { createLab, uploadMiddleware} = require('../controllers/labController')
const router = express.Router()

router.post('/lab/new', uploadMiddleware, createLab)

module.exports = router