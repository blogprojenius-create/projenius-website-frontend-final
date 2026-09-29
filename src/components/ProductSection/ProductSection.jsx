import React, { useEffect, useRef, useState } from "react";
import "./ProductSection.css";

import gnut from "../../assets/images/GNut.webp";
import iotkit from "../../assets/images/IoT Kit.webp";
import edutech from "../../assets/images/EduTech.webp";
/* =========================================================
   PRODUCT DATA
   ========================================================= */

const AI_PRODUCT_URL = "https://your-ai-website-url.com";
// Replace the above URL with your actual AI website URL.

const tabsData = [
    {
        title: "AI-Powered Nut Sorting & Grading System",
        image: gnut,
        description:
            "Creative marketing strategies to improve online visibility.",
        icon: "AI",
        action: "redirect",
    },
    {
        title: "IoT Kit",
        image: iotkit,
        description:
            "Smart AI-powered systems for automation and business growth.",
        icon: "IoT",
        action: "coming-soon",
    },
    {
        title: "EduTech Platform",
        image: edutech,
        description:
            "Modern responsive websites with premium UI and smooth performance.",
        icon: "Edu",
        action: "coming-soon",
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

    const [activeTab, setActiveTab] = useState(0);
    const [visible, setVisible] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);

    const activeProduct = tabsData[activeTab];

    /* =====================================================
       SECTION VISIBILITY
    ===================================================== */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

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
       CLOSE POPUP WITH ESC
    ===================================================== */

    useEffect(() => {
        if (!showComingSoon) return;

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
       HANDLE PRODUCT CHANGE
    ===================================================== */

    const handleProductChange = (index) => {
        setActiveTab(index);
    };

    /* =====================================================
       HANDLE EXPLORE BUTTON
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
                className={`tabs-section ${visible ? "product-visible" : ""
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
                            Innovative Products for{" "}
                            <span className="product-title-accent">
                                Smart Future
                            </span>
                        </h2>

                        <div
                            className="product-title-line"
                            aria-hidden="true"
                        >
                            <span />
                        </div>

                        <p className="product-heading-description">
                            Explore our range of innovative solutions
                            designed to empower your business.
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
                        {tabsData.map((tab, index) => {
                            const isActive = activeTab === index;

                            return (
                                <button
                                    key={tab.title}
                                    type="button"
                                    role="tab"
                                    className={`tab-btn ${isActive ? "active" : ""
                                        }`}
                                    aria-selected={isActive}
                                    aria-controls={`product-panel-${index}`}
                                    onMouseEnter={() =>
                                        handleProductChange(index)
                                    }
                                    onFocus={() =>
                                        handleProductChange(index)
                                    }
                                    onClick={() =>
                                        handleProductChange(index)
                                    }
                                >
                                    <span className="tab-icon">
                                        <ProductIcon type={tab.icon} />
                                    </span>

                                    <span className="tab-label">
                                        {tab.title}
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
                        id={`product-panel-${activeTab}`}
                        className="tabs-content"
                        key={activeProduct.title}
                        role="tabpanel"
                    >
                        {/* IMAGE */}

                        <div className="tabs-image">
                            <img
                                src={activeProduct.image}
                                alt={activeProduct.title}
                                loading={
                                    activeTab === 0
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
                                {activeProduct.icon}
                            </span>

                            <h2>{activeProduct.title}</h2>

                            <p>{activeProduct.description}</p>

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
                        onClick={(event) => event.stopPropagation()}
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
                            <ProductIcon type={activeProduct.icon} />
                        </div>

                        <h3 id="coming-soon-title">
                            Coming Soon
                        </h3>

                        <p>
                            We will launch the website soon.....
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