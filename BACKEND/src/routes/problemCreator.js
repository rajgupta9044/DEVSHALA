const express=require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const problemRouter= express.Router();
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem ,SolvedAllProblemByUser,submittedProblem}=require('../controllers/userProblem');
const userMiddleware=require('../middleware/usermiddleware.');



//CREATE 

problemRouter.post("/create",adminMiddleware,createProblem); //ADMIN 



//FETCH



problemRouter.get("/problemSolvedByUser",userMiddleware,SolvedAllProblemByUser);
problemRouter.get("/getAllProblem",userMiddleware,getAllProblem);
problemRouter.get("/problemById/:id",userMiddleware,getProblemById );
problemRouter.get("/submittedProblem/:pid",userMiddleware,submittedProblem);


//UPDATE

problemRouter.put("/update/:id",adminMiddleware,updateProblem);  //ADMIN 


// //DELETE

problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);  //ADMIN 

module.exports=problemRouter;


