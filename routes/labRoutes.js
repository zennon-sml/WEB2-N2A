const express = require('express')
const { createLab, uploadMiddleware, generateReport} = require('../controllers/labController')
const router = express.Router()

router.post('/lab/new', uploadMiddleware, createLab)
router.get('/laboratorios/relatorio', generateReport)

module.exports = router