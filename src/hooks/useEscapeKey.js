import { useEffect } from 'react';

/** اجرای یک تابع با فشردن کلید Escape (فقط وقتی فعال باشد) */
export function useEscapeKey(handler, isActive = true) {
  useEffect(() => {
    if (!isActive || typeof handler !== 'function') return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handler(event);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handler, isActive]);
}
