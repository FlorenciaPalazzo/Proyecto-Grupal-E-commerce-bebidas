import React, { useEffect, useState } from "react";
import validate from "./authServices";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../../fb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, isAdmin, setUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import Loading from "../Loading";

function Register() {
  // { id, nombre, email, nacimiento, direccion, telefono }
  const [input, setInput] = useState({
    nombre: null,
    apellido: null,
    nacimiento: null,
    direccion: null,
    telefono: null,
    email: null,
    password: null,
  });

  const [nameError, setNameError] = useState(null);
  const [surnameError, setSurnameError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    validate(
      e.target.value,
      e.target.name,
      setBirthError,
      setEmailError,
      setNameError,
      setPasswordError,
      setSurnameError
    );
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
            nombre: `${input.nombre} ${input.apellido}`,
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

<<<<<<< HEAD
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

=======
>>>>>>> 97a60de133105fdf5a3cb9b1541e50440e04d2bb
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
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              {nameError && <span>{nameError}</span>}
              <br />
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                name="apellido"
                placeholder="Enter your surname"
                onChange={handleChange}
              />
              {surnameError && <span>{surnameError}</span>}
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
                placeholder="dd/mm/yyyy"
                onChange={handleChange}
              />
              {birthError && <span>{birthError}</span>}
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {emailError && <span>{emailError}</span>}
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              {passwordError && <span>{passwordError}</span>}
              <br />

              {!passwordError &&
              !surnameError &&
              !nameError &&
              !emailError &&
              !birthError &&
              input.nombre &&
              input.apellido &&
              input.password &&
              input.nacimiento &&
              input.email ? (
                <button>Register</button>
              ) : (
                <button
                  type="button"
                  onClick={() => alert("Complete todos los campos")}
                >
                  Register
                </button>
              )}
            </form>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
