 const db = require("./utils/database")
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const path = require("path")
const app = express();
const reset = require("./controller/reset")
const createOrder = require("./services/cashfree")
const cashfree_route = require("./routes/cashfree")
const{expenses,users} = require("./models")
const post = require("./routes/users")
const expense = require("./routes/expense")
const genAi = require("@google/genai");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use("/auth", post)
app.use("/cashfree",cashfree_route)
app.use("/expense",expense) 
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "/views", "/index.html"))
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views", "/login.html"))
});
app.get("/reset", (req, res) => {
  res.sendFile(path.join(__dirname, "/views", "/reset.html"))
});
app.get("/expense.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/views", "/expense.html"))
});
app.post("/reset/password", reset.resetPass)
app.get("/reset/password/:id",reset.updatePass)
app.post("/reset/password/:id",reset.setNew)


app.post('/pay', async (req, res) => {
  try {
    const sessionId = await createOrder.createOrder();

    console.log("Order data:", sessionId
    );
    res.json(sessionId);
  } catch (error) {
    console.log(error)
  }

});

const ai = new genAi.GoogleGenAI({
  apiKey:process.env.GOOGLE_API
});

async function listen() {
  try {
    const sync = await mongoose.connect("mongodb+srv://Divesh:123divesh123@cluster0.nistn3a.mongodb.net/?appName=Cluster0")
    app.listen(2000, () => {
      console.log("✅ Server is running on http://localhost:2000")
    })
  }
  catch (error) {
    console.log(error)
  }
} listen()