import { Button } from "./Button"
import { useNavigate } from "react-router-dom"



export function Appbar ({user}) {
    const navigate = useNavigate()
    return <div user={user} className="shadow h-16 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
          Portfolio-Tracker 
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-2 py-6  px-6 me-1 mb-1 ">
               <Button onClick={()=>{
                localStorage.removeItem('token');
                navigate("/signin")
               }} label="Logout"></Button>
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    DS
                </div>
            </div>
        </div>
    </div>
}