const Problem =require("../models/problem");
const Submission=require("../models/submissions");
const {getLanguageById,submitBatch,submitToken}=require('../utils/problemutility');

const submitCode=async(req,res)=>{


    try{
        const userId=req.result._id;
        const problemId=req.params.id;

        const {code,language}=req.body;

        if(!userId || !problemId || !code || !language){
            return res.status(400).send("Some Field Missing");
        }


        //FETCH THE PROBLEM FROM DATABASE

        const  problem =await Problem.findById(problemId);
        const { hiddenTestcases } = problem;


        //STORE THE SUBMISSION IN THE DATABASE

        const submittedResult =await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesPassed:0,
            status:'pending',
            testCasesTotal:problem.hiddenTestcases.length
        })

        //JUDGE0 KO CODE SUBMIT KREGE

        const languageId=getLanguageById(language);

            const submissions=hiddenTestcases.map(testcase=>({
                source_code:code,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));


            //SUBMIT IT IN BATCH TO JUDGE0
             //return the tokens 

           const  submitResult =await submitBatch(submissions);
           
           if (!submitResult) {
            return res.status(500).send("Judge0 did not return any response.");
        }


            //EXTRACT AND MAKE A ARRAY OF TOKENS
           const resultToken =submitResult.map((value)=>value.token);


           //EXTRACT THE RESULT
           const testResult =await submitToken(resultToken);


           //SUBMITRESULT KO UPDATE 

           let testCasesPassed=0;
            let runtime=0;
            let memory=0;
            let errorMessage=null;
            let status="pending";

           for(const test of testResult){

            if(test.status_id==3){
                testCasesPassed++;
                runtime=runtime+parseFloat(test.time);
                memory=Math.max(memory,test.memory);
                status='accepted';

            }
            else{

                if(test.status_id==4){
                    status='error';
                    errorMessage=test.stderr

                }
                else{
                    status='wrong';
                    errorMessage=test.stderr
                }
            }

           }
           
           // STORE THE RESULT IN DATABASE IN SUBMISSION

           submittedResult.status=status;
           submittedResult. testCasesPassed= testCasesPassed;
           submittedResult.errorMessage=errorMessage;
           submittedResult.runtime=runtime;
           submittedResult.memory=memory;

           await submittedResult.save();

           //PROBLEM ID KO INSERT KREGE USERSCHEMA KE PROBLEM SOLVED ME AGAR PRESENT NHI HUA 

           if(!req.result.problemSolved.includes(problemId)){
            req.result.problemSolved.push(problemId);
            await req.result.save();
           }



           res.status(201).send(submittedResult);



    }

    catch(err){

        res.status(500).send("Error"+err);

    }
}


const runCode =async(req,res)=>{

    
    try{
        const userId=req.result._id;
        const problemId=req.params.id;

        const {code,language}=req.body;

        if(!userId || !problemId || !code || !language){
            return res.status(400).send("Some Field Missing");
        }


        //FETCH THE PROBLEM FROM DATABASE

        const  problem =await Problem.findById(problemId);
        const { visibleTestcases } = problem;


        //JUDGE0 KO CODE SUBMIT KREGE

        const languageId=getLanguageById(language);

            const submissions=visibleTestcases.map(testcase=>({
                source_code:code,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));


            //SUBMIT IT IN BATCH TO JUDGE0
             //return the tokens 

           const  submitResult =await submitBatch(submissions);
           
           if (!submitResult) {
            return res.status(500).send("Judge0 did not return any response.");
        }


            //EXTRACT AND MAKE A ARRAY OF TOKENS
           const resultToken =submitResult.map((value)=>value.token);


           //EXTRACT THE RESULT
           const testResult =await submitToken(resultToken);

           res.status(201).send(testResult);



    }

    catch(err){

        res.status(500).send("Error"+err);

    }
}


module.exports={submitCode,runCode};