import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../Loading";
import NavBarSec from "../NavBarSec";

const validate = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "Favor de ingresar un nombre";
  }

  if (input.name.length > 50) {
    errors.name = "Favor de ingresar un nombre mas corto";
  }

  if (!input.email) {
    errors.email = "Favor de ingresar un email";
  }

  if (!/\S+@\S+.\S+/.test(input.email)) {
    errors.email = "Favor de ingresar un email valido";
  }

  if (!input.message) {
    errors.message = "Favor de ingresar un mensaje";
  }

  if (input.message.length < 30) {
    errors.message = "Cuentanos mas!";
  }

  if (input.message.length > 250) {
    errors.message = "Sobrepasado el límite de caracteres";
  }

  return errors;
};

export default function ContactForm() {
  const user = useSelector((state) => state.currentUser);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);
  const form = useRef();

  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input, "Soy el input y no se por que estoy aquí");
  };

  console.log(input, "<=========  SOY EL INPUT ");

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form, "Soy el FORM <===========================");

    emailjs
      .send("service_2dgsvdb", "template_qlxiwln", input, "JV3oDD1_BLOeYcBhe")
      .then(
        (result) => {
          console.log(result.text);
          swal({
            title: "Mensaje enviado con exito ",
            type: "success",
            icon: "success",
            buttons: false,
            timer: 800,
          });

          setInput({
            name: "",
            email: "",
            message: "",
          });
          navigate("/");
        },
        (error) => {
          console.log(error.text);
          swal({
            title: "Mensaje no se envío ",
            icon: "Warning",
          });
        }
      );
  };

  return (
    <div>
      <div>
        <NavBarSec/>
      </div>
      <div>
        <h1>Formulario de contacto:</h1>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <input
          type="text"
          name="name"
          value={input.name}
          class="form-control my-3"
          id="exampleFormControlInput1"
          placeholder="Tu nombre"
          onChange={handleOnChange}
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          type="email"
          name="email"
          value={input.email}
          class="form-control my-3"
          id="exampleFormControlInput1"
          placeholder="tu-email@example.com"
          onChange={handleOnChange}
        />

        {errors.email && <p>{errors.email}</p>}

        <textarea
          name="message"
          value={input.message}
          class="form-control my-3"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Dejanos un mensaje"
          onChange={handleOnChange}
        />
        {errors.message && <p>{errors.message}</p>}

        {(errors && errors.name) || errors.email || errors.message ? (
          <p>Completar los campos</p>
        ) : (
          <input
            type="submit"
            value="Enviar Mensaje"
            class="btn btn-outline-warning "
          />
        )}
      </form>
    </div>
  );
}
