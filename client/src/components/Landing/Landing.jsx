import React from "react";
import "./LandingStyles.css"
import { Link } from "react-router-dom";
import swal from 'sweetalert';


const Landing = () => {

  return (
    <div className="landing">
      <p className="landing-title">PF-Bebidas</p>
        <Link to="/home">
        <button className="button-home">Home</button>
      </Link>
    </div>
  );
};

export default Landing;
