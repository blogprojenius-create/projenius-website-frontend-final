import React, { useEffect, useState } from "react";
import "./ProductSection.css";

import AOS from "aos";
import "aos/dist/aos.css";

const tabsData = [
    {
        title: "AI-Powered Nut Sorting & Grading System",
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        description:
            "Creative marketing strategies to improve online visibility.",
    },
    {
        title: "IoT Kit",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        description:
            "Smart AI-powered systems for automation and business growth.",
    },
    {
        title: "EduTech Platform",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        description:
            "Modern responsive websites with premium UI and smooth performance.",
    },
];

const ProductSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: "ease-in-out",
        });

        AOS.refresh();
    }, []);

    const activeProduct = tabsData[activeTab];

    return (
        <section className="tabs-section">
            <div className="product-container">

                {/* ================= HEADER ================= */}

                <div className="product-heading">

                    <span
                        className="product-sub-heading"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <span className="product-sub-dot"></span>
                        Our Product
                    </span>

                    <h2
                        className="product-title"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Innovative Products for{" "}
                        <span className="product-title-accent">
                            Smart Future
                        </span>
                    </h2>

                    <div
                        className="product-title-line"
                        aria-hidden="true"
                    ></div>

                    <p
                        className="product-heading-description"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Explore our range of innovative solutions designed
                        to empower your business.
                    </p>
                </div>

                {/* ================= TABS ================= */}

                <div
                    className="tabs-header"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    {tabsData.map((tab, index) => (
                        <button
                            key={index}
                            type="button"
                            className={
                                activeTab === index
                                    ? "tab-btn active"
                                    : "tab-btn"
                            }
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* ================= CONTENT ================= */}

                <div
                    className="tabs-content"
                    key={activeProduct.title}
                >
                    <div
                        className="tabs-image"
                        data-aos="fade-right"
                        data-aos-delay="450"
                    >
                        <img
                            src={activeProduct.image}
                            alt={activeProduct.title}
                        />
                    </div>

                    <div
                        className="tabs-text"
                        data-aos="fade-left"
                        data-aos-delay="500"
                    >
                        <h2>{activeProduct.title}</h2>

                        <p>{activeProduct.description}</p>

                        <button
                            type="button"
                            className="explore-btn"
                        >
                            <span>Explore More</span>
                            <span className="explore-arrow">
                                →
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProductSection;