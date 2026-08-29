import React, { useEffect, useState } from "react";
import "./HeroSection.css";

const slides = [
    {
        bg: "/images/projenius-banner.webp",
        thumb: "/images/projenius-banner.webp",
        buttonText: "Explore Courses",
    },
    {
        bg: "/images/projenius-banner-1.webp",
        thumb: "/images/projenius-banner-1.webp",
        buttonText: "Explore IoT",
    },
    {
        bg: "/images/projenius-banner-2.webp",
        thumb: "/images/projenius-banner-2.webp",
        buttonText: "Explore Web Design",
    },
    {
        bg: "/images/projenius-banner-3.webp",
        thumb: "/images/projenius-banner-3.webp",
        buttonText: "Explore Workshops",
    },
    {
        bg: "/images/projenius-banner-4.webp",
        thumb: "/images/projenius-banner-4.webp",
        buttonText: "Explore Software",
    },
];

const PARTICLES = [
    {
        size: 10,
        top: "25%",
        left: "12%",
        duration: "5.2s",
        delay: "0s",
    },
    {
        size: 6,
        top: "70%",
        left: "8%",
        duration: "6.8s",
        delay: "1s",
    },
    {
        size: 14,
        top: "30%",
        left: "88%",
        duration: "7.1s",
        delay: "0.4s",
    },
    {
        size: 8,
        top: "72%",
        left: "82%",
        duration: "5.6s",
        delay: "2s",
    },
    {
        size: 5,
        top: "55%",
        left: "55%",
        duration: "4.9s",
        delay: "0.8s",
    },
    {
        size: 12,
        top: "20%",
        left: "70%",
        duration: "6.3s",
        delay: "1.5s",
    },
];

function DotIndicators({ total, active, onDotClick }) {
    return (
        <div className="hero-dot-indicators">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`hero-slide-dot ${
                        index === active ? "active" : ""
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => onDotClick(index)}
                />
            ))}
        </div>
    );
}

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 991px)");

        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleChange();

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        slides.forEach((slide) => {
            const bg = new Image();
            bg.src = slide.bg;

            const thumb = new Image();
            thumb.src = slide.thumb;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 3800);

        return () => clearInterval(interval);
    }, []);

    const handleSlideChange = (index) => {
        setActiveSlide(index);
    };

    const getSlideIndex = (position) => {
        return (activeSlide + position) % slides.length;
    };

    const activeImage = slides[getSlideIndex(0)];
    const secondImage = slides[getSlideIndex(1)];
    const thirdImage = slides[getSlideIndex(2)];

    return (
        <section className="hero-wrapper">
            {/* Background image */}
            <div
                key={activeSlide}
                className="hero-background"
                style={{
                    backgroundImage: `url(${slides[activeSlide].bg})`,
                }}
            />

            {/* Dark overlay */}
            <div className="hero-overlay" />

            {/* Decorative particles */}
            <div className="hero-particles">
                {PARTICLES.map((particle, index) => (
                    <span
                        key={index}
                        className="hero-particle"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            top: particle.top,
                            left: particle.left,
                            animationDuration: particle.duration,
                            animationDelay: particle.delay,
                        }}
                    />
                ))}
            </div>

            {/* Main hero */}
            <div className="hero-inner">
                <div className="hero-content">
                    {/* Left content */}
                    <div className="hero-text">
                        <h3
                            className="subheading"
                            data-aos="fade-up"
                        >
                            We Design, Develop &amp; Deliver Impactful
                            Technology
                        </h3>

                        <h1
                            className="heading"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <span className="hero-heading-line">
                                Building{" "}
                                <span className="smart-solutions">
                                    Smart Solutions
                                </span>
                            </span>

                            <span className="hero-heading-line">
                                with AI, IoT &amp; Innovation
                            </span>
                        </h1>

                        <p
                            className="description"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Projenius is a technology-driven startup focused
                            on building innovative solutions in AI, IoT,
                            Software Development, and Product Engineering.
                        </p>

                        <div
                            className="hero-buttons"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <a
                                href="#"
                                className="hero-main-btn"
                            >
                                {slides[activeSlide].buttonText}
                            </a>
                        </div>

                        {isMobile && (
                            <DotIndicators
                                total={slides.length}
                                active={activeSlide}
                                onDotClick={handleSlideChange}
                            />
                        )}
                    </div>

                    {/* Right visual */}
                    <div className="hero-visual">
                        <div className="thumb-wrapper">
                            {/* Active circle */}
                            <button
                                type="button"
                                className="thumb-slot thumb-slot-main"
                                onClick={() =>
                                    handleSlideChange(
                                        getSlideIndex(1)
                                    )
                                }
                                aria-label="Next slide"
                            >
                                <img
                                    src={activeImage.thumb}
                                    alt="Technology"
                                    draggable="false"
                                />
                            </button>

                            {/* Second circle */}
                            <button
                                type="button"
                                className="thumb-slot thumb-slot-second"
                                onClick={() =>
                                    handleSlideChange(
                                        getSlideIndex(1)
                                    )
                                }
                                aria-label="Next slide"
                            >
                                <img
                                    src={secondImage.thumb}
                                    alt="Technology"
                                    draggable="false"
                                />
                            </button>

                            {/* Third circle */}
                            <button
                                type="button"
                                className="thumb-slot thumb-slot-third"
                                onClick={() =>
                                    handleSlideChange(
                                        getSlideIndex(2)
                                    )
                                }
                                aria-label="Next slide"
                            >
                                <img
                                    src={thirdImage.thumb}
                                    alt="Technology"
                                    draggable="false"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Existing bottom zig-zag */}
            <div className="hero-zigzag">
                <div className="hero-zigzag-cyan" />
                <div className="hero-zigzag-white" />
            </div>
        </section>
    );
}