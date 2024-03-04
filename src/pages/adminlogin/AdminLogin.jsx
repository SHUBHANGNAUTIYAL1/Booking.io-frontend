import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./admin.css";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);


  const navigate=useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if(res.data.isAdmin){
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      //console.log(res);
      navigate("/")
    }else{
        dispatch({ type: "LOGIN_FAILURE" }); 
    }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <>
    <div className="container1">
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>Hi Admin!</span></div>
        <form onSubmit={handleClick}>
          <div className="row">
            <i className="fas fa-user" ></i>
            <input type="text" placeholder="john" id="username" name="username"  onChange={handleChange} required/>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" id="password" name="password"  onChange={handleChange} required/>
          </div>
          
          <div className="row button">
            <input disabled={loading} type="submit" value="Login"/>
          </div>
          <div className="signup-link">User? <Link to="/login">Signin now</Link></div>

          
        </form>
       
      </div>
    </div>
    {error && <span className="Error">{error.message}</span>} 
    </div>
   </>
  );
};

export default AdminLogin;
