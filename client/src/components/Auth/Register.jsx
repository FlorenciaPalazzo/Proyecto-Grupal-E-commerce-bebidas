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

  const [birthError, setBirthError] = useState(null)
  const [EmailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)


  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    validate(e.target.value, e.target.name)
  }

  function birthValidate(input) {
    let today = new Date();
    let birth = new Date(input);
    let yOld = today.getFullYear() - birth.getFullYear();
    let month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        yOld--;
    }
    return yOld;
}

  function validate(input,name){
      if(name === "nacimiento"){
          const dateValidation =
        /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
        if(dateValidation.test(input) && parseInt(input.split("/")[2])>1920){
            var r = input.split("/").reverse().join("/")
            if(birthValidate(r) < 18) setBirthError("Debe ser mayor de 18 años")
            else setBirthError(null)
        }    
        else setBirthError("La fecha es invalida")
    }
    if(name === "password"){
        if(input.length < 6){
            setPasswordError("La contraseña debe tener mas de 6")
        }
    }
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
                placeholder="dd/mm/yyyy"
                onChange={handleChange}
              />
              {birthError &&
                 <span>{birthError}</span>
              }
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
