import { useEffect, useRef, useState } from "react";
import "./DevelopmentLifecycle.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";

const STAGES = [
  ['Requirement', 'Every journey starts with a clear need.'],
  ['Discovery', 'Understanding users, goals and existing systems.'],
  ['Design', 'Shaping the experience before building it.'],
  ['Development', 'Building the solution, step by step.'],
  ['Launch', 'Going live for real users.'],
  ['Monitor', 'Watching how the product performs.'],
  ['Maintain', 'Keeping it stable, secure and current.'],
  ['Improve', 'Refining based on what we learn.'],
  ['Optimize', 'Tuning for speed, clarity and value.'],
  ['Grow', 'Growth opens the next opportunity, and the cycle begins again.'],
];

export default function DevelopmentLifecycle() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const ringRef = useRef(null);
  const userPicked = useRef(false);
  const hovering = useRef(false);

  // only auto-play while the ring is on screen
  useEffect(() => {
    const el = ringRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!visible || reduced) return undefined;
    const timer = window.setInterval(() => {
      if (userPicked.current || hovering.current) return;
      setIndex((i) => (i + 1) % STAGES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [visible]);

  return (
    <section id="pjdev-lifecycle" className="pjdev-lifecycle pjdev-theme-dark" aria-labelledby="pjdev-lifecycle-title">
      <div className="pjdev-lifecycle__wrap">
        <DevelopmentSectionHead
          id="pjdev-lifecycle-title"
          center
          title="Build. Launch. Improve."
          text="We don't see development as a one-time event."
        />

        <div ref={ringRef} className="pjdev-lifecycle__ring">
          <div className="pjdev-lifecycle__return">
            <DevelopmentIcon name="loop" />
            Every cycle returns to a new requirement
          </div>

          <svg className="pjdev-lifecycle__svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="pjdev-lifecycle-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6E97FF" />
                <stop offset="1" stopColor="#3DD9EE" />
              </linearGradient>
            </defs>
            <circle className="pjdev-lifecycle__track" cx="50" cy="50" r="38" />
            <circle
              className={`pjdev-lifecycle__prog pjdev-lifecycle__prog--${index}`}
              cx="50" cy="50" r="38"
              pathLength="1"
              stroke="url(#pjdev-lifecycle-grad)"
              transform="rotate(-90 50 50)"
            />
          </svg>

          <div className="pjdev-lifecycle__centre" aria-live="polite">
            <div className="pjdev-lifecycle__count">Stage {index + 1} of {STAGES.length}</div>
            <div key={`n-${index}`} className="pjdev-lifecycle__name">{STAGES[index][0]}</div>
            <p key={`l-${index}`} className="pjdev-lifecycle__line">{STAGES[index][1]}</p>
          </div>

          {STAGES.map(([name], i) => (
            <div
              key={name}
              className={`pjdev-lifecycle__node pjdev-lifecycle__node--${i}${i === index ? ' pjdev-lifecycle__node--cur' : ''}${i < index ? ' pjdev-lifecycle__node--past' : ''}`}
            >
              <button
                type="button"
                aria-label={`${name}, stage ${i + 1} of ${STAGES.length}`}
                aria-pressed={i === index}
                onClick={() => { userPicked.current = true; setIndex(i); }}
                onMouseEnter={() => { hovering.current = true; if (!userPicked.current) setIndex(i); }}
                onMouseLeave={() => { hovering.current = false; }}
              >
                {name}
              </button>
            </div>
          ))}
        </div>

        <p className="pjdev-lifecycle__statement">Your digital product can continue to evolve as your business grows.</p>
      </div>
    </section>
  );
}
