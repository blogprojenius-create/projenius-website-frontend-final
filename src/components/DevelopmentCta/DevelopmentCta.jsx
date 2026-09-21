import { useEffect, useRef, useState } from "react";
import "./DevelopmentCta.css";

import DevelopmentButton from "../DevelopmentButton/DevelopmentButton";
import DevelopmentJourneyFlow from "../DevelopmentJourneyFlow/DevelopmentJourneyFlow";

const CONTACT_HREF = '#pjdev-contact'; // change to your real contact route, e.g. '/contact'

const FLOW = ['Idea', 'Requirement', 'Design', 'Development', 'Launch', 'Growth'].map((title) => ({ title }));

export default function DevelopmentCta() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return undefined; }
    const observer = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setInView(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pjdev-contact"
      ref={ref}
      className={`pjdev-cta pjdev-theme-dark${inView ? ' pjdev-cta--in' : ''}`}
      aria-labelledby="pjdev-cta-title"
    >
      <div className="pjdev-cta__wrap">
        <h2 id="pjdev-cta-title" className="pjdev-cta__title pjdev-cta__rv">
          Have a Requirement? Let's Build the Right Solution.
        </h2>
        <p className="pjdev-cta__lead pjdev-cta__rv pjdev-cta__rv--d1">
          Tell us what you're trying to solve. We'll help you understand the requirement and define the right
          digital path.
        </p>
        <div className="pjdev-cta__actions pjdev-cta__rv pjdev-cta__rv--d2">
          <DevelopmentButton href={CONTACT_HREF}>Start a Project</DevelopmentButton>
          <DevelopmentButton href={CONTACT_HREF} variant="ghost">Talk to ProJenius</DevelopmentButton>
        </div>

        <div className="pjdev-cta__flow">
          <DevelopmentJourneyFlow items={FLOW} variant="cta" label="From idea to growth" />
        </div>

        <p className="pjdev-cta__final pjdev-cta__rv pjdev-cta__rv--d2">
          From Requirement to Digital Product.
          <span className="pjdev-cta__final-accent">From Launch to Continuous Improvement.</span>
        </p>
      </div>
    </section>
  );
}
