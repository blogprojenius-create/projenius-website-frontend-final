import { useEffect, useState } from "react";

import {
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    CheckCircle,
    X,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

import "../assets/css/Contact.css";


/* =========================================================
   FAQ DATA
========================================================= */

const FAQ_DATA = [
    {
        question: "What services does ProJenius offer?",
        answer:
            "ProJenius offers software development, web and app development, IoT solutions, training and workshops, product development, startup support, and other technology solutions based on your requirements.",
    },
    {
        question: "How do I start a project with ProJenius?",
        answer:
            "You can start by submitting your project requirements through the enquiry form above. Our team will review your requirements and contact you to discuss the project and next steps.",
    },
    {
        question: "Is there an advance payment required?",
        answer:
            "Payment terms depend on the project scope, requirements, and agreed engagement model. The applicable payment structure will be discussed clearly before the project begins.",
    },
    {
        question: "What if my project involves hardware components?",
        answer:
            "If your project involves hardware, IoT devices, sensors, or other physical components, share those requirements with our team. We can evaluate the hardware and software requirements together.",
    },
    {
        question: "How are changes to the project handled?",
        answer:
            "Project changes are reviewed based on their effect on the scope, timeline, resources, and cost. Any major changes will be discussed with you before implementation.",
    },
    {
        question: "What is the typical timeline for a project?",
        answer:
            "The timeline depends on the project's complexity, features, technology, and overall scope. After reviewing your requirements, our team can provide a realistic estimated timeline.",
    },
    {
        question: "Who owns the final deliverables?",
        answer:
            "Ownership of the final deliverables depends on the agreed project terms. Ownership and usage rights will be discussed clearly before the project begins.",
    },
    {
        question: "Is my information kept confidential?",
        answer:
            "Yes. The information you provide is used to understand and discuss your project requirements. Specific confidentiality requirements can also be discussed with our team when necessary.",
    },
    {
        question: "Can I terminate a project midway?",
        answer:
            "Project termination depends on the agreed terms and the current stage of development. Please discuss the situation with our team so that the appropriate next steps can be determined.",
    },
    {
        question: "How can I contact the ProJenius team?",
        answer:
            "You can contact the ProJenius team through the enquiry form above, email us at teamprojenius@gmail.com, or use the contact details provided on this page.",
    },
];


/* =========================================================
   CONTACT COMPONENT
========================================================= */

export default function Contact() {

    /* =====================================================
       FORM STATES
    ===================================================== */

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    const [submitError, setSubmitError] = useState("");


    /* =====================================================
       FAQ STATES
    ===================================================== */

    const [showFAQs, setShowFAQs] = useState(false);

    /*
        null = no FAQ answer is open
        0    = first FAQ is open
        1    = second FAQ is open
        etc.
    */

    const [openFAQ, setOpenFAQ] = useState(null);


    /* =====================================================
       AOS
    ===================================================== */

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


    /* =====================================================
       CUSTOM VALIDATION
    ===================================================== */

    const handleInvalid = (event, message) => {

        event.target.setCustomValidity(message);

    };


    const handleInput = (event) => {

        event.target.setCustomValidity("");

        if (submitError) {
            setSubmitError("");
        }

    };


    /* =====================================================
       CONTACT FORM SUBMIT
    ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        const form = event.currentTarget;


        /* -------------------------------------------------
           VALIDATION
        ------------------------------------------------- */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        /* -------------------------------------------------
           PREVENT DOUBLE SUBMISSION
        ------------------------------------------------- */

        if (isSubmitting) {
            return;
        }


        setIsSubmitting(true);

        setSubmitError("");


        /* -------------------------------------------------
           FORM DATA
        ------------------------------------------------- */

        const formData = new FormData(form);


        const contactData = {

            name:
                formData.get("name")?.trim() || "",

            email:
                formData.get("email")?.trim() || "",

            phone:
                formData.get("phone")?.trim() || "",

            service:
                formData.get("service")?.trim() || "",

            message:
                formData.get("message")?.trim() || "",

        };


        /* -------------------------------------------------
           API
        ------------------------------------------------- */

        const API_URL =
            import.meta.env.VITE_API_URL ||
            "http://localhost:5000";


        try {

            const response = await fetch(
                `${API_URL}/api/contact`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(contactData),
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to submit your enquiry."
                );

            }


            /* -------------------------------------------------
               SUCCESS
            ------------------------------------------------- */

            form.reset();

            setSubmitError("");

            setShowSuccess(true);


        } catch (error) {

            console.error(
                "Contact form submission error:",
                error
            );

            setSubmitError(
                error.message ||
                "Something went wrong. Please try again."
            );


        } finally {

            setIsSubmitting(false);

        }

    };


    /* =====================================================
       SUCCESS POPUP
    ===================================================== */

    const closeSuccessPopup = () => {

        setShowSuccess(false);

    };


    /* =====================================================
       FAQ MAIN TOGGLE
    ===================================================== */

    const toggleFAQs = () => {

        setShowFAQs((current) => {

            const nextState = !current;

            /*
                When FAQ section is hidden,
                close any currently opened answer.
            */

            if (!nextState) {
                setOpenFAQ(null);
            }

            return nextState;

        });

    };


    /* =====================================================
       FAQ ITEM TOGGLE
    ===================================================== */

    const toggleFAQ = (index) => {

        setOpenFAQ((current) => {

            /*
                Clicking the currently open question
                closes only its answer.
            */

            if (current === index) {
                return null;
            }

            /*
                Clicking another question automatically
                closes the previous answer and opens
                the newly selected answer.
            */

            return index;

        });

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
                            LEFT CONTACT INFORMATION
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
                                    href="mailto:teamprojenius@gmail.com"
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
                            CONTACT FORM
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


                            {/* FORM */}

                            <form
                                className="contact-form"
                                onSubmit={handleSubmit}
                            >


                                {/* NAME + EMAIL */}

                                <div className="contact-form-row">


                                    <div className="contact-field">

                                        <label htmlFor="name">
                                            Name
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Tell us your name"
                                            autoComplete="name"
                                            required
                                            onInvalid={(event) =>
                                                handleInvalid(
                                                    event,
                                                    "Please enter your name."
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
                                            placeholder="Where should we reach you?"
                                            autoComplete="email"
                                            required
                                            onInvalid={(event) =>
                                                handleInvalid(
                                                    event,
                                                    "Please enter a valid email address."
                                                )
                                            }
                                            onInput={handleInput}
                                        />

                                    </div>


                                </div>


                                {/* PHONE */}

                                <div className="contact-field">

                                    <label htmlFor="phone">
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="Your preferred contact number"
                                        autoComplete="tel"
                                        required
                                        onInvalid={(event) =>
                                            handleInvalid(
                                                event,
                                                "Please enter your phone number."
                                            )
                                        }
                                        onInput={handleInput}
                                    />

                                </div>


                                {/* SERVICE */}

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
                                                "Please select the service you need."
                                            )
                                        }
                                        onInput={handleInput}
                                    >

                                        <option
                                            value=""
                                            disabled
                                        >
                                            What can we help you build?
                                        </option>

                                        <option value="Software Development">
                                            Software Development
                                        </option>

                                        <option value="Web & App Development">
                                            Web & App Development
                                        </option>

                                        <option value="IoT Solutions">
                                            IoT Solutions
                                        </option>

                                        <option value="Training & Workshops">
                                            Training & Workshops
                                        </option>

                                        <option value="Product Development">
                                            Product Development
                                        </option>

                                        <option value="Startup Support">
                                            Startup Support
                                        </option>

                                        <option value="Other">
                                            Something else
                                        </option>

                                    </select>

                                </div>


                                {/* PROJECT DETAILS */}

                                <div className="contact-field">

                                    <label htmlFor="message">
                                        Project Details
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Tell us what you want to build, your goals, timeline, or any specific requirements..."
                                        required
                                        onInvalid={(event) =>
                                            handleInvalid(
                                                event,
                                                "Please tell us a little about your project."
                                            )
                                        }
                                        onInput={handleInput}
                                    ></textarea>

                                </div>


                                {/* ERROR */}

                                {submitError && (

                                    <p
                                        className="contact-submit-error"
                                        role="alert"
                                    >
                                        {submitError}
                                    </p>

                                )}


                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    className="contact-submit-btn"
                                    disabled={isSubmitting}
                                >

                                    <span>
                                        {isSubmitting
                                            ? "Sending Enquiry..."
                                            : "Send Project Enquiry"}
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
                FAQ CTA + FAQ CONTENT
            ===================================================== */}

            <section className="contact-trust">

                <div className="contact-container">

                    <div
                        className={`contact-trust-inner ${
                            showFAQs
                                ? "contact-trust-inner-open"
                                : ""
                        }`}
                        data-aos="fade-up"
                    >


                        {/* =================================================
                            FAQ CTA TOP ROW
                        ================================================= */}

                        <div className="contact-trust-top">


                            <div className="contact-trust-content">

                                <strong>
                                    Have questions before starting?
                                </strong>

                                <span>
                                    We're happy to discuss your requirements.
                                </span>

                            </div>


                            <button
                                type="button"
                                className="contact-whatsapp-btn contact-faq-toggle"
                                onClick={toggleFAQs}
                                aria-expanded={showFAQs}
                                aria-controls="contact-faq-content"
                            >

                                <span>
                                    {showFAQs
                                        ? "Hide FAQs"
                                        : "Visit Our FAQ"}
                                </span>

                                <ArrowRight
                                    size={17}
                                    className={
                                        showFAQs
                                            ? "contact-faq-arrow-open"
                                            : ""
                                    }
                                />

                            </button>

                        </div>


                        {/* =================================================
                            FAQ CONTENT INSIDE SAME BOX
                        ================================================= */}

                        <div
                            id="contact-faq-content"
                            className={`contact-faq-expand ${
                                showFAQs
                                    ? "contact-faq-expand-open"
                                    : ""
                            }`}
                        >

                            <div className="contact-faq-content-inner">


                                {/* =================================================
                                    FAQ HEADER
                                ================================================= */}

                                <div className="contact-faq-header">

                                    <h2>
                                        Looking for Answers?
                                    </h2>

                                    <p>
                                        Before sending a message, please check
                                        our comprehensive FAQ section. You might
                                        find the solution instantly!
                                    </p>

                                </div>


                                {/* =================================================
                                    FAQ GRID
                                ================================================= */}

                                <div className="contact-faq-grid">

                                    <div className="contact-faq-column">

                                        {FAQ_DATA.filter(
                                            (_, index) => index % 2 === 0
                                        ).map((faq, columnIndex) => {

                                            const index = columnIndex * 2;
                                            const isOpen = openFAQ === index;

                                            return (
                                                <article
                                                    key={faq.question}
                                                    className={`contact-faq-card ${
                                                        isOpen
                                                            ? "contact-faq-card-open"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        type="button"
                                                        className="contact-faq-question"
                                                        onClick={() => toggleFAQ(index)}
                                                        aria-expanded={isOpen}
                                                        aria-controls={`faq-answer-${index}`}
                                                    >
                                                        <span className="contact-faq-question-text">
                                                            Q: {faq.question}
                                                        </span>

                                                        <span
                                                            className="contact-faq-icon"
                                                            aria-hidden="true"
                                                        >
                                                            {isOpen ? "−" : "+"}
                                                        </span>
                                                    </button>

                                                    <div
                                                        id={`faq-answer-${index}`}
                                                        className={`contact-faq-answer ${
                                                            isOpen
                                                                ? "contact-faq-answer-open"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="contact-faq-answer-inner">
                                                            <p>{faq.answer}</p>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}

                                    </div>

                                    <div className="contact-faq-column">

                                        {FAQ_DATA.filter(
                                            (_, index) => index % 2 === 1
                                        ).map((faq, columnIndex) => {

                                            const index = columnIndex * 2 + 1;
                                            const isOpen = openFAQ === index;

                                            return (
                                                <article
                                                    key={faq.question}
                                                    className={`contact-faq-card ${
                                                        isOpen
                                                            ? "contact-faq-card-open"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        type="button"
                                                        className="contact-faq-question"
                                                        onClick={() => toggleFAQ(index)}
                                                        aria-expanded={isOpen}
                                                        aria-controls={`faq-answer-${index}`}
                                                    >
                                                        <span className="contact-faq-question-text">
                                                            Q: {faq.question}
                                                        </span>

                                                        <span
                                                            className="contact-faq-icon"
                                                            aria-hidden="true"
                                                        >
                                                            {isOpen ? "−" : "+"}
                                                        </span>
                                                    </button>

                                                    <div
                                                        id={`faq-answer-${index}`}
                                                        className={`contact-faq-answer ${
                                                            isOpen
                                                                ? "contact-faq-answer-open"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="contact-faq-answer-inner">
                                                            <p>{faq.answer}</p>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                SUCCESS POPUP
            ===================================================== */}

            {showSuccess && (

                <div
                    className="contact-success-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-success-title"
                >

                    <div className="contact-success-popup">


                        {/* CLOSE */}

                        <button
                            type="button"
                            className="contact-success-close"
                            onClick={closeSuccessPopup}
                            aria-label="Close success message"
                        >

                            <X size={18} />

                        </button>


                        {/* SUCCESS ICON */}

                        <div className="contact-success-icon">

                            <CheckCircle size={42} />

                        </div>


                        {/* HEADING */}

                        <h2 id="contact-success-title">
                            Enquiry Received Successfully!
                        </h2>


                        {/* MESSAGE */}

                        <p>
                            Thank you for reaching out to ProJenius.
                            We've received your project requirements
                            and sent a confirmation email to your inbox.
                        </p>

                        <p>
                            Our team will review your requirements and
                            contact you shortly with the next steps.
                        </p>


                        {/* DONE */}

                        <button
                            type="button"
                            className="contact-success-btn"
                            onClick={closeSuccessPopup}
                        >
                            Done
                        </button>

                    </div>

                </div>

            )}

        </main>

    );

}