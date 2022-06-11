import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2dgsvdb",
        "template_qlxiwln",
        form.current,
        "JV3oDD1_BLOeYcBhe"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <input
          type="text"
          name="user_name"
          class="form-control my-3"
          id="exampleFormControlInput1"
          placeholder="Tu nombre"
        />

        <input
          type="email"
          name="user_email"
          class="form-control my-3"
          id="exampleFormControlInput1"
          placeholder="tu-email@example.com"
        />

        <textarea
          name="message"
          class="form-control my-3"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Dejanos un mensaje"
        />
        <input
          type="submit"
          value="Enviar Mensaje"
          class="btn btn-outline-warning "
        />
      </form>
    </div>
  );
}
