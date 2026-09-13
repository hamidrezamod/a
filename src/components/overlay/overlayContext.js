import { createContext } from 'react';

/**
 * کانتکست سیستم اورلی (پاپ‌آپ) جزئیات
 * در OverlayProvider پر می‌شود و با هوک useDetailOverlay خوانده می‌شود.
 */
export const OverlayContext = createContext({
  detail: null,
  isOpen: false,
  openDetail: () => {},
  closeDetail: () => {},
  transitionName: 'fade',
});
