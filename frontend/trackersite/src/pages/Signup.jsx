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
    const [profileImage,setprofileImage] = useState(null);
    const navigate = useNavigate();


    const handlesignup = async ()=>{
      try{const formdata = new FormData();
  
      formdata.append("firstname",firstname);
      formdata.append("lastname",lastname);
      formdata.append("email",email);
      formdata.append("phone",phone);
      formdata.append("dateofbirth",dateofbirth,);
      formdata.append("password",password);
      if(profileImage)
      formdata.append("profileImage",profileImage);
    
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",
        formdata,
        {
          headers: {"Content-Type":"multipart/form-data"}
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }catch(err){
      console.log(err);
      alert("Signup failed")
    }



    }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange = {(e)=>{setFirstName(e.target.value)} }placeholder="John" label={"First Name"} />
        <InputBox onChange = {(e)=>{setLastName(e.target.value)} } placeholder="Doe" label={"Last Name"} />
        <InputBox onChange = {(e)=>{setemail(e.target.value)} }placeholder="john@gmail.com" label={"Email"} />
        <InputBox onChange = {(e)=>{setPassword(e.target.value)} }placeholder="John@123"  label={"Password"} type="password" />
        <InputBox onChange = {(e)=>{setphone(e.target.value)} }placeholder="9823586727" label={"Phone number"} />
        <InputBox onChange = {(e)=>{setdateofbirth(e.target.value)} }placeholder="yyyy-MM--DD" label={"date of birth"} />
        
        <div className="text-left mt-2">
          <label className="text-sm font-medium text-left py-2">Profile Image</label>
          <input type="file"
          accept="image/*"  
          onChange={(e)=> setprofileImage(e.target.files[0])} 
          className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>



        <div className="pt-4">
          <Button onClick={handlesignup}
           label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}
