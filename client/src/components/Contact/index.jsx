import React, { useState } from "react";

export function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "Name is required";
      } else if (!/^[A-Z][a-z]{3,18}$/.test(input.name)) {
        errors.name = "3 to 18 characters, without numbers. First character in uppercase";
      }
    
      if (!input.lastname) {
        errors.lastname = "Lastname is required";
      } else if (!/^[A-Z][a-z]{3,18}$/.test(input.lastname)) {
        errors.lastname = "3 to 18 characters, without numbers. First character in uppercase";
      }

      if(!input.email) {
          errors.email = "Email is required";
      } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
          errors.email = "Invalid email";

      }
      return errors;
}

export default function Contact () {
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
    })

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

    function handleSubmit(e) {
        e.preventDefault();
        const errValidate = validate(input);

       if(Object.keys(errValidate).length === 0) { 
        alert('Consulta enviada y recibida, por favor complete el captcha.')
       } else {
        alert('Revise los campos de la consulta.')
    }
    
    }
    
    return(
        <div className='container'>
            <article className='contacto'>
                <h2>Contact</h2>
                <form onSubmit={(e) => handleSubmit(e)} 
                      action="https://formsubmit.co/a7e38790d48a96594cdf867295367ac0" method="POST">
                    <div className='info'>
                        <div className='name'>
                            <label>Name</label>
                            <input type="text" name='name' id='name' value={input.name} autoComplete='off'
                            onChange={(e) => handleChange(e)}
                            />
                        <p>{errors.name}</p>
                        </div>

                        <div className='name'>
                            <label>Lastname</label>
                            <input type="text" name='lastname' id='lastname' value={input.lastname} autoComplete='off'
                            onChange={(e) => handleChange(e)}
                            />
                            <p>{errors.lastname}</p>
                        </div>

                        <div className='email'>
                            <label>Email</label>
                            <input type="text" name='email' id='email' value={input.email} autoComplete='off'
                            onChange={(e) => handleChange(e)}
                            />
                            <p>{errors.email}</p>
                        </div>

                        <div className='msg'>
                            <label>Message</label>
							<textarea name="message" id="message" rows="4"></textarea>
                        </div>
                    </div>
                   
                        <button className="button" type="submit">
                        Send
                        </button>
                      
                    <input type="hidden" name="_next" value="http://localhost:3000"></input>
                </form>
            </article>
        </div>
    )
}