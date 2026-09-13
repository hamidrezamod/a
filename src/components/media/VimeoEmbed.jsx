import { useState } from 'react';
import { imageSize, imageUrl } from '../../assets/images/index.js';
import { Icon } from '../ui/Icon.jsx';

/**
 * پلیر ویمیو با تصویر جانشین (poster)
 * ------------------------------------------------------------
 * تا وقتی کاربر روی دکمه پخش کلیک نکند، ویمیو بارگذاری نمی‌شود
 * (هم سبک‌تر است، هم اگر دسترسی به ویمیو نبود، تصویر جانشین سرجایش می‌ماند
 * و چیدمان صفحه سالم می‌ماند). پس از کلیک، خود پلیر ویمیو نمایش داده می‌شود
 * و کاربر می‌تواند فیلم را داخل سایت پخش کند.
 */
export function VimeoEmbed({
  videoId,
  title,
  poster,
  posterAlt = '',
  pageUrl,
  playLabel = 'Play the film',
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const src = imageUrl(poster);
  const size = imageSize(poster);
  const aspectRatio = size ? `${size[0]} / ${size[1]}` : '677 / 380.81';

  const embedUrl =
    `https://player.vimeo.com/video/${videoId}` +
    '?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1';

  return (
    <div className="vimeo-embed" style={{ '--media-ratio': aspectRatio }}>
      {src ? (
        <img
          className="vimeo-embed__poster"
          src={src}
          alt={posterAlt}
          width={size?.[0]}
          height={size?.[1]}
          loading="lazy"
          decoding="async"
        />
      ) : null}

      {isPlaying ? (
        <iframe
          className="vimeo-embed__frame"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="vimeo-embed__play"
          onClick={() => setIsPlaying(true)}
          aria-label={playLabel}
        >
          <Icon name="play" className="vimeo-embed__play-icon" />
        </button>
      )}

      {pageUrl ? (
        <a className="is-hidden-visually" href={pageUrl} target="_blank" rel="noreferrer">
          {title}
        </a>
      ) : null}
    </div>
  );
}
