import React, { useEffect, useRef, useState } from "react";
import "./InternshipAbout.css";

/* =========================================================
   ICONS
========================================================= */

function DurationIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7v5l3.2 2" />
        </svg>
    );
}

function ModeIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="13" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
        </svg>
    );
}

function TypeIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 8h8" />
            <path d="M8 12h8" />
            <path d="M8 16h5" />
        </svg>
    );
}

function EligibilityIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
        </svg>
    );
}

/* =========================================================
   DATA
========================================================= */

const internshipInfo = [
    {
        title: "Duration",
        description: "1 Month, 3 Months, 6 Months",
        icon: <DurationIcon />,
    },
    {
        title: "Mode",
        description: "Online, Offline, Hybrid",
        icon: <ModeIcon />,
    },
    {
        title: "Type",
        description: "Guided Internship Program",
        icon: <TypeIcon />,
    },
    {
        title: "Eligibility",
        description: "Students, freshers, and career switchers",
        icon: <EligibilityIcon />,
    },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function InternshipAbout() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`internship-about ${
                visible ? "internship-about-visible" : ""
            }`}
        >
            <div className="internship-about-container">

                {/* =================================================
                    LEFT CONTENT
                ================================================= */}

                <div className="internship-about-content">

                    <div className="internship-about-tag">
                        ABOUT THE INTERNSHIP
                    </div>

                    <h2 className="internship-about-title">
                        Practical Training
                        <br />
                        <span>Built Around Real Work</span>
                    </h2>

                    <div className="internship-about-line" />

                    <p className="internship-about-description">
                        Gain hands-on experience through structured training,
                        mentor support, live projects, and career preparation
                        designed for students and freshers entering the tech
                        industry.
                    </p>

                    <div className="internship-about-buttons">

                        <button
                            type="button"
                            className="internship-primary-button"
                        >
                            Start Your Journey
                            <span>→</span>
                        </button>

                        <button
                            type="button"
                            className="internship-secondary-button"
                        >
                            Download Syllabus
                            <span>↓</span>
                        </button>

                    </div>
                </div>

                {/* =================================================
                    RIGHT INFORMATION
                ================================================= */}

                <div className="internship-about-info">

                    {internshipInfo.map((item, index) => (
                        <article
                            className="internship-info-card"
                            key={item.title}
                            style={{
                                "--card-delay": `${0.15 + index * 0.1}s`,
                            }}
                        >
                            <div className="internship-info-icon">
                                {item.icon}
                            </div>

                            <div className="internship-info-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
}