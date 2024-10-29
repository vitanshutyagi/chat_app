const express = require("express")
const { sendMessage, getReceivedMessages, getSentMessages } = require("../controller/messageCtrl")
const router = express.Router()

router.post("/sendMessage",sendMessage)
router.get("/getReceivedMessages/:userId",getReceivedMessages)
router.get("/getSentMessages/:userId",getSentMessages)

module.exports = router