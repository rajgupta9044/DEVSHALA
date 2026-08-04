import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../authSlice';


//SCHEMA VALIDATION FOR LOGIN SCHEMA

const loginSchema = z
  .object({
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
  })
 
function Login(){

    const dispatch =useDispatch();
    const navigate=useNavigate();
    const {isAuthenticated,loading ,error} =useSelector((state)=>state.auth);


     const {register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(loginSchema)});


     useEffect(()=>{
             if(isAuthenticated){
                 navigate('/');
             }
         },[isAuthenticated,navigate]);

      const onSubmit=(data)=>{
             dispatch(loginUser(data));
          };

     return(
          <>

         <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
            Devshala
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
           Welcome Back
        </p>

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >


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

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}

            </div>

            {error && (
            <p className="text-red-500 text-sm text-center mb-2">
                {error}
            </p>
            )}

            <button
                type="submit"
               className={`btn bg-violet-600 hover:bg-violet-700 text-white border-none w-full ${
                loading ? "loading" : "" }`}
                disabled ={loading}

            >
             {loading ? "Logging in..." : "Login"}
            </button>



            <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
            to="/signUp"
            className="text-violet-600 font-medium hover:underline"
            >
            Sign Up
            </Link>
            </p>

          

        </form>

    </div>

</div>
          </>
     )

}

export default Login;







