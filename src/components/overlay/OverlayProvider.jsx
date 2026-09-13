import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_DETAIL_TRANSITION } from '../../animation/transitions.js';
import { OverlayContext } from './overlayContext.js';
import { buildDetailHash, parseDetailHash } from './detailRoutes.js';

/**
 * مدیریت وضعیت اورلی (پاپ‌آپ) جزئیات
 * ------------------------------------------------------------
 * - باز و بسته کردن، آدرس hash را هم به‌روز می‌کند (لینک قابل اشتراک‌گذاری)
 * - دکمه Back مرورگر اورلی را می‌بندد
 * - نام ترنزیشن اینجا تعیین می‌شود؛ برای تغییر حرکت سایت فقط همین مقدار
 *   را عوض کن (ترنزیشن‌ها در src/animation/transitions.js تعریف می‌شوند)
 */
export function OverlayProvider({ children, transitionName = DEFAULT_DETAIL_TRANSITION }) {
  const [detail, setDetail] = useState(() => parseDetailHash(window.location.hash));

  useEffect(() => {
    const syncFromHash = () => setDetail(parseDetailHash(window.location.hash));

    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);

    return () => {
      window.removeEventListener('popstate', syncFromHash);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  const openDetail = useCallback((type, slug) => {
    const hash = buildDetailHash(type, slug);
    if (!hash) return;

    if (window.location.hash !== hash) {
      window.history.pushState({ detail: true }, '', hash);
    }
    setDetail({ type, slug });
  }, []);

  const closeDetail = useCallback(() => {
    // اگر خودمان آدرس را ساخته بودیم، دکمه Back طبیعی‌ترین رفتار است
    if (window.history.state?.detail) {
      window.history.back();
      return;
    }

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setDetail(null);
  }, []);

  const value = useMemo(
    () => ({
      detail,
      isOpen: Boolean(detail),
      openDetail,
      closeDetail,
      transitionName,
    }),
    [detail, openDetail, closeDetail, transitionName],
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}
