import { SiteMenu } from './SiteMenu.jsx';
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
 *
 * منو (SiteMenu) پایین و وسط صفحه شناور است و در جریان صفحه
 * فضایی اشغال نمی‌کند؛ به همین دلیل دیگر به offset نیازی نیست.
 */
export function PageShell() {
  const { isOpen } = useDetailOverlay();

  return (
    <div className="site" inert={isOpen ? true : undefined}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

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

      <SiteMenu />
    </div>
  );
}
