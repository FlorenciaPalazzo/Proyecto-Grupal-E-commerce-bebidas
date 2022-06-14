import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../fb";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, setUser, setMessage, createUser } from "../../redux/actions";
import Loading from "../Loading";
import "./Login.css";
import NavBarSec from "../NavBarSec";
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const loading = useSelector((state) => state.isLoading);
  const isLoged = useSelector((state) => state.isLoged);
  const currentState = useSelector((state) => state);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  //
  //
  async function errorValidate(error) {
    setError(null);
    if (error === "Firebase: Error (auth/user-not-found).") {
      setError("No existe un usuario con este mail");
    } else if (error === "Firebase: Error (auth/wrong-password).") {
      setError("Se ingreso una contraseña incorrecta");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      let user = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      )
        .then((res) => res.user)
        .catch((err) => errorValidate(err.message));
      console.log(!user);
      if (!user) {
        console.log(currentState);
        return;
      }
      dispatch(isAdmin(user.email));
      dispatch(setUser({ ...user }));
      navigate("/");
    } catch (err) {
      errorValidate(err.message);
    }
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
            nombre: userCred.displayName || "Usuario",
            apellido: userCred.displayName || "Google",
            email: userCred.email,
            isAdmin: userCred.email === process.env.REACT_APP_ADMIN_EMAIL,
            isVerified: userCred.emailVerified,
            image: userCred.photoURL || null,
          })
        );
        return userCred;
      })
      .then((user) => {
        console.log("seteoooo");
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error);
        errorValidate(error.message);
      });
  }

  //   let search = window.location.search;
  //   let params = new URLSearchParams(search);
  //   let foo = params.get("valen");
  //   console.log(foo)

  const user = useSelector((state) => state.currentUser);
  useEffect(() => {
    isLoged && navigate("/");
  }, [isLoged]);
  return (
    <div className="Login-body">
      <NavBarSec />
      {loading && !isLoged ? (
        <Loading />
      ) : (
        <div className="Login-card">
          <h1 className="Login-title">Login</h1>
          <div>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
              <div className="Login-card-items">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
              <div className="Login-card-items">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>

              <div className="Login-card-items">
                <button>Login</button>
              </div>
            </form>
            <div className="Login-card-items">
              <Link to="/login/reset">
                <p className="Login-text">¿Olvidaste tu constraseña?</p>
              </Link>
            </div>
            <div className="Login-card-items">
              <button className="Login-btn-google" onClick={googleHandleSubmit}>
                SignUp con Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
