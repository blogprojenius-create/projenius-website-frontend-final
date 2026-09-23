import { useEffect, useRef, useState } from 'react';
import { PATHS } from './StartupSupportData.js';
import { pad } from './StartupSupportUtils.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportPaths.css';

/* StartupSupportPaths — "Your Idea Determines the Path."
   A branching diagram: the connecting lines are measured and drawn with
   real DOM coordinates so they always meet the idea box and the chosen option. */
function StartupSupportPaths() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });
  const stageRef = useRef(null);
  const ideaRef = useRef(null);
  const optRefs = useRef([]);
  const [svgBox, setSvgBox] = useState({ w: 0, h: 0 });
  const [lineDs, setLineDs] = useState([]);
  const [active, setActive] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const [litUpTo, setLitUpTo] = useState(-1);

  const layout = () => {
    const stage = stageRef.current, idea = ideaRef.current;
    if (!stage || !idea) return;
    const sr = stage.getBoundingClientRect();
    const ir = idea.getBoundingClientRect();
    setSvgBox({ w: sr.width, h: sr.height });
    const x1 = ir.right - sr.left, y1 = ir.top + ir.height / 2 - sr.top;
    const ds = optRefs.current.map((o) => {
      if (!o) return '';
      const r = o.getBoundingClientRect();
      const x2 = r.left - sr.left, y2 = r.top + r.height / 2 - sr.top;
      const dx = (x2 - x1) * 0.55;
      return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    });
    setLineDs(ds);
  };

  useEffect(() => {
    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(layout);
    if (stageRef.current) ro.observe(stageRef.current);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    return () => { window.removeEventListener('resize', onResize); ro.disconnect(); };
  }, []);

  /* Stagger the route nodes/connectors/labels on as they "play". */
  useEffect(() => {
    setLitUpTo(-1);
    const steps = PATHS[active].steps.length;
    const timers = [];
    for (let i = 0; i < steps; i++) {
      timers.push(setTimeout(() => setLitUpTo(i), i * 280 + 60));
    }
    return () => timers.forEach(clearTimeout);
  }, [active, playKey]);

  const select = (i) => {
    if (i === active) return;
    setActive(i);
    setPlayKey((k) => k + 1);
  };

  const p = PATHS[active];

  return (
    <section className="ssp-section ssp-section--light" id="ssp-paths" aria-labelledby="ssp-paths-heading" ref={sectionRef}>
      <div className="ssp-wrap">
        <div className={`ssp-section-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Technology pathways</p>
          <h2 className="ssp-title" id="ssp-paths-heading">Your Idea Determines the Path.</h2>
          <p className="ssp-lede">Different ideas require different combinations of technology, validation and support. Pick a direction to see an example route.</p>
        </div>

        <div className={`ssp-paths-wrap ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <div className="ssp-paths-stage" ref={stageRef}>
            <div className="ssp-paths-idea" ref={ideaRef}>
              <strong>YOUR IDEA</strong>
              <small>Where every path begins</small>
            </div>

            <svg className="ssp-paths-lines" viewBox={`0 0 ${svgBox.w || 1} ${svgBox.h || 1}`} aria-hidden="true">
              {PATHS.map((path, i) => (
                <path
                  key={path.key}
                  className={`ssp-paths-line${i === active ? ' ssp-paths-line--on' : ''}`}
                  d={lineDs[i] || ''}
                  stroke={i === active ? '#3FD8F0' : undefined}
                />
              ))}
            </svg>

            <div className="ssp-paths-opts" role="group" aria-label="Choose a technology path">
              {PATHS.map((path, i) => (
                <button
                  key={path.key}
                  ref={(el) => { optRefs.current[i] = el; }}
                  className={`ssp-paths-opt${i === active ? ' ssp-paths-opt--active' : ''}`}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => select(i)}
                >
                  <span className="ssp-paths-opt-n">{pad(i + 1)}</span>
                  <span>
                    <span className="ssp-paths-opt-k">{path.key}</span>
                    <span className="ssp-paths-opt-s">{path.sub}</span>
                  </span>
                  <span className="ssp-paths-opt-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ssp-paths-route" aria-live="polite">
            <div className="ssp-paths-route-head">
              <div>
                <p className="ssp-mini-label">Example journey</p>
                <h3>{p.key}</h3>
              </div>
              <p>{p.note}</p>
            </div>

            <ol className="ssp-paths-route-list" aria-label={`${p.key} example journey`} key={playKey}>
              {p.steps.map((step, i) => {
                const isLast = i === p.steps.length - 1;
                const on = i <= litUpTo;
                return (
                  <li key={step} className={`ssp-paths-route-item${isLast ? ' ssp-paths-route-item--last' : ''}`}>
                    <span className={`ssp-paths-route-node${on ? ' ssp-paths-route-node--on' : ''}`} />
                    {!isLast && <span className={`ssp-paths-route-connector${i < litUpTo ? ' ssp-paths-route-connector--on' : ''}`} />}
                    <span className="ssp-paths-route-num">{pad(i + 1)}</span>
                    <span className={`ssp-paths-route-text${on ? ' ssp-paths-route-text--on' : ''}`}>{step}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportPaths;
