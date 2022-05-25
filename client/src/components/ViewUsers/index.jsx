import React from "react";
import { Link } from "react-router-dom";

export default function ViewUsers() {
    return(
        <div className="container">
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <div className="user">
                <h3>Name: esperando get user</h3>
                <p>Email: esperando get user</p>
            </div>
        </div>
    )
}