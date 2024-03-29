import React, { useState } from "react";
import { Await, useNavigate  } from "react-router-dom";
import './login.css';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        axios
        .post("http://localhost:3000/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          alert("Login Successful");
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id)
          navigate("/home");
        })
        .catch(async(error) => {
            if(error.response){
               console.log(error.response.data.message);
            }else{
                console.log(error);
            }
        })
    }
  };

  
  const handleNavigate = () => {
    navigate('/signup');
  };

  return (
    <div className="login_comp">
      <form className="login_container" onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
        </div>
     
     
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{ color: 'red'}}>{errors.email}</p>
        </div>
       
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ color: 'red'}}>{errors.password}</p>
       
        </div>
     
        <div className="button">
          <button className="submit_btn" type="submit">Login</button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span >Don't have an account? <a href="#" onClick={handleNavigate}>Signup</a></span>
        </div>
      </form>
    </div>
  );
};

export default Login;
