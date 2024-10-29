const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.userSignUp = async(req,res) => {
    try
    {
        const {name,email,password,phoneNumber,role} = req.body

        if(!name || !email || !password || !phoneNumber)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        const existingUser = await User.findOne({email:email});

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            phoneNumber,
            role
        })

        const savedUser = await newUser.save()

        return res.status(200).json({
            success:true,
            data:savedUser,
            message:"New user added"
        })

    }
    catch(e)
    {
        return res.status(500).json({
            success:false,
            message:"Error in adding new user : "+e.message
        })
    }
}

exports.getAllUsers = async(req,res) => {
    try
    {
        const users = await User.find()

        return res.status(200).json({
            success:true,
            data:users,
            message:"Users fetched."
        })
    }
    catch(e)
    {
        return res.status(500).json({
            success:false,
            message:"Error in fetching users : "+e.message
        })
    }
}

exports.getUserById = async(req,res) => {
    try
    {
        let {userId} = req.params

        const user = await User.findById(userId).populate('sentMessages').populate('messagesReceived')
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:`No user exists with this ID ${userId}`
            })
        }

        return res.status(200).json({
            success:true,
            data:user,
            message:"User fetched sucessfully"
        })
    }
    catch(e)
    {
        return res.status(500).json({
            success:false,
            message:"Error in fetching user by ID : "+e.message
        })
    }
}

exports.userLogin = async(req,res) => {
    try
    {
        const {email,password} = req.body
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        let user = await User.findOne({email:email})
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User not registered."
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }

        if(await bcrypt.compare(password,user.password))
        {
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})

            user = user.toObject()
            user.token = token
            user.password = undefined
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Login successful."
            })
        }
        else
        {
            return res.status(403).json({
                success:false,
                message:"Incorrect password."
            })
        }
    }
    catch(e)
    {
        return res.status(500).json({
            success:false,
            message:"Error in fetching user by ID : "+e.message
        })
    }
}

//  1 :- add user = user.toObject 