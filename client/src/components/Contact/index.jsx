import React from "react";


export default function Contact () {
    return(
        <div className='container'>
            <article className='contacto'>
                <h2>Contact</h2>
                <form action="https://formsubmit.co/a7e38790d48a96594cdf867295367ac0" method="POST">
                    <div className='info'>
                        <div className='name'>
                            <label>Name</label>
                            <input type="text" name='name' id='name' />
                        </div>
                        <div className='name'>
                            <label>Lastname</label>
                            <input type="text" name='lastname' id='lastname' />
                        </div>
                        <div className='email'>
                            <label>Email</label>
                            <input type="text" name='email' id='email' />
                        </div>
                        <div className='msg'>
                            <label>Message</label>
							<textarea name="message" id="message" rows="4"></textarea>
                        </div>
                    </div>
                    <ul class="actions">
                        <input type="submit" value="Send Message" class="primary" />
                        <input type="reset" value="Reset" />
					</ul>
                    <input type="hidden" name="_next" value="http://localhost:3000"></input>
                </form>
            </article>
        </div>
    )
}