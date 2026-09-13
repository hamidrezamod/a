import { hero } from '../../content/home/hero.js';
import { profile } from '../../content/site/profile.js';
import { MediaFrame } from '../media/MediaFrame.jsx';
import { ScrollCue } from '../ui/ScrollCue.jsx';

/** بخش هیرو — بالای صفحه اصلی
 *  قاب هیرو دقیقاً ۱۱۲۰ × ۵۲۸.۳۵ پیکسل است:
 *  تصویر ۳۴۸.۵۱×۳۵۸.۳۵ + ۱۶ + عنوان (۱۰۴/۱۰۰/۶۰۰) + ۱۶ + زیرعنوان (۳۰/۳۸/۴۰۰)
 *  آیکون پایین‌رونده بیرون این قاب است و ۹۲ پیکسل از زیرعنوان فاصله دارد.
 */
export function HeroSection() {
  return (
    <section id={hero.id} className="hero" aria-labelledby="hero-title">
      <div className="page-shell hero__inner">
        <div className="hero__content">
          <MediaFrame
            className="hero__media"
            media={hero.media}
            alt={hero.mediaAlt}
            ratio="348.51 / 358.35"
            priority
          />

          <h1 id="hero-title" className="hero__title type-hero-title">
            {profile.name}
          </h1>

          <p className="hero__subtitle type-hero-subtitle">{hero.subtitle}</p>
        </div>

        <div className="hero__cue">
          <ScrollCue target={hero.scrollCueTarget} label={hero.scrollCueLabel} />
        </div>
      </div>
    </section>
  );
}
