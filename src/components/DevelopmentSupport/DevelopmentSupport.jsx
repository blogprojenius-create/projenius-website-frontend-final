import { useEffect, useRef, useState } from "react";
import "./DevelopmentSupport.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";
import DevelopmentJourneyFlow from "../DevelopmentJourneyFlow/DevelopmentJourneyFlow";

const TRACK = ['Build', 'Launch', 'Monitor', 'Maintain', 'Improve', 'Grow'].map((title) => ({ title }));

const ITEMS = [
  { icon: 'content', title: 'Content updates', text: 'Keep pages, copy and media current.' },
  { icon: 'bug', title: 'Bug fixes', text: 'Resolve issues quickly and safely.' },
  { icon: 'perf', title: 'Performance improvements', text: 'Stay fast as usage grows.' },
  { icon: 'feature', title: 'Feature enhancements', text: 'Add what your users need next.' },
  { icon: 'uiux', title: 'UI / UX improvements', text: 'Refine flows based on real use.' },
  { icon: 'support', title: 'Technical support', text: 'Help when you need it.' },
  { icon: 'shield', title: 'Security / component updates', text: 'Keep protections and components current.' },
  { icon: 'review', title: 'Periodic digital reviews', text: 'Regular check-ins on how the product is doing.' },
];

export default function DevelopmentSupport() {
  const [inView, setInView] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return undefined; }
    const observer = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pjdev-support" className="pjdev-support" aria-labelledby="pjdev-support-title">
      <div className="pjdev-support__wrap">
        <DevelopmentSectionHead
          id="pjdev-support-title"
          title="Launching Is Not the End."
          text="We can continue supporting your digital product beyond the initial launch, helping you maintain, improve and adapt it as your needs change."
        />

        <div className="pjdev-support__track">
          <DevelopmentJourneyFlow items={TRACK} variant="track" label="Post-launch journey" />
        </div>

        <div ref={gridRef} className={`pjdev-support__grid${inView ? ' pjdev-support__grid--in' : ''}`}>
          {ITEMS.map((item) => (
            <div key={item.title} className="pjdev-support__item">
              <DevelopmentIcon name={item.icon} />
              <h3 className="pjdev-support__item-title">{item.title}</h3>
              <p className="pjdev-support__item-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
