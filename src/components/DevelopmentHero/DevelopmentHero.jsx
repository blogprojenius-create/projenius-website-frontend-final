import { useEffect, useState } from "react";
import "./DevelopmentHero.css";

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

export default function DevelopmentHero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setLoaded(true);
        });

        return () => cancelAnimationFrame(timer);
    }, []);

    return (
        <section
            className={`development-hero ${
                loaded ? "development-hero-loaded" : ""
            }`}
            aria-label="Development Services"
        >
            {/* Background */}
            <div className="development-hero-background" />

            {/* Dark overlay */}
            <div className="development-hero-overlay" />

            {/* Blue lighting */}
            <div className="development-hero-glow development-hero-glow-one" />
            <div className="development-hero-glow development-hero-glow-two" />

            {/* Decorative grid */}
            <div className="development-hero-grid" />

            {/* Floating particles */}
            <div className="development-hero-particles">
                {PARTICLES.map((particle, index) => (
                    <span
                        key={index}
                        className="development-particle"
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
            <div className="development-hero-content">
                <div className="development-hero-text">
                    <h1 className="development-hero-title">
                        Development Services
                    </h1>

                    <p className="development-hero-subtitle">
                        Smart digital solutions built for real-world impact
                    </p>
                </div>
            </div>

            {/* Bottom glow */}
            <div className="development-hero-bottom-glow" />
        </section>
    );
}