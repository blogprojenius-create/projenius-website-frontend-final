import { useCallback, useEffect, useRef, useState } from "react";
import "./HomepageMagazine.css";

import HomepageMagazineActions
  from "./HomepageMagazineActions";

import HomepageMagazineBook
  from "./HomepageMagazineBook";

import HomepageMagazineIntro
  from "./HomepageMagazineIntro";

import HomepageMagazineMeta
  from "./HomepageMagazineMeta";

import HomepageMagazinePager
  from "./HomepageMagazinePager";

import HomepageMagazineReader
  from "./HomepageMagazineReader";

import HomepageMagazineToc
  from "./HomepageMagazineToc";
import { MAGAZINE_TOTAL_PAGES, clampMagazinePage } from "./HomepageMagazineConfig";

/* Owns the shared state (current page, reader open/closed, scroll-in)
   and lays out the section. Everything visual lives in the child components. */
const HomepageMagazine = () => {
  const [page, setPage] = useState(1);
  const [readerOpen, setReaderOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  /* scroll-in sequence: text -> magazine -> shadow -> navigation */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((n) => setPage(clampMagazinePage(n)), []);
  const step = useCallback((d) => setPage((p) => clampMagazinePage(p + d)), []);
  const openReader = useCallback(() => setReaderOpen(true), []);
  const closeReader = useCallback(() => setReaderOpen(false), []);

  const handleStageKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="magazine"
      className={`hpmag${inView ? " hpmag--in" : ""}`}
      aria-labelledby="hpmag-title"
    >
      <div className="hpmag__inner">
        <div className="hpmag__intro">
          <HomepageMagazineIntro />
        </div>

        <div className="hpmag__actions">
          <HomepageMagazineActions onExplore={openReader} />
        </div>

        <div className="hpmag__inside">
          <HomepageMagazineToc page={page} onSelect={goTo} />
        </div>

        <div
          className="hpmag__stage"
          role="group"
          aria-label="Magazine preview"
          onKeyDown={handleStageKeyDown}
        >
          <HomepageMagazineMeta />
          <HomepageMagazineBook
            page={page}
            readerOpen={readerOpen}
            onOpen={openReader}
            onStep={step}
          />
          <HomepageMagazinePager
            page={page}
            total={MAGAZINE_TOTAL_PAGES}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        </div>
      </div>

      <HomepageMagazineReader
        open={readerOpen}
        page={page}
        onClose={closeReader}
        onStep={step}
        onGoTo={goTo}
      />
    </section>
  );
};

export default HomepageMagazine;
