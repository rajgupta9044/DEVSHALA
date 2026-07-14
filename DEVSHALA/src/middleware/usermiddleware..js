const jwt= require('jsonwebtoken');
const User=require('../models/user');
const redisClient =require('../config/redis');

// Is this request coming from a logged-in user?

const userMiddleware=async(req,res,next)=>{

    //VALIDATE THE TOKEN

    try{
        const {token} =req.cookies;

        if(!token){
            throw new Error("token is not present or User isn't logged in");
        }

        const payload= await  jwt.verify(token,process.env.JWT_SECRET);
        

        const {_id}=payload;

        if(!_id)
        throw new Error("Id is missing");


        //BUT JWT IS ACTIVE FOR ANOTHER HOUR AND ADMIN DELETED A ENTRY 
        //SO WE CHECK IF USER STILL EXISTS

        const result =await User.findById(_id);

        if(!result){
            throw new Error("User does not exist");
        }


        //REDIS KI BLOCKLIST ME PRESENT TO NHI HAI

        const isBlocked =await redisClient.exists(`token:${token }`);

        if(isBlocked){
            throw new Error("Invalid token");
        }

        req.result=result;

        next();

    }

    catch(err){
        res.status(401).send("Error:" +err.message);
    }
}


module.exports=userMiddleware;