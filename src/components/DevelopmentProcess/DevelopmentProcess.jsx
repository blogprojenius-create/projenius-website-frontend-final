import { useEffect, useRef, useState } from "react";
import "./DevelopmentProcess.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";
const STAGES = [
  { n: '01', title: 'Discover', verb: 'Understand', note: 'before anything is built', chips: ['Business', 'Users', 'Goals', 'Requirements', 'Existing systems'] },
  { n: '02', title: 'Plan', verb: 'Define', note: 'what gets built and why', chips: ['Scope', 'Priorities', 'Features', 'User journeys', 'Solution direction'] },
  { n: '03', title: 'Design', verb: 'Create', note: 'the experience first', chips: ['User flows', 'Wireframes', 'UI', 'Prototypes', 'Experience structure'] },
  { n: '04', title: 'Develop', verb: 'Build', note: 'the right solution', chips: ['Website', 'Application', 'SaaS', 'AI solution', 'Automation', 'Digital platform'] },
  { n: '05', title: 'Integrate', verb: 'Connect', note: 'everything it depends on', chips: ['APIs', 'Data', 'AI services', 'External systems', 'Required infrastructure'] },
  { n: '06', title: 'Test', verb: 'Validate', note: 'it works for real people', chips: ['Functionality', 'Responsiveness', 'Usability', 'Performance', 'Security'] },
  { n: '07', title: 'Deploy', verb: 'Launch', note: 'to real users', text: 'Prepare the solution for real users and launch.' },
  { n: '08', title: 'Support', verb: 'Improve', note: 'and evolve', text: 'Maintain, monitor, improve and evolve the solution.' },
];

export default function DevelopmentProcess() {
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const stageRefs = useRef([]);
  const [act, setAct] = useState(-1); // index of the stage the journey line has reached

  useEffect(() => {
    let ticking = false;
    let last = -2;

    const update = () => {
      ticking = false;
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      const centre = window.innerHeight * 0.5;
      const length = Math.max(0, Math.min(rect.height, centre - rect.top));
      const progress = rect.height ? length / rect.height : 0;
      // the journey line is an SVG <line>: progress is an attribute, not an inline style
      if (fillRef.current) fillRef.current.setAttribute('stroke-dashoffset', String(1 - progress));

      let reached = -1;
      stageRefs.current.forEach((el, i) => {
        if (el && length >= el.offsetTop + 14) reached = i;
      });
      if (reached !== last) {
        last = reached;
        setAct(reached);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const current = Math.max(0, act);

  return (
    <section id="pjdev-process" className="pjdev-process pjdev-theme-dark" aria-labelledby="pjdev-process-title">
      <div className="pjdev-process__wrap">
        <DevelopmentSectionHead
          id="pjdev-process-title"
          title="How We Turn a Requirement Into Reality."
          text="A structured journey from the first conversation to a working digital product."
        />

        <div className="pjdev-process__layout">
          <aside className="pjdev-process__side" aria-hidden="true">
            <div key={current} className="pjdev-process__num">{STAGES[current].n}</div>
            <div className="pjdev-process__word">{STAGES[current].title}</div>
            <div className="pjdev-process__count">Stage {current + 1} of {STAGES.length}</div>
            <div className="pjdev-process__ticks">
              {STAGES.map((s, i) => (
                <i
                  key={s.n}
                  className={`pjdev-process__tick${i <= current ? ' pjdev-process__tick--on' : ''}${i === current ? ' pjdev-process__tick--cur' : ''}`}
                />
              ))}
            </div>
          </aside>

          <div ref={railRef} className="pjdev-process__rail">
            <svg className="pjdev-process__railsvg" width="4" aria-hidden="true" focusable="false">
              <line className="pjdev-process__railtrack" x1="2" y1="0" x2="2" y2="100%" />
              <line
                ref={fillRef}
                className="pjdev-process__railfill"
                x1="2" y1="0" x2="2" y2="100%"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            </svg>

            <ol className="pjdev-process__stages">
              {STAGES.map((stage, i) => {
                const state = i === act ? ' pjdev-process__stage--active' : i < act ? ' pjdev-process__stage--done' : i === act + 1 ? ' pjdev-process__stage--next' : '';
                return (
                  <li
                    key={stage.n}
                    ref={(el) => { stageRefs.current[i] = el; }}
                    className={`pjdev-process__stage${state}`}
                  >
                    <span className="pjdev-process__stage-n">{stage.n}</span>
                    <h3 className="pjdev-process__stage-title">{stage.title}</h3>
                    <span className="pjdev-process__stage-verb"><b>{stage.verb}</b> {stage.note}</span>
                    <div className="pjdev-process__stage-body">
                      {stage.chips ? (
                        <ul className="pjdev-process__chips">
                          {stage.chips.map((chip) => <li key={chip}>{chip}</li>)}
                        </ul>
                      ) : (
                        <p>{stage.text}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <p className="pjdev-process__loop">
          <DevelopmentIcon name="loop" />
          And then the journey continues: new requirements, new opportunities, new growth.
        </p>
      </div>
    </section>
  );
}
