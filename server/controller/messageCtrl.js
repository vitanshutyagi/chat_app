const express = require("express")
const Message = require("../models/Message");
const User = require("../models/User");

exports.sendMessage = async(req,res) => {
    try
    {
        const {receiverEmail,senderEmail,content} = req.body

        if (!receiverEmail || !senderEmail || !content) {
            return res.status(400).json({ error: 'Receiver email, sender email, and content are required' });
        }

        const sender = await User.findOne({email:senderEmail})
        const receiver = await User.findOne({email:receiverEmail})

        if (!sender) {
            return res.status(404).json({ error: 'Sender not found' });
        }
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        const newMessage = new Message({
            content:content,
            sender:sender._id,
            receiver:receiver._id
        })

        const savedMessage = await newMessage.save()
        
        // updating the sender and receiver sent and received messages
        sender.sentMessages.push(savedMessage._id)
        receiver.messagesReceived.push(savedMessage._id)

        await sender.save()
        await receiver.save()

        res.status(200).json({
            success:true,
            data:savedMessage,
            message:"Message saved."
        })


    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            message:"Error in saving message : "+e.message
        })
    }
}

exports.getSentMessages = async(req,res) => {
    try
    {
        const {userId} = req.params
        const user = await User.findById(userId).populate('sentMessages')

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success:true,
            data:user.sentMessages,
            message:"Sent messages fetched"
        })
    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            message:"Error in getting sent message : "+e.message
        })
    }
}
exports.getReceivedMessages = async(req,res) => {
    try
    {
        let {userId} = req.params
        console.log("userId in fetch msgss = ",userId);

        const user = await User.findById(userId).populate('messagesReceived')

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success:true,
            data:user.messagesReceived,
            message:"rcvd msgs fetched"
        })

        // console.log("user = ",user);

        // const messageIds = user.messagesReceived;

        // const messages = await Message.find({ _id: { $in: messageIds } });

        // res.status(200).json({
        //     success:true,
        //     data:messages,
        //     message:"Fetched received message "
        // })
    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            message:"Error in getting received message : "+e.message
        })
    }
}