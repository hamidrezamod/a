import { shortFilmSection } from '../../content/home/short-film.js';
import { VimeoEmbed } from '../media/VimeoEmbed.jsx';
import { Icon } from '../ui/Icon.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * بخش فیلم کوتاه (نوار تیره)
 * متن سمت چپ، پلیر ویمیو سمت راست.
 * زیر پلیر دو آیکون قابل کلیک هست: ویمیو و گوگل درایو.
 * تا وقتی پلیر بارگذاری نشده، تصویر جانشین سرجایش می‌ماند.
 */
export function ShortFilmSection() {
  const { film } = shortFilmSection;
  // آیکون‌هایی که آدرسشان هنوز خالی است نمایش داده نمی‌شوند
  const availablePlatforms = (film.platforms || []).filter((platform) => platform.href);

  return (
    <section
      id={shortFilmSection.id}
      className="band band--dark short-film"
      aria-labelledby="short-film-title"
    >
      <div className="page-shell">
        <SectionHeading id="short-film-title" className="section__title--light">
          {shortFilmSection.title}
        </SectionHeading>

        <div className="band__content short-film__grid">
          <div className="short-film__copy">
            <h3 className="short-film__title">{film.title}</h3>
            {film.year ? <p className="short-film__year">{film.year}</p> : null}
            {film.role ? <p className="short-film__role">{film.role}</p> : null}

            {availablePlatforms.length ? (
              <ul className="short-film__platforms" role="list">
                {availablePlatforms.map((platform) => (
                  <li key={platform.id}>
                    <a
                      className="short-film__platform"
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={platform.label}
                      title={platform.label}
                    >
                      <Icon name={platform.icon} className="short-film__platform-icon" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="short-film__player">
            <div className="short-film__video">
              <VimeoEmbed
                videoId={film.vimeo.videoId}
                title={film.vimeo.title}
                poster={film.poster}
                posterAlt={film.posterAlt}
                pageUrl={film.vimeo.pageUrl}
                playLabel={`Play: ${film.title}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
