const express= require("express")
const router = express.Router()
const user = require("../controller/user")
router.post("/",user.postData)
router.post("/login",user.postData2)
router.post("/Premium",user.set_Premium)
router.get("/checkPremium",user.if_premium)

module.exports = router