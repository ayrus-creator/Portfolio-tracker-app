import { BrowserRouter,Route ,Routes } from "react-router-dom"

import {Signup} from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { Endpoint } from "./pages/Endpoint"

function App() {
  

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Signup/>}></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/endpoint" element={<Endpoint/>}></Route>
    </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
