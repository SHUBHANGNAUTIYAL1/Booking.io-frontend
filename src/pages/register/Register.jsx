import React from 'react'
import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate=useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const newUser={
                ...formData
            }
            const response=await axios.post("/auth/register", newUser);
            //console.log(response)
            
           navigate("/login"); 

        } catch (error) {
            console.error('Error registering user:', error);
            
        }
        
    };

  return (
    <>
    <div className="container1">
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>SignUp</span></div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user" ></i>
            <input type="text" placeholder="john" id="username" name="username" value={formData.username} onChange={handleChange} required/>
          </div>
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="john@gmail.com" id="email" name="email" value={formData.email} onChange={handleChange} required/>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
          </div>
          
          <div className="row button">
            <input type="submit" value="Signup"/>
          </div>
          <div className="signup-link">Already a member? <Link to="/login">login now</Link></div>
        </form>
      </div>
    </div>
    </div>
   </>
  )
}

export default Register