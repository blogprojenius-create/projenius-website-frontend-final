import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
import { Download } from "lucide-react";
import "./Magazine.css";

const magazineFile = "/magazine.pdf";
const flipSoundFile = "/page-flip-01a.mp3";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PAGE_WIDTH = 180;
const PAGE_HEIGHT = Math.round(PAGE_WIDTH * 1.414);

const MOBILE_PAGE_WIDTH = 155;
const MOBILE_PAGE_HEIGHT = Math.round(MOBILE_PAGE_WIDTH * 1.414);

const MagazinePageItem = forwardRef(
  ({ pageNumber, activePage, width, height }, ref) => {
    const shouldRender =
      Math.abs(pageNumber - (activePage + 1)) <= 2;

    return (
      <div
        ref={ref}
        className="magazine-sec-page-wrap"
        style={{ width, height }}
      >
        {shouldRender ? (
          <Page
            pageNumber={pageNumber}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading=""
          />
        ) : (
          <div
            className="magazine-page-placeholder"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

MagazinePageItem.displayName = "MagazinePageItem";

const Magazine = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const flipBookRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");

    const updateSize = () => setIsMobile(query.matches);

    updateSize();

    query.addEventListener("change", updateSize);

    return () => {
      query.removeEventListener("change", updateSize);
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(flipSoundFile);
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const pageSize = useMemo(
    () => ({
      width: isMobile ? MOBILE_PAGE_WIDTH : PAGE_WIDTH,
      height: isMobile ? MOBILE_PAGE_HEIGHT : PAGE_HEIGHT,
    }),
    [isMobile]
  );

  const playFlip = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = 0;

    const promise = audio.play();

    if (promise?.catch) {
      promise.catch(() => {});
    }
  };

  const handleFlip = (event) => {
    setActivePage(event.data);
  };

  const handleDocumentLoad = ({ numPages }) => {
    setTotalPages(numPages);
    setActivePage(0);
  };

  const handleDocumentError = (error) => {
    console.error("Magazine PDF failed to load:", error);
  };

  const goPrev = () => {
    if (!flipBookRef.current || !totalPages) return;

    flipBookRef.current.pageFlip().flipPrev();
    playFlip();
  };

  const goNext = () => {
    if (!flipBookRef.current || !totalPages) return;

    flipBookRef.current.pageFlip().flipNext();
    playFlip();
  };

  return (
    <section className="magazine-sec-main-wrapper">
      <div className="magazine-viewer-container">

        {/* TEXT */}
        <div className="magazine-copy-col">
          <span className="mag-sub-label">
            MAGAZINE
          </span>

          <h2 className="mag-heading">
            Explore the{" "}
            <span className="magazine-heading-highlight">
              Projenius Magazine
            </span>
          </h2>

          <div
            className="magazine-heading-line"
            aria-hidden="true"
          />

          <p className="mag-desc">
            See our services, training work, project approach,
            and company story in one interactive digital magazine.
          </p>

          <div
            className="mag-panel-tags"
            aria-label="Magazine highlights"
          >
            <span>Company story</span>
            <span>Services</span>
            <span>Workshops</span>
          </div>

          <a
            href={magazineFile}
            download
            className="magazine-download-btn"
          >
            <Download size={18} strokeWidth={2.2} />
            <span>Download Magazine</span>
          </a>
        </div>

        {/* MASCOT — STATIC, NO ANIMATION */}
        <div
          className="magazine-mascot-col"
          aria-hidden="true"
        >
          <div className="mag-mascot-inner">
            <div className="mag-mascot-bubble">
              Open the magazine
            </div>

            <img
              src="/images/corporate-toy.png"
              alt=""
              className="mag-mascot-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* MAGAZINE */}
        <div className="magazine-sec-book-area">
          <div className="magazine-sec-book-shadow">
            <Document
              file={magazineFile}
              onLoadSuccess={handleDocumentLoad}
              onLoadError={handleDocumentError}
              loading={
                <div className="magazine-pdf-status">
                  Loading magazine...
                </div>
              }
              error={
                <div className="magazine-pdf-status magazine-pdf-error">
                  Unable to load magazine
                </div>
              }
            >
              {totalPages > 0 && (
                <HTMLFlipBook
                  width={pageSize.width}
                  height={pageSize.height}
                  minWidth={120}
                  maxWidth={pageSize.width}
                  minHeight={170}
                  maxHeight={pageSize.height}
                  size="fixed"
                  className="magazine-sec-flip-book"
                  ref={flipBookRef}
                  showCover
                  usePortrait={isMobile}
                  useMouseEvents
                  mobileScrollSupport={false}
                  onFlip={handleFlip}
                  maxShadowOpacity={0.28}
                  drawShadow
                  flippingTime={1}
                >
                  {Array.from(
                    { length: totalPages },
                    (_, index) => (
                      <MagazinePageItem
                        key={index}
                        pageNumber={index + 1}
                        activePage={activePage}
                        width={pageSize.width}
                        height={pageSize.height}
                      />
                    )
                  )}
                </HTMLFlipBook>
              )}
            </Document>
          </div>

          <div className="magazine-controls-pill">
            <button
              type="button"
              className="magazine-nav-button"
              onClick={goPrev}
              aria-label="Previous page"
            >
              ‹
            </button>

            <span className="magazine-page-number">
              {totalPages ? activePage + 1 : 0} / {totalPages || 0}
            </span>

            <button
              type="button"
              className="magazine-nav-button"
              onClick={goNext}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Magazine;