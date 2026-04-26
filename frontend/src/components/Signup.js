import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from "axios";

const Signup = () => {
      const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = "http://localhost:5000";

  const handleSubmit= async(event)=>{
   event.preventDefault();

    try {
      const res = await axios.post(
        `${API}/signup`,
        { name, email, password, address },
        { withCredentials: true }
      );

      console.log(res.data);
      alert("Signup successful!");
      navigate('/login');
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data || "Signup failed");
    }
  }

  function navigation(){
    navigate('/staff/signup');
  }
  function navigationtologin(){
        navigate('/login');

  }
  
  return (
    <div className="signup-container">
 <h2>Signup</h2>
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
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
        </div>

        <button type="submit" id="btn2" > Submit</button>
      </form>
              <button type="button" className="btn1" onClick={navigation}>Signup as a Service Provider</button>
                <button type="button" className="btn1" onClick={navigationtologin}>login </button>


    </div>
  )
}

export default Signup;