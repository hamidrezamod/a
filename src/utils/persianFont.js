/**
 * جای خالی فونت فارسی (Persian font slot)
 * ------------------------------------------------------------
 * تا وقتی فونت فارسی نهایی ارسال نشده، هیچ فایلی در پوشه
 * src/assets/fonts/persian وجود ندارد و سایت با فونت جانشین نمایش داده می‌شود.
 *
 * وقتی فونت را فرستادی، فقط فایل‌ها را داخل همین پوشه بریز:
 *      src/assets/fonts/persian/
 *          vazirmatn-400.woff2
 *          vazirmatn-500.woff2
 *          vazirmatn-700.woff2
 * نام فایل باید وزن را داشته باشد:  -300  -400  -500  -600  -700
 * (برای حالت ایتالیک: vazirmatn-400-italic.woff2)
 *
 * بعد از آن، سایت خودش فونت را می‌شناسد و متن‌های فارسی (مقاله‌ها) با آن نمایش
 * داده می‌شوند — هیچ تغییری در کد لازم نیست.
 */

const fontFiles = import.meta.glob('../assets/fonts/persian/*.{woff2,woff,ttf,otf}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const FONT_FAMILY_FA = 'Portfolio Persian';

const FORMAT_BY_EXTENSION = {
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'truetype',
  otf: 'opentype',
};

/** آیا فونت فارسی نهایی در پروژه قرار داده شده است؟ */
export const hasPersianFont = Object.keys(fontFiles).length > 0;

/**
 * ساخت و تزریق @font-face برای هر فایل فونت فارسی موجود.
 * اگر پوشه خالی باشد، هیچ کاری انجام نمی‌شود (بنابراین خطای ۴۰۴ هم نداریم).
 */
export function registerPersianFont() {
  if (typeof document === 'undefined') return;
  if (!hasPersianFont) return;
  if (document.getElementById('persian-font-face')) return;

  const rules = Object.entries(fontFiles).map(([path, url]) => {
    const fileName = path.split('/').pop() || '';
    const extension = fileName.split('.').pop()?.toLowerCase() || 'woff2';
    const weightMatch = /-(\d{3})(?=-|\.)/.exec(fileName);
    const weight = weightMatch ? weightMatch[1] : '400';
    const style = /italic/i.test(fileName) ? 'italic' : 'normal';
    const format = FORMAT_BY_EXTENSION[extension] || 'woff2';

    return `@font-face{font-family:'${FONT_FAMILY_FA}';font-style:${style};font-weight:${weight};font-display:swap;src:url('${url}') format('${format}');}`;
  });

  const style = document.createElement('style');
  style.id = 'persian-font-face';
  style.textContent = rules.join('\n');
  document.head.appendChild(style);
}
