const {getLanguageById,submitBatch,submitToken}=require('../utils/problemutility');
const Problem =require('../models/problem');
const User =require('../models/user');
const Submission=require('../models/submissions');


const createProblem=async (req,res)=>{

    const {title,description,difficulty,
        tags, visibleTestcases,hiddenTestcases,
        startCode,referenceSolution,problemCreator} =req.body ;

    try{

        for (const {language,completeCode} of referenceSolution){

            //FORMAT FOR JUDGE0 :source_code ,language_id ,stdin, expectedOutput


            const languageId=getLanguageById(language);


            //CREATING BATCH SUBMISSION
            
            const submissions=visibleTestcases.map(testcase=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));

            //return the tokens 
           const  submitResult =await submitBatch(submissions);
           
           if (!submitResult) {
            return res.status(500).send("Judge0 did not return any response.");
        }


            //EXTRACT AND MAKE A ARRAY OF TOKENS
           const resultToken =submitResult.map((value)=>value.token);

           const testResult =await submitToken(resultToken);

           //console.log(testResult);
                
           for(const test of testResult){

            if (test.status_id!=3){
              return   res.status(400).send(test.status.description);
           }
        }
           
        }

        //WE CAN STORE IT IN THE DATABASE

       const userProblem= await Problem.create({
            ...req.body,  
            problemCreator:req.result._id

        });


        res.status(201).send("Problem Saved Successfully");
    }


    catch(err){
    res.status(400).send(err.message);
}

        
}


const updateProblem=async (req,res)=>{


     const {id}=req.params;

      const {title,description,difficulty,
        tags, visibleTestcases,hiddenTestcases,
        startCode,referenceSolution,problemCreator} =req.body ;


      try{

        if(!id){
           return  res.status(400).send("Missing Id");
        }

        const dsaProblem =await Problem.findById(id);

        if(!dsaProblem){
            return res.status(404).send("Id is not present in Server");
        }


        for (const {language,completeCode} of referenceSolution){

            //FORMAT FOR JUDGE0 :source_code ,language_id ,stdin, expectedOutput


            const languageId=getLanguageById(language);


            //CREATING BATCH SUBMISSION
            
            const submissions=visibleTestcases.map(testcase=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));

            //return the tokens 
           const  submitResult =await submitBatch(submissions);
           
           if (!submitResult) {
            return res.status(500).send("Judge0 did not return any response.");
        }


            //EXTRACT AND MAKE A ARRAY OF TOKENS
           const resultToken =submitResult.map((value)=>value.token);

           const testResult =await submitToken(resultToken);

           console.log(testResult);
                
           for(const test of testResult){

            if (test.status_id!=3){
              return   res.status(400).send(test.status.description);
            }
        }
           
    }


    const newProblem =await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

    res.status(200).send(newProblem);

 }

    catch(err){
    res.status(500).send("Error:"+err);
    }

}


const deleteProblem=async(req,res)=>{

    const {id}=req.params;

    try{

        if(!id){
            return res.status(400).send("Id is Missing");
        }

        const deletedProblem= await Problem.findByIdAndDelete(id);

        if(!deletedProblem){
           return res.status(404).send("Problem is Missing");
        }

       return  res.status(200).send("Successfully Deleted");
    }

    catch(err){
        res.staus(500).send("Error"+err);
    }
}


const getProblemById=async(req,res)=>{

    const {id}=req.params;

    try{

        if(!id){
            return res.status(400).send("Id is Missing");
        }

        const getProblem=await Problem.findById(id).select('_id title description difficulty tags visibleTestcases');

        if(!getProblem)
        return res.status(404).send("Problem is missing");

        return res.status(200).send(getProblem);
}

    catch(err){
        res.status(500).send("Error:"+err);
    }

}

const getAllProblem=async (req,res)=>{


    try{
    const getProblem= await  Problem.find({}).select('_id title  difficulty tags ');;

    if(getProblem.length==0)
    return res.status(404).send("Problem is Missing");

    return res.status(200).send(getProblem);
    }

    catch(err){
        res.status(404).send("Error"+err);
    }
    
}


const SolvedAllProblemByUser=async(req,res)=>{


    try{

        const userId=req.result._id;

        const  user = await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        });


        res.status(200).send(user.problemSolved);
    }



    catch(err){
        res.status(500).send("Served Error");
    }

}


const submittedProblem=async(req,res)=>{

    try{
        const userId=req.result._id;
        const problemId=req.params.pid;

       const ans=await Submission.find({userId,problemId});

       if(ans.length==0){
        res.status(200).send("No submission");
       }

       res.status(200).send(ans);

    }

    catch(err){
        res.status(500).send("Internal Server Error");
    }
}



module.exports={createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,SolvedAllProblemByUser,submittedProblem};