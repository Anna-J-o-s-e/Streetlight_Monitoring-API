const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "aname":{type: String,required: true},
        "amail":{type: String,required: true},
        "apassword":{type:String,required: true}
    }
)
let adminsmodel=mongoose.model("admins",schema)
module.exports={adminsmodel}