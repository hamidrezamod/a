import { about } from '../../content/home/about.js';
import { MediaFrame } from '../media/MediaFrame.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** بخش درباره من */
export function AboutSection() {
  return (
    <section id={about.id} className="section section--flush-top about" aria-labelledby="about-title">
      <div className="page-shell">
        <SectionHeading id="about-title">{about.title}</SectionHeading>

        <div className="about__grid section__content">
          <div className="about__copy">
            {about.paragraphs.map((paragraph, index) => (
              <p className="about__paragraph" key={`about-paragraph-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>

          <MediaFrame className="about__media" media={about.media} alt={about.mediaAlt} />
        </div>
      </div>
    </section>
  );
}
