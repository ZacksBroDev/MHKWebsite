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
    <div className="background">
      <h1>Contact Form</h1>
        <form  onSubmit={handleSubmit} className="contact-form">
          <input name="name" id="name" type="text" placeholder="Your Name" required/>
          <input name="email" id="email" type="email" placeholder="Your Email" required/>
          <input name="phone" id="phone" type="phone" placeholder="Your Phone" required/>
          <input name="subject" id="subject" type="text" placeholder="Subject" required/>
          <textarea name="message" id="message" placeholder="Your Message" required></textarea>
          <button id="submit" type="submit" className="submit-button">SUBMIT</button>
        </form>
    </div>
  );
};
export default Contact;