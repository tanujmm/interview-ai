const express=require("express")
const cookieParser = require("cookie-parser")
const cors=require("cors")

const authRouter=require("./routes/auth.routes")
const interviewRouter=require("./routes/interview.routes")
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"https://interview-ai-nine-gules.vercel.app",
  credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)

module.exports=app