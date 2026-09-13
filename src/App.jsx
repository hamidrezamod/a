import { OverlayProvider } from './components/overlay/OverlayProvider.jsx';
import { DetailOverlay } from './components/overlay/DetailOverlay.jsx';
import { PageShell } from './components/layout/PageShell.jsx';

/**
 * ریشه برنامه
 * ------------------------------------------------------------
 * OverlayProvider وضعیت پاپ‌آپ جزئیات را نگه می‌دارد.
 * صفحه اصلی (PageShell) و لایه جزئیات (DetailOverlay) کنار هم زندگی می‌کنند؛
 * پس باز کردن مقاله هیچ صفحه‌ای را دوباره بارگذاری نمی‌کند.
 *
 * محل قرار گرفتن پری‌لودر آینده: دقیقاً همین‌جا، پیش از DetailOverlay
 * (با لایه z-index بالاتر: --z-preloader)
 */
export default function App() {
  return (
    <OverlayProvider>
      <PageShell />
      <DetailOverlay />
    </OverlayProvider>
  );
}
