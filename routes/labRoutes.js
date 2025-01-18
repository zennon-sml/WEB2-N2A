const express = require('express')
const { createLab, uploadMiddleware, generateReport} = require('../controllers/labController')
const router = express.Router()
const { authenticateToken } = require('../middlewares/authMiddleware')

router.post('/laboratorio/novo', authenticateToken, uploadMiddleware, createLab)
router.get('/laboratorios/relatorio', authenticateToken, generateReport)

module.exports = router