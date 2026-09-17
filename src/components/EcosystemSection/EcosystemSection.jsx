import React from "react";
import {
  Lightbulb,
  Code2,
  Wifi,
  BookOpen,
  Boxes,
  ShieldCheck,
  Cpu,
  Rocket,
  GraduationCap,
} from "lucide-react";
import "./EcosystemSection.css";

const ecosystemItems = [
  { id: "innovation", title: "Innovation", Icon: Lightbulb, position: "innovation" },
  { id: "software", title: "Software Development", Icon: Code2, position: "software" },
  { id: "iot", title: "IoT & Embedded Systems", Icon: Wifi, position: "iot" },
  { id: "academia", title: "Academia", Icon: BookOpen, position: "academia" },
  { id: "product", title: "Product Development", Icon: Boxes, position: "product" },
  { id: "patent", title: "Patent Support", Icon: ShieldCheck, position: "patent" },
  { id: "fabrication", title: "3D Design & Fabrication", Icon: Cpu, position: "fabrication" },
  { id: "startup", title: "Startup Support", Icon: Rocket, position: "startup" },
  { id: "training", title: "Workshops & Training", Icon: GraduationCap, position: "training" },
];

function EcosystemNode({ item }) {
  const { Icon } = item;

  return (
    <div className={`eco-node eco-node-${item.position}`}>
      <div className="eco-node-card">
        <Icon className="eco-node-icon" size={28} strokeWidth={2} aria-hidden="true" />
      </div>
      <span className="eco-node-label">{item.title}</span>
    </div>
  );
}

function NetworkLine({ x2, y2, index }) {
  return (
    <line
      className={`eco-network-line eco-network-line-${index}`}
      x1="500"
      y1="300"
      x2={x2}
      y2={y2}
    />
  );
}

function MovingDot({ cx, cy, index }) {
  return (
    <circle
      className={`eco-moving-dot eco-moving-dot-${index}`}
      cx={cx}
      cy={cy}
      r="3.5"
    />
  );
}

export default function EcosystemSection() {
  return (
    <section className="ecosystem-section" aria-labelledby="ecosystem-title">
      <div className="ecosystem-container">
        <div className="ecosystem-heading">
          <span className="ecosystem-eyebrow">OUR ECOSYSTEM</span>

          <h2 id="ecosystem-title">
            A Connected <span>Innovation Network</span>
          </h2>

          <p>
            Every part of our ecosystem works together — technology, product, and people
            <br className="ecosystem-desktop-break" />
            connected by a shared drive to innovate.
          </p>
        </div>

        <div className="ecosystem-network">
          <svg
            className="ecosystem-lines"
            viewBox="0 0 1000 620"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <NetworkLine x2="335" y2="125" index="1" />
            <NetworkLine x2="500" y2="72" index="2" />
            <NetworkLine x2="665" y2="120" index="3" />
            <NetworkLine x2="150" y2="265" index="4" />
            <NetworkLine x2="850" y2="265" index="5" />
            <NetworkLine x2="150" y2="505" index="6" />
            <NetworkLine x2="850" y2="505" index="7" />
            <NetworkLine x2="410" y2="590" index="8" />
            <NetworkLine x2="590" y2="590" index="9" />

            <MovingDot cx="410" cy="205" index="1" />
            <MovingDot cx="500" cy="150" index="2" />
            <MovingDot cx="590" cy="205" index="3" />
            <MovingDot cx="340" cy="285" index="4" />
            <MovingDot cx="660" cy="285" index="5" />
            <MovingDot cx="275" cy="440" index="6" />
            <MovingDot cx="725" cy="440" index="7" />
            <MovingDot cx="455" cy="450" index="8" />
            <MovingDot cx="545" cy="450" index="9" />
          </svg>

          <div className="ecosystem-core" aria-label="Projenius ecosystem">
            <div className="ecosystem-core-ring">
              <div className="ecosystem-core-circle">
                <Cpu
                  className="ecosystem-core-icon"
                  size={48}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {ecosystemItems.map((item) => (
            <EcosystemNode key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
