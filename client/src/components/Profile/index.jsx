import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import Loading from "../Loading";
import AdminProfile from "./adminProfile";
import UserProfile from "./userProfile";
import NavBar from "../NavBar";
import NavBarSec from "../NavBarSec";
import Footer from "../Footer";

function Profile() {
  const { loading } = useAuth();
  const user = useSelector((state) => state.currentUser);
  const state = useSelector((state) => state);
  // const loading = useSelector((state) => state.isLoading);
  const admin = useSelector((state) => state.isAdmin);

  useEffect(() => {
    console.log("effect");
    console.log(user);
    console.log(loading);
  }, [user]);
  return (
    <div>
      <NavBarSec />
      {admin && user ? (
        <AdminProfile />
      ) : (
        <UserProfile />
      )}
    </div>
  );
}

export default Profile;
