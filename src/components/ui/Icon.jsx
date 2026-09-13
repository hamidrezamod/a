import { iconSource } from '../../assets/icons/index.js';

/**
 * نمایش SVG به‌صورت inline
 * ------------------------------------------------------------
 * نام فایل SVG را بده (بدون پسوند .svg) و همان آیکون نمایش داده می‌شود.
 * آیکون‌ها با currentColor رنگ می‌گیرند؛ پس رنگ‌شان با متن هماهنگ می‌ماند.
 * اگر فایل آیکون موجود نبود، می‌توانی با prop «fallback» یک جایگزین بدهی.
 */
export function Icon({ name, className = '', label, size, fallback = null, ...rest }) {
  const source = iconSource(name);
  if (!source) return fallback;

  return (
    <span
      className={['icon', className].filter(Boolean).join(' ')}
      style={size ? { width: size, height: size } : undefined}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: source }}
      {...rest}
    />
  );
}
