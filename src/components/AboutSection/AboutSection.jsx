import React, {
    useEffect,
    useRef,
    useState
} from "react";

import "./AboutSection.css";


/* =========================================================
   ANIMATED NUMBER
   ONLY THIS ELEMENT ANIMATES
   ========================================================= */

function AnimatedNumber({
    end,
    suffix = "",
    start,
    cycle
}) {
    const [count, setCount] = useState(0);

    const animationRef =
        useRef(null);


    useEffect(() => {

        if (!start) {
            setCount(0);
            return;
        }

        let startTime = null;

        const duration = 1600;


        const animate = (currentTime) => {

            if (!startTime) {
                startTime = currentTime;
            }


            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    eased * end
                );


            setCount(value);


            if (progress < 1) {

                animationRef.current =
                    requestAnimationFrame(
                        animate
                    );

            } else {

                setCount(end);

            }
        };


        animationRef.current =
            requestAnimationFrame(
                animate
            );


        return () => {

            if (
                animationRef.current
            ) {
                cancelAnimationFrame(
                    animationRef.current
                );
            }

        };

    }, [
        end,
        start,
        cycle
    ]);


    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}


/* =========================================================
   ABOUT SECTION
   ========================================================= */

export default function AboutSection() {

    const sectionRef =
        useRef(null);


    const [visible, setVisible] =
        useState(false);


    /*
       This value ONLY restarts
       AnimatedNumber.

       IMPORTANT:
       It is NOT used as a key
       anywhere in the JSX.
    */
    const [counterCycle, setCounterCycle] =
        useState(0);


    /* =====================================================
       SECTION VISIBILITY
       ===================================================== */

    useEffect(() => {

        const section =
            sectionRef.current;


        if (!section) {
            return;
        }


        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    setVisible(
                        entry.isIntersecting
                    );

                },
                {
                    threshold: 0.20
                }
            );


        observer.observe(section);


        return () => {
            observer.disconnect();
        };

    }, []);


    /* =====================================================
       NUMBER RESTART EVERY 5 SECONDS
       ===================================================== */

    useEffect(() => {

        if (!visible) {
            return;
        }


        const interval =
            setInterval(() => {

                setCounterCycle(
                    previous =>
                        previous + 1
                );

            }, 5000);


        return () => {
            clearInterval(interval);
        };

    }, [visible]);


    return (

        <section
            ref={sectionRef}
            className={
                `about-section ${
                    visible
                        ? "about-visible"
                        : ""
                }`
            }
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="about-header">

                <div className="about-tag">

                    <span className="about-tag-dot"></span>

                    <span>
                        WHO WE ARE
                    </span>

                </div>


                <h2 className="about-title">

                    Innovating Ideas Into{" "}

                    <span>
                        Smart 
                        <br />Solutions
                    </span>

                </h2>


                <div className="about-title-line">
                    <span></span>
                </div>


                <p className="about-description">
                    We blend technology, creativity, and deep industry expertise to build products that drive real business impact.
                </p>

            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="about-content">


                {/* =================================================
                    LEFT
                ================================================= */}

                <div className="about-left">

                    <div className="about-image-wrapper">


                        {/* MAIN IMAGE */}

                        <div className="about-main-image">

                            <img
                                src="/images/about-main-image.png"
                                alt="Team working on innovation"
                            />

                        </div>


                        {/* SECOND IMAGE */}

                        <div className="about-small-image">

                            <img
                                src="/images/software-developement-training.png"
                                alt="Software development training session"
                            />

                        </div>


                        {/* =================================================
                            STATS BOX

                            NO key HERE.

                            Therefore the box remains
                            mounted and fixed.

                            ONLY AnimatedNumber gets
                            the cycle value.
                        ================================================= */}

                        <div className="about-stats">


                            {/* STAT 1 */}

                            <div className="about-stat">

                                <div className="about-stat-number">

                                    <AnimatedNumber
                                        end={2062}
                                        suffix="+"
                                        start={visible}
                                        cycle={counterCycle}
                                    />

                                </div>

                                <div className="about-stat-label">
                                    SATISFIED CLIENTS
                                </div>

                            </div>


                            {/* STAT 2 */}

                            <div className="about-stat">

                                <div className="about-stat-number">

                                    <AnimatedNumber
                                        end={141}
                                        suffix="+"
                                        start={visible}
                                        cycle={counterCycle}
                                    />

                                </div>

                                <div className="about-stat-label">
                                    PROJECTS DELIVERED
                                </div>

                            </div>


                            {/* STAT 3 */}

                            <div className="about-stat">

                                <div className="about-stat-number">

                                    <AnimatedNumber
                                        end={5}
                                        suffix="+"
                                        start={visible}
                                        cycle={counterCycle}
                                    />

                                </div>

                                <div className="about-stat-label">
                                    YEARS OF EXCELLENCE
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT
                ================================================= */}

                <div className="about-right">


                    {/* VIDEO */}

                    <div className="about-video-wrapper">

                        <iframe
                            src="https://www.youtube.com/embed/1adzVmNh078"
                            title="Projenius Introduction"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                    </div>


                    {/* FEATURE CARDS */}

                    <div className="about-features">


                        {/* CARD 1 */}

                        <div className="about-feature-card">

                            <div className="about-feature-icon">
                                &lt;/&gt;
                            </div>

                            <div className="about-feature-content">

                                <h3>
                                    Software &amp; AI Solutions
                                </h3>

                                <p>
                                    Custom platforms powered by AI
                                </p>

                            </div>

                        </div>


                        {/* CARD 2 */}

                        <div className="about-feature-card">

                            <div className="about-feature-icon">
                                ♙
                            </div>

                            <div className="about-feature-content">

                                <h3>
                                    Smart IoT Products
                                </h3>

                                <p>
                                    Connected devices that scale
                                </p>

                            </div>

                        </div>


                        {/* CARD 3 */}

                        <div className="about-feature-card">

                            <div className="about-feature-icon">
                                ◈
                            </div>

                            <div className="about-feature-content">

                                <h3>
                                    Training &amp; Mentorship
                                </h3>

                                <p>
                                    Hands-on workshops for teams
                                </p>

                            </div>

                        </div>


                        {/* CARD 4 */}

                        <div className="about-feature-card">

                            <div className="about-feature-icon">
                                ↗
                            </div>

                            <div className="about-feature-content">

                                <h3>
                                    Real-World Impact
                                </h3>

                                <p>
                                    Technology that solves problems
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}