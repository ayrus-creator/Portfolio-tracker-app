import { Button } from "./Button"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    // Replace with backend call
   const [user,setUser]= useState([])
    
    useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:3000/api/v1/user/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
        const userdetails = res.data.userdetails
        console.log(userdetails)
        setUser(res.data.userdetails); // Response will contain user info
        })
    .catch(err => {
      console.error("Error fetching user:", err);
    });
  }, []);
return <>
        
        
        <div>
            {/* {user.map(user => <User user={user} />)} */}
            {user.map((user)=>{return <User user={user}/>})}
        </div>
    </> 
}
 
function User({user}) {
    const navigate = useNavigate()
    return <div className="  bg-red-200  w-120 mt-20 ml-120 pt-10 pb-6 rounded-xl text-lg">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex justify-center items-center gap-3">
                            <img className="h-15 w-15 p-1 rounded-full object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900">{user.firstname} {user.lastname}</h3>
                                
                            </div>
                        </div>
                        <span className="p-4"><Button   label={"View portfolio"} onClick={()=>{navigate("/endpoint")} } ></Button></span>
                    </div>
                    <p className="p-2 ">📧{user.email}</p>
                
                    <br></br><br></br>
                    <div className="flex justify-between items-center">
                        <p className="pl-2">📱{user.phone} </p>
                        <p className="pr-2">🎂 {user.dateofbirth} </p>
                    </div>
                </div>
}