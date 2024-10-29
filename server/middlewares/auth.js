const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req,res,next) => {
    try
    {
        // extract jwt token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")
        console.log("Token in auth = ",token);
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Token missing."
            })
        }

        // verify token
        try
        {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log("decode = ",decode);

            req.user = decode

        }
        catch(e)
        {
            return res.status(401).json({
                success:false,
                message:"Token in invalid."
            })
        }

        next()
    }
    catch(err)
    {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the token."
        })
    }
}

exports.isStudent = (req,res,next) => {
    try
    {
        if(req.user.role !== "Student")
        {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student only !!!"
            })
        }
        next()
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"user role is not matching."
        })
    }
}
exports.isTeacher = (req,res,next) => {
    try
    {
        if(req.user.role !== "Teacher")
        {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for teacher only !!!"
            })
        }
        next()
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"user role is not matching."
        })
    }
}
exports.isInstitute = (req,res,next) => {
    try
    {
        if(req.user.role !== "Institute")
        {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for institute only !!!"
            })
        }
        next()
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"user role is not matching."
        })
    }
}