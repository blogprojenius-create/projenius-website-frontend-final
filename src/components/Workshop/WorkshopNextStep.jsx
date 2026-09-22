import './WorkshopNextStep.css';
import { WorkshopSectionHead, WorkshopLink, workshopHref, useInView } from './WorkshopShared';

/* =====================================================================
   CONTENT: edit the text here. The components below only display it.
   ===================================================================== */

const WORKSHOP_PATH = [
  { title: 'Workshop', sub: 'You are here', route: 'workshop', current: true },
  { title: 'Explore', sub: 'Try new technologies' },
  { title: 'Learn', sub: 'Courses', route: 'courses' },
  { title: 'Build a project', sub: 'Development', route: 'development' },
  { title: 'Internship', sub: 'Internship programs', route: 'internship' },
];

const WORKSHOP_PATH_FORK = [
  { title: 'Career', sub: 'Career guidance', route: 'careerGuidance', pos: 'top' },
  { title: 'Startup', sub: 'Startup support', route: 'startupSupport', pos: 'bottom' },
];

/* One stop on the map. Stops with a route are links; the rest are plain. */
function Stop({ item, className }) {
  const inner = (
    <>
      <span className="pjw-next__node" />
      <span className="pjw-next__label">
        <strong>{item.title}</strong>
        <small>{item.sub}</small>
      </span>
    </>
  );
  if (item.route) {
    return (
      <WorkshopLink to={workshopHref(item.route)} className={className} aria-current={item.current ? 'page' : undefined}>
        {inner}
      </WorkshopLink>
    );
  }
  return <div className={className}>{inner}</div>;
}

/* Metro-style pathway: Workshop > Explore > Learn > Build > Internship > Career / Startup */
export default function WorkshopNextStep() {
  const [ref, seen] = useInView({ threshold: 0.35 });
  return (
    <section className="pjw-sec" id="pjw-next" aria-labelledby="pjw-next-title">
      <div className="pjw-wrap">
        <WorkshopSectionHead
          titleId="pjw-next-title"
          title="One Workshop Can Be the Beginning."
          text="A workshop can be the first step toward deeper learning, project development, internships, career exploration, or innovation."
        />
        <ol ref={ref} className={`pjw-next${seen ? ' pjw-next--on' : ''}`}>
          {WORKSHOP_PATH.map((s, i) => (
            <li
              key={s.title}
              className={`pjw-next__station pjw-next__d-${i}${s.current ? ' pjw-next__station--current' : ''}`}
            >
              <Stop item={s} className="pjw-next__stop" />
            </li>
          ))}
          <li className="pjw-next__fork pjw-next__d-5">
            {WORKSHOP_PATH_FORK.map((s, i) => (
              <Stop
                key={s.title}
                item={s}
                className={`pjw-next__stop pjw-next__branch pjw-next__branch--${s.pos} pjw-next__d-${6 + i}`}
              />
            ))}
          </li>
        </ol>
        <p className="pjw-next__note">
          Every learner has a different next step. ProJenius provides multiple pathways to continue
          learning, building, and growing.
        </p>
      </div>
    </section>
  );
}
