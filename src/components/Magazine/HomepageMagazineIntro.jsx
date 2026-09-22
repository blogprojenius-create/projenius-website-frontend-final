import "./HomepageMagazineIntro.css";

/* Eyebrow + headline + supporting text */
const HomepageMagazineIntro = () => (
  <div className="hpmag-intro">
    <p className="hpmag-intro__eyebrow hpmag-rv">ProJenius Magazine</p>
    <h2 className="hpmag-intro__headline hpmag-rv hpmag-rv--1" id="hpmag-title">
      <span>Ideas.</span>
      <span>Technology.</span>
      <span>People.</span>
      <span>Progress.</span>
    </h2>
    <span className="hpmag-intro__rule hpmag-rv hpmag-rv--2" aria-hidden="true" />
    <p className="hpmag-intro__lede hpmag-rv hpmag-rv--3">
      A digital publication from ProJenius featuring our journey, projects,
      workshops, learning initiatives, and the people behind them.
    </p>
  </div>
);

export default HomepageMagazineIntro;
