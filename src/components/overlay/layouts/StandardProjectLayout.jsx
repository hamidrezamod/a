import { useMemo } from 'react';
import { MediaFrame } from '../../media/MediaFrame.jsx';
import { renderMarkdown } from '../../../utils/markdown.js';

/**
 * قالب استاندارد پروژه تئاتر — چیدمان نهایی بعد از دریافت دیزاین تئاتر می‌آید.
 */
export function StandardProjectLayout({ project }) {
  const html = useMemo(() => renderMarkdown(project.body), [project.body]);

  return (
    <article className="detail-project" data-detail-type="theatre">
      <div className="detail-project__intro">
        <div className="detail-project__copy">
          <h1 className="detail-project__title" id="detail-title">
            {project.title}
          </h1>
          {project.year ? <p className="detail-project__year">{project.year}</p> : null}
          {project.role ? <p className="detail-project__role">{project.role}</p> : null}
        </div>

        {project.poster ? (
          <MediaFrame
            className="detail-project__poster"
            media={project.poster}
            alt={project.posterAlt}
            ratio="448 / 630"
          />
        ) : null}
      </div>

      {html ? <div className="prose" dangerouslySetInnerHTML={{ __html: html }} /> : null}
    </article>
  );
}
