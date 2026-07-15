const express=require('express');
const userMiddleware=require('../middleware/usermiddleware.')
const submitRouter=express.Router();
const {submitCode,runCode}=require('../controllers/usersubmission');



submitRouter.post("/submit/:id",userMiddleware,submitCode);
submitRouter.post("/run/:id",userMiddleware,runCode);



module.exports=submitRouter;