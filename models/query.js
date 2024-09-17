const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "rname":{type: String,required: true},
        "rmail":{type: String,required: true},
        "rdate":{type: String,required: true},
        "rtype":{type: String,required: true},
        "query":{type:String,required: true}
    }
)
let queriesmodel=mongoose.model("queries",schema)
module.exports={queriesmodel}