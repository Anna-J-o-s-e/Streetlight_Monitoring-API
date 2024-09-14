const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs") //encryption
const { usersmodel }=require("./models/user")
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://annajose:annajose01@cluster0.d4hgr.mongodb.net/streetlightdb?retryWrites=true&w=majority&appName=Cluster0")

// user
// login
const generateHashedPassword=async (password)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}




app.listen(8080,()=>{
    console.log("server started")
})
