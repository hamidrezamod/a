import { imageSize, imageUrl } from '../../assets/images/index.js';

/**
 * قاب تصویر مشترک همه بخش‌ها
 * - اندازه واقعی تصویر به مرورگر اعلام می‌شود تا چیدمان نپرد (CLS)
 * - تصاویر پایین صفحه به‌صورت lazy بارگذاری می‌شوند
 * - حالت هاور ظریف (interactive) اختیاری است
 */
export function MediaFrame({
  media,
  alt = '',
  ratio,
  tone = 'light',
  interactive = false,
  priority = false,
  className = '',
  imageClassName = '',
}) {
  const src = imageUrl(media);
  const size = imageSize(media);
  const aspectRatio = ratio || (size ? `${size[0]} / ${size[1]}` : '1 / 1');

  const classes = [
    'media',
    tone === 'dark' ? 'media--dark' : '',
    interactive ? 'media--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <figure className={classes} style={{ '--media-ratio': aspectRatio }}>
      {src ? (
        <img
          className={['media__image', imageClassName].filter(Boolean).join(' ')}
          src={src}
          alt={alt}
          width={size ? size[0] : undefined}
          height={size ? size[1] : undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      ) : (
        <span className="media__missing" aria-hidden="true">
          {alt}
        </span>
      )}
    </figure>
  );
}
