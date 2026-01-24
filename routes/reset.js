const express= require("express")
const router = express.Router()
const reset = require("../controller/reset")
router.post("/password", reset.resetPass)
router.get("/password/:id",reset.updatePass)
router.post("/password/:id",reset.setNew)

module.exports = router
