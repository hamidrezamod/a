import { SiteHeader } from './SiteHeader.jsx';
import { SiteFooter } from './SiteFooter.jsx';
import { HeroSection } from '../sections/HeroSection.jsx';
import { AboutSection } from '../sections/AboutSection.jsx';
import { WritingsSection } from '../sections/WritingsSection.jsx';
import { ShortFilmSection } from '../sections/ShortFilmSection.jsx';
import { TheatreSection } from '../sections/TheatreSection.jsx';
import { PodcastSection } from '../sections/PodcastSection.jsx';
import { ResumeSection } from '../sections/ResumeSection.jsx';
import { AwardsSection } from '../sections/AwardsSection.jsx';
import { ContactSection } from '../sections/ContactSection.jsx';
import { useDetailOverlay } from '../../hooks/useDetailOverlay.js';

/**
 * پوسته صفحه اصلی
 * ترتیب بخش‌ها دقیقاً همان ترتیب دیزاین دسکتاپ است.
 * وقتی پاپ‌آپ جزئیات باز می‌شود، این پوسته از دسترس خارج (inert) می‌شود
 * تا فوکوس و صفحه‌خوان وارد پس‌زمینه نشوند.
 */
export function PageShell() {
  const { isOpen } = useDetailOverlay();

  // منو چسبان است و در جریان صفحه فضای خودش را می‌گیرد؛
  // این offset اجازه می‌دهد فاصله «۱۲۰ پیکسل از بالای صفحه تا هیرو»
  // دقیقاً مثل دیزاین حفظ شود.
  const headerOffset = 0;

  return (
    <div
      className="site"
      style={{ '--header-offset': `${headerOffset}px` }}
      inert={isOpen ? true : undefined}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <HeroSection />
        <AboutSection />
        <WritingsSection />
        <ShortFilmSection />
        <TheatreSection />
        <PodcastSection />
        <ResumeSection />
        <AwardsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
