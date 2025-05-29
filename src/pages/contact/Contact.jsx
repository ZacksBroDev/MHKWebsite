import React from "react";
import './contact.css';

const Contact = () => {
  return (
    <>
      <h1>Contact Form</h1>
      <div className="contact-form">
        <div><input className="input1" type="text" placeholder="Your Name"/>
      <input className="input2" type="email" placeholder="Your Email"/></div>
        <div><input className="input3" type="phone" placeholder="Your Phone"/>
        <input className="input4" type="text" placeholder="Subject"/></div>
        <div><textarea className="input5" placeholder="Your Message"></textarea></div>
      </div>
      <button className="submit-button" type="submit">SUBMIT</button>
    </>
  );
}
export default Contact;