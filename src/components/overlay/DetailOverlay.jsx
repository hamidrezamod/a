import { Suspense, useCallback, useRef } from 'react';
import { useDetailOverlay } from '../../hooks/useDetailOverlay.js';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';
import { useEscapeKey } from '../../hooks/useEscapeKey.js';
import { useFocusTrap } from '../../hooks/useFocusTrap.js';
import { useDetailTransition } from '../../animation/useDetailTransition.js';
import { Icon } from '../ui/Icon.jsx';
import { getDetailView } from './detailRegistry.js';

/**
 * اورلی تمام‌صفحه جزئیات
 * ------------------------------------------------------------
 * آماده برای مرحله‌های بعد:
 *  - قفل اسکرول پس‌زمینه
 *  - اسکرول مستقل محتوای داخل اورلی
 *  - بستن با دکمه، کلیک روی پس‌زمینه و کلید Escape
 *  - مدیریت فوکوس و بازگشت فوکوس به کارت
 *  - وضعیت‌های حرکت (data-state) برای افزودن ترنزیشن اختصاصی در آینده
 *  - انیمیشن انتقال تصویر کارت به تصویر مقاله در مرحله بعد اینجا اضافه می‌شود
 *
 * چیدمان نهایی مقاله/تئاتر هنوز ارسال نشده؛ در این مرحله یک قالب استاندارد
 * و تمیز نمایش داده می‌شود که بعداً با دیزاین نهایی جایگزین می‌شود.
 */
export function DetailOverlay() {
  const { detail, isOpen, closeDetail, transitionName } = useDetailOverlay();
  const panelRef = useRef(null);
  const scrollRef = useRef(null);

  const { state, isMounted } = useDetailTransition(isOpen, transitionName);

  const handleClose = useCallback(() => closeDetail(), [closeDetail]);

  useBodyScrollLock(isMounted);
  useEscapeKey(handleClose, isMounted);
  useFocusTrap(panelRef, isMounted);

  if (!isMounted || !detail) return null;

  const DetailView = getDetailView(detail.type);

  return (
    <div
      className="detail-overlay"
      data-state={state}
      role="dialog"
      aria-modal="true"
      aria-label="Detail view"
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="detail-overlay__scrim" onClick={handleClose} aria-hidden="true" />

      <div className="detail-overlay__panel">
        <div className="page-shell detail-overlay__bar">
          <button type="button" className="detail-overlay__close" onClick={handleClose} data-autofocus>
            <span>Close</span>
            <Icon name="close" className="detail-overlay__close-icon" />
          </button>
        </div>

        <div className="detail-overlay__scroll" ref={scrollRef} data-detail-scroll>
          <div className="page-shell">
            <Suspense fallback={<p className="detail-overlay__placeholder">Loading…</p>}>
              {DetailView ? (
                <DetailView type={detail.type} slug={detail.slug} />
              ) : (
                <p className="detail-overlay__placeholder">This content is not available yet.</p>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
