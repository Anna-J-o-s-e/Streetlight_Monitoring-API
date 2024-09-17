const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "replyname":{type: String,required: true},
        "replymail":{type: String,required: true},
        "replydate":{type: String,required: true},
        "solution":{type:String,required: true}
    }
)
let addrepliesmodel=mongoose.model("addreplies",schema)
module.exports={addrepliesmodel}