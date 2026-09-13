import { MediaFrame } from '../media/MediaFrame.jsx';
import { Icon } from '../ui/Icon.jsx';
import { useDetailOverlay } from '../../hooks/useDetailOverlay.js';

/**
 * کارت نوشته‌ها
 * ------------------------------------------------------------
 * با کلیک (یا Enter) روی کارت، جزئیات مقاله به‌صورت پاپ‌آپ تمام‌صفحه باز می‌شود؛
 * هیچ صفحه جداگانه‌ای بارگذاری نمی‌شود. لینک hash باعث می‌شود آدرس مقاله
 * قابل اشتراک‌گذاری باشد و دکمه Back مرورگر هم درست کار کند.
 */
export function WritingCard({ article }) {
  const { openDetail } = useDetailOverlay();
  const href = `#/writing/${article.slug}`;

  const handleClick = (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;

    event.preventDefault();
    openDetail('article', article.slug);
  };

  return (
    <article className={`card writing-card writing-card--media-${article.mediaSide}`}>
      <MediaFrame
        className="writing-card__media"
        media={article.cover}
        alt={article.coverAlt}
        interactive
      />

      <div className="writing-card__body">
        <h3 className="writing-card__title">
          <a
            className="writing-card__trigger"
            href={href}
            onClick={handleClick}
            aria-haspopup="dialog"
          >
            {article.title}
            {article.subtitle ? (
              <span className="writing-card__link">
                {article.subtitle} <Icon name="arrow-up-right" className="writing-card__link-icon" />
              </span>
            ) : null}
          </a>
        </h3>
      </div>
    </article>
  );
}
