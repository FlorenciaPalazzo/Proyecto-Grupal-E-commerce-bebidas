import React, { useEffect, useState } from "react";
import { signUp } from "./authServices";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "../../fb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, isAdmin, setUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import Loading from "../Loading";

function Register() {
  // { id, nombre, email, nacimiento, direccion, telefono }
  const [input, setInput] = useState({
    nombre: "",
    nacimiento: "",
    direccion: "",
    telefono: "",
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
    console.log(input);
    await createUserWithEmailAndPassword(auth, input.email, input.password)
      .then(() => {
        let user = auth.currentUser;
        dispatch(setUser(user));
        dispatch(isAdmin(user.email));
        sendEmailVerification(user);
        return user;
      })
      .then((user) => {
        console.log("se creo el usuario usuario", { ...input, id: user.uid });
        dispatch(
          createUser({
            id: user.uid,
            nombre: input.nombre,
            email: input.email,
            nacimiento: input.nacimiento,
            direccion: input.direccion,
            telefono: input.telefono,
            isAdmin: input.email === process.env.REACT_APP_ADMIN_EMAIL,
          })
        );
      })
      .then(() => navigate("/home"))
      .catch((err) => setError(err.message));
  }

  async function googleHandleSubmit(e) {
    setError(null);
    e.preventDefault();
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const userCred = result.user;
        console.log("rrrrrrrrrrrrrr", userCred);
        dispatch(
           createUser({
            id: userCred.uid,
            nombre: userCred.displayName,
            email: userCred.email,
            isAdmin: userCred.email === process.env.REACT_APP_ADMIN_EMAIL,
          })
        );
        console.log(userCred, "SOY EL USER CRED CRED CRED CREEEDIIII")
        return userCred;
      })
      .then((user) => {
        console.log("seteoooo");
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
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
          <Link to="/home">
            <button className="button">Home</button>
          </Link>
          <h1 className="forms-title">Register</h1>
          <div>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">Name</label>
              <input
                type="text"
                name="nombre"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="telefono">Phone</label>
              <input
                type="tel"
                name="telefono"
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="direccion">Adress</label>
              <input
                type="text"
                name="direccion"
                placeholder="Enter your adress"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="nacimiento">Birthday</label>
              <input
                type="text"
                name="nacimiento"
                placeholder="dd/mm/yy"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />

              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />

              <button>Register</button>
            </form>
            <hr />
            <button onClick={googleHandleSubmit}>SignUp with Google</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
