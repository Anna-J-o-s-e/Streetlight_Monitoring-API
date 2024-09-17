const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "location": { type: String, required: true },
        "date": { type: String, required: true },
    }
)
let addstreetlightsmodel=mongoose.model("addstreetlights",schema)
module.exports={addstreetlightsmodel}