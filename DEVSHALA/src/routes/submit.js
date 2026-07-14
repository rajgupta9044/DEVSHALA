const express=require('express');
const userMiddleware=require('../middleware/usermiddleware.')
const submitRouter=express.Router();
const submitCode=require('../controllers/usersubmission');



submitRouter.post("/submit/:id",userMiddleware,submitCode);


module.exports=submitRouter;