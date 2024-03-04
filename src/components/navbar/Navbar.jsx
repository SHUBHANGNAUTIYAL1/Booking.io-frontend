import { Link,  useNavigate } from "react-router-dom"
import "./navbar.css"
import { useContext ,useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import AddHotel from "../addhotel/AddHotel";


const Navbar = () => {
  const { user ,dispatch} = useContext(AuthContext);
  const [modalOpen , setModalOpen] = useState(false);
  const [openhotelmodal, setOpenHotelModal] = useState(false);
  const navigate=useNavigate();
  

  const handleLogin=()=>{
    navigate("/login");
  }
  const handleRegister=()=>{
    navigate("/register");
  }
  const handleLogout=()=>{
    console.log(user.email)
    dispatch({ type: "LOGOUT" });
  }
  

console.log(user)
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
        <div className="logo" >
    Book<span className="highlight">Haven</span>
  </div>
        </Link>
        {user?( <div className="abc">
          {user.isAdmin &&(
            <button className="addhotel" onClick={()=>setOpenHotelModal(!openhotelmodal)} >Add hotels</button>
          )}

         <div className="profile-icon-container">
         <div 
         className={`profile-icon ${modalOpen ? 'open' : ''}`} onClick={() => setModalOpen(!modalOpen)}>
           
         </div>
         {modalOpen && (
           <div className="profile-details">
             
             <p>{user.username}</p>
             
             <button onClick={handleLogout}>Logout</button>
           </div>
         )}
       </div>
       </div>   
       
         ) :(
        <div className="navItems">
          <button className="navButton" onClick={handleRegister}>Register</button>
          <button className="navButton" onClick={handleLogin}>Login</button>
        </div>
        )}
      </div>
      {openhotelmodal && <AddHotel setOpen={setOpenHotelModal} />}
    </div>
  )
}

export default Navbar