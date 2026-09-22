import React from "react";
import ContactButton from "../ContactButton/ContactButton";
import { CONTACT_TYPES } from "../ContactConfig/ContactConfig";
import "./ContactHero.css";

/* Nodes around the centre: [label, enquiry type key] */
const HERO_NODES = [
  ["STARTUP", "startup"],
  ["DEVELOPMENT", "development"],
  ["WORKSHOP", "workshop"],
  ["LEARNING", "course"],
  ["INTERNSHIP", "internship"],
  ["CAREER", "career"],
];

/* Ecosystem geometry (SVG user units) */
const CX = 220, CY = 220, RADIUS = 150, NODE_W = 150, NODE_H = 42;
const NODES = HERO_NODES.map(([label, key], i) => {
  const angle = ((-90 + i * 60) * Math.PI) / 180;
  return { label, key, x: +(CX + RADIUS * Math.cos(angle)).toFixed(1), y: +(CY + RADIUS * Math.sin(angle)).toFixed(1) };
});

export default function ContactHero({ onStartEnquiry, onReachDirect, onSelectType }) {
  return (
    <section className="pjct-hero" aria-labelledby="pjct-hero-title">
      <div className="pjct-hero__inner">
        <div className="pjct-hero__copy">
          <h1 className="pjct-hero__title" id="pjct-hero-title">Let’s Start a Conversation.</h1>
          <p className="pjct-hero__lead">Tell us what you’re looking for. We’ll help you find the right ProJenius pathway.</p>
          <p className="pjct-hero__sub">
            Whether you have an idea to develop, a workshop to conduct, a technology to learn, an internship to explore, or a project to discuss — tell us what you’re looking for.
          </p>
          <div className="pjct-hero__actions">
            <ContactButton size="lg" tone="dark" fluidMobile onClick={onStartEnquiry}>Start an Enquiry</ContactButton>
            <ContactButton size="lg" tone="dark" variant="secondary" fluidMobile onClick={onReachDirect}>Reach Us Directly</ContactButton>
          </div>
        </div>

        <figure className="pjct-hero__visual">
          <svg className="pjct-hero__svg" viewBox="0 0 440 440" role="group" aria-label="The ProJenius ecosystem: startup, development, workshop, learning, internship and career, all connected">
            <circle className="pjct-hero__ring" cx={CX} cy={CY} r={RADIUS} />

            <g className="pjct-hero__links">
              {NODES.map((n) => (
                <line key={n.key} className="pjct-hero__link" x1={CX} y1={CY} x2={n.x} y2={n.y} />
              ))}
            </g>

            <g className="pjct-hero__core">
              <circle className="pjct-hero__pulse" cx={CX} cy={CY} r="54" />
              <circle className="pjct-hero__pulse pjct-hero__pulse--late" cx={CX} cy={CY} r="54" />
              <circle className="pjct-hero__core-dot" cx={CX} cy={CY} r="54" />
              <text className="pjct-hero__core-text" x={CX} y={CY + 5} textAnchor="middle">PROJENIUS</text>
            </g>

            <g className="pjct-hero__nodes">
              {NODES.map((n) => (
                <g
                  key={n.key}
                  className="pjct-hero__node"
                  role="button"
                  tabIndex={0}
                  aria-label={`Start an enquiry about ${CONTACT_TYPES[n.key].label}`}
                  onClick={() => onSelectType(n.key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectType(n.key);
                    }
                  }}
                >
                  <g className="pjct-hero__float">
                    <g transform={`translate(${n.x} ${n.y})`}>
                      <rect className="pjct-hero__pill" x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={NODE_H / 2} />
                      <circle className="pjct-hero__dot" cx={-NODE_W / 2 + 20} cy="0" r="3.5" />
                      <text className="pjct-hero__label" x="9" y="4.5" textAnchor="middle">{n.label}</text>
                    </g>
                  </g>
                </g>
              ))}
            </g>
          </svg>
          <figcaption className="pjct-hero__caption">One ecosystem. Multiple ways to connect.</figcaption>
        </figure>
      </div>
    </section>
  );
}
