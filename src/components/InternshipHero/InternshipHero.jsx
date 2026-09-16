import { useEffect, useState } from "react";
import "./InternshipHero.css";

const PARTICLES = [
    { size: 5, top: "18%", left: "12%", delay: "0s", duration: "5s" },
    { size: 8, top: "30%", left: "22%", delay: "1s", duration: "6s" },
    { size: 4, top: "68%", left: "12%", delay: "2s", duration: "5.5s" },
    { size: 7, top: "76%", left: "28%", delay: "0.5s", duration: "7s" },
    { size: 5, top: "20%", left: "72%", delay: "1.5s", duration: "6s" },
    { size: 9, top: "35%", left: "88%", delay: "0.3s", duration: "5.5s" },
    { size: 4, top: "66%", left: "82%", delay: "2s", duration: "6.5s" },
    { size: 6, top: "82%", left: "68%", delay: "1s", duration: "5s" },
];

export default function InternshipHero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setLoaded(true);
        });

        return () => cancelAnimationFrame(timer);
    }, []);

    return (
        <section
            className={`internship-hero ${
                loaded ? "internship-hero-loaded" : ""
            }`}
            aria-label="Internship Program"
        >
            {/* Background */}
            <div className="internship-hero-background" />

            {/* Dark overlay */}
            <div className="internship-hero-overlay" />

            {/* Blue lighting */}
            <div className="internship-hero-glow internship-hero-glow-one" />
            <div className="internship-hero-glow internship-hero-glow-two" />

            {/* Decorative grid */}
            <div className="internship-hero-grid" />

            {/* Floating particles */}
            <div className="internship-hero-particles">
                {PARTICLES.map((particle, index) => (
                    <span
                        key={index}
                        className="internship-particle"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            top: particle.top,
                            left: particle.left,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="internship-hero-content">
                <div className="internship-hero-text">

                    <div className="internship-hero-label">
                        INTERNSHIP PROGRAM 2026
                    </div>

                    <h1 className="internship-hero-title">
                        Launch Your Career
                        <br />
                        with Real-World Projects
                    </h1>

                </div>
            </div>

            {/* Bottom glow */}
            <div className="internship-hero-bottom-glow" />
        </section>
    );
}