const express=require('express')

const authRouter= express.Router();
const {register,login,logout,adminRegister} =require('../controllers/userAutht');
const userMiddleware=require('../middleware/usermiddleware.');
const adminMiddleware=require('../middleware/adminMiddleware');

//REGISTER
//LOGIN
//LOGOUT
//GETPROFILE

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/admin/register',adminMiddleware,adminRegister);
// authRouter.get('./getprofile');

module.exports=authRouter;