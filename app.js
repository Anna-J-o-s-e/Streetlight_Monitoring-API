const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs") //encryption

const { usersmodel } = require("./models/user")
const{organizationsmodel}=require("./models/organization")
const {adminsmodel}=require("./models/admin")
const {feedbacksmodel}=require("./models/feedback")
const {addstreetlightsmodel}=require("./models/addstreetlight")
const { queriesmodel } = require("./models/query")
const { addrepliesmodel } = require("./models/addreply")
const {commonloginsmodel}=require("./models/commonlogin")

const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://annajose:annajose01@cluster0.d4hgr.mongodb.net/streetlightdb?retryWrites=true&w=majority&appName=Cluster0")


// hashed password generator

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}
// admin signup
app.post("/adminsignup",async(req,res)=>{
    let input=req.body
    let hashedPassword=await generateHashedPassword(input.apassword)
    console.log(hashedPassword)
    input.apassword=hashedPassword
    let admin=new adminsmodel(input)
    admin.save()
    res.json({"status":"success"})
})
// admin login
app.post("/adminlogin", (req, res) => {
    let input = req.body
    adminsmodel.find({ "amail": req.body.amail }).then((response) => {
        if (response.length > 0) {
            let dbaPassword = response[0].apassword
            console.log(dbaPassword)
            bcrypt.compare(input.apassword, dbaPassword, (error, isMatch) => {
                if (isMatch) {
                    jwt.sign({ email: input.amail }, "user-app", { expiresIn: "1d" }, (error, token) => {
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
app.get("/viewadmin",(req,res)=>{
    adminsmodel.find().then(
      (data)=>{
          res.json(data)
      }
    ).catch((error)=>{
  
      res.json(error)
    })  
  })


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




app.get("/viewusers",(req,res)=>{
    usersmodel.find().then(
      (data)=>{
          res.json(data)
      }
    ).catch((error)=>{
  
      res.json(error)
    })  
  })

//organization
//organization signup
app.post("/organizationsignup",async(req,res)=>{
    let input=req.body
    let hashPassword=await generateHashedPassword(input.opassword)
    console.log(hashPassword)
    input.opassword=hashPassword
    let organization=new organizationsmodel(input)
    organization.save()
    res.json({"status":"success"})
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

app.get("/vieworganization",(req,res)=>{
    organizationsmodel.find().then(
      (data)=>{
          res.json(data)
      }
    ).catch((error)=>{
  
      res.json(error)
    })  
  })

// feedback
app.post("/addfeedback",(req,res)=>{
    let input=req.body
    console.log(input)
    let feedback=new feedbacksmodel(input)
    feedback.save()
    res.json({"status":"success"})
})

app.get("/viewfeedback",(req,res)=>{
    feedbacksmodel.find().then(
      (data)=>{
          res.json(data)
      }
    ).catch((error)=>{
  
      res.json(error)
    })  
  })
  

// add street light
app.post("/addstreetlight",(req,res)=>{
    let input=req.body
    console.log(input)
    let addstreetlight=new addstreetlightsmodel(input)
    addstreetlight.save()
    res.json({"status":"success"})

})
app.get("/viewstreetlight", (req, res) => {
    addstreetlightsmodel.find().then(
        (data) => {
            res.json(data)
        }
    ).catch((error) => {
        res.json(error)
    })
})


//requests
app.post("/addqueries",(req,res)=>{
    let input=req.body
    console.log(input)
    let query=new queriesmodel(input)
    query.save()
    res.json({"status":"success"})

})

app.get("/viewqueries", (req, res) => {
    queriesmodel.find().then(
        (data) => {
            res.json(data)
        }
    ).catch((error) => {
        res.json(error)
    })
})

//addreply
app.post("/addreply",(req,res)=>{
    let input=req.body
    console.log(input)
    let addreply=new addrepliesmodel(input)
    addreply.save()
    res.json({"status":"success"})

})
app.get("/viewreply", (req, res) => {
    addrepliesmodel.find().then(
        (data) => {
            res.json(data)
        }
    ).catch((error) => {
        res.json(error)
    })
})


app.listen(8080, () => {
    console.log("server started")
})
