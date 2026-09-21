import { useEffect, useRef, useState } from "react";
import "./DevelopmentImprove.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";

import DevelopmentMockScreen, {
  MockBefore,
  MockAfter,
} from "../DevelopmentMockScreen/DevelopmentMockScreen";
const STEPS = [
  { title: 'Audit', text: 'Review the current experience, structure and performance.' },
  { title: 'Insights', text: 'Find what is holding users and the business back.' },
  { title: 'Improvement', text: 'Redesign and rebuild what matters most.' },
  { title: 'Optimization', text: 'Tune, measure and keep refining.' },
];
const AREAS = ['UI/UX', 'Performance', 'Features', 'Workflow', 'Automation', 'Mobile experience', 'Content', 'Digital visibility'];

export default function DevelopmentImprove() {
  const reduced = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [pos, setPos] = useState(reduced ? 50 : 97);   // handle position in %
  const wrapRef = useRef(null);
  const touched = useRef(false);

  // intro: the handle glides from the "existing" side to the middle once
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') return undefined;
    let frame = 0;
    let delay = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        let start = null;
        const step = (t) => {
          if (touched.current) return;
          if (start === null) start = t;
          const p = Math.min(1, (t - start) / 2200);
          const eased = 1 - (1 - p) ** 3;
          setPos(97 + (50 - 97) * eased);
          if (p < 1) frame = window.requestAnimationFrame(step);
        };
        delay = window.setTimeout(() => { frame = window.requestAnimationFrame(step); }, 350);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); window.clearTimeout(delay); window.cancelAnimationFrame(frame); };
  }, [reduced]);

  const revealed = 100 - pos;
  const stepIndex = revealed < 25 ? 0 : revealed < 50 ? 1 : revealed < 75 ? 2 : 3;

  return (
    <section id="pjdev-improve" className="pjdev-improve pjdev-theme-alt" aria-labelledby="pjdev-improve-title">
      <div className="pjdev-improve__wrap">
        <DevelopmentSectionHead
          id="pjdev-improve-title"
          title="Already Built Doesn't Mean Finished."
          text="Digital products evolve. New users, new requirements and new business goals create new opportunities to improve."
        />

        <div className="pjdev-improve__block">
          <div ref={wrapRef} className="pjdev-improve__compare">
            {/* clip shape for the improved layer: set through SVG attributes, not inline styles */}
            <svg className="pjdev-improve__defs" width="0" height="0" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="pjdev-improve-clip" clipPathUnits="objectBoundingBox">
                  <rect x={pos / 100} y="0" width={1 - pos / 100} height="1" />
                </clipPath>
              </defs>
            </svg>

            <div aria-hidden="true">
              <DevelopmentMockScreen wide>
                <MockBefore />
                <MockAfter />
              </DevelopmentMockScreen>
            </div>

            <span className="pjdev-improve__tag pjdev-improve__tag--l">Existing experience</span>
            <span className="pjdev-improve__tag pjdev-improve__tag--r">Improved experience</span>

            <input
              className="pjdev-improve__range"
              type="range"
              min="0"
              max="100"
              step="1"
              value={pos}
              aria-label="Drag to compare the existing and improved experience"
              onChange={(event) => { touched.current = true; setPos(Number(event.target.value)); }}
              onPointerDown={() => { touched.current = true; }}
            />

            <svg className="pjdev-improve__handle" width="100%" height="100%" aria-hidden="true" focusable="false">
              <line className="pjdev-improve__handle-line" x1={`${pos}%`} y1="0" x2={`${pos}%`} y2="100%" />
              <svg x={`${pos}%`} y="50%" width="1" height="1" overflow="visible">
                <circle className="pjdev-improve__handle-knob" r="23" />
                <path className="pjdev-improve__handle-arrows" d="M-4 -6L-10 0L-4 6M4 -6L10 0L4 6" />
              </svg>
            </svg>
          </div>

          <ol className="pjdev-improve__steps">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className={`pjdev-improve__step${i === stepIndex ? ' pjdev-improve__step--on' : ''}${i < stepIndex ? ' pjdev-improve__step--past' : ''}`}
              >
                <b>{step.title}</b>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>

          <p className="pjdev-improve__areas-title">Where improvements usually happen</p>
          <ul className="pjdev-improve__areas">
            {AREAS.map((area) => <li key={area}>{area}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
