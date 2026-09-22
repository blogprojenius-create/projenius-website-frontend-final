import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Clock3,
  GraduationCap,
  Monitor,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

import CommonHero from "../components/CommonHero/CommonHero";
import { getCourses, mediaUrl } from "../services/contentApi";

import "./Courses.css";

/* =========================================================
   HELPERS
========================================================= */

function getInstructorName(course) {
  if (typeof course?.instructor === "string") {
    return course.instructor;
  }

  return course?.instructor?.name || "ProJenius Team";
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString("en-IN");
}

/* =========================================================
   COURSE CARD
========================================================= */

function CourseCard({ course, index }) {
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

  const courseId = course?.slug || course?._id;

  const instructor = getInstructorName(course);

  const skills = Array.isArray(course?.skills)
    ? course.skills.filter(Boolean)
    : [];

  const status =
    course?.courseStatus ||
    course?.status ||
    "Enrollment Open";

  return (
    <article
      className={`courses-card courses-card--${(index % 4) + 1}`}
    >
      {/* IMAGE */}
      <Link
        to={`/courses/${courseId}`}
        className="courses-card__image"
        aria-label={`View ${course?.title || "course"}`}
      >
        {course?.image ? (
          <img
            src={mediaUrl(course.image)}
            alt={course?.title || "Course"}
            loading="lazy"
          />
        ) : (
          <div className="courses-card__image-placeholder">
            <BookOpen size={42} />
            <span>ProJenius</span>
          </div>
        )}

        <div className="courses-card__image-overlay">
          <span>View Details</span>
          <ArrowRight size={17} />
        </div>

        <div className="courses-card__image-shine" />

        {course?.badge && (
          <span className="courses-card__badge">
            <Sparkles size={12} />
            {course.badge}
          </span>
        )}
      </Link>

      {/* BODY */}
      <div className="courses-card__body">
        <div className="courses-card__meta">
          {course?.category && (
            <span className="courses-card__category">
              {course.category}
            </span>
          )}

          {course?.level && (
            <span className="courses-card__level">
              {course.level}
            </span>
          )}

          <span className="courses-card__status">
            <CheckCircle2 size={12} />
            {status}
          </span>
        </div>

        <h2 className="courses-card__title">
          <Link to={`/courses/${courseId}`}>
            {course?.title || "Untitled Course"}
          </Link>
        </h2>

        <p className="courses-card__description">
          {course?.description ||
            "Practical learning with ProJenius."}
        </p>

        {/* STATS */}
        <div className="courses-card__stats">
          {course?.duration && (
            <span>
              <Clock3 size={15} />
              {course.duration}
            </span>
          )}

          {course?.mode && (
            <span>
              <Monitor size={15} />
              {course.mode}
            </span>
          )}

          <span>
            <GraduationCap size={15} />
            {instructor}
          </span>

          {enrolled > 0 && (
            <span>
              <Users size={15} />
              {enrolled.toLocaleString("en-IN")} enrolled
            </span>
          )}

          {rating > 0 && (
            <span className="courses-card__rating">
              <Star size={15} fill="currentColor" />
              {rating.toFixed(1)}

              {reviews > 0 && (
                <small>({reviews})</small>
              )}
            </span>
          )}
        </div>

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="courses-card__skills">
            {skills.slice(0, 5).map((skill, skillIndex) => (
              <span key={`${skill}-${skillIndex}`}>
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* PRICE + BUTTON */}
        <div className="courses-card__bottom">
          <div className="courses-card__price">
            {originalPrice > offerPrice && (
              <del className="courses-card__original-price">
                ₹{formatPrice(originalPrice)}
              </del>
            )}

            <strong className="courses-card__offer-price">
              ₹{formatPrice(offerPrice)}
            </strong>
          </div>

          <Link
            to={`/courses/${courseId}`}
            className="courses-card__view"
          >
            <span>View Course</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function CourseSkeleton() {
  return (
    <div className="courses-skeleton">
      <div className="courses-skeleton__image" />

      <div className="courses-skeleton__body">
        <div className="courses-skeleton__small" />
        <div className="courses-skeleton__title" />
        <div className="courses-skeleton__text" />
        <div className="courses-skeleton__text courses-skeleton__text--short" />

        <div className="courses-skeleton__footer">
          <div className="courses-skeleton__price" />
          <div className="courses-skeleton__button" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FETCH
  ======================================================= */

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCourses("?limit=100");

      let courseList = [];

      if (Array.isArray(response)) {
        courseList = response;
      } else if (Array.isArray(response?.courses)) {
        courseList = response.courses;
      } else if (Array.isArray(response?.data)) {
        courseList = response.data;
      } else if (Array.isArray(response?.items)) {
        courseList = response.items;
      }

      setCourses(courseList);
    } catch (err) {
      console.error("Course fetch error:", err);

      setError(
        err?.message || "Unable to load courses."
      );

      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const categories = useMemo(() => {
    const values = courses
      .map((course) => course?.category)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [courses]);

  const levels = useMemo(() => {
    const values = courses
      .map((course) => course?.level)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [courses]);

  /* =======================================================
     SEARCH + FILTER
  ======================================================= */

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const skills = Array.isArray(course?.skills)
        ? course.skills
        : [];

      const searchableText = [
        course?.title,
        course?.description,
        course?.category,
        course?.level,
        course?.mode,
        course?.duration,
        course?.badge,
        course?.courseStatus,
        course?.instructor?.name,
        course?.instructor,
        ...skills,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || searchableText.includes(query)) &&
        (category === "All" ||
          course?.category === category) &&
        (level === "All" ||
          course?.level === level)
      );
    });
  }, [courses, search, category, level]);

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="courses-page">

      {/* =================================================
          COMMON HERO
      ================================================= */}

      <CommonHero
        subheading="Courses & Learning"
        firstLine="Learn"
        highlight="Build"
        secondLine="with Real-World Skills"
        description="Practical courses designed by ProJenius to help students and professionals learn modern technologies, build real projects and become career ready."
      />

      {/* =================================================
          COURSE CONTENT
      ================================================= */}

      <section className="courses-content">
        <div className="courses-container">

          {/* TOOLBAR */}
          <div className="courses-toolbar">

            <div className="courses-search">
              <Search size={20} />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search courses, skills, technologies..."
                aria-label="Search courses"
              />

              {search && (
                <button
                  type="button"
                  className="courses-search__clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="courses-filters">
              <div className="courses-filter-heading">
                <SlidersHorizontal size={18} />
                <span>Filter</span>
              </div>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                aria-label="Filter by category"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value)
                }
                aria-label="Filter by level"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="courses-result-count">
              <strong>{filteredCourses.length}</strong>
              <span>
                {filteredCourses.length === 1
                  ? "course"
                  : "courses"}
              </span>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="courses-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <CourseSkeleton key={item} />
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="courses-state courses-state--error">
              <div className="courses-state__icon">!</div>

              <h2>Unable to load courses</h2>

              <p>{error}</p>

              <button
                type="button"
                onClick={loadCourses}
              >
                Try Again
              </button>
            </div>
          )}

          {/* COURSES */}
          {!loading &&
            !error &&
            filteredCourses.length > 0 && (
              <div className="courses-grid">
                {filteredCourses.map(
                  (course, index) => (
                    <CourseCard
                      key={
                        course?._id ||
                        course?.slug ||
                        course?.title ||
                        index
                      }
                      course={course}
                      index={index}
                    />
                  )
                )}
              </div>
            )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            filteredCourses.length === 0 && (
              <div className="courses-empty">

                <div className="courses-empty__icon">
                  <Search size={30} />
                </div>

                <h2>No courses found</h2>

                <p>
                  Try changing your search or filter
                  selection.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setLevel("All");
                  }}
                >
                  Reset Filters
                </button>

              </div>
            )}

        </div>
      </section>
    </main>
  );
}