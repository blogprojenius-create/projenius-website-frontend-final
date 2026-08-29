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

  const lastScrollYRef = useRef(0);
  const idleTimerRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    const clearIdleTimer = () => {
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const scheduleIdleHide = () => {
      clearIdleTimer();

      idleTimerRef.current = window.setTimeout(() => {
        if (window.scrollY > 70 && !menuOpen) {
          setShowHeader(false);
        }
      }, 1300);
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      lastScrollYRef.current = currentScrollY;

      setScrolled(currentScrollY > 24);

      if (menuOpen || currentScrollY < 50) {
        clearIdleTimer();
        setShowHeader(true);
        return;
      }

      if (delta > 6) {
        clearIdleTimer();
        setShowHeader(false);
      } else if (delta < -6) {
        setShowHeader(true);
        scheduleIdleHide();
      }
    };

    lastScrollYRef.current = window.scrollY;

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdleTimer();
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);

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
      className={`glass-header ${scrolled ? "scrolled" : ""
        } ${showHeader
          ? "header-visible"
          : "header-hidden"
        }`}
    >
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
                className={`glass-nav-item has-dropdown ${isActive(link) ? "active" : ""
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
                  onClick={() =>
                    setServicesOpen(
                      (open) => !open
                    )
                  }
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
                            className={`glass-dropdown-item ${location.pathname ===
                                item.to
                                ? "active"
                                : ""
                              }`}
                            onClick={() =>
                              setServicesOpen(false)
                            }
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
                className={`glass-nav-item ${isActive(link)
                    ? "active"
                    : ""
                  }`}
              >
                <Link
                  to={link.to}
                  className="glass-nav-link"
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
          onClick={() =>
            setMenuOpen(
              (open) => !open
            )
          }
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

      {/* MOBILE DRAWER */}
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
          >
            <nav aria-label="Mobile navigation">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="glass-mobile-group"
                  >
                    <button
                      className={`glass-mobile-link glass-mobile-toggle ${servicesOpen
                          ? "open"
                          : ""
                        }`}
                      type="button"
                      onClick={() =>
                        setServicesOpen(
                          (open) => !open
                        )
                      }
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
                                className={`glass-mobile-link sub ${location.pathname ===
                                    item.to
                                    ? "active"
                                    : ""
                                  }`}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setServicesOpen(false);
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
                    className={`glass-mobile-link ${isActive(link)
                        ? "active"
                        : ""
                      }`}
                    onClick={() =>
                      setMenuOpen(false)
                    }
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