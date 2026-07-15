import { useForm } from 'react-hook-form';


function SignUp(){


     const {register,handleSubmit,formState: { errors },} = useForm();

}









// import {useEffect,useState} from "react";

// function SignUp(){


//     const [name ,setName]=useState('');
//     const [email,setEmail]=useState('');
//     const [password,setPassword]=useState('');
    

//     const handleSubmit=(e)=>{

//         e.preventDefault();

//         console.log(name,email,password)

//         //FORM KO SUBMIT KR DEGE
//         //BACKEND ME JAAKE SUBMIT HO
//     }

//     return(
//         <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-center items-center gap-y-3 "> 
//         <input type="text" value={name} placeholder="Enter Your FirstName" onChange={(e)=>setName(e.target.value)}></input>
//         <input type="email" value={email} placeholder="Enter Your email" onChange={(e)=>setEmail(e.target.value)}></input>
//         <input type="password" value={password} placeholder="Enter Your Password" onChange={(e)=>setPassword(e.target.value)}></input>
//         <button type="submit">Submit</button>
//         </form>
//     )
// }

// export default SignUp;