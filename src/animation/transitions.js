/**
 * رجیستری ترنزیشن‌ها
 * ------------------------------------------------------------
 * هدف: جدا نگه داشتن «منطق حرکت» از «محتوا و چیدمان».
 * الان فقط یک ترنزیشن ساده (fade) فعال است تا کار کردن سایت ممکن باشد.
 * وقتی رفرنس حرکت/ویدیوی ترنزیشن نهایی رسید، اینجا یک ترنزیشن جدید
 * اضافه می‌شود و در فایل OverlayProvider فقط نامش را عوض می‌کنیم —
 * بدون هیچ تغییری در سایر کامپوننت‌ها.
 *
 * هر ترنزیشن می‌تواند این قلاب‌ها (hooks) را داشته باشد:
 *   beforeOpen / afterOpen / beforeClose / afterClose
 */

export const detailTransitions = {
  /** ترنزیشن موقت و بی‌سر‌و‌صدا تا زمان رسیدن رفرنس حرکت */
  fade: {
    name: 'fade',
    open: { duration: 420, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    close: { duration: 320, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    beforeOpen: null,
    afterOpen: null,
    beforeClose: null,
    afterClose: null,
  },
};

export const DEFAULT_DETAIL_TRANSITION = 'fade';

export function getDetailTransition(name) {
  return detailTransitions[name] || detailTransitions[DEFAULT_DETAIL_TRANSITION];
}
