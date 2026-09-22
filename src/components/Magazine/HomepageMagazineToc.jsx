import "./HomepageMagazineToc.css";
import { MAGAZINE_SECTIONS } from "./HomepageMagazineConfig";

/* "Inside this issue" — editorial text navigation.
   Add more sections in HomepageMagazineConfig.jsx and they appear here. */
const HomepageMagazineToc = ({ page, onSelect }) => {
  // the active section is the last one that starts on or before the current page
  let activeId = null;
  let activePage = -1;
  MAGAZINE_SECTIONS.forEach((s) => {
    if (s.page <= page && s.page >= activePage) {
      activeId = s.id;
      activePage = s.page;
    }
  });

  return (
    <div className="hpmag-toc hpmag-rv hpmag-rv--5">
      <p className="hpmag-toc__label" id="hpmag-toc-label">
        Inside this issue
      </p>
      <nav aria-labelledby="hpmag-toc-label">
        <div className="hpmag-toc__scroller">
          <ul className="hpmag-toc__list">
            {MAGAZINE_SECTIONS.map((s) => (
              <li key={s.id} className="hpmag-toc__item">
                <button
                  type="button"
                  className="hpmag-toc__btn"
                  data-label={s.label}
                  aria-current={s.id === activeId ? "true" : undefined}
                  aria-label={`${s.label}, go to page ${s.page}`}
                  onClick={() => onSelect(s.page)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HomepageMagazineToc;
