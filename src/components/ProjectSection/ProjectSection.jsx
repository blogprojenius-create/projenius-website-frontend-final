import React, { useEffect, useRef, useState } from "react";
import "./ProjectSection.css";

export default function ProjectSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Helminth Egg Detection Poster",
      subtitle: "Medical Conference Poster",
      description:
        "Scientific poster on helminth egg detection in dog samples highlighting diagnosis and zoonotic risks worldwide.",
      rating: 5,
      image: "/images/project-image-1.webp",
    },
    {
      title: "AI-Powered Water Health Monitoring",
      subtitle: "Software",
      description:
        "Powerful monitoring platform designed to improve water quality analysis and real-time environmental tracking.",
      rating: 4,
      image: "/images/project-image-2.webp",
    },
    {
      title: "Road Hazard Detection",
      subtitle: "Software",
      description:
        "AI-based accident detection system with instant emergency GPS alerts and real-time response tracking.",
      rating: 5,
      image: "/images/project-image-3.webp",
    },
    {
      title: "Smart Waste Management",
      subtitle: "Software",
      description:
        "Smart waste segregation system using sensors for automatic wet and dry waste classification.",
      rating: 4,
      image: "/images/project-image-4.webp",
    },
    {
      title: "Autonomous Follower Robot",
      subtitle: "Hardware",
      description:
        "Intelligent follower robot with obstacle avoidance for smart logistics and automated material transportation.",
      rating: 5,
      image: "/images/project-image-5.webp",
    },
  ];

  /* ============================
     SECTION REVEAL
  ============================ */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* ============================
     AUTO SLIDER
  ============================ */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [projects.length]);

  /* ============================
     PREVIOUS
  ============================ */
  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  /* ============================
     NEXT
  ============================ */
  const handleNext = () => {
    setActiveIndex(
      (prev) => (prev + 1) % projects.length
    );
  };

  /* ============================
     CARD POSITION
  ============================ */
  const getCardClass = (index) => {
    const total = projects.length;

    if (index === activeIndex) {
      return "project-card active";
    }

    if (
      index ===
      (activeIndex - 1 + total) % total
    ) {
      return "project-card prev";
    }

    if (
      index ===
      (activeIndex + 1) % total
    ) {
      return "project-card next";
    }

    return "project-card hidden";
  };

  return (
    <section
      ref={sectionRef}
      className={`project-section ${
        isVisible ? "project-visible" : ""
      }`}
    >
      <div className="project-container">

        {/* ============================
            HEADER
        ============================ */}
        <div className="project-header">

          <span className="project-badge">
            <span className="project-badge-dot"></span>
            OUR PROJECTS
          </span>

          <h2 className="project-title">
            Work{" "}
            <span>Showcase</span>
          </h2>

          <div className="project-title-line">
            <span></span>
          </div>

          <p className="project-description">
            We create powerful digital experiences with
            modern design, innovative strategies and
            professional development solutions.
          </p>

        </div>

        {/* ============================
            SLIDER
        ============================ */}
        <div className="project-slider-wrapper">

          {/* PREVIOUS */}
          <button
            type="button"
            className="project-arrow project-arrow-left"
            onClick={handlePrevious}
            aria-label="Previous project"
          >
            <span>←</span>
          </button>

          {/* CARDS */}
          <div className="project-stage">

            {projects.map((project, index) => (
              <article
                key={project.title}
                className={getCardClass(index)}
              >

                {/* IMAGE */}
                <div className="project-card-image">

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                  <div className="project-image-gradient"></div>

                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="project-category">
                    {project.subtitle}
                  </span>

                </div>

                {/* CONTENT */}
                <div className="project-card-content">

                  <h3 className="project-card-title">
                    {project.title}
                  </h3>

                  <p className="project-card-description">
                    {project.description}
                  </p>

                  <div className="project-card-bottom">

                    <div className="project-rating">

                      <div className="project-stars">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < project.rating
                                ? "filled"
                                : ""
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <span>
                        {project.rating}.0
                      </span>

                    </div>

                    <button
                      type="button"
                      className="project-view-btn"
                      onClick={() =>
                        setActiveIndex(index)
                      }
                    >
                      View Project
                      <span>↗</span>
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </div>

          {/* NEXT */}
          <button
            type="button"
            className="project-arrow project-arrow-right"
            onClick={handleNext}
            aria-label="Next project"
          >
            <span>→</span>
          </button>

        </div>

        {/* ============================
            DOTS
        ============================ */}
        <div className="project-dots">

          {projects.map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === activeIndex
                  ? "project-dot active"
                  : "project-dot"
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}

        </div>

      </div>
    </section>
  );
}