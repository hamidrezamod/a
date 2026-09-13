/**
 * رجیستری آیکون‌ها
 * ------------------------------------------------------------
 * هر فایل .svg که در همین پوشه (src/assets/icons) بگذاری با نام فایل
 * (بدون پسوند) قابل استفاده می‌شود؛ مثلاً instagram.svg → <Icon name="instagram" />
 * آیکون‌ها به‌صورت inline (SVG درون صفحه) بارگذاری می‌شوند تا رنگ‌شان
 * با currentColor هماهنگ بماند و کیفیت‌شان حفظ شود.
 *
 * اگر فایلی وجود نداشته باشد، خالی و بدون خطا نمایش داده می‌شود.
 */

const modules = import.meta.glob('./*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const iconSources = Object.fromEntries(
  Object.entries(modules).map(([path, source]) => [
    path.replace('./', '').replace(/\.svg$/, ''),
    source,
  ]),
);

export function iconSource(name) {
  return name ? (iconSources[name] ?? null) : null;
}

export const availableIconNames = Object.keys(iconSources).sort();
