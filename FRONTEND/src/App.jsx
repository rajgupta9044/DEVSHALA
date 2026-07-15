import {Routes, Route } from "react-router";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import HomePage from "./pages/homepage";


function App(){

  return(

    <>
    <Routes>

      <Route path='/' element={<HomePage/>}></Route>
       <Route path='/login' element={<Login/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
    </Routes>

    
    </>
  )
}

export default App ;