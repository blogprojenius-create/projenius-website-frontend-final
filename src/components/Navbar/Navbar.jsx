import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

import "./Navbar.css";


/* =========================================================
   NAVIGATION
========================================================= */

const navLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
    dropdown: [
      {
        label: "Development",
        path: "/services/development",
      },
      {
        label: "Courses",
        path: "/courses",
      },
      {
        label: "Internship",
        path: "/services/internship",
      },
      {
        label: "Career Guidance",
        path: "/services/career-guidance",
      },
    ],
  },
  {
    label: "Workshop",
    path: "/workshop",
  },
  {
    label: "Startup Supporter",
    path: "/startup",
  },
  {
    label: "Join Our Team",
    path: "/join-our-team",
  },
  {
    label: "News & Insights",
    path: "/blog",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];


/* =========================================================
   SETTINGS
========================================================= */

const NAVBAR_DISPLAY_TIME = 3000;
const SCROLL_DISTANCE = 5;
const TOP_POSITION = 40;


/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {

  const location = useLocation();

  const hideTimer = useRef(null);
  const previousScroll = useRef(0);

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  /* =====================================================
     CLEAR TIMER
  ===================================================== */

  const clearNavbarTimer = () => {

    if (hideTimer.current) {

      clearTimeout(hideTimer.current);

      hideTimer.current = null;
    }
  };


  /* =====================================================
     SHOW NAVBAR
  ===================================================== */

  const showNavbar = () => {

    clearNavbarTimer();

    setIsVisible(true);


    /*
     * Keep navbar visible when
     * user is at the top.
     */
    if (window.scrollY <= TOP_POSITION) {
      return;
    }


    /*
     * Hide after 3 seconds.
     */
    hideTimer.current = setTimeout(() => {

      if (!mobileOpen) {
        setIsVisible(false);
      }

    }, NAVBAR_DISPLAY_TIME);
  };


  /* =====================================================
     SCROLL
  ===================================================== */

  useEffect(() => {

    const handleScroll = () => {

      const currentScroll =
        window.scrollY;


      setIsScrolled(
        currentScroll > 20
      );


      /*
       * Always show at top.
       */
      if (
        currentScroll <= TOP_POSITION
      ) {

        clearNavbarTimer();

        setIsVisible(true);

        previousScroll.current =
          currentScroll;

        return;
      }


      /*
       * Don't hide when
       * mobile menu is open.
       */
      if (mobileOpen) {

        clearNavbarTimer();

        setIsVisible(true);

        previousScroll.current =
          currentScroll;

        return;
      }


      const distance =
        Math.abs(
          currentScroll -
          previousScroll.current
        );


      /*
       * Ignore tiny scroll movements.
       */
      if (
        distance >=
        SCROLL_DISTANCE
      ) {

        showNavbar();
      }


      previousScroll.current =
        currentScroll;
    };


    previousScroll.current =
      window.scrollY;


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      clearNavbarTimer();
    };

  }, [mobileOpen]);


  /* =====================================================
     PAGE CHANGE
  ===================================================== */

  useEffect(() => {

    /*
     * Close menus.
     */
    setServicesOpen(false);
    setMobileOpen(false);


    /*
     * Show navbar.
     */
    clearNavbarTimer();

    setIsVisible(true);


    /*
     * Every page starts from top.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });


    /*
     * Hide after 3 seconds
     * if page is not at top.
     */
    hideTimer.current = setTimeout(() => {

      if (
        window.scrollY >
        TOP_POSITION
      ) {

        setIsVisible(false);
      }

    }, NAVBAR_DISPLAY_TIME);


    return () => {
      clearNavbarTimer();
    };

  }, [location.pathname]);


  /* =====================================================
     BODY LOCK
  ===================================================== */

  useEffect(() => {

    if (mobileOpen) {

      document.body.classList.add(
        "nav-open"
      );

    } else {

      document.body.classList.remove(
        "nav-open"
      );
    }


    return () => {

      document.body.classList.remove(
        "nav-open"
      );

    };

  }, [mobileOpen]);


  /* =====================================================
     ACTIVE ROUTE
  ===================================================== */

  const isActive = (link) => {

    if (link.dropdown) {

      return (
        location.pathname === link.path ||
        link.dropdown.some(
          (item) =>
            location.pathname ===
            item.path
        )
      );
    }


    return (
      location.pathname ===
      link.path
    );
  };


  /* =====================================================
     NAVBAR INTERACTION
  ===================================================== */

  const handleInteraction = () => {

    showNavbar();
  };


  /* =====================================================
     MOBILE TOGGLE
  ===================================================== */

  const toggleMobileMenu = () => {

    clearNavbarTimer();

    setIsVisible(true);

    setMobileOpen(
      (previous) =>
        !previous
    );
  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <header
      className={`
                glass-header
                ${isScrolled ? "scrolled" : ""}
                ${isVisible
          ? "header-visible"
          : "header-hidden"
        }
            `}
      onMouseMove={handleInteraction}
    >

      {/* =================================================
                NAVBAR INNER
            ================================================= */}

      <div className="glass-navbar-inner">


        {/* =================================================
                    LOGO
                ================================================= */}

        <Link
          to="/"
          className="glass-logo"
          aria-label="ProJenius Home"
          onClick={() => {

            clearNavbarTimer();

            setServicesOpen(false);
            setMobileOpen(false);
            setIsVisible(true);
          }}
        >

          <span className="glass-logo-mark">

            <img
              src="/images/pj_logo.jpeg"
              alt="ProJenius"
              className="logo-icon-crop"
            />

          </span>


          <span className="logo-pro">
            Pro
          </span>


          <span className="logo-jenius">
            Jenius
          </span>

        </Link>


        {/* =================================================
                    DESKTOP NAVIGATION
                ================================================= */}

        <nav
          className="glass-nav-links"
          aria-label="Main Navigation"
        >

          {navLinks.map((link) => {

            /*
             * SERVICES
             */
            if (link.dropdown) {

              return (

                <div
                  key={link.label}
                  className={`
                                        glass-nav-item
                                        has-dropdown
                                        ${isActive(link)
                      ? "active"
                      : ""
                    }
                                    `}
                  onMouseEnter={() =>
                    setServicesOpen(true)
                  }
                  onMouseLeave={() =>
                    setServicesOpen(false)
                  }
                >

                  <button
                    type="button"
                    className="
                                            glass-nav-link
                                            glass-nav-button
                                        "
                    onClick={() => {

                      setServicesOpen(
                        (previous) =>
                          !previous
                      );

                      showNavbar();
                    }}
                    aria-expanded={
                      servicesOpen
                    }
                  >

                    <span>
                      {link.label}
                    </span>

                    <ChevronDown
                      size={15}
                      className={
                        servicesOpen
                          ? "rotate"
                          : ""
                      }
                    />

                  </button>


                  {/* =============================
                                        SERVICES DROPDOWN
                                    ============================= */}

                  {servicesOpen && (

                    <div
                      className="
                                                glass-dropdown
                                            "
                      onMouseEnter={() =>
                        setServicesOpen(
                          true
                        )
                      }
                      onMouseLeave={() =>
                        setServicesOpen(
                          false
                        )
                      }
                    >

                      {link.dropdown.map(
                        (item) => (

                          <Link
                            key={
                              item.path
                            }
                            to={
                              item.path
                            }
                            className={`
                                                            glass-dropdown-item
                                                            ${location.pathname ===
                                item.path
                                ? "active"
                                : ""
                              }
                                                        `}
                            onClick={() => {

                              setServicesOpen(
                                false
                              );

                              clearNavbarTimer();

                              setIsVisible(
                                true
                              );
                            }}
                          >

                            {
                              item.label
                            }

                          </Link>

                        )
                      )}

                    </div>

                  )}

                </div>

              );
            }


            /*
             * NORMAL NAVIGATION ITEM
             */
            return (

              <div
                key={link.path}
                className={`
                                    glass-nav-item
                                    ${isActive(link)
                    ? "active"
                    : ""
                  }
                                `}
              >

                <Link
                  to={link.path}
                  className="glass-nav-link"
                  onClick={() => {

                    clearNavbarTimer();

                    setServicesOpen(
                      false
                    );

                    setMobileOpen(
                      false
                    );

                    setIsVisible(
                      true
                    );
                  }}
                >

                  {link.label}

                </Link>

              </div>

            );

          })}

        </nav>


        {/* =================================================
                    MOBILE MENU BUTTON
                ================================================= */}

        <button
          type="button"
          className="glass-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >

          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}

        </button>

      </div>


      {/* =================================================
                MOBILE NAVIGATION
            ================================================= */}

      {mobileOpen && (

        <div
          className="
                        glass-mobile-drawer
                    "
        >

          <nav
            aria-label="Mobile Navigation"
          >

            {navLinks.map((link) => {

              /*
               * MOBILE SERVICES
               */
              if (link.dropdown) {

                return (

                  <div
                    key={link.label}
                    className="glass-mobile-group"
                  >

                    <button
                      type="button"
                      className={`glass-mobile-link
                                  glass-mobile-toggle
                                  ${servicesOpen
                          ? "open"
                          : ""
                        }  `}
                      onClick={() => {

                        clearNavbarTimer();

                        setIsVisible(
                          true
                        );

                        setServicesOpen(
                          (previous) =>
                            !previous
                        );
                      }}
                    >

                      <span>
                        {
                          link.label
                        }
                      </span>

                      <ChevronDown
                        size={16}
                      />

                    </button>


                    {servicesOpen && (

                      <div
                        className="
                                                    glass-mobile-sub
                                                "
                      >

                        {link.dropdown.map(
                          (item) => (

                            <Link
                              key={
                                item.path
                              }
                              to={
                                item.path
                              }
                              className={`
                                                                glass-mobile-link
                                                                sub
                                                                ${location.pathname ===
                                  item.path
                                  ? "active"
                                  : ""
                                }
                                                            `}
                              onClick={() => {

                                setServicesOpen(
                                  false
                                );

                                setMobileOpen(
                                  false
                                );

                                clearNavbarTimer();

                                setIsVisible(
                                  true
                                );
                              }}
                            >

                              {
                                item.label
                              }

                            </Link>

                          )
                        )}

                      </div>

                    )}

                  </div>

                );
              }


              /*
               * MOBILE NORMAL LINK
               */
              return (

                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                                        glass-mobile-link
                                        ${isActive(link)
                      ? "active"
                      : ""
                    }
                                    `}
                  onClick={() => {

                    setMobileOpen(
                      false
                    );

                    setServicesOpen(
                      false
                    );

                    clearNavbarTimer();

                    setIsVisible(
                      true
                    );
                  }}
                >

                  {link.label}

                </Link>

              );

            })}

          </nav>

        </div>

      )}

    </header>

  );
}