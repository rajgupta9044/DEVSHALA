const express =require ('express')
const app=express();
require('dotenv').config();
const main=require('./config/db');
const cookieParser=require('cookie-parser')
const authRouter=require('./routes/userauth');
const redisClient=require('./config/redis');
const problemRouter=require('./routes/problemCreator');
const submitRouter=require('./routes/submit');
const cors=require ('cors');
const aiRouter=require('./routes/aiRouter');
const videoRouter = require("./routes/videocreator");

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))

app.use(express.json()); //convert json to js object
app.use(cookieParser());
app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);




const InitialiseConnect=async()=>{

    try{

        await Promise.all([main(),redisClient.connect()]);

        console.log("DB connected");
        
        app.listen(process.env.PORT, () => {
        console.log("Server listening at PORT number:", process.env.PORT);
        })
    }

    catch(err){
    console.log("Error Occured :"+err);
  }

}
 
InitialiseConnect();
















// main()
//   .then(() => {

//     app.listen(process.env.PORT, () => {
//       console.log("Server listening at PORT number:", process.env.PORT);
//     });

//   })
//   .catch((err) => {
//     console.log("Error Occured :"+err);
//   });


