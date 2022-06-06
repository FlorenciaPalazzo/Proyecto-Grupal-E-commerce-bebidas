import React from "react";
import "./CarouselStyles.css";
import { Link } from "react-router-dom";

export default function Carousel() {
  return (
    <div className="container">
      <div className="wrapper">
          <Link to={'/offers'}>
        <ul className="flex-row">
          <li>
            <img src="./images/bannersalentein.jpeg" />
          </li>
          <li>
            <img src="./images/bannersmirnoff.jpeg" />
          </li>
          <li>
            <img src="./images/bannercorona.jpeg" />
          </li>  
        </ul>
          </Link>
      </div>
    </div>
  );
}
