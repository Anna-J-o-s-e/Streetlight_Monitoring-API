const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "orgname":{type: String,required: true},
        "orgmail":{type: String,required: true},
        "orgpassword":{type:String,required: true}
    }
)
let commonloginsmodel=mongoose.model("commonlogins",schema);
module.exports={commonloginsmodel}