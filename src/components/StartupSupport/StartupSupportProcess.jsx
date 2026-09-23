import { useEffect, useRef, useState } from 'react';
import { PROCESS } from './StartupSupportData.js';
import { useInView, useReducedMotion } from './StartupSupportHooks.js';
import './StartupSupportProcess.css';

const N = PROCESS.length;
/* Node centres as percentages across a 0..100 viewBox, evenly spaced in N columns. */
const CX = Array.from({ length: N }, (_, i) => ((i + 0.5) * 100) / N);
const X0 = CX[0], X1 = CX[N - 1];

/* StartupSupportProcess — "From Conversation to Execution."
   A horizontal rail plays through the six steps automatically once it
   scrolls into view; clicking a step takes over manual control. */
function StartupSupportProcess() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });
  const railInView = useInView(railRef, { threshold: 0.5 });
  const reduced = useReducedMotion();
  const timerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const frac = N === 1 ? 0 : active / (N - 1);
    const x2 = X0 + (X1 - X0) * frac;
    fillRef.current?.setAttribute('x2', x2.toFixed(2));
    dotRef.current?.setAttribute('cx', x2.toFixed(2));
  }, [active]);

  useEffect(() => {
    if (!railInView || startedRef.current || reduced) return undefined;
    startedRef.current = true;
    let i = 0;
    timerRef.current = setInterval(() => {
      i += 1;
      if (i >= N) { clearInterval(timerRef.current); return; }
      setActive(i);
    }, 1900);
    return () => clearInterval(timerRef.current);
  }, [railInView, reduced]);

  const pick = (i) => { clearInterval(timerRef.current); setActive(i); };
  const p = PROCESS[active];

  return (
    <section className="ssp-section ssp-section--light" id="ssp-process" aria-labelledby="ssp-process-heading" ref={sectionRef}>
      <div className="ssp-wrap">
        <div className={`ssp-section-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Our working process</p>
          <h2 className="ssp-title" id="ssp-process-heading">From Conversation to Execution.</h2>
          <p className="ssp-lede">We begin by understanding what you are trying to solve before deciding what needs to be built.</p>
        </div>

        <div className="ssp-process-wrap">
          <div className="ssp-process-rail" ref={railRef}>
            <svg className="ssp-process-rail-svg" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="sspProcessGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#1D5BDB" /><stop offset="1" stopColor="#0A7C9B" />
                </linearGradient>
              </defs>
              <line className="ssp-process-rail-base" x1={X0} y1="5" x2={X1} y2="5" />
              <line ref={fillRef} className="ssp-process-rail-fill" x1={X0} y1="5" x2={X0} y2="5" />
              <circle ref={dotRef} className="ssp-process-rail-dot" cx={X0} cy="5" r="1.1" />
            </svg>

            <div className="ssp-process-rail-row">
              {PROCESS.map((step, i) => (
                <button
                  key={step.verb}
                  type="button"
                  className={`ssp-process-step-btn${i < active ? ' ssp-process-step-btn--done' : ''}${i === active ? ' ssp-process-step-btn--active' : ''}`}
                  aria-label={`Step ${step.num}: ${step.verb}`}
                  aria-current={i === active ? 'step' : undefined}
                  onClick={() => pick(i)}
                >
                  <span className="ssp-process-step-num">{step.num}</span>
                  <span className="ssp-process-step-verb">{step.verb}</span>
                  <span className="ssp-process-step-hint">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ssp-process-panel" aria-live="polite" key={active}>
            <div>
              <div className="ssp-process-panel-num" aria-hidden="true">{p.num}</div>
              <div className="ssp-process-panel-verb">{p.verb}</div>
            </div>
            <div>
              <h3>{p.title}</h3>
              <p className="ssp-process-panel-desc">{p.text}</p>
            </div>
            <div>
              <p className="ssp-mini-label">Capabilities involved</p>
              <ul className="ssp-chip-list">
                {p.chips.map((c) => (<li key={c} className="ssp-chip">{c}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportProcess;
