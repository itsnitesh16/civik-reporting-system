import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = "http://localhost:5000";

  const handleSubmit= async(event)=>{
   event.preventDefault();

    try {
      const res = await axios.post(
        `${API}/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log(res.data);
        let token = res.data.token;
       localStorage.setItem("token", token); // store in localStorage

      alert("Login Successful !");
      navigate('/Dashboard');
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data || "Login failed");
    }
  }


  
  return (
    <div className="Login-container">
 <h2>Login</h2>
      <form onSubmit={handleSubmit}>

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

       

        <button type="submit" id="btn2" > Submit</button>
      </form>

    </div>
  )
}

export default Login;