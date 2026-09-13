import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** آیا کاربر در سیستم خودش انیمیشن‌ها را کم کرده است؟ */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const media = window.matchMedia(QUERY);
    const onChange = (event) => setPrefersReduced(event.matches);

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
