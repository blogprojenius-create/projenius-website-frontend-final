import { useEffect, useRef, useState } from 'react';
import './DevelopmentEcosystem.css';

// x / y are % positions inside the diagram. They match the
// .pjdev-eco__node--N rules in DevelopmentEcosystem.css.
const NODES = [
  { label: 'UI/UX', x: 50, y: 13, cap: 'Experiences designed before they are built.' },
  { label: 'Automation', x: 74, y: 23.8, cap: 'Connected, repeatable workflows.' },
  { label: 'SaaS', x: 84, y: 50, cap: 'Multi-user platforms that scale with you.' },
  { label: 'Integrations', x: 74, y: 76.2, cap: 'APIs and systems working together.' },
  { label: 'Data', x: 50, y: 87, cap: 'Dashboards, reporting and insight.' },
  { label: 'Mobile', x: 26, y: 76.2, cap: 'Applications for phones and tablets.' },
  { label: 'AI', x: 16, y: 50, cap: 'Intelligent features where they add value.' },
  { label: 'Web', x: 26, y: 23.8, cap: 'Websites, portals and web applications.' },
];
const DEFAULT_CAPTION = 'Hover or tap a node to see how it connects.';

export default function DevelopmentEcosystem() {
  const [hot, setHot] = useState(null);
  const [inView, setInView] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return undefined; }
    const observer = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pjdev-ecosystem" className="pjdev-eco" aria-labelledby="pjdev-eco-title">
      <div className="pjdev-eco__wrap">
        <div className="pjdev-eco__copy">
          <h2 id="pjdev-eco-title" className="pjdev-eco__title">
            Different Technologies. <span className="pjdev-eco__title-accent">One Requirement.</span>
          </h2>
          <p className="pjdev-eco__statement">
            We don't force every project into the same technology or architecture. The solution is shaped around
            the requirement.
          </p>
        </div>

        <div>
          <div ref={stageRef} className={`pjdev-eco__stage${inView ? ' pjdev-eco__stage--in' : ''}`}>
            <div className="pjdev-eco__ring pjdev-eco__ring--a" />
            <div className="pjdev-eco__ring pjdev-eco__ring--b" />

            {/* connecting lines: SVG percentages, so no pixel maths and no inline styles */}
            <svg className="pjdev-eco__lines" width="100%" height="100%" aria-hidden="true" focusable="false">
              {NODES.map((n, i) => (
                <line
                  key={n.label}
                  className={`pjdev-eco__line pjdev-eco__line--${i + 1}${hot === i ? ' pjdev-eco__line--hot' : ''}`}
                  x1="50%" y1="50%" x2={`${n.x}%`} y2={`${n.y}%`}
                  pathLength="1"
                />
              ))}
            </svg>

            <div className="pjdev-eco__core">Your business requirement</div>

            {NODES.map((n, i) => (
              <button
                key={n.label}
                type="button"
                className={`pjdev-eco__node pjdev-eco__node--${i + 1}${hot === i ? ' pjdev-eco__node--hot' : ''}`}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(null)}
                onClick={() => setHot(i)}
              >
                {n.label}
              </button>
            ))}
          </div>
          <p className="pjdev-eco__caption" aria-live="polite">
            {hot === null ? DEFAULT_CAPTION : `${NODES[hot].label}: ${NODES[hot].cap}`}
          </p>
        </div>
      </div>
    </section>
  );
}
