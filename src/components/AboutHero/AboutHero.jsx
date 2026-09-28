import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import "./AboutHero.css";
import aboutLogo from "../../assets/images/logo.png";

/* =========================================================
   ORBIT ITEMS
   ========================================================= */

const ORBIT_ITEMS = [
    {
        id: "industry",
        label: "INDUSTRY",
        position: "top",
    },
    {
        id: "learning",
        label: "LEARNING",
        position: "top-right",
    },
    {
        id: "technology",
        label: "TECHNOLOGY",
        position: "right",
    },
    {
        id: "research",
        label: "R&D",
        position: "bottom-right",
    },
    {
        id: "startups",
        label: "STARTUPS",
        position: "bottom",
    },
    {
        id: "academia",
        label: "ACADEMIA",
        position: "bottom-left",
    },
    {
        id: "products",
        label: "PRODUCTS",
        position: "left",
    },
    {
        id: "innovation",
        label: "INNOVATION",
        position: "top-left",
    },
];

/* =========================================================
   ORBIT LABEL
   ========================================================= */

function OrbitLabel({ label, position }) {
    return (
        <span
            className={`about-hero-orbit-label about-hero-orbit-${position}`}
        >
            {label}
        </span>
    );
}

/* =========================================================
   ABOUT HERO
   ========================================================= */

export default function AboutHero() {
    return (
        <section
            className="about-hero"
            aria-labelledby="about-hero-title"
        >
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="about-hero-grid"
                aria-hidden="true"
            />

            <div
                className="about-hero-glow about-hero-glow-left"
                aria-hidden="true"
            />

            <div
                className="about-hero-glow about-hero-glow-right"
                aria-hidden="true"
            />

            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <div className="about-hero-inner">

                {/* =================================================
                    LEFT CONTENT
                ================================================= */}

                <div className="about-hero-content">

                    <span className="about-hero-eyebrow">
                        ABOUT PROJENIUS
                    </span>

                    <h1
                        id="about-hero-title"
                        className="about-hero-title"
                    >
                        <span className="about-hero-title-white">
                            Technology.
                        </span>

                        <span className="about-hero-title-blue">
                            Innovation.
                        </span>

                        <span className="about-hero-title-white">
                            Possibility.
                        </span>
                    </h1>

                    <p className="about-hero-description">
                        A multidisciplinary organization bringing
                        technology, learning, innovation and
                        collaboration into one evolving ecosystem.
                    </p>

                    <div className="about-hero-actions">

                        <a
                            href="#ecosystem"
                            className="about-hero-primary-btn"
                            aria-label="Explore ProJenius ecosystem"
                        >
                            <span>
                                Explore ProJenius
                            </span>

                            <ArrowDown
                                size={19}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </a>

                        <a
                            href="#services"
                            className="about-hero-secondary-btn"
                            aria-label="See what ProJenius does"
                        >
                            <span>
                                What We Do
                            </span>

                            <ArrowRight
                                size={19}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </a>

                    </div>
                </div>

                {/* =================================================
                    RIGHT ORBIT
                ================================================= */}

                <div
                    className="about-hero-visual"
                    aria-hidden="true"
                >
                    <div className="about-hero-orbit">

                        {/* ONLY TWO RINGS */}
                        <div className="about-hero-ring about-hero-ring-outer" />
                        <div className="about-hero-ring about-hero-ring-inner" />

                        {/* CENTER GLOW */}
                        <div className="about-hero-center-glow" />

                        {/* CENTER LOGO */}
                        <div className="about-hero-center">

                            <div className="about-hero-logo-circle">

                                <img
                                    src={aboutLogo}
                                    alt=""
                                    className="about-hero-logo"
                                    loading="eager"
                                    decoding="async"
                                />

                            </div>

                        </div>

                        {/* ORBIT LABELS */}
                        {ORBIT_ITEMS.map((item) => (
                            <OrbitLabel
                                key={item.id}
                                label={item.label}
                                position={item.position}
                            />
                        ))}

                    </div>
                </div>
            </div>

            {/* =================================================
                ZIG-ZAG BOTTOM
            ================================================= */}

            <div
                className="about-hero-zigzag about-hero-zigzag-blue"
                aria-hidden="true"
            />

            <div
                className="about-hero-zigzag about-hero-zigzag-white"
                aria-hidden="true"
            />
        </section>
    );
}