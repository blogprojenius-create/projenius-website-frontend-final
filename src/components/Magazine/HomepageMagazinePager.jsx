import "./HomepageMagazinePager.css";
import { ChevronLeftIcon, ChevronRightIcon } from "./HomepageMagazineIcons";

const pad = (n) => String(n).padStart(2, "0");

/* ←   CURRENT PAGE  01 / 27   →   + thin progress line */
const HomepageMagazinePager = ({ page, total, onPrev, onNext }) => (
  <>
    <div className="hpmag-pager" role="group" aria-label="Magazine page navigation">
      <button
        type="button"
        className="hpmag-pager__btn"
        onClick={onPrev}
        aria-label="Previous page"
        aria-disabled={page === 1}
      >
        <ChevronLeftIcon />
      </button>

      <div className="hpmag-pager__count" aria-hidden="true">
        <span className="hpmag-pager__label">Current page</span>
        <span className="hpmag-pager__num">
          <b>{pad(page)}</b>
          <i>/</i>
          <span className="hpmag-pager__total">{pad(total)}</span>
        </span>
      </div>

      <button
        type="button"
        className="hpmag-pager__btn"
        onClick={onNext}
        aria-label="Next page"
        aria-disabled={page === total}
      >
        <ChevronRightIcon />
      </button>
    </div>

    <progress className="hpmag-pager__progress" value={page} max={total} aria-hidden="true" />

    {/* screen-reader friendly page count */}
    <p className="hpmag-pager__sr" role="status" aria-live="polite">
      Page {page} of {total}
    </p>
  </>
);

export default HomepageMagazinePager;
