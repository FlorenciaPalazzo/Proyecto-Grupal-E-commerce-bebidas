import React from "react";
import "./CarouselStyles.css";
import { Link } from "react-router-dom";

export default function Carousel() {
  return (

    <Link to='/offers'>
    <div class="slider">
      <ul>
        <li>
          <img src="./images/bannersalentein.jpeg" alt="" />
        </li>
        <li>
          <img src="./images/bannersmirnoff.jpeg" alt="" />
        </li>
        <li>
          <img src="./images/bannercorona.jpeg" alt="" />
        </li>
      </ul>
    </div>
    </Link>
  );
}
