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
      <Link to="/">
        <button className="button">Home</button>
      </Link>
      <form ref={form} onSubmit={sendEmail}>
      <label>Nombre</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Mensaje</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
    </div>
    
  );
}
