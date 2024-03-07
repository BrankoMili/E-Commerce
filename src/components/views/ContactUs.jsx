import React from "react";

const ContactUs = () => {
  return (
    <div className="contactus_container">
      <h2>Contact Us</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate,
        sint.
      </p>
      <div className="contact_details">
        <i className="uil uil-phone-times"></i>
        <span>+381655545656</span>
        <div></div>
        <i className="uil uil-envelope"></i>
        <span>example@example.com</span>
      </div>
      <div className="form_container">
        <form action="https://formspree.io/f/mleypkvj" method="POST">
          <input type="text" name="first_name" placeholder="First name" />

          <input type="text" name="last_name" placeholder="Last name" />

          <input type="email" name="email" placeholder="email address" />

          <textarea name="message" placeholder="your message"></textarea>

          <button type="submit" className="button_style">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
