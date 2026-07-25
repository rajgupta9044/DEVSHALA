import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { registerUser } from '../authSlice';
import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";

//SCHEMA VALIDATION FOR SIGNUP SCHEMA

const signupSchema = z
  .object({
    firstName: z.string().min(3, "Name should contain at least 3 characters"),

    emailId: z.string().email("Enter a valid email"),

    password: z
      .string()
      .min(8, "Password should contain at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[@$!%*?&^#()_\-+=]/,
        "Password must contain at least one special character."
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUp(){

    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


     const {register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(signupSchema)});
     const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

     //EK BAAR CHALEGA AUR AGAR ISAUTHENTICATED KI VALUE CHANGE HUI TBHI DUBARA CHALEGA
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
        }
    },[isAuthenticated,navigate]);

     const onSubmit=(data)=>{
        dispatch(registerUser(data));
     };

     return(
          <>

         <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
            Devshala
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
            Create your account
        </p>

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            {/* First Name */}

            <div>

                <label className="label">
                    <span className="label-text font-medium">
                        First Name
                    </span>
                </label>

                <input
                    {...register("firstName")}
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-bordered w-full"
                />

                {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                    </p>
                )}

            </div>

            {/* Email */}

            <div>

                <label className="label">
                    <span className="label-text font-medium">
                        Email
                    </span>
                </label>

                <input
                    {...register("emailId")}
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                />

                {errors.emailId && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.emailId.message}
                    </p>
                )}

            </div>

            {/* Password */}

<div>
  <label className="label">
    <span className="label-text font-medium">
      Password
    </span>
  </label>

  <div className="relative">
    <input
      {...register("password")}
      type={showPassword ? "text" : "password"}
      placeholder="Create a password"
      className="input input-bordered w-full pr-12"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {errors.password.message}
    </p>
  )}
</div>

            {/* Confirm Password */}

            <div>
  <label className="label">
    <span className="label-text font-medium">
      Confirm Password
    </span>
  </label>

  <div className="relative">
    <input
      {...register("confirmPassword")}
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm password"
      className="input input-bordered w-full pr-12"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.confirmPassword.message}
    </p>
  )}
</div>


            {/* SUBMIT BUTTON */}

            <button
                type="submit"
               className={`btn bg-violet-600 hover:bg-violet-700 text-white border-none w-full ${
                loading ? "loading" : "" }`}
                disabled ={loading}

            >
             {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-500">

                Already have an account?

                <Link className="text-violet-600 font-medium cursor-pointer hover:underline ml-1"
                to='/login '>
                    Sign In
                </Link>

            </p>

        </form>

    </div>

</div>
          </>
     )

}

export default SignUp;







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