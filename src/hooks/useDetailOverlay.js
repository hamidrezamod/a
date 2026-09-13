import { useContext } from 'react';
import { OverlayContext } from '../components/overlay/overlayContext.js';

/**
 * دسترسی به سیستم پاپ‌آپ جزئیات
 * مثال:
 *   const { openDetail, closeDetail, isOpen, detail } = useDetailOverlay();
 */
export function useDetailOverlay() {
  return useContext(OverlayContext);
}
