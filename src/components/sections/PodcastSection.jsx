import { podcastSection } from '../../content/home/podcast.js';
import { MediaFrame } from '../media/MediaFrame.jsx';
import { Icon } from '../ui/Icon.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** بخش پادکست */
export function PodcastSection() {
  const { episode } = podcastSection;

  return (
    <section
      id={podcastSection.id}
      className="band band--dark podcast"
      aria-labelledby="podcast-title"
    >
      <div className="page-shell">
        <SectionHeading id="podcast-title" align="right" className="section__title--light">
          {podcastSection.title}
        </SectionHeading>

        <div className="band__content podcast__grid">
          <div className="podcast__copy">
            <h3 className="podcast__title">{episode.title}</h3>
            {episode.role ? <p className="podcast__role">{episode.role}</p> : null}

            <div className="podcast__links">
              {episode.links.map((link) => (
                <a className="podcast__link" href={link.href} key={link.id}>
                  <Icon name={link.icon} className="podcast__link-icon" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <MediaFrame
            className="podcast__media"
            media={episode.cover}
            alt={episode.coverAlt}
            tone="dark"
            ratio="1 / 1"
          />
        </div>
      </div>
    </section>
  );
}
