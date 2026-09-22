import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  GraduationCap,
  Monitor,
  Users,
  Star,
  CheckCircle2,
  BookOpen,
  Sparkles,
  UserRound,
  Tag,
} from "lucide-react";

import { getCourse, mediaUrl } from "../services/contentApi";
import { ErrorState, getSkills } from "../components/ContentUI";

import "./CourseDetails.css";

function formatPrice(value) {
  return Number(value || 0).toLocaleString("en-IN");
}

function getInstructor(course) {
  if (typeof course?.instructor === "string") {
    return course.instructor;
  }

  return course?.instructor?.name || "ProJenius Team";
}

function getList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

export default function CourseDetailsPage() {
  const { slug } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCourse() {
      try {
        setLoading(true);
        setError("");

        const data = await getCourse(slug);

        if (!cancelled) {
          setCourse(data);

          if (data?.title) {
            document.title = `${data.title} | ProJenius`;
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message || "Unable to load course."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCourse();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const originalPrice = Number(
    course?.originalPrice ??
      course?.original_price ??
      course?.price ??
      0
  );

  const offerPrice = Number(
    course?.offerPrice ??
      course?.offer_price ??
      course?.price ??
      0
  );

  const rating = Number(course?.rating || 0);
  const reviews = Number(course?.reviews || 0);
  const enrolled = Number(course?.enrolled || 0);

  const skills = useMemo(
    () => getSkills(course || {}),
    [course]
  );

  const syllabus = useMemo(
    () => getList(course?.syllabus),
    [course]
  );

  const features = useMemo(
    () => getList(course?.features),
    [course]
  );

  const requirements = useMemo(
    () => getList(course?.requirements),
    [course]
  );

  const instructor = getInstructor(course);

  if (loading) {
    return (
      <main className="course-details-page">
        <div className="course-details-container">
          <div className="course-details-loading">
            <div className="course-details-loading-image" />

            <div className="course-details-loading-content">
              <div className="loading-line loading-small" />
              <div className="loading-line loading-title" />
              <div className="loading-line" />
              <div className="loading-line loading-medium" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="course-details-page">
        <div className="course-details-container">
          <div className="course-details-error">
            <ErrorState
              message={error || "Course not found."}
            />

            <Link
              to="/courses"
              className="course-details-back"
            >
              <ArrowLeft size={18} />
              Back to Courses
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="course-details-page">
      <div className="course-details-container">

        {/* BACK */}
        <Link
          to="/courses"
          className="course-details-back"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </Link>

        <div className="course-details-layout">

          {/* =================================================
              LEFT STICKY CARD
          ================================================= */}

          <aside className="course-details-sidebar">
            <div className="course-details-card">

              {/* IMAGE */}
              <div className="course-details-image">
                {course.image ? (
                  <img
                    src={mediaUrl(course.image)}
                    alt={course.title}
                  />
                ) : (
                  <div className="course-details-placeholder">
                    <BookOpen size={40} />
                    <span>ProJenius</span>
                  </div>
                )}

                {course.badge && (
                  <span className="course-details-badge">
                    <Sparkles size={12} />
                    {course.badge}
                  </span>
                )}
              </div>

              {/* PRICE */}
              <div className="course-details-price">
                <small>Course Fee</small>

                <div className="course-details-price-row">
                  <strong>
                    ₹{formatPrice(offerPrice)}
                  </strong>

                  {originalPrice > offerPrice && (
                    <del>
                      ₹{formatPrice(originalPrice)}
                    </del>
                  )}
                </div>

                {originalPrice > offerPrice && (
                  <span>Special offer available</span>
                )}
              </div>

              {/* COURSE INFO */}
              <div className="course-details-info">

                <div className="course-info-item">
                  <span>
                    <Clock3 size={17} />
                  </span>

                  <div>
                    <small>Duration</small>
                    <strong>
                      {course.duration || "Flexible"}
                    </strong>
                  </div>
                </div>

                <div className="course-info-item">
                  <span>
                    <GraduationCap size={17} />
                  </span>

                  <div>
                    <small>Level</small>
                    <strong>
                      {course.level || "All Levels"}
                    </strong>
                  </div>
                </div>

                <div className="course-info-item">
                  <span>
                    <Monitor size={17} />
                  </span>

                  <div>
                    <small>Mode</small>
                    <strong>
                      {course.mode || "Online Live"}
                    </strong>
                  </div>
                </div>

                <div className="course-info-item">
                  <span>
                    <Users size={17} />
                  </span>

                  <div>
                    <small>Students</small>
                    <strong>
                      {enrolled > 0
                        ? enrolled.toLocaleString("en-IN")
                        : "Join now"}
                    </strong>
                  </div>
                </div>

              </div>

              {/* RATING */}
              {rating > 0 && (
                <div className="course-details-rating">
                  <Star
                    size={17}
                    fill="currentColor"
                  />

                  <strong>
                    {rating.toFixed(1)}
                  </strong>

                  {reviews > 0 && (
                    <span>
                      ({reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* CTA */}
              <Link
                to="/contact"
                className="course-details-cta"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <p className="course-details-note">
                Learn practical skills and build
                career-ready knowledge with ProJenius.
              </p>

            </div>
          </aside>

          {/* =================================================
              RIGHT DETAILS
          ================================================= */}

          <section className="course-details-main">

            {/* HEADER */}
            <div className="course-details-header">

              <div className="course-details-pills">

                {course.category && (
                  <span className="course-pill course-pill-blue">
                    <Tag size={13} />
                    {course.category}
                  </span>
                )}

                {course.courseStatus && (
                  <span className="course-pill course-pill-green">
                    <CheckCircle2 size={13} />
                    {course.courseStatus}
                  </span>
                )}

              </div>

              <h1>{course.title}</h1>

              <p className="course-details-description">
                {course.description}
              </p>

              <div className="course-instructor">
                <span>
                  <UserRound size={18} />
                </span>

                <div>
                  <small>Instructor</small>
                  <strong>{instructor}</strong>
                </div>
              </div>

            </div>

            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="course-details-section">

                <div className="course-section-heading">
                  <span>Skills</span>
                  <h2>What you will learn</h2>
                </div>

                <div className="course-skills">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                    >
                      <CheckCircle2 size={15} />
                      {skill}
                    </span>
                  ))}
                </div>

              </section>
            )}

            {/* SYLLABUS */}
            {syllabus.length > 0 && (
              <section className="course-details-section">

                <div className="course-section-heading">
                  <span>Learning Path</span>
                  <h2>Syllabus</h2>
                </div>

                <div className="course-syllabus">

                  {syllabus.map((item, index) => (
                    <div
                      className="course-syllabus-item"
                      key={`${item}-${index}`}
                    >
                      <span className="syllabus-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p>{item}</p>

                      <ArrowRight size={16} />
                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* FEATURES */}
            {features.length > 0 && (
              <section className="course-details-section">

                <div className="course-section-heading">
                  <span>Experience</span>
                  <h2>Course Features</h2>
                </div>

                <div className="course-feature-grid">
                  {features.map((item, index) => (
                    <div
                      className="course-feature-item"
                      key={`${item}-${index}`}
                    >
                      <span>
                        <CheckCircle2 size={17} />
                      </span>

                      <p>{item}</p>
                    </div>
                  ))}
                </div>

              </section>
            )}

            {/* REQUIREMENTS */}
            {requirements.length > 0 && (
              <section className="course-details-section">

                <div className="course-section-heading">
                  <span>Before You Start</span>
                  <h2>Requirements</h2>
                </div>

                <div className="course-requirements">
                  {requirements.map(
                    (item, index) => (
                      <div
                        key={`${item}-${index}`}
                      >
                        <CheckCircle2 size={17} />
                        <p>{item}</p>
                      </div>
                    )
                  )}
                </div>

              </section>
            )}

            {/* ABOUT */}
            <section className="course-details-section course-about">

              <div className="course-section-heading">
                <span>Overview</span>
                <h2>About this course</h2>
              </div>

              <p>
                {course.description}
              </p>

            </section>

          </section>
        </div>
      </div>
    </main>
  );
}