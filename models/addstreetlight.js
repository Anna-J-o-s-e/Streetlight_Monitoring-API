const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        "id": { type: String, required: true, unique: true },
        "fname": { type: String, required: true },  // Added 'name' field
        "status": { type: String, required: true },
        "thingspeakChannelId": { type: String, required: true },
        "location": { type: String, required: true },
        "date": { type: Date, required: false }
    }
);

let addstreetlightsmodel = mongoose.model("addstreetlights", schema);

module.exports = { addstreetlightsmodel };
