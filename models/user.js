const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "uname":{type: String,required: true},
        "umail":{type: String,required: true},
        "uaddress":{type: String,required: true},
        "uphone":{type: String,required: true},
        "upassword":{type:String,required: true}
    }
)
let usersmodel=mongoose.model("users",schema);
module.exports={ usersmodel }