import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock3, GraduationCap, Monitor, Users } from 'lucide-react';
import { getCourse, mediaUrl } from '../services/contentApi';
import { ErrorState, getSkills } from '../components/ContentUI';
import './DynamicPages.css';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getCourse(id);
        if (!cancelled) {
          setCourse(data);
          document.title = `${data.title} | ProJenius`;
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Unable to load course.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return <main className="detail-page"><div className="container"><div className="detail-loading" /></div></main>;
  }

  if (error || !course) {
    return (
      <main className="detail-page">
        <div className="container">
          <ErrorState message={error || 'Course not found.'} />
          <Link className="back-link" to="/courses"><ArrowLeft /> Back to Courses</Link>
        </div>
      </main>
    );
  }

  const originalPrice = Number(course.originalPrice ?? course.price ?? 0);
  const offerPrice = Number(course.offerPrice ?? course.price ?? 0);
  const skills = getSkills(course);

  return (
    <main className="detail-page">
      <div className="container">
        <Link className="back-link" to="/courses"><ArrowLeft /> Back to Courses</Link>

        <section className="detail-hero">
          <div className="detail-media">
            <img src={mediaUrl(course.image)} alt={course.title} />
          </div>
          <div className="detail-intro">
            <span className="eyebrow">{course.badge || course.category || 'Course'}</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>

            <div className="detail-stats">
              <span><Clock3 /> {course.duration || 'Flexible'}</span>
              <span><GraduationCap /> {course.level || 'All Levels'}</span>
              <span><Monitor /> {course.mode || 'Online Live'}</span>
              <span><Users /> {Number(course.enrolled || 0)} enrolled</span>
            </div>

            <div className="detail-price">
              <div>
                <small>Offer Price</small>
                <strong>₹{offerPrice.toLocaleString('en-IN')}</strong>
                {originalPrice > offerPrice && <del>₹{originalPrice.toLocaleString('en-IN')}</del>}
              </div>
            </div>
          </div>
        </section>

        <section className="detail-grid">
          <article className="detail-content">
            <span className="eyebrow">Course Details</span>
            <h2>What you will learn</h2>
            {skills.length > 0 && <div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>}

            {Array.isArray(course.syllabus) && course.syllabus.length > 0 && (
              <>
                <h2>Syllabus</h2>
                <div className="feature-list">
                  {course.syllabus.map((item, index) => <div key={`${item}-${index}`}><span>{index + 1}</span><p>{item}</p></div>)}
                </div>
              </>
            )}

            {Array.isArray(course.features) && course.features.length > 0 && (
              <>
                <h2>Course Features</h2>
                <div className="feature-list">
                  {course.features.map((item, index) => <div key={`${item}-${index}`}><span>✓</span><p>{item}</p></div>)}
                </div>
              </>
            )}

            {course.requirements?.length > 0 && (
              <>
                <h2>Requirements</h2>
                <div className="feature-list">
                  {course.requirements.map((item, index) => <div key={`${item}-${index}`}><span>•</span><p>{item}</p></div>)}
                </div>
              </>
            )}

            <div className="rich-description">
              <h2>About this course</h2>
              <p>{course.description}</p>
            </div>
          </article>

          <aside className="info-card">
            <span className="eyebrow">Course Information</span>
            <b>Instructor</b>
            <small>{course.instructor?.name || course.instructor || 'ProJenius Team'}</small>
            <b>Category</b>
            <small>{course.category || 'General'}</small>
            <b>Course Status</b>
            <small>{course.courseStatus || 'Enrollment Open'}</small>
            <b>Mode</b>
            <small>{course.mode || 'Online Live'}</small>
          </aside>
        </section>
      </div>
    </main>
  );
}
