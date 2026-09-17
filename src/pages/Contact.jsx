import { useEffect } from "react";
import {
    Mail,
    Phone,
    MapPin,
    ArrowRight,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

import "../assets/css/Contact.css";

export default function Contact() {

    /* =========================================================
       AOS
    ========================================================= */

    useEffect(() => {
        AOS.init({
            duration: 900,
            once: true,
            offset: 80,
            easing: "ease-out-cubic",
        });

        return () => {
            AOS.refresh();
        };
    }, []);


    /* =========================================================
       FORM SUBMIT
    ========================================================= */

    const handleSubmit = (event) => {
        event.preventDefault();

        alert(
            "Thank you! Your project details have been submitted successfully."
        );
    };


    /* =========================================================
       CUSTOM VALIDATION
    ========================================================= */

    const handleInvalid = (event, message) => {
        event.target.setCustomValidity(message);
    };

    const handleInput = (event) => {
        event.target.setCustomValidity("");
    };


    return (
        <main className="contact-page">

            {/* =====================================================
                CONTACT HERO
            ===================================================== */}

            <section className="contact-hero">

                <div className="contact-container">

                    <div className="contact-layout">

                        {/* =================================================
                            LEFT CONTACT PANEL
                        ================================================= */}

                        <div
                            className="contact-info-panel"
                            data-aos="fade-right"
                        >

                            <span className="contact-eyebrow">
                                LET'S GET STARTED
                            </span>


                            <h1 className="contact-title">
                                Let's Build Something{" "}

                                <span>
                                    Great Together
                                </span>
                            </h1>


                            <div className="contact-title-line">
                                <span></span>
                            </div>


                            <p className="contact-description">
                                Have an idea, project, or business challenge?
                                Let's turn your vision into a powerful digital
                                experience with the right technology and strategy.
                            </p>


                            {/* =================================================
                                CONTACT DETAILS
                            ================================================= */}

                            <div className="contact-details">

                                {/* PHONE */}

                                <a
                                    href="tel:+918925450473"
                                    className="contact-detail"
                                >

                                    <div className="contact-detail-icon">
                                        <Phone size={19} />
                                    </div>

                                    <div className="contact-detail-text">

                                        <span>
                                            Call Us
                                        </span>

                                        <strong>
                                            +91 89254 50473
                                        </strong>

                                    </div>

                                </a>


                                {/* EMAIL */}

                                <a
                                    href="mailto:teamprojenius2025@gmail.com"
                                    className="contact-detail"
                                >

                                    <div className="contact-detail-icon">
                                        <Mail size={19} />
                                    </div>

                                    <div className="contact-detail-text">

                                        <span>
                                            Email Us
                                        </span>

                                        <strong>
                                            teamprojenius@gmail.com
                                        </strong>

                                    </div>

                                </a>


                                {/* LOCATION */}

                                <div className="contact-detail">

                                    <div className="contact-detail-icon">
                                        <MapPin size={19} />
                                    </div>

                                    <div className="contact-detail-text">

                                        <span>
                                            Our Location
                                        </span>

                                        <strong>
                                            Madurai, Tamil Nadu
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                FEATURES
                            ================================================= */}

                            <div className="contact-features">

                                <div className="contact-feature">
                                    <i className="bi bi-lightning-charge-fill"></i>

                                    <span>
                                        Fast Delivery
                                    </span>
                                </div>


                                <div className="contact-feature">
                                    <i className="bi bi-shield-check"></i>

                                    <span>
                                        Reliable Solutions
                                    </span>
                                </div>


                                <div className="contact-feature">
                                    <i className="bi bi-headset"></i>

                                    <span>
                                        Dedicated Support
                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT FORM
                        ================================================= */}

                        <div
                            className="contact-form-card"
                            data-aos="fade-left"
                            data-aos-delay="150"
                        >

                            <div className="contact-form-header">

                                <span className="form-label">
                                    PROJECT ENQUIRY
                                </span>

                                <h2>
                                    Tell Us About Your Project
                                </h2>

                                <p>
                                    Share a few details and we'll get back
                                    to you with the right next step.
                                </p>

                            </div>


                            <form
                                className="contact-form"
                                onSubmit={handleSubmit}
                            >

                                {/* =================================================
                                    NAME + EMAIL
                                ================================================= */}

                                <div className="contact-form-row">

                                    <div className="contact-field">

                                        <label htmlFor="name">
                                            Name
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Your full name"
                                            required
                                            onInvalid={(event) =>
                                                handleInvalid(
                                                    event,
                                                    "Please enter your name"
                                                )
                                            }
                                            onInput={handleInput}
                                        />

                                    </div>


                                    <div className="contact-field">

                                        <label htmlFor="email">
                                            Email Address
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            onInvalid={(event) =>
                                                handleInvalid(
                                                    event,
                                                    "Please enter your email id"
                                                )
                                            }
                                            onInput={handleInput}
                                        />

                                    </div>

                                </div>


                                {/* =================================================
                                    PHONE
                                ================================================= */}

                                <div className="contact-field">

                                    <label htmlFor="phone">
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        required
                                        onInvalid={(event) =>
                                            handleInvalid(
                                                event,
                                                "Please enter your phone number"
                                            )
                                        }
                                        onInput={handleInput}
                                    />

                                </div>


                                {/* =================================================
                                    SERVICE
                                ================================================= */}

                                <div className="contact-field">

                                    <label htmlFor="service">
                                        Service Interested In
                                    </label>

                                    <select
                                        id="service"
                                        name="service"
                                        defaultValue=""
                                        required
                                        onInvalid={(event) =>
                                            handleInvalid(
                                                event,
                                                "Please enter your service interest"
                                            )
                                        }
                                        onInput={handleInput}
                                    >

                                        <option
                                            value=""
                                            disabled
                                        >
                                            Select a service
                                        </option>

                                        <option value="software-development">
                                            Software Development
                                        </option>

                                        <option value="web-app-development">
                                            Web & App Development
                                        </option>

                                        <option value="iot">
                                            IoT Solutions
                                        </option>

                                        <option value="training">
                                            Training & Workshops
                                        </option>

                                        <option value="product-development">
                                            Product Development
                                        </option>

                                        <option value="startup-support">
                                            Startup Support
                                        </option>

                                        <option value="other">
                                            Other
                                        </option>

                                    </select>

                                </div>


                                {/* =================================================
                                    PROJECT DETAILS
                                ================================================= */}

                                <div className="contact-field">

                                    <label htmlFor="message">
                                        Project Details
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Briefly describe your project..."
                                        required
                                        onInvalid={(event) =>
                                            handleInvalid(
                                                event,
                                                "Please enter your project details"
                                            )
                                        }
                                        onInput={handleInput}
                                    ></textarea>

                                </div>


                                {/* =================================================
                                    SUBMIT
                                ================================================= */}

                                <button
                                    type="submit"
                                    className="contact-submit-btn"
                                >

                                    <span>
                                        Send Project Enquiry
                                    </span>

                                    <ArrowRight size={19} />

                                </button>


                                <p className="contact-form-note">
                                    We usually respond within 24 hours.
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                BOTTOM TRUST STRIP
            ===================================================== */}

            <section className="contact-trust">

                <div className="contact-container">

                    <div
                        className="contact-trust-inner"
                        data-aos="fade-up"
                    >

                        <div>

                            <strong>
                                Have questions before starting?
                            </strong>

                            <span>
                                We're happy to discuss your requirements.
                            </span>

                        </div>


                        <a
                            href="https://wa.me/918925450473"
                            target="_blank"
                            rel="noreferrer"
                            className="contact-whatsapp-btn"
                        >

                            Talk to Us

                            <ArrowRight size={17} />

                        </a>

                    </div>

                </div>

            </section>

        </main>
    );
}
