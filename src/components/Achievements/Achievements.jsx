import React, { useEffect, useRef, useState } from "react";
import "./Achievements.css";

/* =========================================================
   ACHIEVEMENT IMAGES
========================================================= */

const achievementImages = [
    {
        id: 1,
        src: "/images/gallery-1.webp",
        alt: "Achievement recognition event",
    },
    {
        id: 2,
        src: "/images/gallery-2.webp",
        alt: "Achievement award presentation",
    },
    {
        id: 3,
        src: "/images/gallery-3.webp",
        alt: "Achievement ceremony",
    },
    {
        id: 4,
        src: "/images/gallery-4.webp",
        alt: "Team achievement event",
    },
    {
        id: 5,
        src: "/images/gallery-5.webp",
        alt: "Team recognition event",
    },
    {
        id: 6,
        src: "/images/gallery-6.webp",
        alt: "Award recognition event",
    },
    {
        id: 7,
        src: "/images/gallery-5.webp",
        alt: "Team celebration",
    },
];

const Achievements = () => {
    const sectionRef = useRef(null);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimationKey((previous) => previous + 1);
                }
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="achievements-section"
            aria-labelledby="achievements-title"
        >
            <div className="achievements-container">

                {/* =================================================
            HEADER
        ================================================= */}

                <header className="achievements-header">
                    <span className="achievements-label">
                        ACHIEVEMENTS
                    </span>

                    <h2 id="achievements-title">
                        Awards & <span>Recognition</span>
                    </h2>

                    <p>
                        Celebrating achievements, innovation, creativity, and
                        milestones that showcase our passion for technology,
                        design, and impactful digital solutions.
                    </p>
                </header>

                {/* =================================================
            IMAGE GRID
        ================================================= */}

                <div
                    key={animationKey}
                    className="achievements-grid"
                >
                    {achievementImages.map((image, index) => (
                        <figure
                            key={image.id}
                            className={`achievement-card achievement-card-${index + 1}`}
                            style={{
                                "--achievement-delay": `${index * 0.25}s`,
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="achievement-image"
                                loading={index < 3 ? "eager" : "lazy"}
                                decoding="async"
                            />
                        </figure>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Achievements;