import "./HomepageMagazineMeta.css";
import { getMagazineMeta } from "./HomepageMagazineConfig";

/* Small editorial metadata row (only real data from the config). */
const HomepageMagazineMeta = () => (
  <ul className="hpmag-meta" aria-label="Publication details">
    {getMagazineMeta().map((item) => (
      <li key={item} className="hpmag-meta__item">
        {item}
      </li>
    ))}
  </ul>
);

export default HomepageMagazineMeta;
