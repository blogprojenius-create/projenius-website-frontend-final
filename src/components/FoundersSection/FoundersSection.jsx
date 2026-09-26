import React, { useEffect, useRef } from "react";
import "./FoundersSection.css";

import Leader from "../../assets/images/team-member-1.webp";
import Founder from "../../assets/images/team-member-1.webp";
import CoFounder from "../../assets/images/team-member-2.webp";

/* =========================================================
   SOCIAL ICONS
========================================================= */

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.7 3H22l-7.2 8.2L23.2 21h-6.6l-5.2-6.2L6 21H2.7l7.7-8.8L2.2 3h6.7l4.7 5.6L18.7 3Zm-1.2 16h1.8L7.9 4.9H6L17.5 19Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.2 8.3H2V22h3.2V8.3ZM3.6 2A1.9 1.9 0 1 0 3.6 5.8 1.9 1.9 0 0 0 3.6 2ZM22 14.2c0-4.1-2.2-6-5.1-6-2.3 0-3.3 1.3-3.9 2.2V8.3H9.8V22H13v-6.8c0-1.8.3-3.5 2.5-3.5 2.2 0 2.2 2 2.2 3.6V22H21l1-7.8Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="1" />
    </svg>
  );
}

function SocialIcons() {
  return (
    <div
      className="founder-social-icons"
      aria-label="Social media links"
    >
      <span
        className="founder-social-icon"
        aria-label="Facebook"
      >
        <FacebookIcon />
      </span>

      <span
        className="founder-social-icon"
        aria-label="X"
      >
        <XIcon />
      </span>

      <span
        className="founder-social-icon"
        aria-label="LinkedIn"
      >
        <LinkedinIcon />
      </span>

      <span
        className="founder-social-icon"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </span>
    </div>
  );
}


/* =========================================================
   REVEAL HOOK
========================================================= */

function useReveal(className) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add(className);

      return () => {
        element.classList.remove(className);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      element.classList.remove(className);
    };
  }, [className]);

  return ref;
}


/* =========================================================
   FOUNDER CARD
========================================================= */

function FounderCard({
  name,
  role,
  bio,
  image,
  imageAlt,
}) {
  const cardRef = useReveal("founder-card-visible");

  return (
    <article
      ref={cardRef}
      className="founder-card"
    >
      {/* IMAGE AREA */}

      <div className="founder-image-column">

        <div className="founder-image-wrapper">
          <div
            className="founder-image-shape"
            aria-hidden="true"
          />

          <img
            src={image}
            alt={imageAlt}
            className="founder-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* SOCIAL ICONS */}
        <SocialIcons />

      </div>


      {/* CONTENT */}

      <div className="founder-text-content">

        <h3 className="founder-name">
          {name}
        </h3>

        <p className="founder-role">
          {role}
        </p>

        <p className="founder-bio">
          {bio}
        </p>

      </div>
    </article>
  );
}


/* =========================================================
   ACADEMIC LEADER CARD
========================================================= */

function LeaderCard() {
  const cardRef = useReveal("leader-card-visible");

  return (
    <article
      ref={cardRef}
      className="leader-card"
    >

      {/* IMAGE AREA */}

      <div className="leader-image-column">

        <div className="leader-image">
          <div
            className="leader-image-shape"
            aria-hidden="true"
          />

          <img
            src={Leader}
            alt="Dr. D. Vasudevan"
            loading="lazy"
            decoding="async"
          />
        </div>

      </div>


      {/* CONTENT */}

      <div className="leader-info">

        <h3>
          Dr.D.Vasudevan
        </h3>

        <p className="role">
          Principal
        </p>

        <p className="description">
          A forward-thinking academic leader promoting innovation,
          research, and real-world learning to empower students and
          drive institutional excellence.
        </p>

      </div>

    </article>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CombinedLeadershipPage() {
  return (
    <div className="founders-leadership-page">

      {/* =====================================================
          FOUNDERS
      ===================================================== */}

      <section className="founders-section">

        <div className="section-tag">
          Leadership Team
        </div>

        <h2 className="section-title">
          Meet Our{" "}
          <span className="founders-highlight">
            Founders
          </span>
        </h2>

        <p className="section-description">
          Visionary leaders committed to building the next generation
          of innovators and entrepreneurs.
        </p>


        <div className="founders-cards-container">

          <FounderCard
            name="Karthick Ganesh"
            role="Founder & CEO"
            bio="A passionate leader focused on empowering the next generation of innovators with a strong vision for academic and practical excellence."
            image={Founder}
            imageAlt="Karthick Ganesh"
          />

          <FounderCard
            name="Harshini"
            role="CTO & Co-Founder"
            bio="A visionary mentor promoting entrepreneurship and innovation, supporting students from exploration to impactful execution."
            image={CoFounder}
            imageAlt="Harshini"
          />

        </div>

      </section>


      {/* =====================================================
          ACADEMIC LEADERSHIP
      ===================================================== */}

      <section className="leadership-section-container">

        <div className="academic-leadership">

          <h2>
            Academic{" "}
            <span className="title-highlight">
              Leadership
            </span>
          </h2>


          <div className="leader-card-container">

            <LeaderCard />

          </div>

        </div>

      </section>

    </div>
  );
}