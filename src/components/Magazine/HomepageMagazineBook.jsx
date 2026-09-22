import { useCallback, useEffect, useRef, useState } from "react";
import "./HomepageMagazineBook.css";
import { ExpandIcon } from "./HomepageMagazineIcons";
import {
  getMagazinePageAlt,
  getMagazinePageSrc,
  magazinePageReady,
} from "./HomepageMagazineConfig";

/* Keep in sync with the animation durations in HomepageMagazineBook.css */
const TURN_MS = 700;
const TURN_FAST_MS = 520;
const IDLE = { dir: null, fast: false };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

/* The large magazine preview with a subtle page-turn.
   - page: current page number (owned by HomepageMagazine)
   - clicking the magazine opens the reader
   - if the reader is open, or the user prefers reduced motion, pages swap instantly */
const HomepageMagazineBook = ({ page, readerOpen, onOpen, onStep }) => {
  const [basePage, setBasePage] = useState(page);
  const [flipPage, setFlipPage] = useState(page);
  const [turn, setTurn] = useState(IDLE);

  const mountedRef = useRef(true);
  const busyRef = useRef(false);
  const shownRef = useRef(page); // page currently resting on screen
  const latestRef = useRef(page); // page we should end up on
  const readerOpenRef = useRef(readerOpen);
  latestRef.current = page;
  readerOpenRef.current = readerOpen;

  const { handlers, wasSwipe } = useSwipe(onStep);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* plays one turn at a time; rapid clicks queue up because we always
     chase latestRef until the screen has caught up */
  const run = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;

    while (mountedRef.current && shownRef.current !== latestRef.current) {
      const from = shownRef.current;
      const to = latestRef.current;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce || readerOpenRef.current) {
        shownRef.current = to;
        setBasePage(to);
        continue;
      }

      await Promise.all([magazinePageReady(from), magazinePageReady(to)]);
      if (!mountedRef.current) break;

      const next = to > from;
      const fast = Math.abs(to - from) > 1;
      setBasePage(next ? to : from);
      setFlipPage(next ? from : to);
      setTurn({ dir: next ? "next" : "prev", fast });

      await wait(fast ? TURN_FAST_MS : TURN_MS);
      if (!mountedRef.current) break;

      shownRef.current = to;
      setBasePage(to);
      setTurn(IDLE);
      await wait(0); // let React paint the resting state
    }

    busyRef.current = false;
  }, []);

  useEffect(() => {
    run();
  }, [page, run]);

  /* only load what is needed: current page + its neighbours */
  useEffect(() => {
    magazinePageReady(page);
    magazinePageReady(page + 1);
    magazinePageReady(page - 1);
  }, [page]);

  const handleOpen = () => {
    if (!wasSwipe()) onOpen();
  };

  const tiltClass =
    "hpmag-book__tilt" + (turn.fast ? " hpmag-book__tilt--fast" : "");
  const flipClass =
    "hpmag-book__leaf hpmag-book__leaf--flip" +
    (turn.dir ? ` hpmag-book__leaf--turn-${turn.dir}` : "");
  const shadeClass = "hpmag-book__shade" + (turn.dir ? " hpmag-book__shade--on" : "");

  return (
    <div className="hpmag-book" {...handlers}>
      <div className="hpmag-book__rise">
        <div className={tiltClass}>
          <img
            className="hpmag-book__leaf hpmag-book__leaf--base"
            src={getMagazinePageSrc(basePage)}
            alt={getMagazinePageAlt(basePage)}
            decoding="async"
            draggable="false"
          />
          <div className={shadeClass} aria-hidden="true" />
          <img
            className={flipClass}
            src={getMagazinePageSrc(flipPage)}
            alt=""
            aria-hidden="true"
            hidden={!turn.dir}
            decoding="async"
            draggable="false"
          />
          <div className="hpmag-book__finish" aria-hidden="true" />
          <span className="hpmag-book__hint" aria-hidden="true">
            <ExpandIcon />
            Read
          </span>
          <button
            type="button"
            className="hpmag-book__hit"
            onClick={handleOpen}
            aria-haspopup="dialog"
            aria-label={`Open magazine viewer, currently on page ${page}`}
          />
        </div>
        <div className="hpmag-book__floor" aria-hidden="true" />
      </div>
    </div>
  );
};

export default HomepageMagazineBook;
