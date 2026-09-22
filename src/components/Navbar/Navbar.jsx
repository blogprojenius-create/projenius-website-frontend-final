import { useCallback, useEffect, useRef, useState } from "react";
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

/*
 * Navbar remains visible for 2 seconds after scrolling stops.
 */
const NAVBAR_DISPLAY_TIME = 2000;

/*
 * Consider the page "at the top" until this amount.
 */
const TOP_POSITION = 40;

/*
 * Small scroll difference to avoid unnecessary updates.
 */
const SCROLL_DISTANCE = 2;

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const location = useLocation();

  const hideTimer = useRef(null);
  const scrollFrame = useRef(null);
  const previousScroll = useRef(0);
  const mobileOpenRef = useRef(false);

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =======================================================
     KEEP MOBILE STATE IN REF
  ======================================================= */

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  /* =======================================================
     CLEAR HIDE TIMER
  ======================================================= */

  const clearNavbarTimer = useCallback(() => {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  /* =======================================================
     SHOW NAVBAR
     
     Called ONLY from scrolling / direct navbar actions.
  ======================================================= */

  const showNavbar = useCallback(() => {
    clearNavbarTimer();

    setIsVisible(true);

    const scrollY = window.scrollY;

    /*
     * At the top:
     * keep navbar permanently visible.
     */
    if (
      scrollY <= TOP_POSITION ||
      mobileOpenRef.current
    ) {
      return;
    }

    /*
     * Start a fresh 2-second countdown.
     */
    hideTimer.current = window.setTimeout(() => {
      if (
        !mobileOpenRef.current &&
        window.scrollY > TOP_POSITION
      ) {
        setIsVisible(false);
      }
    }, NAVBAR_DISPLAY_TIME);
  }, [clearNavbarTimer]);

  /* =======================================================
     SCROLL HANDLER
========================================================= */

  useEffect(() => {
    let lastScroll = window.scrollY;

    previousScroll.current = lastScroll;

    const processScroll = () => {
      scrollFrame.current = null;

      const currentScroll = window.scrollY;

      setIsScrolled(currentScroll > 20);

      /*
       * Always visible near the top.
       */
      if (currentScroll <= TOP_POSITION) {
        clearNavbarTimer();
        setIsVisible(true);

        previousScroll.current = currentScroll;
        lastScroll = currentScroll;

        return;
      }

      /*
       * Keep navbar visible while mobile menu is open.
       */
      if (mobileOpenRef.current) {
        clearNavbarTimer();
        setIsVisible(true);

        previousScroll.current = currentScroll;
        lastScroll = currentScroll;

        return;
      }

      /*
       * Detect meaningful movement.
       */
      const distance = Math.abs(
        currentScroll - lastScroll
      );

      if (distance >= SCROLL_DISTANCE) {
        showNavbar();
        lastScroll = currentScroll;
      }

      previousScroll.current = currentScroll;
    };

    const handleScroll = () => {
      if (scrollFrame.current !== null) {
        return;
      }

      scrollFrame.current =
        window.requestAnimationFrame(
          processScroll
        );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    /*
     * Initial state.
     */
    processScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      clearNavbarTimer();

      if (
        scrollFrame.current !== null
      ) {
        window.cancelAnimationFrame(
          scrollFrame.current
        );

        scrollFrame.current = null;
      }
    };
  }, [
    clearNavbarTimer,
    showNavbar,
  ]);

  /* =======================================================
     PAGE CHANGE
======================================================= */

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);

    mobileOpenRef.current = false;

    clearNavbarTimer();
    setIsVisible(true);

    /*
     * Preserve your existing page-reset behavior.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    /*
     * At the top, keep navbar visible.
     * If the smooth scroll ends below the top,
     * normal scroll logic handles the 2-second timer.
     */
    return () => {
      clearNavbarTimer();
    };
  }, [
    location.pathname,
    clearNavbarTimer,
  ]);

  /* =======================================================
     BODY LOCK
======================================================= */

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

  /* =======================================================
     ACTIVE ROUTE
======================================================= */

  const isActive = useCallback(
    (link) => {
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
    },
    [location.pathname]
  );

  /* =======================================================
     MOBILE TOGGLE
======================================================= */

  const toggleMobileMenu = () => {
    clearNavbarTimer();

    setIsVisible(true);

    setMobileOpen(
      (previous) => !previous
    );
  };

  /* =======================================================
     RENDER
======================================================= */

  return (
    <header
      className={`
        glass-header
        ${isScrolled ? "scrolled" : ""}
        ${
          isVisible
            ? "header-visible"
            : "header-hidden"
        }
      `}
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

            mobileOpenRef.current = false;

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

            /* ===============================================
               SERVICES
            =============================================== */

            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className={`
                    glass-nav-item
                    has-dropdown
                    ${
                      isActive(link)
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
                            key={item.path}
                            to={item.path}
                            className={`
                              glass-dropdown-item
                              ${
                                location.pathname ===
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
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            }

            /* ===============================================
               NORMAL NAVIGATION ITEM
            =============================================== */

            return (
              <div
                key={link.path}
                className={`
                  glass-nav-item
                  ${
                    isActive(link)
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

                    mobileOpenRef.current =
                      false;

                    setIsVisible(true);
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
        <div className="glass-mobile-drawer">
          <nav
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => {

              /* =============================================
                 MOBILE SERVICES
              ============================================= */

              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="glass-mobile-group"
                  >
                    <button
                      type="button"
                      className={`
                        glass-mobile-link
                        glass-mobile-toggle
                        ${
                          servicesOpen
                            ? "open"
                            : ""
                        }
                      `}
                      onClick={() => {
                        clearNavbarTimer();

                        setIsVisible(true);

                        setServicesOpen(
                          (previous) =>
                            !previous
                        );
                      }}
                    >
                      <span>
                        {link.label}
                      </span>

                      <ChevronDown
                        size={16}
                      />
                    </button>

                    {servicesOpen && (
                      <div className="glass-mobile-sub">
                        {link.dropdown.map(
                          (item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`
                                glass-mobile-link
                                sub
                                ${
                                  location.pathname ===
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

                                mobileOpenRef.current =
                                  false;

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

              /* =============================================
                 MOBILE NORMAL LINK
              ============================================= */

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    glass-mobile-link
                    ${
                      isActive(link)
                        ? "active"
                        : ""
                    }
                  `}
                  onClick={() => {
                    setMobileOpen(
                      false
                    );

                    mobileOpenRef.current =
                      false;

                    setServicesOpen(
                      false
                    );

                    clearNavbarTimer();

                    setIsVisible(true);
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