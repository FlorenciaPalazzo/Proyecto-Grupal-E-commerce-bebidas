import React, { useEffect, useState } from "react";
import { signUp } from "./authServices";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, app } from "../../fb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, setUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import Loading from "../Loading";

function Register() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    await createUserWithEmailAndPassword(auth, input.email, input.password)
      .then(() => {
        let user = auth.currentUser;
        dispatch(setUser(user));
        dispatch(isAdmin(user.email));
        sendEmailVerification(user);
        return user
      })
      .then(user => {
          console.log("usuario",user);
      })
      .then(() => navigate("/home"))
      .catch((err) => setError(err.message));
  }
  const loading = useSelector((state) => state.isLoading);
  const isLoged = useSelector((state) => state.isLoged);
  useEffect(() => {
    isLoged && navigate("/home");
  }, [isLoged]);
  return (
    <div>
      {loading && !isLoged ? (
        <Loading />
      ) : (
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <h1>Register</h1>
          <div>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />

              <button>Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
