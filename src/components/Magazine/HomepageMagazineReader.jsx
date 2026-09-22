import { useCallback, useEffect, useRef, useState } from "react";
import "./HomepageMagazineReader.css";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, DownloadIcon } from "./HomepageMagazineIcons";
import {
  MAGAZINE_DOWNLOAD_URL,
  MAGAZINE_TITLE,
  MAGAZINE_TOTAL_PAGES,
  getMagazinePageAlt,
  getMagazinePageSrc,
  magazinePageReady,
} from "./HomepageMagazineConfig";

const OUT_MS = 130; // keep in sync with HomepageMagazineReader.css
const IN_MS = 240;
const pad = (n) => String(n).padStart(2, "0");

/* Touch swipe helper (mouse is ignored so desktop clicks are unaffected).
   onSwipe(1) = next page, onSwipe(-1) = previous page. */
const useSwipe = (onSwipe) => {
  const startRef = useRef(null);
  const swipedRef = useRef(false);

  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "mouse") return;
    startRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(
    (e) => {
      const start = startRef.current;
      startRef.current = null;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swipedRef.current = true;
        onSwipe(dx < 0 ? 1 : -1);
        setTimeout(() => {
          swipedRef.current = false;
        }, 350);
      }
    },
    [onSwipe]
  );

  const onPointerCancel = useCallback(() => {
    startRef.current = null;
  }, []);

  return {
    handlers: { onPointerDown, onPointerUp, onPointerCancel },
    wasSwipe: () => swipedRef.current,
  };
};

/* Full-screen digital-publication reader (native <dialog>).
   - focus is trapped inside while open, Esc closes it
   - ← / → change page, Home / End jump to first / last page
   - swipe left/right on touch devices
   - the page slider lets you jump anywhere */
const HomepageMagazineReader = ({ open, page, onClose, onStep, onGoTo }) => {
  const total = MAGAZINE_TOTAL_PAGES;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const mainRef = useRef(null);

  const [shown, setShown] = useState(page);
  const [phase, setPhase] = useState("idle"); // idle | out | in
  const [dir, setDir] = useState("next");
  const shownRef = useRef(page);

  const { handlers } = useSwipe(onStep);

  /* open / close the native dialog */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.classList.add("hpmag-scroll-lock");
      if (closeRef.current) closeRef.current.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) document.body.classList.remove("hpmag-scroll-lock");
  }, [open]);

  useEffect(
    () => () => document.body.classList.remove("hpmag-scroll-lock"),
    []
  );

  /* slide + fade between pages (instant while closed) */
  useEffect(() => {
    if (!open) {
      shownRef.current = page;
      setShown(page);
      setPhase("idle");
      return undefined;
    }
    if (shownRef.current === page) {
      setPhase("idle");
      return undefined;
    }

    let cancelled = false;
    const timers = [];
    setDir(page > shownRef.current ? "next" : "prev");
    setPhase("out");

    timers.push(
      setTimeout(async () => {
        await magazinePageReady(page);
        if (cancelled) return;
        shownRef.current = page;
        setShown(page);
        setPhase("in");
        magazinePageReady(page + 1);
        magazinePageReady(page - 1);
        timers.push(setTimeout(() => setPhase("idle"), IN_MS));
      }, OUT_MS)
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [page, open]);

  const handleClosed = () => {
    document.body.classList.remove("hpmag-scroll-lock");
    onClose(); // fires for Esc, the close button and backdrop clicks
  };

  const handleKeyDown = (e) => {
    if (e.target instanceof HTMLInputElement) return; // the slider handles its own arrows
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onStep(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onStep(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      onGoTo(1);
    } else if (e.key === "End") {
      e.preventDefault();
      onGoTo(total);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current || e.target === mainRef.current) onClose();
  };

  const imgClass =
    "hpmag-reader__img" +
    (phase === "out" ? ` hpmag-reader__img--out-${dir}` : "") +
    (phase === "in" ? ` hpmag-reader__img--in-${dir}` : "");

  return (
    <dialog
      ref={dialogRef}
      className="hpmag-reader"
      aria-labelledby="hpmag-reader-title"
      onClose={handleClosed}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      {open && (
        <div className="hpmag-reader__shell">
          <header className="hpmag-reader__top">
            <div className="hpmag-reader__titles">
              <p className="hpmag-reader__name" id="hpmag-reader-title">
                {MAGAZINE_TITLE}
              </p>
              <p className="hpmag-reader__sub">
                Page {page} of {total}
              </p>
            </div>

            <div className="hpmag-reader__tools">
              <a
                className="hpmag-reader__download"
                href={MAGAZINE_DOWNLOAD_URL}
                download
                aria-label="Download magazine"
              >
                <DownloadIcon />
                <span>Download</span>
              </a>
              <button
                ref={closeRef}
                type="button"
                className="hpmag-reader__round"
                onClick={onClose}
                aria-label="Close magazine viewer"
              >
                <CloseIcon />
              </button>
            </div>
          </header>

          <div ref={mainRef} className="hpmag-reader__main" {...handlers}>
            <div className="hpmag-reader__frame">
              <img
                className={imgClass}
                src={getMagazinePageSrc(shown)}
                alt={getMagazinePageAlt(shown)}
                decoding="async"
                draggable="false"
              />
            </div>
          </div>

          <footer className="hpmag-reader__bottom">
            <button
              type="button"
              className="hpmag-reader__round"
              onClick={() => onStep(-1)}
              aria-label="Previous page"
              aria-disabled={page === 1}
            >
              <ChevronLeftIcon />
            </button>

            <div className="hpmag-reader__scrub">
              <span className="hpmag-reader__count" aria-hidden="true">
                <b>{pad(page)}</b> <span>/ {pad(total)}</span>
              </span>
              <input
                className="hpmag-reader__range"
                type="range"
                min="1"
                max={total}
                value={page}
                onChange={(e) => onGoTo(Number(e.target.value))}
                aria-label="Go to page"
                aria-valuetext={`Page ${page} of ${total}`}
              />
            </div>

            <button
              type="button"
              className="hpmag-reader__round"
              onClick={() => onStep(1)}
              aria-label="Next page"
              aria-disabled={page === total}
            >
              <ChevronRightIcon />
            </button>
          </footer>
        </div>
      )}
    </dialog>
  );
};

export default HomepageMagazineReader;
