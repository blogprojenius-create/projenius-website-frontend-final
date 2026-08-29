import React, { useEffect, useRef, useState } from "react";
import "./ReviewsSection.css";

const reviews = [
    {
        name: "Arun Kumar",
        role: "Startup Founder",
        rating: 5,
        review:
            "ProJenius understood our idea clearly and converted it into a professional digital solution. The team was responsive and delivered exactly what we needed.",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        name: "Priya S",
        role: "Business Owner",
        rating: 5,
        review:
            "The website design was modern, clean and easy to use. Communication throughout the project was excellent and the final result exceeded our expectations.",
        image: "https://i.pravatar.cc/150?img=47",
    },
    {
        name: "Rahul M",
        role: "Product Manager",
        rating: 4,
        review:
            "Great experience working with the team. They were quick to understand our requirements and provided a reliable solution with a very professional approach.",
        image: "https://i.pravatar.cc/150?img=33",
    },
    {
        name: "Divya R",
        role: "Entrepreneur",
        rating: 5,
        review:
            "From UI design to development, everything was handled smoothly. I especially liked their attention to details and willingness to improve the product.",
        image: "https://i.pravatar.cc/150?img=44",
    },
];

export default function ReviewsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    const nextReview = () => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setActiveIndex(
            (prev) => (prev - 1 + reviews.length) % reviews.length
        );
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            nextReview();
        }, 5000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        clearInterval(intervalRef.current);
    };

    const handleMouseLeave = () => {
        intervalRef.current = setInterval(() => {
            nextReview();
        }, 5000);
    };

    return (
        <section className="reviews-section">

            {/* BACKGROUND GLOW */}
            <div className="reviews-glow reviews-glow-one"></div>
            <div className="reviews-glow reviews-glow-two"></div>

            <div className="reviews-container">

                {/* =========================
                    HEADER
                ========================== */}

                <div className="reviews-header">

                    <span className="reviews-sub-heading">
                        <span className="reviews-sub-dot"></span>
                        CLIENT REVIEWS
                    </span>

                    <h2 className="reviews-title">
                        What Our{" "}
                        <span>Clients Say</span>
                    </h2>

                    <div className="reviews-title-line">
                        <span></span>
                    </div>

                    <p className="reviews-description">
                        Real experiences from people and businesses
                        who trusted us to bring their ideas to life.
                    </p>

                </div>


                {/* =========================
                    REVIEW AREA
                ========================== */}

                <div
                    className="reviews-content"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >

                    {/* LEFT ARROW */}

                    <button
                        type="button"
                        className="reviews-arrow reviews-prev"
                        onClick={prevReview}
                        aria-label="Previous review"
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>


                    {/* REVIEW CARD */}

                    <div className="review-card-wrapper">

                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className={`review-card ${
                                    activeIndex === index
                                        ? "review-active"
                                        : ""
                                }`}
                            >

                                {/* QUOTE ICON */}

                                <div className="review-quote-icon">
                                    <i className="bi bi-quote"></i>
                                </div>


                                {/* STARS */}

                                <div className="review-stars">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <i
                                            key={starIndex}
                                            className={
                                                starIndex < review.rating
                                                    ? "bi bi-star-fill"
                                                    : "bi bi-star"
                                            }
                                        ></i>
                                    ))}
                                </div>


                                {/* REVIEW */}

                                <p className="review-text">
                                    “{review.review}”
                                </p>


                                {/* USER */}

                                <div className="review-user">

                                    <img
                                        src={review.image}
                                        alt={review.name}
                                    />

                                    <div className="review-user-info">
                                        <h3>{review.name}</h3>
                                        <span>{review.role}</span>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>


                    {/* RIGHT ARROW */}

                    <button
                        type="button"
                        className="reviews-arrow reviews-next"
                        onClick={nextReview}
                        aria-label="Next review"
                    >
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </div>


                {/* =========================
                    DOTS
                ========================== */}

                <div className="reviews-dots">

                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={
                                activeIndex === index
                                    ? "review-dot active"
                                    : "review-dot"
                            }
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to review ${index + 1}`}
                        ></button>
                    ))}

                </div>


                {/* BOTTOM TRUST TEXT */}

                <div className="reviews-trust">

                    <div className="reviews-trust-item">
                        <i className="bi bi-star-fill"></i>
                        <strong>4.9/5</strong>
                        <span>Average Rating</span>
                    </div>

                    <div className="reviews-trust-divider"></div>

                    <div className="reviews-trust-item">
                        <i className="bi bi-people-fill"></i>
                        <strong>50+</strong>
                        <span>Happy Clients</span>
                    </div>

                    <div className="reviews-trust-divider"></div>

                    <div className="reviews-trust-item">
                        <i className="bi bi-check-circle-fill"></i>
                        <strong>100%</strong>
                        <span>Commitment</span>
                    </div>

                </div>

            </div>
        </section>
    );
}