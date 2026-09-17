import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import "./ReviewsSection.css";

const API_URL = import.meta.env.VITE_API_URL || "";

function getInitials(name = "Google User") {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "G";
}

function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
    });
}

function Stars({ rating = 0 }) {
    const rounded = Math.round(Number(rating) || 0);

    return (
        <span className="review-stars" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
                <Star
                    key={index}
                    size={17}
                    strokeWidth={2.2}
                    fill={index < rounded ? "currentColor" : "none"}
                />
            ))}
        </span>
    );
}

function ReviewsSection() {
    const [reviews, setReviews] = useState([]);
    const [place, setPlace] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadReviews() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/api/google-reviews`);

                if (!response.ok) {
                    throw new Error("Unable to load Google reviews.");
                }

                const data = await response.json();

                if (cancelled) return;

                setReviews(Array.isArray(data.reviews) ? data.reviews : []);
                setPlace(data.place || null);
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Unable to load reviews.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadReviews();

        return () => {
            cancelled = true;
        };
    }, []);

    const safeReviews = useMemo(
        () =>
            reviews.map((review) => ({
                ...review,
                authorName: review.authorName || "Google User",
                text: review.text || "No written review was provided.",
                rating: Number(review.rating) || 0,
            })),
        [reviews]
    );

    useEffect(() => {
        if (activeIndex >= safeReviews.length) {
            setActiveIndex(Math.max(0, safeReviews.length - 1));
        }
    }, [activeIndex, safeReviews.length]);

    const activeReview = safeReviews[activeIndex];

    const previousReview = () => {
        if (!safeReviews.length) return;
        setActiveIndex((current) =>
            current === 0 ? safeReviews.length - 1 : current - 1
        );
    };

    const nextReview = () => {
        if (!safeReviews.length) return;
        setActiveIndex((current) =>
            current === safeReviews.length - 1 ? 0 : current + 1
        );
    };

    return (
        <section className="review-section" id="review">
            <div className="review-section-inner">
                <div className="review-heading">
                    <span className="review-eyebrow">
                        <span className="review-eyebrow-dot" />
                        REVIEWS
                    </span>

                    <h2>
                        What Our <span>Clients Say</span>
                    </h2>

                    <span className="review-heading-line" />

                    <p>
                        Real stories from students, startups, and businesses
                        <br className="review-desktop-break" />
                        we've partnered with.
                    </p>
                </div>

                <div className="review-slider">
                    <button
                        type="button"
                        className="review-nav review-nav-left"
                        onClick={previousReview}
                        disabled={safeReviews.length <= 1}
                        aria-label="Previous review"
                    >
                        <ChevronLeft size={27} />
                    </button>

                    <div className="review-card">
                        {loading ? (
                            <div className="review-loading">
                                <div className="review-loading-spinner" />
                                <p>Loading Google reviews...</p>
                            </div>
                        ) : error ? (
                            <div className="review-state">
                                <h3>Reviews unavailable</h3>
                                <p>{error}</p>
                                <a
                                    href={place?.reviewsUri}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open Google Reviews
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        ) : !activeReview ? (
                            <div className="review-state">
                                <h3>No reviews available</h3>
                                <p>
                                    Google has not returned any reviews for
                                    this listing yet.
                                </p>
                                {place?.reviewsUri && (
                                    <a
                                        href={place.reviewsUri}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View on Google Maps
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="review-content">
                                    <div className="review-google-badge">
                                        <span className="review-google-word">
                                            Google
                                        </span>
                                        <Stars rating={activeReview.rating} />
                                    </div>

                                    <p className="review-text">
                                        “{activeReview.text}”
                                    </p>

                                    <div className="review-divider" />

                                    <div className="review-author">
                                        {activeReview.authorPhotoUri ? (
                                            <img
                                                src={activeReview.authorPhotoUri}
                                                alt={activeReview.authorName}
                                                className="review-author-avatar"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <span className="review-author-avatar review-author-initials">
                                                {getInitials(
                                                    activeReview.authorName
                                                )}
                                            </span>
                                        )}

                                        <div className="review-author-info">
                                            <strong>
                                                {activeReview.authorName}
                                            </strong>
                                            <span>
                                                {formatDate(
                                                    activeReview.publishTime
                                                ) || "Google Reviewer"}
                                            </span>
                                        </div>
                                    </div>

                                    {activeReview.authorUri && (
                                        <a
                                            className="review-author-link"
                                            href={activeReview.authorUri}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Google reviewer
                                        </a>
                                    )}
                                </div>

                                <div className="review-visual">
                                    {activeReview.authorPhotoUri ? (
                                        <img
                                            src={activeReview.authorPhotoUri}
                                            alt=""
                                            className="review-feature-photo"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <span className="review-feature-fallback">
                                            {getInitials(
                                                activeReview.authorName
                                            )}
                                        </span>
                                    )}

                                    <span className="review-quote-mark">
                                        ”
                                    </span>

                                    <div className="review-topic-pill">
                                        {place?.displayName ||
                                            "ProJenius Innovation Technology"}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        type="button"
                        className="review-nav review-nav-right"
                        onClick={nextReview}
                        disabled={safeReviews.length <= 1}
                        aria-label="Next review"
                    >
                        <ChevronRight size={27} />
                    </button>
                </div>

                {!loading && safeReviews.length > 0 && (
                    <div className="review-pagination" aria-label="Review navigation">
                        {safeReviews.map((review, index) => (
                            <button
                                type="button"
                                key={`${review.name || review.authorName}-${index}`}
                                className={`review-pagination-dot ${
                                    index === activeIndex ? "active" : ""
                                }`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Show review ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                <div className="review-google-attribution">
                    <span>
                        Reviews shown from Google Maps and displayed with
                        Google attribution.
                    </span>

                    {place?.reviewsUri && (
                        <a
                            href={place.reviewsUri}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View all reviews on Google
                            <ExternalLink size={15} />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ReviewsSection;
