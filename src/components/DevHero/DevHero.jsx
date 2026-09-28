import React from "react";
import "./DevHero.css";

const CONTACT_HREF = "#pjdev-contact";
const PROCESS_HREF = "#pjdev-process";

/* =========================================================
   MAIN JOURNEY PATH
   ========================================================= */

const MAIN_PATH =
  "M270 60C270 105 250 105 250 150C250 195 290 195 290 240C290 285 250 285 250 330C250 375 290 375 290 420C290 465 250 465 250 510C250 555 280 555 280 600";

const LOOP_PATH =
  "M280 600C335 645 585 650 585 400C585 150 585 60 420 60L306 60";

/* =========================================================
   JOURNEY NODES
   ========================================================= */

const NODES = [
  {
    x: 270,
    y: 60,
    label: "Your requirement",
    first: true,
  },
  {
    x: 250,
    y: 150,
    label: "Understand",
  },
  {
    x: 290,
    y: 240,
    label: "Design",
  },
  {
    x: 250,
    y: 330,
    label: "Build",
  },
  {
    x: 290,
    y: 420,
    label: "Integrate",
  },
  {
    x: 250,
    y: 510,
    label: "Launch",
  },
  {
    x: 280,
    y: 600,
    label: "Improve",
  },
];

/* =========================================================
   TECHNOLOGY CHIPS
   ========================================================= */

const SATS = [
  {
    label: "Data",
    x: 400,
    y: 140,
    w: 58,
    to: [250, 150],
  },
  {
    label: "UI/UX",
    x: 445,
    y: 235,
    w: 68,
    to: [290, 240],
  },
  {
    label: "Web",
    x: 385,
    y: 300,
    w: 52,
    to: [250, 330],
  },
  {
    label: "Mobile",
    x: 490,
    y: 345,
    w: 72,
    to: [250, 330],
  },
  {
    label: "SaaS",
    x: 395,
    y: 385,
    w: 60,
    to: [250, 330],
  },
  {
    label: "AI",
    x: 415,
    y: 455,
    w: 46,
    to: [290, 420],
  },
  {
    label: "Automation",
    x: 505,
    y: 410,
    w: 104,
    to: [290, 420],
  },
];

export default function DevHero() {
  return (
    <section
      id="pjdev-overview"
      className="devhero"
      aria-labelledby="devhero-title"
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="devhero__background" />

      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div className="devhero__container">
        <div className="devhero__content">

          {/* =================================================
              LEFT CONTENT
              ================================================= */}

          <div className="devhero__copy">

            {/* EYEBROW */}

            <div className="devhero__eyebrow">
              <span className="devhero__eyebrow-dot" />
              <span>DIGITAL DEVELOPMENT</span>
            </div>

            {/* =================================================
                MAIN HEADING
                ================================================= */}

            <h1
              id="devhero-title"
              className="devhero__title"
            >
              <span className="devhero__white-line">
                From Requirements
              </span>

              <span className="devhero__white-line devhero__product-line">
                to Digital Products.
              </span>

              <span className="devhero__gradient-line">
                Built Around Your
              </span>

              <span className="devhero__gradient-line">
                Business.
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <p className="devhero__description">
              We design and build websites, web apps, mobile apps,
              SaaS platforms, AI solutions, and automation tools
              based on your business needs.
            </p>

            {/* =================================================
                BUTTONS
                ================================================= */}

            <div className="devhero__actions">

              <a
                href={CONTACT_HREF}
                className="devhero__button devhero__button--primary"
              >
                <span>Start a Project</span>
                <span className="devhero__button-arrow">
                  →
                </span>
              </a>

              <a
                href={PROCESS_HREF}
                className="devhero__button devhero__button--secondary"
              >
                <span>Explore How We Work</span>
                <span className="devhero__button-arrow">
                  ↓
                </span>
              </a>

            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL
              ================================================= */}

          <div className="devhero__visual">

            <svg
              className="devhero__svg"
              viewBox="0 0 620 680"
              role="img"
              aria-labelledby="devhero-svg-title devhero-svg-desc"
            >

              <title id="devhero-svg-title">
                Digital development journey
              </title>

              <desc id="devhero-svg-desc">
                Digital development journey from requirement to
                understanding, design, build, integration,
                launch and improvement.
              </desc>

              {/* =================================================
                  SVG DEFINITIONS
                  ================================================= */}

              <defs>

                <linearGradient
                  id="devhero-gradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#1769FF"
                  />

                  <stop
                    offset="50%"
                    stopColor="#278DFF"
                  />

                  <stop
                    offset="100%"
                    stopColor="#25D2E8"
                  />
                </linearGradient>

                <filter
                  id="devhero-glow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur
                    stdDeviation="4"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

              </defs>

              {/* =================================================
                  CONNECTION LINES
                  ================================================= */}

              {SATS.map((item, index) => (
                <path
                  key={`tie-${item.label}`}
                  className="devhero__tie"
                  d={`M${item.x} ${item.y}L${item.to[0]} ${item.to[1]}`}
                  style={{
                    animationDelay: `${2.5 + index * 0.15}s`,
                  }}
                />
              ))}

              {/* =================================================
                  OUTER LOOP
                  ================================================= */}

              <path
                className="devhero__loop"
                d={LOOP_PATH}
                stroke="url(#devhero-gradient)"
              />

              <polygon
                className="devhero__loop-arrow"
                points="298,60 311,53 311,67"
              />

              {/* =================================================
                  MAIN PATH
                  ================================================= */}

              <path
                id="devhero-main-path"
                className="devhero__path"
                d={MAIN_PATH}
                stroke="url(#devhero-gradient)"
              />

              {/* =================================================
                  NODES
                  ================================================= */}

              {NODES.map((node, index) => (
                <g
                  key={node.label}
                  className={`devhero__node devhero__node--${index + 1}`}
                >

                  {node.first && (
                    <>
                      <circle
                        className="devhero__pulse"
                        cx={node.x}
                        cy={node.y}
                        r="18"
                      />

                      <circle
                        className="devhero__pulse devhero__pulse--second"
                        cx={node.x}
                        cy={node.y}
                        r="18"
                      />
                    </>
                  )}

                  <circle
                    className="devhero__ring"
                    cx={node.x}
                    cy={node.y}
                    r={node.first ? 16 : 11}
                    stroke="url(#devhero-gradient)"
                  />

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.first ? 7 : 4.5}
                    fill="url(#devhero-gradient)"
                  />

                  <text
                    className={`devhero__label ${
                      node.first
                        ? "devhero__label--first"
                        : ""
                    }`}
                    x={node.x - (node.first ? 28 : 24)}
                    y={node.y}
                    textAnchor="end"
                    dominantBaseline="central"
                  >
                    {node.label}
                  </text>

                </g>
              ))}

              {/* =================================================
                  MOVING DOT
                  ================================================= */}

              <circle
                className="devhero__packet"
                r="4.5"
                opacity="0"
              >
                <set
                  attributeName="opacity"
                  to="1"
                  begin="2s"
                />

                <animateMotion
                  dur="7s"
                  begin="2s"
                  repeatCount="indefinite"
                >
                  <mpath href="#devhero-main-path" />
                </animateMotion>
              </circle>

              {/* =================================================
                  SATELLITE CHIPS
                  ================================================= */}

              {SATS.map((item, index) => (
                <g
                  key={`sat-${item.label}`}
                  className="devhero__sat"
                  style={{
                    animationDelay: `${2.5 + index * 0.15}s`,
                  }}
                >

                  <g
                    transform={`translate(${item.x} ${item.y})`}
                  >

                    <rect
                      className="devhero__chip"
                      x={-item.w / 2}
                      y="-14"
                      width={item.w}
                      height="28"
                      rx="14"
                    />

                    <text
                      className="devhero__chip-text"
                      x="0"
                      y="0"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {item.label}
                    </text>

                  </g>

                </g>
              ))}

            </svg>
          </div>
        </div>
      </div>

      {/* =====================================================
          CLEAN BOTTOM EDGE
          ===================================================== */}

      {/* <div className="devhero__bottom-edge">
        <div className="devhero__bottom-blue" />
        <div className="devhero__bottom-white" />
      </div> */}

    </section>
  );
}