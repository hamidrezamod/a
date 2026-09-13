import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * مدیریت فوکوس داخل پاپ‌آپ:
 *  - فوکوس اولیه داخل پاپ‌آپ می‌رود
 *  - کلید Tab داخل پاپ‌آپ می‌چرخد و بیرون نمی‌زند
 *  - هنگام بستن، فوکوس به همان عنصری برمی‌گردد که کاربر رویش بوده
 */
export function useFocusTrap(containerRef, isActive) {
  useEffect(() => {
    if (!isActive) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      );

    const initial =
      container.querySelector('[data-autofocus]') || getFocusable()[0] || container;

    // فوکوس اولیه بدون پرش صفحه
    initial.focus?.({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus?.({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', onKeyDown);

    return () => {
      container.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [containerRef, isActive]);
}
