const express = require("express")
require('dotenv').config() 
const cors = require("cors")
const connectDb = require("./config/db.js")
const userRoutes = require("./routes/user.routes.js")

const app = express()
const port = process.env.PORT || 5000
app.use(cors({
  origin: "*"
}));

app.use(express.json())

// basic request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next()
})

// route 
app.use("/api/users", userRoutes)

// db call
connectDb()
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

