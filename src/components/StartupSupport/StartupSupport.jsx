import React, { useRef } from "react";
import "./StartupSupport.css";

const StartupSupport = () => {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();

    sectionRef.current.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );

    sectionRef.current.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`
    );
  };

  const handleMouseLeave = () => {
    if (!sectionRef.current) return;

    sectionRef.current.style.setProperty("--mouse-x", "50%");
    sectionRef.current.style.setProperty("--mouse-y", "50%");
  };

  return (
    <section
      ref={sectionRef}
      className="startupSupport"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="startupSupport__cursorGlow" />
      <div className="startupSupport__grid" />

      <div className="startupSupport__ambient startupSupport__ambient--one" />
      <div className="startupSupport__ambient startupSupport__ambient--two" />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="startupSupport__container">

        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className="startupSupport__content">

          <div className="startupSupport__eyebrow">
            <span />
            STARTUP SUPPORT
          </div>

          <h2 className="startupSupport__heading">
            From Idea to
            <span>Startup-Ready.</span>
          </h2>

          <p className="startupSupport__description">
            Have an idea, problem, prototype or early-stage venture?
            ProJenius helps innovators understand the problem, validate
            the opportunity, build the right technology and take the next
            practical step.
          </p>

          <div className="startupSupport__buttons">

            <button
              className="startupSupport__primary"
              type="button"
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              Discuss Your Idea
              <span>→</span>
            </button>

            <button
              className="startupSupport__secondary"
              type="button"
              onClick={() => {
                document
                  .getElementById("startupSupportRoute")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }}
            >
              Explore Our Approach
              <span>↓</span>
            </button>

          </div>

          <div className="startupSupport__hint">
            <span />
            Hover the route. Every stage is something we can help with.
          </div>

        </div>

        {/* ===================================================
            RIGHT ROUTE
        ==================================================== */}

        <div
          className="startupSupport__route"
          id="startupSupportRoute"
        >

          {/* LEFT TICK MARKS */}

          <div className="startupSupport__ticks">
            {Array.from({ length: 25 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          {/* =================================================
              SINGLE SVG SYSTEM

              EVERYTHING BELOW USES THE SAME COORDINATES
              ================================================= */}

          <svg
            className="startupSupport__svg"
            viewBox="0 0 547 606"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Startup support journey"
          >

            <defs>

              {/* Route glow */}
              <filter
                id="startupRouteGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Node glow */}
              <filter
                id="startupNodeGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="7"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dot glow */}
              <filter
                id="startupDotGlow"
                x="-300%"
                y="-300%"
                width="600%"
                height="600%"
              >
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

            </defs>

            {/* =================================================
                IDEA LARGE CIRCLES
            ================================================== */}

            <circle
              cx="145"
              cy="24"
              r="72"
              className="startupSupport__ideaOrbit"
            />

            <circle
              cx="145"
              cy="24"
              r="110"
              className="startupSupport__ideaOrbit startupSupport__ideaOrbit--outer"
            />

            {/* =================================================
                NODE HALOS
            ================================================== */}

            <circle
              cx="325"
              cy="129"
              r="39"
              className="startupSupport__halo"
            />

            <circle
              cx="325"
              cy="129"
              r="52"
              className="startupSupport__halo startupSupport__halo--outer"
            />

            <circle
              cx="145"
              cy="244"
              r="39"
              className="startupSupport__halo"
            />

            <circle
              cx="145"
              cy="244"
              r="52"
              className="startupSupport__halo startupSupport__halo--outer"
            />

            <circle
              cx="325"
              cy="359"
              r="39"
              className="startupSupport__halo"
            />

            <circle
              cx="325"
              cy="359"
              r="52"
              className="startupSupport__halo startupSupport__halo--outer"
            />

            <circle
              cx="145"
              cy="474"
              r="39"
              className="startupSupport__halo"
            />

            <circle
              cx="145"
              cy="474"
              r="52"
              className="startupSupport__halo startupSupport__halo--outer"
            />

            <circle
              cx="325"
              cy="574"
              r="39"
              className="startupSupport__halo"
            />

            <circle
              cx="325"
              cy="574"
              r="52"
              className="startupSupport__halo startupSupport__halo--outer"
            />

            {/* =================================================
                EXACT ROUTE

                Smooth curves.
                No sharp corners.
            ================================================== */}

            <path
              id="startupSupportPath"
              d="
                M 145 24

                C 195 48,
                  278 82,
                  325 129

                C 278 166,
                  193 207,
                  145 244

                C 193 279,
                  278 323,
                  325 359

                C 278 397,
                  193 438,
                  145 474

                C 193 511,
                  278 548,
                  325 574
              "
              className="startupSupport__routeGlow"
            />

            <path
              d="
                M 145 24

                C 195 48,
                  278 82,
                  325 129

                C 278 166,
                  193 207,
                  145 244

                C 193 279,
                  278 323,
                  325 359

                C 278 397,
                  193 438,
                  145 474

                C 193 511,
                  278 548,
                  325 574
              "
              className="startupSupport__routeLine"
            />

            {/* =================================================
                WHITE TRAVELLING DOT

                SAME PATH = ALWAYS ALIGNED
            ================================================== */}

            <circle
              r="4"
              className="startupSupport__travelDot"
              filter="url(#startupDotGlow)"
            >
              <animateMotion
                dur="17s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#startupSupportPath" />
              </animateMotion>
            </circle>

            {/* =================================================
                IDEA
            ================================================== */}

            <g className="startupSupport__stage startupSupport__stage--idea">

              <circle
                cx="145"
                cy="24"
                r="20"
                className="startupSupport__node"
              />

              <circle
                cx="145"
                cy="24"
                r="6"
                className="startupSupport__nodeDot"
              />

              <text
                x="145"
                y="7"
                textAnchor="middle"
                className="startupSupport__title"
              >
                IDEA
              </text>

              <text
                x="145"
                y="39"
                textAnchor="middle"
                className="startupSupport__description"
              >
                Problem &amp; concept
              </text>

            </g>

            {/* =================================================
                VALIDATE
            ================================================== */}

            <g className="startupSupport__stage">

              <circle
                cx="325"
                cy="129"
                r="20"
                className="startupSupport__node"
              />

              <circle
                cx="325"
                cy="129"
                r="6"
                className="startupSupport__nodeDot"
              />

              <text
                x="350"
                y="124"
                className="startupSupport__title startupSupport__title--right"
              >
                VALIDATE
              </text>

              <text
                x="350"
                y="141"
                className="startupSupport__description startupSupport__description--right"
              >
                Feasibility &amp; fit
              </text>

            </g>

            {/* =================================================
                BUILD
            ================================================== */}

            <g className="startupSupport__stage">

              <circle
                cx="145"
                cy="244"
                r="20"
                className="startupSupport__node"
              />

              <circle
                cx="145"
                cy="244"
                r="6"
                className="startupSupport__nodeDot"
              />

              <text
                x="120"
                y="239"
                textAnchor="end"
                className="startupSupport__title"
              >
                BUILD
              </text>

              <text
                x="120"
                y="256"
                textAnchor="end"
                className="startupSupport__description"
              >
                Prototype &amp; MVP
              </text>

            </g>

            {/* =================================================
                PROTECT
            ================================================== */}

            <g className="startupSupport__stage">

              <circle
                cx="325"
                cy="359"
                r="20"
                className="startupSupport__node"
              />

              <circle
                cx="325"
                cy="359"
                r="6"
                className="startupSupport__nodeDot"
              />

              <text
                x="350"
                y="354"
                className="startupSupport__title startupSupport__title--right"
              >
                PROTECT
              </text>

              <text
                x="350"
                y="371"
                className="startupSupport__description startupSupport__description--right"
              >
                IP &amp; patents
              </text>

            </g>

            {/* =================================================
                ESTABLISH
            ================================================== */}

            <g className="startupSupport__stage">

              <circle
                cx="145"
                cy="474"
                r="20"
                className="startupSupport__node"
              />

              <circle
                cx="145"
                cy="474"
                r="6"
                className="startupSupport__nodeDot"
              />

              <text
                x="120"
                y="469"
                textAnchor="end"
                className="startupSupport__title"
              >
                ESTABLISH
              </text>

              <text
                x="120"
                y="486"
                textAnchor="end"
                className="startupSupport__description"
              >
                Registration
              </text>

            </g>

            {/* =================================================
                GROW
            ================================================== */}

            <g className="startupSupport__stage">

              <circle
                cx="325"
                cy="574"
                r="20"
                className="startupSupport__node"
              />

              <circle
                cx="325"
                cy="574"
                r="6"
                className="startupSupport__nodeDot"
              />

              <text
                x="350"
                y="569"
                className="startupSupport__title startupSupport__title--right"
              >
                GROW
              </text>

              <text
                x="350"
                y="586"
                className="startupSupport__description startupSupport__description--right"
              >
                Ongoing support
              </text>

            </g>

            {/* =================================================
                VERTICAL TEXT
            ================================================== */}

            <text
              x="525"
              y="205"
              className="startupSupport__verticalText"
              transform="rotate(90 525 205)"
            >
              IDEA → STARTUP-READY
            </text>

          </svg>

        </div>
      </div>
    </section>
  );
};

export default StartupSupport;