import { useEffect, useRef, useState } from 'react';
import './DevelopmentAudit.css';
import DevelopmentEyebrow from '../DevelopmentEyebrow/DevelopmentEyebrow';
import DevelopmentButton from '../DevelopmentButton/DevelopmentButton';

const CONTACT_HREF = '#pjdev-contact';

const CATEGORIES = [
  'UI / UX', 'Performance', 'Mobile experience', 'SEO health',
  'Functionality', 'Security review', 'Content structure', 'Technical health',
];

// radar geometry (viewBox 0 0 400 400)
const CX = 200;
const CY = 200;
const R = 150;
const COUNT = CATEGORIES.length;
const point = (i, f = 1) => {
  const a = ((-90 + i * 45) * Math.PI) / 180;
  return [CX + Math.cos(a) * R * f, CY + Math.sin(a) * R * f];
};
const fmt = (n) => n.toFixed(1);

export default function DevelopmentAudit() {
  const [revealed, setRevealed] = useState(false);
  const [run, setRun] = useState(false);
  const [scanned, setScanned] = useState(0);
  const [hot, setHot] = useState(null);
  const sectionRef = useRef(null);
  const radarRef = useRef(null);

  // scroll reveal for the copy
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setRevealed(true); return undefined; }
    const observer = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setRevealed(true); observer.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // run the scan once when the radar is visible
  useEffect(() => {
    const el = radarRef.current;
    if (!el) return undefined;
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') { setScanned(COUNT); return undefined; }

    const timers = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        setRun(true);
        for (let i = 0; i < COUNT; i += 1) {
          timers.push(setTimeout(() => setScanned(i + 1), i * 600 + 200));
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <section
      id="pjdev-audit"
      ref={sectionRef}
      className={`pjdev-audit pjdev-theme-dark${revealed ? ' pjdev-audit--in' : ''}`}
      aria-labelledby="pjdev-audit-title"
    >
      <div className="pjdev-audit__wrap">
        <div>
          <div className="pjdev-audit__rv"><DevelopmentEyebrow>Already have a digital product?</DevelopmentEyebrow></div>
          <h2 id="pjdev-audit-title" className="pjdev-audit__title pjdev-audit__rv pjdev-audit__rv--d1">
            Let's See What Can Be Improved.
          </h2>
          <p className="pjdev-audit__lead pjdev-audit__rv pjdev-audit__rv--d2">
            Your website or application may already be live. We can help identify opportunities across experience,
            performance, functionality and digital visibility.
          </p>

          <ul className="pjdev-audit__list pjdev-audit__rv pjdev-audit__rv--d3">
            {CATEGORIES.map((name, i) => (
              <li key={name}>
                <button
                  type="button"
                  className={`pjdev-audit__item${i < scanned ? ' pjdev-audit__item--on' : ''}${hot === i ? ' pjdev-audit__item--hot' : ''}`}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                >
                  <span className="pjdev-audit__status">
                    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2 6.5l2.5 2.5L10 3.5" /></svg>
                  </span>
                  {name}
                </button>
              </li>
            ))}
          </ul>

          <div className="pjdev-audit__actions pjdev-audit__rv pjdev-audit__rv--d3">
            <DevelopmentButton href={CONTACT_HREF}>Request a Digital Audit</DevelopmentButton>
            <DevelopmentButton href={CONTACT_HREF} variant="ghost">Improve My Existing Product</DevelopmentButton>
          </div>
        </div>

        <div className="pjdev-audit__card pjdev-audit__rv pjdev-audit__rv--d2">
          <div className="pjdev-audit__card-head">
            <b>Digital product health check</b>
            <span>Illustrative view, not a real score</span>
          </div>
          <svg
            ref={radarRef}
            className="pjdev-audit__radar"
            viewBox="0 0 400 400"
            role="img"
            aria-label="Illustrative radar showing eight areas reviewed in a digital audit"
          >
            <defs>
              <linearGradient id="pjdev-audit-wedge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3DD9EE" stopOpacity="0" />
                <stop offset="1" stopColor="#3DD9EE" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75, 1].map((f) => (
              <polygon
                key={f}
                className="pjdev-audit__grid"
                points={CATEGORIES.map((_, i) => point(i, f).map(fmt).join(',')).join(' ')}
              />
            ))}
            {CATEGORIES.map((name, i) => {
              const [x, y] = point(i);
              return (
                <line
                  key={`ax-${name}`}
                  className={`pjdev-audit__axis${hot === i ? ' pjdev-audit__axis--hot' : ''}`}
                  x1={CX} y1={CY} x2={fmt(x)} y2={fmt(y)}
                />
              );
            })}

            <g className={`pjdev-audit__sweep${run ? ' pjdev-audit__sweep--run' : ''}`}>
              <path d="M200 200L85.1 103.6A150 150 0 0 1 200 50Z" fill="url(#pjdev-audit-wedge)" />
              <path d="M200 200L200 50" stroke="#3DD9EE" strokeWidth="2" />
            </g>

            {CATEGORIES.map((name, i) => {
              const [x, y] = point(i);
              return (
                <circle
                  key={`vx-${name}`}
                  className={`pjdev-audit__vertex${i < scanned ? ' pjdev-audit__vertex--on' : ''}${hot === i ? ' pjdev-audit__vertex--hot' : ''}`}
                  cx={fmt(x)} cy={fmt(y)} r="7"
                />
              );
            })}
            <circle className="pjdev-audit__centre" cx={CX} cy={CY} r="4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
