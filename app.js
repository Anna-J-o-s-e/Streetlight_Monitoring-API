const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs") //encryption
const axios=require("axios")

const { usersmodel } = require("./models/user")
const{organizationsmodel}=require("./models/organization")
const {adminsmodel}=require("./models/admin")
const {feedbacksmodel}=require("./models/feedback")
const {addstreetlightsmodel}=require("./models/addstreetlight")
const { queriesmodel } = require("./models/query")
const { addrepliesmodel } = require("./models/addreply")


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
// Backend (Express.js)
app.post("/userlogin", async (req, res) => {
    const { umail, upassword } = req.body;
    try {
        const user = await usersmodel.findOne({ umail: umail });
        if (!user) {
            return res.json({ "status": "User Not Found" });
        }

        const isMatch = await bcrypt.compare(upassword, user.upassword);
        if (isMatch) {
            // Return user details upon successful login
            return res.json({
                "status": "success",
                userId: user._id,
                uname:user.uname,
                umail: user.umail,
                uaddress: user.uaddress,
                uphone: user.uphone,
                utype: user.utype,
                uadmsno: user.uadmsno
            });
        } else {
            return res.json({ "status": "Incorrect Password" });
        }
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});




// DELETE API to remove a user
app.delete('/api/users/:uadmsno', async (req, res) => {
    const { uadmsno } = req.params;

    try {
        // Find and delete user by uadmsno
        const deletedUser = await usersmodel.findOneAndDelete({ uadmsno });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        return res.status(200).json({ message: 'User deleted successfully!', data: deletedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
});


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

// DELETE API to remove an organization
app.delete('/api/organizations/:oid', async (req, res) => {
    const { oid } = req.params;

    try {
        // Find and delete organization by oid
        const deletedOrganization = await organizationsmodel.findOneAndDelete({ oid });

        if (!deletedOrganization) {
            return res.status(404).json({ message: 'Employee not found!' });
        }

        return res.status(200).json({ message: 'Employee deleted successfully!', data: deletedOrganization });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting Employee', error });
    }
});


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

//search reply
app.post("/Searchreply", (req, res) => {
    let input = req.body
    addrepliesmodel.find(input).then(
        (data) => {
            res.json(data)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
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
// Function to fetch live data from ThingSpeak
const fetchThingSpeakData = async (channelId) => {
    try {
        // Make the API call to ThingSpeak
        const response = await axios.get(`https://api.thingspeak.com/channels/${channelId}/fields/1/last.json`);
        
        console.log(`Response from ThingSpeak for channel ${channelId}:`, response.data); // Debugging
        
        // Check if response data is available and valid
        if (response.data && response.data.field1) {
            const statusValue = parseInt(response.data.field1, 10); // Parse as integer
            
            // Debug the parsed status value
            console.log(`Parsed status value for channel ${channelId}:`, statusValue);

            // Determine status based on the value
            const status = (!isNaN(statusValue) && statusValue > 100) ? 'ON' : 'OFF'; // Update status based on value
            return status; // Return only the status
        } else {
            // No valid data found, set status to OFF
            console.warn(`No valid data found for channel ${channelId}. Setting status to OFF.`);
            return 'OFF';
        }
    } catch (error) {
        // Log the error for debugging
        console.error(`Error fetching data from ThingSpeak for channel ${channelId}:`, error);
        return 'OFF'; // Default value in case of an error
    }
};

// API to get the status of all streetlights (including live data from ThingSpeak)
app.get('/viewstreetlights', async (req, res) => {
    try {
        // Fetch all streetlights from the database
        const streetlights = await addstreetlightsmodel.find();

        // Fetch the live status for each streetlight from ThingSpeak
        const updatedStreetlights = await Promise.all(
            streetlights.map(async (streetlight) => {
                const status = await fetchThingSpeakData(streetlight.thingspeakChannelId); // Get status
                console.log(`Live status for ${streetlight.thingspeakChannelId}:`, status); // Debugging

                // Update the status of the streetlight based on live data
                return {
                    id: streetlight.id,
                    fname: streetlight.fname,
                    status: status,  // Use live data to update status
                    thingspeakChannelId: streetlight.thingspeakChannelId,
                    location: streetlight.location,
                    date: streetlight.date
                };
            })
        );

        // Send the updated streetlights data as a response
        res.json(updatedStreetlights);
    } catch (error) {
        console.error('Error fetching streetlights:', error);
        res.status(500).json({ message: 'Error fetching streetlights' });
    }
});



 
  
// API to add a new streetlight with ThingSpeak Channel ID
app.post('/addstreetlights', async (req, res) => {
    const { id, thingspeakChannelId } = req.body;
    let input=req.body
    console.log(input)
  
    try {
      const newStreetlight = new addstreetlightsmodel(input);
      await newStreetlight.save();
  
      // Respond with the created streetlight and a success status
      res.json({
        streetlight: newStreetlight,
        status: "success"
      });
    } catch (error) {
      console.error('Error adding streetlight:', error);
      res.status(500).json({ message: 'Error adding streetlight' });
    }
  });

  




app.listen(8080, () => {
    console.log("server started")
})
