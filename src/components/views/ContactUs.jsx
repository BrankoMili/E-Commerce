import contactIllustration from "../../assets/contact_illustration.jpg";

const ContactUs = () => {
  return (
    <div className="contact_page_container">
      <div className="contact_content_wrapper">
        {/* LEVA STRANA - INFORMACIJE I FORMA */}
        <div className="contact_info_wrapper">
          <div className="contact_header">
            <h1>Get in Touch</h1>
            <p>
              Have a question or a comment? Use the form below to send us a
              message, or contact us by email.
            </p>
          </div>

          <div className="contact_details">
            <div className="contact_detail_item">
              <i className="fas fa-envelope"></i>
              <span>example@example.com</span>
            </div>
            <div className="contact_detail_item">
              <i className="fas fa-phone-alt"></i>
              <span>+381 65 5545 656</span>
            </div>
          </div>

          <form
            className="contact_form"
            action="https://formspree.io/f/mleypkvj"
            method="POST"
          >
            <div className="form_group">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                required
                maxLength="30"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                required
                maxLength="30"
              />
            </div>
            <div className="form_group">
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                required
                maxLength="100"
              />
            </div>
            <div className="form_group">
              <textarea
                name="message"
                placeholder="Your Message"
                required
                maxLength="400"
              ></textarea>
            </div>
            <button type="submit" className="button_style">
              Send Message
            </button>
          </form>
        </div>

        {/* DESNA STRANA - SLIKA */}
        <div className="contact_image_wrapper">
          <img src={contactIllustration} alt="Contact us illustration" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
