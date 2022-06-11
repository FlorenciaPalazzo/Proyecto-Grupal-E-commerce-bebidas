import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../fb";
import { firebaseUsers, getUsersLoged } from "../../redux/actions";
import "./ViewUsers.css";
export default function ViewUsers() {
  const usersLoged = useSelector((state) => state.usersLoged);
  const dispatch = useDispatch();
  const [firstReq, setReq] = useState(true);

  useEffect(() => {
    if (usersLoged && usersLoged.length === 0 && firstReq) {
      dispatch(getUsersLoged());
      setReq(false);
    }
    console.log(usersLoged);
  }, [usersLoged]);
  return (
    <div>
      <div className="viewUsers-cont">
        <div className="viewUsers-cont-row-title">
          <div className="title-items">Nombre</div>
          <div className="title-items">E-mail</div>
        </div>
        {usersLoged.length === 0 && firstReq ? (
          <span>
            {console.log("loading")}
            Loading users...
          </span>
        ) : (
          usersLoged.map((e) => {
            if (e.email === process.env.REACT_APP_ADMIN_EMAIL) return;
            return (
              <div key={e.nombre} className="viewUsers-cont-row">
                <div className="items">{e.nombre}</div>
                <div className="items">{e.email}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
