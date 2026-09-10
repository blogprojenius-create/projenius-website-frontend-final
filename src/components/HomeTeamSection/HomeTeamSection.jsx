import React, { useEffect, useRef, useState } from "react";
import "./HomeTeamSection.css";

const stats = [
  {
    value: 156,
    suffix: "K",
    label: "PROJECT COMPLETE",
  },
  {
    value: 556,
    suffix: "K",
    label: "CLIENTS SATISFACTION",
  },
  {
    value: 234,
    suffix: "K",
    label: "ENVATO MARKET",
  },
  {
    value: 348,
    suffix: "K",
    label: "MOBILE APPS",
  },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(
    stats.map(() => 0)
  );

  const hasAnimated = useRef(false);

  /* =====================================================
     SECTION REVEAL + COUNTER
  ===================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let animationFrame = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          /* Cancel any previous animation */
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }

          /* Reset numbers */
          setCounts(stats.map(() => 0));

          const duration = 5000;
          const startTime = performance.now();

          const animateCounters = (currentTime) => {
            const elapsed =
              currentTime - startTime;

            const progress = Math.min(
              elapsed / duration,
              1
            );

            /* Smooth continuous movement */
            const easedProgress =
              1 - Math.pow(1 - progress, 3);

            setCounts(
              stats.map((stat) =>
                Math.floor(
                  stat.value *
                  easedProgress
                )
              )
            );

            if (progress < 1) {
              animationFrame =
                requestAnimationFrame(
                  animateCounters
                );
            } else {
              /* Make sure final values are exact */
              setCounts(
                stats.map(
                  (stat) => stat.value
                )
              );
            }
          };

          animationFrame =
            requestAnimationFrame(
              animateCounters
            );
        } else {
          /*
           * Section left viewport.
           * Cancel current animation so that
           * the next entry starts from zero.
           */
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }

          setVisible(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  /* =====================================================
     WHATSAPP
  ===================================================== */

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/918925450473?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20ProJenius.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`contact-hero-section ${visible ? "contact-visible" : ""
        }`}
    >
      <div className="contact-hero-container">

        {/* =================================================
                    HEADER
                ================================================= */}

        <div className="contact-hero-heading">

          <span className="contact-hero-label">
            LET'S GET STARTED
          </span>

          <h2 className="contact-hero-title">
            Want to{" "}
            <span>Work Together</span>
          </h2>

          <div
            className="contact-hero-line"
            aria-hidden="true"
          >
            <span />
          </div>

        </div>


        {/* =================================================
                    SHOWCASE CARD
                ================================================= */}

        <div className="contact-showcase-card">

          <img
            src="/images/projenius-banner-4.webp"
            alt="ProJenius team working together"
            className="contact-showcase-image"
            loading="lazy"
          />

          <div
            className="contact-showcase-overlay"
            aria-hidden="true"
          />

          <div className="contact-showcase-content">

            <h3>
              Build A Creative
              <br />
              Showcase Website.
            </h3>

            <button
              type="button"
              className="contact-talk-btn"
              onClick={openWhatsApp}
            >
              <span>Let's Talk</span>
              <span aria-hidden="true">
                →
              </span>
            </button>

          </div>

        </div>


        {/* =================================================
                    STATS
                ================================================= */}

        <div className="contact-stats">

          {stats.map((stat, index) => (
            <React.Fragment
              key={stat.label}
            >

              <div className="contact-stat">

                <strong>
                  {counts[index]}
                  {stat.suffix}
                </strong>

                <span>
                  {stat.label}
                </span>

              </div>

              {index <
                stats.length - 1 && (
                  <div
                    className="contact-stat-divider"
                    aria-hidden="true"
                  />
                )}

            </React.Fragment>
          ))}

        </div>

      </div>
    </section>
  );
}