import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAdmin, setUser, setMessage } from "../../redux/actions";
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    let user = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    )
      .then((res) => res.user)
      .catch((err) => setError(err.message));

    dispatch(isAdmin(user.email));
    dispatch(
      setUser({...user})
    );
    navigate("/");
  }

  return (
    <div>
      <h1>Login</h1>
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

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
