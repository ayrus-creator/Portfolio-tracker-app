import { useState } from "react"
import {BottomWarning} from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import  axios  from "axios"

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email , setemail] = useState("");
    const [phone , setphone] = useState("");
    const [dateofbirth , setdateofbirth] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange = {(e)=>{setFirstName(e.target.value)} }placeholder="John" label={"First Name"} />
        <InputBox onChange = {(e)=>{setLastName(e.target.value)} } placeholder="Doe" label={"Last Name"} />
        <InputBox onChange = {(e)=>{setemail(e.target.value)} }placeholder="surya@gmail.com" label={"Email"} />
        <InputBox onChange = {(e)=>{setPassword(e.target.value)} }placeholder="123456"  label={"Password"} type="password" />
        <InputBox onChange = {(e)=>{setphone(e.target.value)} }placeholder="9823586727" label={"Phone number"} />
        <InputBox onChange = {(e)=>{setdateofbirth(e.target.value)} }placeholder="yyyy-MM--DD" label={"date of birth"} />
        
        <div className="pt-4">
          <Button onClick={async()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
              firstname:firstname,
              lastname:lastname,
              email:email,
              password:password,
              phone:phone,
              dateofbirth : dateofbirth
            })
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard");
          }}
           label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}
