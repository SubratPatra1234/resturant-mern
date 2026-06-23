require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser=require("cookie-parser")
const connectDB = require("./config/db/db")
const userRoute = require("./routes/user.route")
const adminRoute = require("./routes/admin.routes")
const categoryRoutes = require("./routes/category.routes")
const menuRoutes = require("./routes/menu.routes")
const cartRoutes = require("./routes/cart.routes")
const orderRoutes = require("./routes/order.routes")


const app=express()
connectDB()

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth",userRoute)
app.use("/api/auth", adminRoute)
app.use("/api/category",categoryRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/orders",orderRoutes)


app.get("/",(req,res)=>{
  res.send("server is running")
})


PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}`)
}) 