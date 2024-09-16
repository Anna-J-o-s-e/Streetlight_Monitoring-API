const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs") //encryption

const { usersmodel } = require("./models/user")
const{organizationsmodel}=require("./models/organization")

const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://annajose:annajose01@cluster0.d4hgr.mongodb.net/streetlightdb?retryWrites=true&w=majority&appName=Cluster0")

// user
// hashed password generator

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}
// user signup
app.post("/usersignup",async(req,res)=>{
    let input=req.body
    let hashedPassword=await generateHashedPassword(input.upassword)
    console.log(hashedPassword)
    input.upassword=hashedPassword
    let user=new usersmodel(input)
    user.save()
    res.json({"status":"success"})
})

//user login
app.post("/userlogin", (req, res) => {
    let input = req.body
    usersmodel.find({ "umail": req.body.umail }).then((response) => {
        if (response.length > 0) {
            let dbuPassword = response[0].upassword
            console.log(dbuPassword)
            bcrypt.compare(input.upassword, dbuPassword, (error, isMatch) => {
                if (isMatch) {
                    jwt.sign({ email: input.umail }, "user-app", { expiresIn: "1d" }, (error, token) => {
                        if (error) {
                            res.json({ "status": "Unable To create Token" })
                        } else {
                            res.json({ "status": "success", "userId": response[0]._id, "token": token })
                        }
                    })

                } else {
                    res.json({ "status": "Incorrect Password" })
                }
            })
        } else {
            res.json({ "status": "User Not Found" })
        }
    }).catch()
})

//organization login
app.post("/organizationlogin", (req, res) => {
    let input = req.body
    organizationsmodel.find({ "omail": req.body.omail }).then((response) => {
        if (response.length > 0) {
            let dboPassword = response[0].opassword
            console.log(dboPassword)
            bcrypt.compare(input.opassword, dboPassword, (error, isMatch) => {
                if (isMatch) {
                    jwt.sign({ email: input.omail }, "organization-app", { expiresIn: "1d" }, (error, token) => {
                        if (error) {
                            res.json({ "status": "Unable To create Token" })
                        } else {
                            res.json({ "status": "success", "userId": response[0]._id, "token": token })
                        }
                    })

                } else {
                    res.json({ "status": "Incorrect Password" })
                }
            })
        } else {
            res.json({ "status": "User Not Found" })
        }
    }).catch()
})

app.listen(8080, () => {
    console.log("server started")
})
