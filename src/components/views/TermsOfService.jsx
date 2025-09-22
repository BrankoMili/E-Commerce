const TermsOfService = () => {
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
        <h1>Terms of Service</h1>
        <p>Last Updated: September 23, 2025</p>
      </div>

      <div className="legal_page_content_wrapper">
        {/* BOČNA NAVIGACIJA */}
        <nav className="legal_sidebar">
          <ul>
            <li>
              <a href="#introduction" onClick={smoothScroll}>
                1. Introduction
              </a>
            </li>
            <li>
              <a href="#user-accounts" onClick={smoothScroll}>
                2. User Accounts
              </a>
            </li>
            <li>
              <a href="#prohibited-activities" onClick={smoothScroll}>
                3. Prohibited Activities
              </a>
            </li>
            <li>
              <a href="#termination" onClick={smoothScroll}>
                4. Termination
              </a>
            </li>
            <li>
              <a href="#liability" onClick={smoothScroll}>
                5. Limitation of Liability
              </a>
            </li>
            <li>
              <a href="#contact" onClick={smoothScroll}>
                6. Contact Us
              </a>
            </li>
          </ul>
        </nav>

        {/* GLAVNI SADRŽAJ */}
        <main className="legal_content">
          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>
              Welcome to eCommerce! These Terms of Service ("Terms") govern your
              use of our website and services. By accessing or using our
              service, you agree to be bound by these Terms. If you disagree
              with any part of the terms, then you may not access the service.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section id="user-accounts">
            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide us with
              information that is accurate, complete, and current at all times.
              Failure to do so constitutes a breach of the Terms, which may
              result in immediate termination of your account on our service.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to
              access the service and for any activities or actions under your
              password. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>

          <section id="prohibited-activities">
            <h2>3. Prohibited Activities</h2>
            <p>
              You may not access or use the site for any purpose other than that
              for which we make the site available. The site may not be used in
              connection with any commercial endeavors except those that are
              specifically endorsed or approved by us.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Prohibited activities
              include, but are not limited to: fraudulent activities,
              unauthorized use of the website, and interfering with the proper
              working of the site.
            </p>
          </section>

          <section id="termination">
            <h2>4. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms. Upon termination, your
              right to use the service will immediately cease.
            </p>
          </section>

          <section id="liability">
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall eCommerce, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the service.
            </p>
          </section>

          <section id="contact">
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="/contactus">our contact page</a>.
            </p>
          </section>

          <div className="faq_section">
            <h3>Frequently Asked Questions</h3>
            <details className="faq_item">
              <summary>Can I return a product?</summary>
              <p>
                Yes, we have a 30-day return policy for most items. Please check
                our full Return Policy for more details.
              </p>
            </details>
            <details className="faq_item">
              <summary>How is my personal data protected?</summary>
              <p>
                We take data privacy seriously. Please refer to our Privacy
                Policy to understand how we collect, use, and protect your
                personal information.
              </p>
            </details>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsOfService;
