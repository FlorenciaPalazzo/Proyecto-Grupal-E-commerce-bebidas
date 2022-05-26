import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../fb";
import { resetUser } from "../../redux/actions";
import FilterBy from "../FilterBy";
import SearchBar from "../SearchBar";
export default function NavBar() {
  
  const isLoged = useSelector((state) => state.isLoged);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function out(){
    signOut(auth).then(() => {
      console.log("logout");
      //dispatch(setLoading(true))
      dispatch(resetUser())
      //dispatch(setLoading(false))
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
  }
  
  return (
    <div>
      <Link to="/">
        <button className="button">Home</button>
      </Link>
      <Link to="/contact">
        <button className="button">Contact</button>
      </Link>
      {isLoged ? 
        <div>
          <button onClick={out} >Logout</button>  
          <button onClick={() => navigate("/profile")}>Profile</button>  
        </div>
        :
        <div>
          <button onClick={() => navigate("/login")} >Login</button>  
          <button onClick={() => navigate("/register")} >Signin</button>  
        </div>
      }
      <FilterBy />
      <SearchBar />
    </div>
  );
}
