import {Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import HomePage from "./pages/homepage";
import Admin  from "./pages/adminPanel";
import {checkAuth} from "./authSlice";
import {useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import AdminCreate from "./components/AdminCreate";
import AdminDelete from "./components/AdminDelete"




function App(){

  //CHECK USER AUTHENTICATED OR NOT

  const {isAuthenticated,loading,user} =useSelector((state)=>state.auth)

  console.log({
    loading,
    isAuthenticated,
    user
});
  
  const dispatch =useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
},[dispatch]);


if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

  return(

    <>
    <Routes>

  <Route path="/" element={
      isAuthenticated ? (
        <HomePage />
      ) : (
        <Navigate to="/signup" />
      )
    }
  />

  <Route
    path="/login"
    element={
      isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Login />
      )
    }
  />

  <Route
    path="/signup"
    element={
      isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <SignUp />
      )
    }
  />

  
<Route path="/admin" element={ isAuthenticated && user?.role==='admin' ?<Admin/> : <Navigate to="/"></Navigate>}/>
<Route path="/admin/create" element={
        isAuthenticated && user?.role === "admin"? <AdminCreate />: <Navigate to="/" />
        }
/>
<Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />


</Routes>

    
    </>
  )
}

export default App ;