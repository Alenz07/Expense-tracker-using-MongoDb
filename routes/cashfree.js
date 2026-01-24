const express= require("express")
const router = express.Router()
const payment = require("../controller/cashfree")
router.get("/payment-status/:orderId",payment)

module.exports = router
