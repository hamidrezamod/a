import { MediaFrame } from '../media/MediaFrame.jsx';
import { useDetailOverlay } from '../../hooks/useDetailOverlay.js';

/**
 * کارت پروژه تئاتر (پوستر + عنوان + سال + نقش)
 * چیدمان پله‌ای ستون‌ها در استایل بخش تئاتر تعیین می‌شود.
 */
export function TheatreCard({ project }) {
  const { openDetail } = useDetailOverlay();
  const href = `#/theatre/${project.slug}`;

  const handleClick = (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;

    event.preventDefault();
    openDetail('theatre', project.slug);
  };

  return (
    <article className="card theatre-card">
      <MediaFrame
        className="theatre-card__media"
        media={project.poster}
        alt={project.posterAlt}
        interactive
      />

      <div className="theatre-card__caption">
        <div className="theatre-card__headline">
          <h3 className="theatre-card__title">
            <a
              className="theatre-card__trigger"
              href={href}
              onClick={handleClick}
              aria-haspopup="dialog"
            >
              {project.title}
            </a>
          </h3>
          {project.year ? <p className="theatre-card__year">{project.year}</p> : null}
        </div>
        {project.role ? <p className="theatre-card__role">{project.role}</p> : null}
      </div>
    </article>
  );
}
