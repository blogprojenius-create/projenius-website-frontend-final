import React, { useEffect, useRef, useState } from "react";
import "./ServicesSection.css";
// import "../index.css";

export default function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const services = [
        {
            title: "Web Development",
            image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
            link: "/services",
        },
        {
            title: "Digital Marketing",
            image:
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
            link: "/services",
        },
        {
            title: "UI / UX Design",
            image:
                "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop",
            link: "/services",
        },
    ];

    const cardRefs = useRef([]);

    useEffect(() => {
        let el = cardRefs.current[0];

        while (el && el !== document.body) {
            el = el.parentElement;

            if (!el) break;

            const style = window.getComputedStyle(el);

            if (
                style.overflow === "hidden" ||
                style.overflow === "auto" ||
                style.overflowY === "hidden" ||
                style.overflowY === "auto" ||
                style.overflowX === "hidden"
            ) {
                el.style.overflow = "visible";
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show-card");
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        const handleScroll = () => {
            const scrollPos =
                window.scrollY + window.innerHeight * 0.45;

            let currentActive = 0;

            cardRefs.current.forEach((card, index) => {
                if (card) {
                    const rect = card.getBoundingClientRect();

                    const absoluteTop =
                        window.scrollY + rect.top;

                    if (scrollPos >= absoluteTop) {
                        currentActive = index;
                    }
                }
            });

            setActiveIndex(currentActive);
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

        return () => {
            observer.disconnect();

            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    return (
        <>
            <div className="svc-spacer-top" />

            <section className="svc-section">

                <div className="svc-left">

                    <span
                        className="svc-sub"
                        id="sub-heading"
                    >
                        <span
                            className="svc-sub-dot"
                            aria-hidden="true"
                        />
                        Our Services
                    </span>

                    <h2
                        className="svc-title"
                        id="title"
                    >
                        Smart Solutions for{" "}
                        <span className="svc-title-accent">
                            Modern Digital Needs
                        </span>
                    </h2>

                    <div
                        className="svc-title-line"
                        aria-hidden="true"
                    />

                    <p className="svc-para">
                        Innovative services in AI, IoT, web, mobile
                        apps, design, training, and smart product
                        development solutions.
                    </p>

                    <a
                        href={services[activeIndex].link}
                        className="btn svc-main-btn"
                    >
                        <span
                            className="svc-btn-content"
                            key={activeIndex}
                        >
                            Explore {services[activeIndex].title}
                        </span>
                    </a>

                </div>

                <div className="svc-right">

                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`svc-card svc-card-${index + 1}`}
                            ref={(el) =>
                                (cardRefs.current[index] = el)
                            }
                            data-index={index}
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="svc-img"
                            />

                            <div
                                className="svc-overlay"
                                aria-hidden="true"
                            />

                            <div className="svc-content">

                                <h3 className="svc-card-title">
                                    {service.title}
                                </h3>

                                <a
                                    href={service.link}
                                    className="svc-read-more"
                                >
                                    Read More →
                                </a>

                            </div>

                        </div>
                    ))}

                </div>

            </section>
        </>
    );
}