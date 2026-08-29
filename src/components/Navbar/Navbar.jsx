import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },

  {
    label: "Services",
    to: "/services",
    dropdown: [
      { to: "/services", label: "Development" },
      { to: "/courses", label: "Courses" },
      { to: "/internship", label: "Internship" },
      { to: "/career-guidance", label: "Career Guidance" },
    ],
  },

  { to: "/workshop", label: "Workshop" },
  { to: "/startup", label: "Startup Supporter" },
  { to: "/join-our-team", label: "Join Our Team" },
  { to: "/blog", label: "News & Insights" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const location = useLocation();

  const hideTimerRef = useRef(null);
  const lastScrollYRef = useRef(0);

  /* =========================================================
     CLEAR HIDE TIMER
  ========================================================= */

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  /* =========================================================
     SHOW NAVBAR FOR 5 SECONDS
  ========================================================= */

  const showNavbarForFiveSeconds = () => {
    clearHideTimer();

    setShowHeader(true);

    hideTimerRef.current = window.setTimeout(() => {
      if (!menuOpen) {
        setShowHeader(false);
      }
    }, 5000);
  };

  /* =========================================================
     SCROLL HANDLER
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 24);

      /* Always visible near top */
      if (currentScrollY < 40) {
        clearHideTimer();
        setShowHeader(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      /* Don't hide while mobile menu is open */
      if (menuOpen) {
        clearHideTimer();
        setShowHeader(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const difference =
        currentScrollY - lastScrollYRef.current;

      /* Only react to meaningful movement */
      if (Math.abs(difference) > 5) {
        showNavbarForFiveSeconds();
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearHideTimer();
    };
  }, [menuOpen]);

  /* =========================================================
     ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);

    clearHideTimer();
    setShowHeader(true);

    /* Keep navbar visible briefly after navigation */
    hideTimerRef.current = window.setTimeout(() => {
      if (window.scrollY > 40) {
        setShowHeader(false);
      }
    }, 5000);

    return () => {
      clearHideTimer();
    };
  }, [location.pathname]);

  /* =========================================================
     BODY LOCK
  ========================================================= */

  useEffect(() => {
    document.body.classList.toggle(
      "nav-open",
      menuOpen
    );

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);

  /* =========================================================
     NAVBAR CLICK
     Keeps navbar visible for 5 seconds
  ========================================================= */

  const handleNavbarInteraction = () => {
    showNavbarForFiveSeconds();
  };

  /* =========================================================
     ACTIVE LINK
  ========================================================= */

  const isActive = (link) => {
    if (link.dropdown) {
      return (
        link.to === location.pathname ||
        link.dropdown.some(
          (item) => item.to === location.pathname
        )
      );
    }

    return link.to === location.pathname;
  };

  return (
    <header
      className={`glass-header ${
        scrolled ? "scrolled" : ""
      } ${
        showHeader
          ? "header-visible"
          : "header-hidden"
      }`}
      onClick={handleNavbarInteraction}
    >

      {/* =====================================================
          DESKTOP / MAIN NAVBAR
      ===================================================== */}

      <div className="glass-navbar-inner">

        {/* LOGO */}

        <Link
          to="/"
          className="glass-logo"
          aria-label="ProJenius Home"
        >
          <span
            className="glass-logo-mark"
            aria-hidden="true"
          >
            <img
              src="/images/pj-logo.jpeg"
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


        {/* DESKTOP NAVIGATION */}

        <nav
          className="glass-nav-links"
          aria-label="Main navigation"
        >
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className={`glass-nav-item has-dropdown ${
                  isActive(link)
                    ? "active"
                    : ""
                }`}
                onMouseEnter={() =>
                  setServicesOpen(true)
                }
                onMouseLeave={() =>
                  setServicesOpen(false)
                }
                onFocus={() =>
                  setServicesOpen(true)
                }
              >
                <button
                  type="button"
                  className="glass-nav-link glass-nav-button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setServicesOpen(
                      (open) => !open
                    );

                    showNavbarForFiveSeconds();
                  }}
                  aria-expanded={servicesOpen}
                >
                  {link.label}

                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="glass-dropdown"
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      {link.dropdown.map(
                        (item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`glass-dropdown-item ${
                              location.pathname ===
                              item.to
                                ? "active"
                                : ""
                            }`}
                            onClick={() => {
                              setServicesOpen(false);
                              clearHideTimer();
                              setShowHeader(true);
                            }}
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div
                key={link.to}
                className={`glass-nav-item ${
                  isActive(link)
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  to={link.to}
                  className="glass-nav-link"
                  onClick={() => {
                    clearHideTimer();
                    setShowHeader(true);
                  }}
                >
                  {link.label}
                </Link>
              </div>
            )
          )}
        </nav>


        {/* MOBILE MENU BUTTON */}

        <button
          className="glass-hamburger"
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            clearHideTimer();
            setShowHeader(true);

            setMenuOpen(
              (open) => !open
            );
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>


      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="glass-mobile-drawer"
            initial={{
              opacity: 0,
              y: -14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -14,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <nav aria-label="Mobile navigation">

              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="glass-mobile-group"
                  >
                    <button
                      className={`glass-mobile-link glass-mobile-toggle ${
                        servicesOpen
                          ? "open"
                          : ""
                      }`}
                      type="button"
                      onClick={() => {
                        clearHideTimer();
                        setShowHeader(true);

                        setServicesOpen(
                          (open) => !open
                        );
                      }}
                      aria-expanded={
                        servicesOpen
                      }
                    >
                      {link.label}

                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence
                      initial={false}
                    >
                      {servicesOpen && (
                        <motion.div
                          className="glass-mobile-sub"
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut",
                          }}
                        >
                          {link.dropdown.map(
                            (item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                className={`glass-mobile-link sub ${
                                  location.pathname ===
                                  item.to
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => {
                                  setMenuOpen(
                                    false
                                  );

                                  setServicesOpen(
                                    false
                                  );

                                  clearHideTimer();
                                  setShowHeader(true);
                                }}
                              >
                                {item.label}
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`glass-mobile-link ${
                      isActive(link)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      setMenuOpen(false);
                      clearHideTimer();
                      setShowHeader(true);
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}

            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}