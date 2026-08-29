import React from "react";
import "./Footer.css";

const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="pro-footer">

      {/* =====================================================
          TOP CONTACT / NEWSLETTER BAR
      ===================================================== */}
      <div className="footer-top">

        <div className="footer-top-inner">

          {/* CALL */}
          <div className="footer-call">

            <div className="footer-round-icon">
              <i className="bi bi-telephone-fill"></i>
            </div>

            <div className="footer-call-content">
              <span>GIVE US A CALL</span>
              <strong>+91 89254 50473</strong>
            </div>

          </div>


          {/* NEWSLETTER */}
          <div className="footer-newsletter">

            <div className="newsletter-title">
              Join <strong>Newsletter</strong>
            </div>

            <form onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email address"
                required
              />

              <button type="submit">
                Subscribe
              </button>
            </form>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <div className="footer-main">

        <div className="footer-grid">


          {/* =================================================
              COMPANY
          ================================================= */}
          <div className="footer-company">

            <div className="footer-logo">
              <div className="footer-logo-mark">
                <span>P</span>
              </div>

              <div className="footer-logo-text">
                Pro<span>Jenius</span>
              </div>
            </div>


            <h3>
              Innovation Technology Private
              <br />
              Limited
            </h3>


            <p>
              Improve efficiency and provide a better
              customer experience with modern
              technology services tailored for your
              success.
            </p>


            {/* SOCIAL ICONS */}
            <div className="footer-socials">

              <a href="mailto:teamprojenius2025@gmail.com">
                <i className="bi bi-envelope-fill"></i>
              </a>

              <a
                href="https://wa.me/918925450473"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp"></i>
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}
          <div className="footer-column">

            <h3 className="footer-heading">
              Quick Links
            </h3>

            <div className="footer-heading-line"></div>


            <ul className="footer-links">

              <li>
                <a href="/">
                  <span>›</span> Home
                </a>
              </li>

              <li>
                <a href="/about">
                  <span>›</span> About
                </a>
              </li>

              <li>
                <a href="/courses">
                  <span>›</span> Courses
                </a>
              </li>

              <li>
                <a href="/internship">
                  <span>›</span> Internship
                </a>
              </li>

              <li>
                <a href="/workshop">
                  <span>›</span> Workshop
                </a>
              </li>

              <li>
                <a href="/startup">
                  <span>›</span> Startup Supporter
                </a>
              </li>

              <li>
                <a href="/contact">
                  <span>›</span> Contact
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}
          <div className="footer-column">

            <h3 className="footer-heading">
              Contact
            </h3>

            <div className="footer-heading-line"></div>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>

              <p>
                Plot No 3, Erikarai St,
                <br />
                Velmurugan Nagar,
                <br />
                Namachivaya Nagar,
                <br />
                Madurai,
                <br />
                Tamil Nadu 625003
              </p>

            </div>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>

              <a href="mailto:teamprojenius2025@gmail.com">
                teamprojenius2025@gmail.com
              </a>

            </div>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>

              <a href="tel:+918925450473">
                +91 89254 50473
              </a>

            </div>

          </div>


          {/* =================================================
              FIND US
          ================================================= */}
          <div className="footer-column footer-find">

            <h3 className="footer-heading">
              Find Us
            </h3>

            <div className="footer-heading-line"></div>


            {/* MAP */}
            <div className="footer-map">

              <iframe
                title="ProJenius Location"
                src="https://www.google.com/maps?q=Velmurugan+Nagar,+Madurai,+Tamil+Nadu+625003&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <a
                className="map-label"
                href="https://www.google.com/maps/search/?api=1&query=Velmurugan+Nagar,+Madurai,+Tamil+Nadu+625003"
                target="_blank"
                rel="noreferrer"
              >
                Maps ↗
              </a>

            </div>


            <p className="footer-location">
              HQ: Velmurugan Nagar, Madurai
            </p>


            <a
              className="direction-btn"
              href="https://www.google.com/maps/search/?api=1&query=Velmurugan+Nagar,+Madurai,+Tamil+Nadu+625003"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
              <span>→</span>
            </a>

          </div>

        </div>


        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}
        <div className="footer-bottom">

          <p>
            © Copyright 2026 ProJenius Innovation Technology
            Private Limited. All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <a href="/privacy-policy">
              Privacy Policy
            </a>

            <a href="/terms">
              Terms &amp; Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;