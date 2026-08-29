import React, { useEffect, useState } from "react";
import "./HeroSection.css";

/* =========================================================
   HERO SLIDES
   ========================================================= */

const slides = [
    {
        bg: "/images/projenius-banner.webp",
        thumb: "/images/projenius-banner.webp",
    },
    {
        bg: "/images/projenius-banner-1.webp",
        thumb: "/images/projenius-banner-1.webp",
    },
    {
        bg: "/images/projenius-banner.webp",
        thumb: "/images/projenius-banner.webp",
    },
    {
        bg: "/images/projenius-banner-1.webp",
        thumb: "/images/projenius-banner-1.webp",
    },
    {
        bg: "/images/projenius-banner.webp",
        thumb: "/images/projenius-banner.webp",
    },
    {
        bg: "/images/projenius-banner-1.webp",
        thumb: "/images/projenius-banner-1.webp",
    },
];


/* =========================================================
   PARTICLES
   ========================================================= */

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


/* =========================================================
   MOBILE DOT INDICATORS
   ========================================================= */

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


/* =========================================================
   HERO SECTION
   ========================================================= */

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);


    /* =====================================================
       RESPONSIVE CHECK
       ===================================================== */

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


    /* =====================================================
       PRELOAD ALL 6 IMAGES
       ===================================================== */

    useEffect(() => {
        slides.forEach((slide) => {
            const backgroundImage = new Image();
            backgroundImage.src = slide.bg;

            const thumbnailImage = new Image();
            thumbnailImage.src = slide.thumb;
        });
    }, []);


    /* =====================================================
       CONTINUOUS AUTO ROTATION
       ===================================================== */

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((previousSlide) => {
                return (previousSlide + 1) % slides.length;
            });
        }, 3800);

        return () => {
            clearInterval(interval);
        };
    }, []);


    /* =====================================================
       MANUAL SLIDE CHANGE
       ===================================================== */

    const handleSlideChange = (index) => {
        setActiveSlide(index);
    };


    /* =====================================================
       CIRCULAR SLIDE INDEX
       ===================================================== */

    const getSlideIndex = (position) => {
        return (activeSlide + position) % slides.length;
    };


    const activeImage = slides[getSlideIndex(0)];
    const secondImage = slides[getSlideIndex(1)];
    const thirdImage = slides[getSlideIndex(2)];


    /* =====================================================
       JSX
       ===================================================== */

    return (
        <section className="hero-wrapper">

            {/* =============================================
                BACKGROUND IMAGE
                ============================================= */}

            <div
                key={activeSlide}
                className="hero-background"
                style={{
                    backgroundImage: `url(${activeImage.bg})`,
                }}
            />


            {/* =============================================
                DARK OVERLAY
                ============================================= */}

            <div className="hero-overlay" />


            {/* =============================================
                DECORATIVE PARTICLES
                ============================================= */}

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


            {/* =============================================
                MAIN HERO CONTENT
                ============================================= */}

            <div className="hero-inner">

                <div className="hero-content">

                    {/* =====================================
                        LEFT CONTENT
                        ===================================== */}

                    <div className="hero-text">

                        <h3
                            className="subheading"
                            data-aos="fade-up"
                        >
                            We Design, Develop &amp; Deliver Impactful
                            Technology
                        </h3>


                        {/* MAIN HEADING */}

                        <h1
                            className="heading"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <span className="hero-heading-line hero-heading-line-1">
                                Building{" "}
                                <span className="smart-solutions">
                                    Smart Solutions
                                </span>
                            </span>

                            <span className="hero-heading-line hero-heading-line-2">
                                with AI, IoT &amp; Innovation
                            </span>
                        </h1>


                        {/* DESCRIPTION */}

                        <p
                            className="description"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Projenius is a technology-driven startup focused
                            on building innovative solutions in AI, IoT,
                            Software Development, and Product Engineering.
                        </p>


                        {/* =================================
                            NO TEXT BUTTON
                            ================================= */}

                        {isMobile && (
                            <DotIndicators
                                total={slides.length}
                                active={activeSlide}
                                onDotClick={handleSlideChange}
                            />
                        )}

                    </div>


                    {/* =====================================
                        RIGHT SIDE — IMAGE ROTATION
                        ===================================== */}

                    <div className="hero-visual">

                        <div className="thumb-wrapper">

                            {/* =================================
                                ACTIVE IMAGE
                                ================================= */}

                            <button
                                type="button"
                                className="thumb-slot thumb-slot-main"
                                onClick={() =>
                                    handleSlideChange(
                                        getSlideIndex(1)
                                    )
                                }
                                aria-label="Show next image"
                            >
                                <img
                                    src={activeImage.thumb}
                                    alt="Projenius technology"
                                    draggable="false"
                                />
                            </button>


                            {/* =================================
                                SECOND IMAGE
                                ================================= */}

                            <button
                                type="button"
                                className="thumb-slot thumb-slot-second"
                                onClick={() =>
                                    handleSlideChange(
                                        getSlideIndex(1)
                                    )
                                }
                                aria-label="Show next image"
                            >
                                <img
                                    src={secondImage.thumb}
                                    alt="Projenius technology"
                                    draggable="false"
                                />
                            </button>


                            {/* =================================
                                THIRD IMAGE
                                ================================= */}

                            <button
                                type="button"
                                className="thumb-slot thumb-slot-third"
                                onClick={() =>
                                    handleSlideChange(
                                        getSlideIndex(2)
                                    )
                                }
                                aria-label="Show next image"
                            >
                                <img
                                    src={thirdImage.thumb}
                                    alt="Projenius technology"
                                    draggable="false"
                                />
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* =============================================
                BOTTOM ZIG-ZAG
                ============================================= */}

            <div className="hero-zigzag">
                <div className="hero-zigzag-cyan" />
                <div className="hero-zigzag-white" />
            </div>

        </section>
    );
}