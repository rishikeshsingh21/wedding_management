import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
// console.log("CORS ORIGIN:", process.env.CORS_ORIGIN);
// console.log(process.env.ACCESS_TOKEN_SECRET)
app.use(express.json({
    limit: "50kb"
}))

app.use(morgan("dev"))

app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import vendorRouter from "./routes/vendor.routes.js"
import coupleRouter from "./routes/couple.route.js"
import serviceRouter from "./routes/service.route.js"


app.use("/api/v1/users", userRouter)
app.use("/api/v1/vendors", vendorRouter)
app.use("/api/v1/couples", coupleRouter)
app.use("/api/v1/services",serviceRouter)


export default app