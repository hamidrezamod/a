import { awards, awardsSection } from '../../content/awards/index.js';
import { AwardCard } from '../cards/AwardCard.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** بخش افتخارات و گواهی‌نامه‌ها — سه ستون ۳۳۰.۶۷ با فاصله ۶۴ */
export function AwardsSection() {
  return (
    <section id={awardsSection.id} className="section awards" aria-labelledby="awards-title">
      <div className="page-shell">
        <SectionHeading id="awards-title" align="right">
          {awardsSection.title}
        </SectionHeading>

        <div className="section__content awards__grid">
          {awards.map((award) => (
            <AwardCard award={award} key={award.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
