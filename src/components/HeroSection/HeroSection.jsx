import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css";

import banner from "../../assets/images/projenius-banner.webp";
import bannerOne from "../../assets/images/projenius-banner-1.webp";

/* =========================================================
   HERO SLIDES
========================================================= */

const slides = [
    {
        bg: banner,
        thumb: banner,
    },
    {
        bg: bannerOne,
        thumb: bannerOne,
    },
    {
        bg: banner,
        thumb: banner,
    },
    {
        bg: bannerOne,
        thumb: bannerOne,
    },
    {
        bg: banner,
        thumb: banner,
    },
    {
        bg: bannerOne,
        thumb: bannerOne,
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
                    className={`hero-slide-dot ${index === active ? "active" : ""
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
       SMART SOLUTIONS TYPING
    ===================================================== */

    const [typedText, setTypedText] = useState("");

    const heroRef = useRef(null);
    const typingTimerRef = useRef(null);
    const typingRunRef = useRef(0);

    const SMART_SOLUTIONS_TEXT = "Smart Solutions";

    /*
     * Typing configuration
     */
    const TYPING_START_DELAY = 350;
    const TYPING_SPEED = 170;

    /* =========================================================
   CLEAR TYPING ANIMATION
========================================================= */

    const clearTypingAnimation = () => {
        if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current);
            typingTimerRef.current = null;
        }

        /*
         * Invalidates any currently running typing sequence.
         */
        typingRunRef.current += 1;
    };

    const startTypingAnimation = () => {
    clearTypingAnimation();

    const currentRun = typingRunRef.current;

    /*
     * Always start from the beginning.
     */
    setTypedText("");

    let characterIndex = 0;

    const typeNextCharacter = () => {
        /*
         * Stop if this animation is no longer active.
         */
        if (currentRun !== typingRunRef.current) {
            return;
        }

        /*
         * Finished typing.
         */
        if (
            characterIndex >=
            SMART_SOLUTIONS_TEXT.length
        ) {
            typingTimerRef.current = null;
            return;
        }

        characterIndex += 1;

        setTypedText(
            SMART_SOLUTIONS_TEXT.slice(
                0,
                characterIndex
            )
        );

        /*
         * Schedule the next character.
         */
        typingTimerRef.current = setTimeout(
            typeNextCharacter,
            TYPING_SPEED
        );
    };

    /*
     * Small pause before typing begins.
     * This makes the animation feel intentional
     * instead of appearing immediately.
     */
    typingTimerRef.current = setTimeout(
        typeNextCharacter,
        TYPING_START_DELAY
    );
};

   

    /* =====================================================
       HERO VISIBILITY OBSERVER
       Typing restarts whenever section enters viewport
    ===================================================== */

    useEffect(() => {
        const heroElement = heroRef.current;

        if (!heroElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startTypingAnimation();
                } else {
                    /* Reset when leaving the section */
                    if (typingTimerRef.current) {
                        clearInterval(typingTimerRef.current);
                        typingTimerRef.current = null;
                    }

                    setTypedText("");
                }
            },
            {
                threshold: 0.45,
            }
        );

        observer.observe(heroElement);

        return () => {
            observer.disconnect();

            if (typingTimerRef.current) {
                clearInterval(typingTimerRef.current);
                typingTimerRef.current = null;
            }
        };
    }, []);

    /* =====================================================
       RESPONSIVE CHECK
    ===================================================== */

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(max-width: 991px)"
        );

        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleChange();

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleChange
            );
        };
    }, []);

    /* =====================================================
       PRELOAD ALL IMAGES
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
            setActiveSlide(
                (previousSlide) =>
                    (previousSlide + 1) % slides.length
            );
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

    /* =====================================================
       JSX
    ===================================================== */

    return (
        <section
            ref={heroRef}
            className="hero-wrapper"
        >
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
                            animationDuration:
                                particle.duration,
                            animationDelay:
                                particle.delay,
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
                            We Design, Develop &amp; Deliver
                            Impactful Technology
                        </h3>

                        {/* =================================
                            MAIN HEADING
                        ================================= */}

                        <h1
                            className="heading"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <span className="hero-heading-line hero-heading-line-1">
                                Building{" "}
                                <span className="smart-solutions">
                                    {typedText}
                                    <span
                                        className="typing-cursor"
                                        aria-hidden="true"
                                    />
                                </span>
                            </span>

                            <span className="hero-heading-line hero-heading-line-2">
                                with AI, IoT &amp; Innovation
                            </span>
                        </h1>

                        {/* =================================
                            DESCRIPTION
                        ================================= */}

                        <p
                            className="description"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            ProJenius is a technology-driven
                            startup focused on building
                            innovative solutions in AI, IoT,
                            Software Development, and Product
                            Engineering.
                        </p>

                        {/* =================================
                            MOBILE DOTS
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

                            {/* ACTIVE IMAGE */}

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
                                    src={banner}
                                    alt="Projenius technology"
                                    draggable="false"
                                />
                            </button>

                            {/* SECOND IMAGE */}

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
                                    src={bannerOne}
                                    alt="Projenius technology"
                                    draggable="false"
                                />
                            </button>

                            {/* THIRD IMAGE */}

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
                                    src={banner}
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
