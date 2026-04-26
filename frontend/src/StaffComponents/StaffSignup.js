import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import mongoose from "mongoose"; // make sure imported
import './StaffSignup.css';
const StaffSignup = () => {
      const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [password, setPassword] = useState("");
  const[departmentId,setdeptid]=useState("");
  const [role,setrole]=useState("");
  const navigate = useNavigate();
  const API = "http://localhost:5000";

  const handleSubmit= async(event)=>{
   event.preventDefault();
   
    try {
       if (role === "staff") {
      if (!mongoose.Types.ObjectId.isValid(departmentId)) {
        return res.status(400).json("Invalid department ID format");
      }
    }
      const res = await axios.post(
        `${API}/signup`,
        { name, email, password, address,role,departmentId},
        { withCredentials: true }
      );

      console.log(res.data);
      alert("Signup successful!");
      navigate('/login');
    } 
   catch (error) {
  console.error("Signup Error:", error);

  if (error.response) {
    alert(error.response.data);
  } else if (error.request) {
    alert("No response from server! Check your connection.");
  } else {
    alert("Unexpected error occurred");
  }
}

  }

 
  function navigationtologin(){
        navigate('/staff/login');

  }

  useEffect(()=>{
    setrole("staff");
  },[]);
  
  return (
    <div className="signup-container">
 <h2>Staff Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
        <input
  type="email"
  id="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  required
  title="Please enter a valid email address"
/>

        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Enter your full address"
            required
          />
           <input
            type="text"
            id="departmentId"
            value={departmentId}
            onChange={(e) => setdeptid(e.target.value)}
            placeholder="Enter your department Id"
            required
          />
  

        </div>

        <button type="submit" id="btn2" > Submit</button>
      </form>
                <button type="button" className="btn1" onClick={navigationtologin}>login </button>


    </div>
  )
}

export default StaffSignup;