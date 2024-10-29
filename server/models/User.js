const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
    },
    active:{
        type:Boolean,
        default:true
    },
    sentMessages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    messagesReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    phoneNumber: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum:["Teacher","Student","Institute"],
        required:true
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model("User",userSchema)