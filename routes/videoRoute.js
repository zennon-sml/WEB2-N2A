const express = require("express")
const router = express.Router()
const { videoStream } = require("../controllers/videoController")

router.get("/video", videoStream)

module.exports = router