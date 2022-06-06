import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../fb";

export default function ResetPassword() {
  const [input, setInput] = useState({email: null});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  async function errorValidate(error){
    setMessage(null)
    setError(null)
    if(error === "Firebase: Error (auth/user-not-found)."){
      setError("No existe un usuario con este mail")
    }
    else if(error === "Firebase: Error (auth/invalid-email)."){
      setError("Se ingreso un email invalido")
    }
    else if(error === "Firebase: Error (auth/missing-email)."){
      setError("Por favor, ingrese el email para restaurar su contraseña")
    }
  }
  function passwordHandle(e) {
      e.preventDefault()
    setError(null)   
    try {
        sendPasswordResetEmail(auth, input.email)
        .then(() => setMessage("Se envio email de restauración"))
        .catch(err => {
            errorValidate(err.message) 
            console.log(err.message)
        })
        
    } catch (err) {
        setError(err.message)
        console.log(err.message);        
    }
  }
  console.log(input,error);
  return (
    <div>
        <h3>Resetea tu contraseña</h3>
        <p>
            Ingresa el email de la cuenta de la que deseas restaurar la contraseña, te llegara un email para poder ingresarla. Recorda revisar la carpeta de Span si no ves el email de restauracion. 
        </p>
      <form>
          {message && <span>{message}</span>}
          {error && <span>{error}</span>}
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" value={input.email} name="email" onChange={handleChange}/>
        <button onClick={passwordHandle}>Enviar</button>
      </form>
    </div>
  );
}
