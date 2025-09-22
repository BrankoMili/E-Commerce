const PrivacyPolicy = () => {
  const smoothScroll = e => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="legal_page_container">
      <div className="legal_page_header">
        <h1>Privacy Policy</h1>
        <p>Last Updated: September 23, 2025</p>
      </div>
      <div className="legal_page_content_wrapper">
        {/* BOČNA NAVIGACIJA */}
        <nav className="legal_sidebar">
          <ul>
            <li>
              <a href="#introduction-privacy" onClick={smoothScroll}>
                1. Introduction
              </a>
            </li>
            <li>
              <a href="#info-collect" onClick={smoothScroll}>
                2. Information We Collect
              </a>
            </li>
            <li>
              <a href="#info-use" onClick={smoothScroll}>
                3. How We Use Your Info
              </a>
            </li>
            <li>
              <a href="#data-sharing" onClick={smoothScroll}>
                4. Data Sharing
              </a>
            </li>
            <li>
              <a href="#your-rights" onClick={smoothScroll}>
                5. Your Rights
              </a>
            </li>
            <li>
              <a href="#contact-privacy" onClick={smoothScroll}>
                6. Contact Us
              </a>
            </li>
          </ul>
        </nav>

        {/* GLAVNI SADRŽAJ */}
        <main className="legal_content">
          <section id="introduction-privacy">
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how eCommerce ("we", "us", or "our")
              collects, uses, and discloses information about you when you
              access or use our website and services. We are committed to
              protecting your privacy.
            </p>
          </section>

          <section id="info-collect">
            <h2>2. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, place an order, or contact customer
              support. This information may include:
            </p>
            <ul>
              <li>
                Personal identification information (Name, email address, phone
                number, etc.)
              </li>
              <li>Shipping and billing address</li>
              <li>
                Payment information (processed securely by our payment partners)
              </li>
            </ul>
            <p>
              We also collect indirect information automatically, such as your
              IP address and browsing behavior, to improve our services.
            </p>
          </section>

          <section id="info-use">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your transactions and fulfill your orders.</li>
              <li>
                Communicate with you, including sending order confirmations and
                responding to your inquiries.
              </li>
              <li>Improve and personalize your shopping experience.</li>
              <li>
                Prevent fraudulent transactions and enhance the security of our
                site.
              </li>
            </ul>
          </section>

          <section id="data-sharing">
            <h2>4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share your
              information with trusted third parties who assist us in operating
              our website, conducting our business, or serving our users, so
              long as those parties agree to keep this information confidential.
              This includes shipping carriers and payment processors.
            </p>
          </section>

          <section id="your-rights">
            <h2>5. Your Rights</h2>
            <p>
              You have certain rights regarding your personal information. You
              have the right to access, correct, update, or request deletion of
              your personal information. You can usually do this through your
              account settings or by contacting us directly.
            </p>
          </section>

          <section id="contact-privacy">
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us through our <a href="/contactus">contact page</a>.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
