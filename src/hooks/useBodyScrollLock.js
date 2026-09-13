import { useEffect } from 'react';

/**
 * قفل کردن اسکرول پس‌زمینه وقتی پاپ‌آپ جزئیات باز است.
 * عرض اسکرول‌بار هم جبران می‌شود تا صفحه هنگام باز شدن نلرزد.
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return undefined;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousPaddingRight = body.style.paddingRight;

    body.classList.add('is-locked');
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.classList.remove('is-locked');
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isLocked]);
}
