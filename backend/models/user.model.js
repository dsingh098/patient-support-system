const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    issue: {
        type:String,
        required: true
    },
    category: {
        type:String
    },
    response:{
        type:String
    }
}, {timestamps: true})

const User = mongoose.model("User",userSchema)

module.exports = User