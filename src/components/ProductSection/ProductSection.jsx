import React, { useEffect, useRef, useState } from "react";
import "./ProductSection.css";

import gnut from "../../assets/images/GNut.webp";
import iotkit from "../../assets/images/IoT Kit.webp";
import edutech from "../../assets/images/EduTech.webp";

/* =========================================================
   PRODUCT DATA
========================================================= */

const AI_PRODUCT_URL = "https://your-ai-website-url.com";

const products = [
    {
        animationText: "Smarter Agriculture",
        title: "Groundnut-to-Peanut Processing, Sorting & Grading Machine",
        image: gnut,
        description:
            "A complete groundnut-to-peanut processing solution that breaks the groundnut shell, separates and collects dust for by-product use, sorts peanuts by quality, grades them by size, measures weight, predicts oil potential, and supports export-quality testing.",
        icon: "AI",
        action: "redirect",
        features: [
            "Shell Breaking",
            "Dust Separation",
            "AI Sorting",
            "Size Grading",
            "Oil Prediction",
            "Export Testing",
        ],
    },
    {
        animationText: "Connected Solutions",
        title: "ProJenius IoT Learning Kit",
        image: iotkit,
        description:
            "Hands-on IoT kits that help students and learners understand sensors, electronics, microcontrollers, connectivity, and automation by building real working projects from hardware to software.",
        icon: "IoT",
        action: "coming-soon",
        features: [
            "Sensors",
            "ESP32 & Arduino",
            "IoT",
            "Automation",
            "Embedded Systems",
            "Hands-On Projects",
        ],
    },
    {
        animationText: "Digital Learning",
        title: "ProJenius EduTech & Learning Platform",
        image: edutech,
        description:
            "A practical learning platform offering technical courses, internships, workshops, projects, and skill-based training to help students learn technology by building and applying it in real-world situations.",
        icon: "Edu",
        action: "coming-soon",
        features: [
            "Online Courses",
            "Technical Training",
            "Projects",
            "Internships",
            "Workshops",
            "Skill Development",
        ],
    },
];

/* =========================================================
   ICONS
========================================================= */

function ProductIcon({ type }) {
    if (type === "AI") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <circle cx="9" cy="10" r="1" />
                <circle cx="15" cy="10" r="1" />
                <path d="M8 15h8" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3" />
            </svg>
        );
    }

    if (type === "IoT") {
        return (
            <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <path d="M9 2v3M15 2v3M9 19v3M15 19v3" />
                <path d="M2 9h3M2 15h3M19 9h3M19 15h3" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M4 5h16v12H4z" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <path d="M8 9h8M8 12h5" />
        </svg>
    );
}

/* =========================================================
   PRODUCT SECTION
========================================================= */

const ProductSection = () => {
    const sectionRef = useRef(null);
    const intervalRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    const activeProduct = products[activeIndex];

    /* =====================================================
       SECTION VISIBILITY
    ===================================================== */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    /* =====================================================
       AUTO PRODUCT CHANGE - EVERY 5 SECONDS
    ===================================================== */

    useEffect(() => {
        if (!visible || showComingSoon) return undefined;

        intervalRef.current = window.setInterval(() => {
            setIsChanging(true);

            window.setTimeout(() => {
                setActiveIndex((current) => {
                    return (current + 1) % products.length;
                });

                setIsChanging(false);
            }, 280);
        }, 5000);

        return () => {
            window.clearInterval(intervalRef.current);

            if (intervalRef.current) {
                window.clearTimeout(intervalRef.current);
            }
        };
    }, [visible, showComingSoon]);

    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    useEffect(() => {
        if (!showComingSoon) return undefined;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setShowComingSoon(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [showComingSoon]);

    /* =====================================================
       CHANGE PRODUCT
    ===================================================== */

    const changeProduct = (index) => {
        if (index === activeIndex) return;

        setIsChanging(true);

        window.setTimeout(() => {
            setActiveIndex(index);
            setIsChanging(false);
        }, 280);
    };

    /* =====================================================
       EXPLORE
    ===================================================== */

    const handleExplore = () => {
        if (activeProduct.action === "redirect") {
            window.open(
                AI_PRODUCT_URL,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        setShowComingSoon(true);
    };

    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    const closePopup = () => {
        setShowComingSoon(false);
    };

    return (
        <>
            <section
                ref={sectionRef}
                className={`tabs-section ${
                    visible ? "product-visible" : ""
                }`}
            >
                <div className="product-container">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="product-heading">
                        <span className="product-sub-heading">
                            Our Product
                        </span>

                        <h2 className="product-title">
                            Technology Products Built for{" "}
                            <span
                                className={`product-title-animation ${
                                    isChanging ? "changing" : ""
                                }`}
                                key={activeProduct.animationText}
                            >
                                {activeProduct.animationText}
                            </span>
                        </h2>

                        <div
                            className="product-title-line"
                            aria-hidden="true"
                        >
                            <span />
                        </div>

                        <p className="product-heading-description">
                            Explore our technology products designed to
                            solve real-world problems, connect people,
                            and create smarter ways to learn and work.
                        </p>
                    </div>

                    {/* =================================================
                        PRODUCT TABS
                    ================================================= */}

                    <div
                        className="tabs-header"
                        role="tablist"
                        aria-label="Products"
                    >
                        {products.map((product, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <button
                                    key={product.title}
                                    type="button"
                                    role="tab"
                                    className={`tab-btn ${
                                        isActive ? "active" : ""
                                    }`}
                                    aria-selected={isActive}
                                    aria-controls={`product-panel-${index}`}
                                    onMouseEnter={() =>
                                        changeProduct(index)
                                    }
                                    onFocus={() =>
                                        changeProduct(index)
                                    }
                                    onClick={() =>
                                        changeProduct(index)
                                    }
                                >
                                    <span className="tab-icon">
                                        <ProductIcon
                                            type={product.icon}
                                        />
                                    </span>

                                    <span className="tab-label">
                                        {product.animationText}
                                    </span>

                                    <span
                                        className="tab-hover-arrow"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* =================================================
                        PRODUCT CONTENT
                    ================================================= */}

                    <div
                        id={`product-panel-${activeIndex}`}
                        className={`tabs-content ${
                            isChanging ? "product-changing" : ""
                        }`}
                        role="tabpanel"
                        key={activeProduct.title}
                    >
                        {/* IMAGE */}

                        <div className="tabs-image">
                            <img
                                src={activeProduct.image}
                                alt={activeProduct.title}
                                loading={
                                    activeIndex === 0
                                        ? "eager"
                                        : "lazy"
                                }
                            />

                            <div
                                className="product-image-shine"
                                aria-hidden="true"
                            />
                        </div>

                        {/* CONTENT */}

                        <div className="tabs-text">
                            <span className="product-content-label">
                                <ProductIcon
                                    type={activeProduct.icon}
                                />

                                <span>
                                    {activeProduct.animationText}
                                </span>
                            </span>

                            <h2>{activeProduct.title}</h2>

                            <p>{activeProduct.description}</p>

                            {/* KEY FEATURES */}

                            <div className="product-features">
                                <h3>Key Features</h3>

                                <div className="feature-list">
                                    {activeProduct.features.map(
                                        (feature) => (
                                            <span
                                                className="feature-item"
                                                key={feature}
                                            >
                                                {feature}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="explore-btn"
                                onClick={handleExplore}
                                aria-label={`Explore ${activeProduct.title}`}
                            >
                                <span>Explore More</span>

                                <span
                                    className="explore-arrow"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                COMING SOON POPUP
            ========================================================= */}

            {showComingSoon && (
                <div
                    className="product-popup-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="coming-soon-title"
                    onClick={closePopup}
                >
                    <div
                        className="product-popup"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <button
                            type="button"
                            className="product-popup-close"
                            onClick={closePopup}
                            aria-label="Close popup"
                        >
                            ×
                        </button>

                        <div className="product-popup-icon">
                            <ProductIcon
                                type={activeProduct.icon}
                            />
                        </div>

                        <h3 id="coming-soon-title">
                            Coming Soon
                        </h3>

                        <p>
                            We will launch the website soon.
                        </p>

                        <button
                            type="button"
                            className="product-popup-btn"
                            onClick={closePopup}
                        >
                            Okay
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductSection;
