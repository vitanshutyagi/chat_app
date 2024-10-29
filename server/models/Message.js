const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    content:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Message",messageSchema)