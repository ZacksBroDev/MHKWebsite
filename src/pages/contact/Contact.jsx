import React from "react";
import './contact.css';
import useWeb3Forms from '@web3forms/react';


const Contact = () => {
  const accessKey = 'bd3b1db0-a150-4eb9-8c61-27249b4f0d98';
  const { submit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: 'Mile High Karate',
      subject: 'New Contact Message from your Website',
    },
    onSuccess: (message, data) => {
      console.log('Success', message, data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit({
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      subject: e.target.phone.value,
      message: e.target.message.value,
    });
    e.target.reset();
  };

  return (
    <>
      <h1>Contact Form</h1>
      <div>
        <form  onSubmit={handleSubmit} className="contact-form">
          <div><input name="name" id="input1" type="text" placeholder="Your Name" required/></div>
          <div><input name="email" id="input2" type="email" placeholder="Your Email" required/></div>
          <div><input name="phone" id="input3" type="phone" placeholder="Your Phone" required/></div>
          <div><input name="subject" id="input4" type="text" placeholder="Subject" required/></div>
          <div><textarea name="message" id="input5" placeholder="Your Message" required></textarea></div>
          <img src="/src/assets/img/MHK-family.png"/>
          <button className="submit-button" type="submit">SUBMIT</button>
        </form>
       
      </div>
    </>
  );
};
export default Contact;