import { hero } from '../../content/home/hero.js';
import { profile } from '../../content/site/profile.js';
import { MediaFrame } from '../media/MediaFrame.jsx';
import { ScrollCue } from '../ui/ScrollCue.jsx';

/** بخش هیرو — بالای صفحه اصلی */
export function HeroSection() {
  return (
    <section id={hero.id} className="hero" aria-labelledby="hero-title">
      <div className="page-shell hero__inner">
        <MediaFrame
          className="hero__media"
          media={hero.media}
          alt={hero.mediaAlt}
          ratio="348 / 358"
          priority
        />

        <h1 id="hero-title" className="hero__title">
          {profile.name}
        </h1>

        <p className="hero__subtitle">{hero.subtitle}</p>

        <div className="hero__cue">
          <ScrollCue target={hero.scrollCueTarget} label={hero.scrollCueLabel} />
        </div>
      </div>
    </section>
  );
}
