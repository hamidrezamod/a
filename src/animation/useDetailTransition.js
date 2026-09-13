import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { DEFAULT_DETAIL_TRANSITION, getDetailTransition } from './transitions.js';

/**
 * وضعیت حرکت پاپ‌آپ جزئیات را مدیریت می‌کند:
 * closed → entering → open → leaving → closed
 *
 * این فایل «محل اتصال» ترنزیشن‌های آینده است؛ کامپوننت‌های محتوا
 * هیچ اطلاعی از جزئیات انیمیشن ندارند.
 */
export function useDetailTransition(isOpen, transitionName = DEFAULT_DETAIL_TRANSITION) {
  const transition = getDetailTransition(transitionName);
  const prefersReducedMotion = useReducedMotion();

  const [state, setState] = useState('closed');
  const [isMounted, setIsMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    let frame = null;
    let timer = null;

    if (isOpen) {
      mountedRef.current = true;
      setIsMounted(true);
      setState('entering');
      transition?.beforeOpen?.();

      const duration = prefersReducedMotion ? 0 : (transition?.open?.duration ?? 0);

      if (duration === 0) {
        setState('open');
        transition?.afterOpen?.();
      } else {
        frame = requestAnimationFrame(() => {
          setState('open');
          transition?.afterOpen?.();
        });
      }

      return () => {
        if (frame) cancelAnimationFrame(frame);
      };
    }

    if (!mountedRef.current) {
      setState('closed');
      setIsMounted(false);
      return undefined;
    }

    setState('leaving');
    transition?.beforeClose?.();

    const closeDuration = prefersReducedMotion ? 0 : (transition?.close?.duration ?? 0);

    timer = setTimeout(() => {
      mountedRef.current = false;
      setState('closed');
      setIsMounted(false);
      transition?.afterClose?.();
    }, closeDuration);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, transition, prefersReducedMotion]);

  return { state, isMounted };
}
