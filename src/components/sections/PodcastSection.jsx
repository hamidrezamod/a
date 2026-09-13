import { podcastSection } from '../../content/home/podcast.js';
import { MediaFrame } from '../media/MediaFrame.jsx';
import { Icon } from '../ui/Icon.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** آیا این لینک آدرس واقعی دارد؟ */
function hasRealHref(href) {
  return typeof href === 'string' && /^(https?:|mailto:|tel:)/.test(href);
}

/**
 * بخش پادکست (نوار تیره)
 * متن سمت چپ، تصویر ۴۴۸ سمت راست.
 * تا وقتی آدرس یکی از پلتفرم‌ها در فایل محتوا خالی باشد، همان مورد
 * به‌صورت متنی (بدون لینک) نمایش داده می‌شود تا لینک بی‌مقصد ساخته نشود؛
 * به‌محض وارد کردن آدرس، خودکار قابل کلیک می‌شود.
 */
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

            <ul className="podcast__links" role="list">
              {episode.links.map((link) => (
                <li key={link.id}>
                  {hasRealHref(link.href) ? (
                    <a className="podcast__link" href={link.href} target="_blank" rel="noreferrer">
                      <Icon name={link.icon} className="podcast__link-icon" />
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <span className="podcast__link podcast__link--pending">
                      <Icon name={link.icon} className="podcast__link-icon" />
                      <span>{link.label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
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
