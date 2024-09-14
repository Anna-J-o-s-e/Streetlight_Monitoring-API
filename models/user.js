const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":{type: String,required: true},
        "emailid":{type: String,required: true},
        "address":{type: String,required: true},
        "phone":{type: String,required: true},
        "password":{type:String,required: true}
    }
)
let usersmodel=mongoose.model("users",schema);
module.exports={ usersmodel }