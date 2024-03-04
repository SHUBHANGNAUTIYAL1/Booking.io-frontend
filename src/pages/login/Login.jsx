import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <>
    <div className="container1">
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>Login</span></div>
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
          <div className="signup-link">Not a member? <Link to="/register">Signup now</Link></div>

           <div className="admin">
        <Link   to="/adminlogin" style={{color:"inherit",textDecoration:"none"}}>Admin login</Link>
        </div>
        </form>
       
      </div>
    </div>
    {error && <span className="Error">{error.message}</span>}
    </div>
   </>
  );
};

export default Login;
