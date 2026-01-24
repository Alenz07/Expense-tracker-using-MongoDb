const express= require("express")
const router = express.Router()
const expense = require("../controller/expense")
const authenticate = require("../middleware/auth");
router.post("/",authenticate,expense.post_data)
router.get("/leaderboard",expense.creating_leaderboard)
router.get("/",authenticate,expense.get_data)
router.delete("/users/:id",expense.delete_data)
router.post("/ai",expense.ask_Ai)
router.put('/users/:id', authenticate, expense.update_data);

module.exports = router
