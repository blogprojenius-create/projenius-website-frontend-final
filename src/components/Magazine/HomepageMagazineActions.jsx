import "./HomepageMagazineActions.css";
import { BookOpenIcon, DownloadIcon } from "./HomepageMagazineIcons";
import { MAGAZINE_DOWNLOAD_URL } from "./HomepageMagazineConfig";

/* Primary: Explore Magazine  |  Secondary: Download Magazine */
const HomepageMagazineActions = ({ onExplore }) => (
  <div className="hpmag-actions hpmag-rv hpmag-rv--4">
    <button
      type="button"
      className="hpmag-actions__btn hpmag-actions__btn--primary"
      onClick={onExplore}
      aria-haspopup="dialog"
    >
      <BookOpenIcon />
      Explore Magazine
    </button>

    <a
      className="hpmag-actions__btn hpmag-actions__btn--secondary"
      href={MAGAZINE_DOWNLOAD_URL}
      download
    >
      <DownloadIcon />
      Download Magazine
    </a>
  </div>
);

export default HomepageMagazineActions;
