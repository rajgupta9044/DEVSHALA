const User=require("../models/user");
const validate =require('../utils/validator');
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');
const redisClient =require('../config/redis');

const register=async(req,res)=>{

    try{

        //validate the data

        validate(req.body);

        const{firstName,emailId ,password}=req.body;

        req.body.password=await bcrypt.hash(password,10);

        //IF ANYONE COMES FROM THIS PATH ALWAYS REGISTER AS USER

        req.body.role='user';

        const user= await User.create(req.body);

        const token=jwt.sign({_id:user._id,emailId:emailId,role:'user'},process.env.JWT_SECRET,{expiresIn:60*60});

        res.cookie('token',token,{maxAge:60*60*1000});
        
        res.status(201).send("User Registered Successully");

    }

    catch(err){
        res.status(400).send("Error"+ err);
    }
}

const login=async(req,res)=>{

    

    try{
        const {emailId,password}=req.body;

        if(!emailId)
        throw new Error("Email missing");

        if(!password)
        throw new Error("password missing");

       const user= await User.findOne({emailId});

       if(!user)
        throw new Error("User does not Exist");
       

       const match=await bcrypt.compare(password,user.password);

       if(!match)
        throw new Error("Invalid Credentials");

        const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_SECRET,{expiresIn:60*60});

        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).send("Logged in Successfully");

    }

    catch(err){
        res.status(401).send("Error:"+ err);
    }

}

const logout=async(req,res)=>{
 
    try{
        

        const  {token} =req.cookies;

        const payload=jwt.decode(token);
       
        //ADD TOKEN ON THE REDIS BLOCKLIST

        await redisClient.set(`token:${token}`,'Blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);


        //CLEAR THE COOKIES
        res.cookie('token',null,{expires:new Date(Date.now())});
        res.send("logged Out Successfully");

    }

    catch(err){
        res.status(503).send("Error:"+err.message);
    }
}

const adminRegister=async(req,res)=>{

    try{

        //validate the data

        validate(req.body);

        const{firstName,emailId ,password}=req.body;

        req.body.password=await bcrypt.hash(password,10);

        //ADMIN CAN REGISTER PERSON AS USER OR ADMIN BOTH

        

        const user= await User.create(req.body);

        const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_SECRET,{expiresIn:60*60});

        res.cookie('token',token,{maxAge:60*60*1000});
        
        res.status(201).send("Registered Successully");

    }

    catch(err){
        res.status(400).send("Error"+ err);
    }
}

module.exports={register,login,logout,adminRegister};