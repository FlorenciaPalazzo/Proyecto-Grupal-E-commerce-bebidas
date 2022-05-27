import React, { useState } from "react";

export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Z][a-z]{3,18}$/.test(input.name)) {
    errors.name =
      "3 to 18 characters, without numbers. First character in uppercase";
  }

  if (!input.lastname) {
    errors.lastname = "Lastname is required";
  } else if (!/^[A-Z][a-z]{3,18}$/.test(input.lastname)) {
    errors.lastname =
      "3 to 18 characters, without numbers. First character in uppercase";
  }

  if (!input.email) {
    errors.email = "Email is required";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)
  ) {
    errors.email = "Invalid email";
  }

  if (!input.message) {
      errors.message = "Message is required";
  } else if(input.message.length > 200) {
    errors.message = "Message must be less than 200 characters";
  }
  return errors;
}

export default function Contact() {
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
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
  }

  

  return (
    <div className="container">
      <h2>Contact</h2>
      <form
        action="https://formsubmit.co/a7e38790d48a96594cdf867295367ac0"
        method="POST"
      >
        <div className="info">
          <div className="name">
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.name}</p>
          </div>

          <div className="name">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={input.lastname}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.lastname}</p>
          </div>

          <div className="email">
            <label>Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={input.email}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.email}</p>
          </div>

          <div className="msg">
            <label>Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={input.message}
              onChange={(e) => handleChange(e)}
            >
            </textarea>
            <p>{errors.message}</p>
          </div>
        </div>
        <input type="submit" value="Send Message"/>
        <input
          type="hidden"
          name="_next"
          value="http://localhost:3000/"
        ></input>
      </form>
    </div>
  );
}
