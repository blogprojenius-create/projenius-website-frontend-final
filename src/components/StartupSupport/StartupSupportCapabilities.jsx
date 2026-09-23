import { useMemo, useRef, useState } from 'react';
import { CAPS } from './StartupSupportData.js';
import { useInView } from './StartupSupportHooks.js';
import './StartupSupportCapabilities.css';

/* Matches the .ssp-caps-pos-N classes in StartupSupportCapabilities.css (circular layout for 10 items). */
function ringPosition(i, n) {
  const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
  return { x: 50 + 39 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
}

const BRAND_MARK = (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M11 24V9h6.2a4.6 4.6 0 0 1 0 9.2H11" fill="none" stroke="#7FB0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="11" cy="24" r="2" fill="#2ED3F0" /><circle cx="21.8" cy="13.6" r="1.8" fill="#A99EFF" />
  </svg>
);

/* StartupSupportCapabilities — "One Idea. Multiple Capabilities."
   Desktop: an interactive constellation around a central ProJenius node.
   Mobile: the same content as a simple connected list. */
function StartupSupportCapabilities() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { threshold: 0.1 });
  const [active, setActive] = useState(null);

  const positions = useMemo(() => CAPS.map((_, i) => ringPosition(i, CAPS.length)), []);
  const byName = useMemo(() => Object.fromEntries(CAPS.map((c, i) => [c.name, i])), []);
  const relatedIdx = active !== null ? CAPS[active].related.map((r) => byName[r]) : [];

  return (
    <section className="ssp-section ssp-section--dark ssp-gridbg" id="ssp-capabilities" aria-labelledby="ssp-caps-heading" ref={sectionRef}>
      <div className="ssp-wrap">
        <div className={`ssp-section-head ssp-reveal${inView ? ' ssp-reveal--in' : ''}`}>
          <p className="ssp-eyebrow">Capability map</p>
          <h2 className="ssp-title" id="ssp-caps-heading">One Idea. Multiple Capabilities.</h2>
          <p className="ssp-lede">The technology you need depends on the problem you're solving.</p>
        </div>

        <div className={`ssp-caps-map${active !== null ? ' ssp-caps-map--has-active' : ''}`}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse className="ssp-caps-ring ssp-caps-ring--dashed" cx="50" cy="50" rx="39" ry="38" />
            <ellipse className="ssp-caps-ring" cx="50" cy="50" rx="22" ry="21" />
            {positions.map((pos, i) => {
              const cls = `ssp-caps-line${i === active ? ' ssp-caps-line--on' : ''}${relatedIdx.includes(i) ? ' ssp-caps-line--rel' : ''}`;
              return <line key={CAPS[i].name} className={cls} x1="50" y1="50" x2={pos.x.toFixed(2)} y2={pos.y.toFixed(2)} />;
            })}
          </svg>

          <div className="ssp-caps-core">
            <div className="ssp-caps-core-mark">{BRAND_MARK}</div>
            <span className="ssp-caps-core-label">PROJENIUS</span>
          </div>

          {CAPS.map((c, i) => {
            const cls = `ssp-caps-node ssp-caps-pos-${i}${i === active ? ' ssp-caps-node--active' : ''}${relatedIdx.includes(i) ? ' ssp-caps-node--rel' : ''}`;
            return (
              <button
                key={c.name}
                type="button"
                className={cls}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="ssp-caps-node-dot" />{c.name}
              </button>
            );
          })}
        </div>

        <div className="ssp-caps-info" aria-live="polite">
          {active === null ? (
            <>
              <span className="ssp-caps-info-name">Hover or tap a capability</span>
              <span className="ssp-caps-info-desc">See how each one connects to ProJenius and to the others.</span>
            </>
          ) : (
            <div key={active}>
              <span className="ssp-caps-info-name">{CAPS[active].name}</span>
              <span className="ssp-caps-info-desc">{CAPS[active].text}</span>
              <span className="ssp-caps-info-rel">Often combined with: {CAPS[active].related.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="ssp-caps-list">
          <div className="ssp-caps-list-core">{BRAND_MARK}PROJENIUS</div>
          <ol>
            {CAPS.map((c) => (
              <li key={c.name}><h3>{c.name}</h3><p>{c.text}</p></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default StartupSupportCapabilities;
