const express = require("express")
const { newTemp, getTemp } = require("../controllers/tempController")
const router = express.Router()

router.get("/temperatura/:temp", newTemp)
router.get("/temperatura", getTemp)

module.exports = router