import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import AdminProfile from "./adminProfile";
import UserProfile from "./userProfile";
import NavBarSec from "../NavBarSec";
import Footer from "../Footer";


function Profile() {
  const user = useSelector((state) => state.currentUser);
  const state = useSelector((state) => state);
  const loading = useSelector((state) => state.isLoading);
  const admin = useSelector((state) => state.isAdmin);

  useEffect(() => {
    
    console.log("effect");
    console.log(user);
  }, [user]);
  return (
    <div>
      <NavBarSec/>

      {loading ? (
        <Loading />
      ) : admin && user ? (
        <AdminProfile />
      ) : (
        <UserProfile />
      )}
      
    </div>
  );
}

export default Profile;