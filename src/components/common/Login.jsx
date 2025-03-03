import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const{register,handleSubmit}=useForm()
    const navigate = useNavigate()
    const submitHandler= async(data)=>{
        console.log("formData...",data)
        
        const res = await axios.post("/user/login", data);
        console.log(res.data.user._id); //axios
        console.log(res.data); //api response
        if(res.status === 200){
            localStorage.setItem("id",res.data.user._id)
            localStorage.setItem("role",res.data.user.role.name)
            if(res.data.user.role.name ==="USER"){
                navigate("/user")
            }
            else if(res.data.user.role.name ==="VENDOR"){
                navigate("/vendor")
            }
            //alert("Login success");

        }
    }
  return (
    <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label>EMAIL</label>
                <input type="email" {...register("email")} />
            </div>
            <div>
                <label>PASSWORD</label>
                <input type="password" {...register("password")} />
            </div>
            <div>
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    </div>
  )
}
