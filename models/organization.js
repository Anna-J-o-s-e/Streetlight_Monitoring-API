const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "oname":{type: String,required: true},
        "oaddress":{type: String,required: true},
        "ophone":{type: String,required: true},
        "omail":{type: String,required: true},
        "opassword":{type:String,required: true}
    }
)
let organizationsmodel=mongoose.model("organizations",schema);
module.exports={organizationsmodel}

