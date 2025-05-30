import React from "react";
import './contact.css';

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "bd3b1db0-a150-4eb9-8c61-27249b4f0d98");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <>
      <h1>Contact Form</h1>
      <form  onSubmit={onSubmit} className="contact-form">
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