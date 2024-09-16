const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "omail":{type: String,required: true},
        "opassword":{type:String,required: true}
    }
)
let organizationsmodel=mongoose.model("organizations",schema);
module.exports={organizationsmodel}

