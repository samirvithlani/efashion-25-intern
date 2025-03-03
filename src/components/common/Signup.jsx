import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  // firstName:str
  // lastName:str
  // age:int
  // status:bool
  // role_id:str
  // email:str
  // password:str

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();
  const submitHandler = async (data) => {
    data.role_id = "67beb40ae44bac5f3f079e11";
    data.status = data.status == "true" ? true : false;
    console.log("formData...", data);

    //api call
    const res = await axios.post("/user", data);
    console.log(res); //axios
    console.log(res.data); //api response
    if (res.status === 201) {
      alert("Signup success");
      navigate("/login") // check in app.j slogin...
    } else {
      alert("Signup failed");
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>firstName</label>
          <input type="text" {...register("firstName")} />
        </div>
        <div>
          <label>lastName</label>
          <input type="text" {...register("lastName")} />
        </div>
        <div>
          <label>age</label>
          <input type="number" {...register("age")} />
        </div>
        <div>
          <label>status</label>
          <input type="text" {...register("status")} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
        </div>
        <div>
          <input type="submit" value="Signup" />
        </div>
      </form>
    </div>
  );
};
