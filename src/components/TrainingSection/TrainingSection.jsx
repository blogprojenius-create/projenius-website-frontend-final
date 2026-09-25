import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./TrainingSection.css";

import AOS from "aos";
import "aos/dist/aos.css";

import workshop1 from "../../assets/images/iot-workshop.png"
import gallery1 from "../../assets/images/gallery-1.webp"

export default function TrainingSection() {
  const [imgIndex1, setImgIndex1] = useState(0);
  const [imgIndex2, setImgIndex2] = useState(0);
  const [imgIndex3, setImgIndex3] = useState(0);
  const [imgIndex4, setImgIndex4] = useState(0);

  /* =========================================================
     IMAGE POOLS
  ========================================================= */

  const imgPool1 = [
    {workshop1},
    {gallery1},
    "/images/gallery-2.webp",
  ];

  const imgPool2 = [
    "/images/software-developement-training.png",
    "/images/gallery-3.webp",
    "/images/gallery-4.webp",
  ];

  const imgPool3 = [
    "/images/software-developement-training.png",
    "/images/iot-course.webp",
    "/images/gallery-5.webp",
  ];

  const imgPool4 = [
    "/images/iot-workshop.png",
    "/images/project-image-1.webp",
    "/images/gallery-6.webp",
  ];

  /* =========================================================
     AOS + IMAGE AUTO ROTATION
  ========================================================= */

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });

    const timers = [];

    /* FIRST IMAGE */
    timers.push(
      setInterval(() => {
        setImgIndex1((prev) => prev + 1);
      }, 6000)
    );

    /* SECOND IMAGE */
    const timeout1 = setTimeout(() => {
      timers.push(
        setInterval(() => {
          setImgIndex2((prev) => prev + 1);
        }, 6000)
      );
    }, 1500);

    /* THIRD IMAGE */
    const timeout2 = setTimeout(() => {
      timers.push(
        setInterval(() => {
          setImgIndex3((prev) => prev + 1);
        }, 6000)
      );
    }, 3000);

    /* FOURTH IMAGE */
    const timeout3 = setTimeout(() => {
      timers.push(
        setInterval(() => {
          setImgIndex4((prev) => prev + 1);
        }, 6000)
      );
    }, 4500);

    return () => {
      timers.forEach(clearInterval);

      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <section className="training-section">
      <div className="container">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="training-heading">

          {/* BADGE */}

          <span
            className="training-sub-heading"
            id="sub-heading"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <span className="training-sub-dot"></span>
            Our Training Program
          </span>


          {/* MAIN TITLE */}

          <h2
            className="train-section-title"
            id="title"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Industry-Focused{" "}
            <span className="training-title-accent">
              Training &amp; Workshops
            </span>
          </h2>

        </div>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="main">

          <div className="row">


            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-delay="200"
            >

              {/* ================================
                  CAREER GUIDANCE
              ================================= */}

              <Link
                to="/career-guidance"
                className="training-link"
              >

                <div className="training-card big-card">

                  <AnimatePresence mode="wait">

                    <motion.img
                      key={imgIndex1}
                      src={
                        imgPool1[
                        imgIndex1 % imgPool1.length
                        ]
                      }
                      alt="Career Guidance"
                      initial={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />

                  </AnimatePresence>


                  <div className="training-image-overlay"></div>


                  <div className="training-content">

                    <span>
                      Future Ready
                    </span>

                    <h4>
                      Career Guidance
                    </h4>

                  </div>

                </div>

              </Link>


              {/* ================================
                  MENTORING
              ================================= */}

              <Link
                to="/services"
                className="training-link"
              >

                <div
                  className="training-card small-card"
                  data-aos="zoom-in"
                  data-aos-delay="350"
                >

                  <AnimatePresence mode="wait">

                    <motion.img
                      key={imgIndex2}
                      src={
                        imgPool2[
                        imgIndex2 % imgPool2.length
                        ]
                      }
                      alt="Mentoring Program"
                      initial={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />

                  </AnimatePresence>


                  <div className="training-image-overlay"></div>


                  <div className="training-content">

                    <span>
                      Skill Growth
                    </span>

                    <h4>
                      Mentoring Program
                    </h4>

                  </div>

                </div>

              </Link>

            </div>


            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div
              className="col-lg-6 right-column"
              data-aos="fade-left"
              data-aos-delay="250"
            >

              {/* ================================
                  IOT WORKSHOP
              ================================= */}

              <Link
                to="/workshop"
                className="training-link"
              >

                <div
                  className="training-card small-card"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >

                  <AnimatePresence mode="wait">

                    <motion.img
                      key={imgIndex3}
                      src={
                        imgPool3[
                        imgIndex3 % imgPool3.length
                        ]
                      }
                      alt="IoT Workshop"
                      initial={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />

                  </AnimatePresence>


                  <div className="training-image-overlay"></div>


                  <div className="training-content">

                    <span>
                      Smart Innovation
                    </span>

                    <h4>
                      IoT Workshop
                    </h4>

                  </div>

                </div>

              </Link>


              {/* ================================
                  PROGRAMMING WORKSHOP
              ================================= */}

              <Link
                to="/workshop"
                className="training-link"
              >

                <div
                  className="training-card big-card"
                  data-aos="flip-left"
                  data-aos-delay="450"
                >

                  <AnimatePresence mode="wait">

                    <motion.img
                      key={imgIndex4}
                      src={
                        imgPool4[
                        imgIndex4 % imgPool4.length
                        ]
                      }
                      alt="Programming Workshop"
                      initial={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />

                  </AnimatePresence>


                  <div className="training-image-overlay"></div>


                  <div className="training-content">

                    <span>
                      Coding Skills
                    </span>

                    <h4>
                      Programming Workshop
                    </h4>

                  </div>

                </div>

              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}