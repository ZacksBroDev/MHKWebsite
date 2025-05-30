import React from "react";
import './contact.css';

const Contact = () => {
  return (
    <>
      <h1>Contact Form</h1>
      <form className="contact-form">
        <div><input id="input1" type="text" placeholder="Your Name"/></div>
        <div><input id="input2" type="email" placeholder="Your Email"/></div>
        <div><input id="input3" type="phone" placeholder="Your Phone"/></div>
        <div><input id="input4" type="text" placeholder="Subject"/></div>
        <div><textarea id="input5" placeholder="Your Message"></textarea></div>
      </form>
      <button className="submit-button" type="submit">SUBMIT</button>
    </>
  );
}
export default Contact;