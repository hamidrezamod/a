/**
 * رجیستری تصاویر
 * ------------------------------------------------------------
 * هر فایل .webp که داخل همین پوشه (src/assets/images) بگذاری،
 * به‌صورت خودکار شناسایی و با کلید «نام فایل بدون پسوند» در دسترس می‌شود.
 * مثلاً فایل theatre-new.webp با کلید 'theatre-new' در فایل‌های content قابل استفاده است.
 *
 * نیازی به import دستی یا تغییر این فایل نیست.
 */

const modules = import.meta.glob('./*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** نگاشت کلید تصویر → آدرس نهایی فایل */
export const imageUrls = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [keyFromPath(path), url]),
);

/**
 * اندازه واقعی هر تصویر (برای جلوگیری از پرش چیدمان).
 * این مقادیر از دل خود فایل‌های WebP خوانده شده‌اند.
 * اگر تصویری را با ابعاد دیگر جایگزین کردی، فقط عدد همان خط را عوض کن.
 */
export const imageSizes = {
  hero: [349, 359],
  about: [538, 630],
  writing01: [671, 356],
  writing02: [670, 356],
  writing03: [677, 358],
  'short-film': [677, 381],
  podcast: [448, 445],
  'theatre-relingo': [448, 449],
  'theatre-extraneous': [448, 633],
  'theatre-dollear': [448, 630],
  'theatre-assoiffes': [448, 630],
  'theatre-b1': [448, 632],
  'theatre-soug-soroud': [448, 628],
  'theatre-retreating-world': [448, 448],
  award01: [331, 475],
  award02: [331, 478],
  award03: [331, 473],
  award04: [331, 478],
  award05: [330, 224],
};

function keyFromPath(path) {
  return path.replace('./', '').replace(/\.webp$/, '');
}

/** آدرس یک تصویر بر اساس کلید نام فایل */
export function imageUrl(key) {
  if (!key) return '';
  return imageUrls[key] ?? '';
}

/** اندازه یک تصویر: همیشه آرایه‌ای از دو عدد (width, height) */
export function imageSize(key) {
  const size = imageSizes[key];
  return Array.isArray(size) ? size : null;
}

/** نسبت تصویر به شکل آماده برای CSS: «width / height» */
export function imageRatio(key) {
  const size = imageSize(key);
  if (!size) return null;
  return `${size[0]} / ${size[1]}`;
}

/** فهرست کلید همه تصاویر موجود (برای بررسی سریع) */
export const availableImageKeys = Object.keys(imageUrls).sort();
