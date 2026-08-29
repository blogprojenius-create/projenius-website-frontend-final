import React, { useEffect, useRef, useState } from "react";
import "./HomeTeamSection.css";

const teamMembers = [
  {
    image: "/images/team-member-1.webp",
    name: "Karthick Ganesh",
    position: "Founder & CEO",
    bio: "A passionate leader focused on empowering the next generation of innovators with a strong vision for academic and practical excellence.",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
  {
    image: "/images/team-member-2.webp",
    name: "Harshini",
    position: "CTO & Co-Founder",
    bio: "A visionary mentor promoting entrepreneurship and innovation, supporting students from exploration to impactful execution.",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
];

const stats = [
  {
    value: 5,
    suffix: "+",
    label: "YEARS OF EXCELLENCE",
  },
  {
    value: 141,
    suffix: "+",
    label: "PROJECTS DELIVERED",
  },
  {
    value: 2062,
    suffix: "+",
    label: "HAPPY CLIENTS",
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  /* ==========================================
     SECTION ANIMATION
  ========================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* ==========================================
     RUNNING NUMBERS
  ========================================== */

  useEffect(() => {
    if (!visible) return;

    const duration = 1800;
    const startTime = performance.now();

    const animateNumbers = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // smooth animation
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((stat) =>
          Math.floor(stat.value * easedProgress)
        )
      );

      if (progress < 1) {
        requestAnimationFrame(animateNumbers);
      }
    };

    requestAnimationFrame(animateNumbers);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className={`team-section ${
        visible ? "team-visible" : ""
      }`}
    >
      {/* Background image / glow */}
      <div className="team-background"></div>

      <div className="team-overlay"></div>

      <div className="team-container">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="team-section-header">

          <span className="team-section-badge">
            <span className="team-badge-dot"></span>
            OUR TEAM MEMBERS
          </span>

          <h2 className="team-section-title">
            Meet the{" "}
            <span className="team-title-highlight">
              Creative Minds
            </span>
          </h2>

          <div className="team-title-line"></div>

          <p className="team-section-desc">
            The leadership team behind Projenius combines
            product thinking, engineering depth, and practical
            execution to turn ideas into meaningful impact.
          </p>

        </div>

        {/* ==========================================
            TEAM CARDS
        ========================================== */}

        <div className="team-grid">

          {teamMembers.map((member, index) => (
            <article
              className={`team-card team-card-${index + 1}`}
              key={member.name}
            >

              {/* IMAGE */}

              <div className="team-card-photo">

                <img
                  src={member.image}
                  alt={member.name}
                />

                <div className="team-photo-overlay"></div>

                <div className="team-card-number">
                  0{index + 1}
                </div>

                {/* SOCIALS */}

                <div className="team-card-socials">

                  {member.socials.map((platform) => (
                    <a
                      href="#"
                      key={platform}
                      aria-label={`${member.name} ${platform}`}
                    >
                      <i
                        className={`bi bi-${platform}`}
                      ></i>
                    </a>
                  ))}

                </div>

              </div>

              {/* CONTENT */}

              <div className="team-card-body">

                <div className="team-member-info">

                  <h3 className="team-member-name">
                    {member.name}
                  </h3>

                  <span className="team-member-role">
                    {member.position}
                  </span>

                  <p className="team-member-bio">
                    {member.bio}
                  </p>

                </div>

                <span className="team-card-arrow">
                  ↗
                </span>

              </div>

            </article>
          ))}

        </div>

        {/* ==========================================
            BOTTOM STATS
        ========================================== */}

        <div className="team-bottom">

          <div className="team-bottom-heading">

            <span>
              BUILT BY PEOPLE
            </span>

            <h3>
              One team.
              <strong> One vision.</strong>
            </h3>

          </div>

          <div className="team-stats">

            {stats.map((stat, index) => (
              <div
                className="team-stat"
                key={stat.label}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >

                <div className="team-stat-number">
                  {counts[index]}
                  {stat.suffix}
                </div>

                <div className="team-stat-label">
                  {stat.label}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}