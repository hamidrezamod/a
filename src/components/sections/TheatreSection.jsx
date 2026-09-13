import { theatreSection } from '../../content/home/theatre.js';
import { theatreColumns } from '../../content/theatre/index.js';
import { TheatreCard } from '../cards/TheatreCard.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * بخش تئاتر
 * دو ستون با جابه‌جایی عمودی (پله‌ای) — نه یک گرید معمولی هم‌تراز.
 * ستون هر کارت از فیلد column در فایل محتوای همان پروژه می‌آید.
 */
export function TheatreSection() {
  return (
    <section id={theatreSection.id} className="section theatre" aria-labelledby="theatre-title">
      <div className="page-shell">
        <SectionHeading id="theatre-title" align="right">
          {theatreSection.title}
        </SectionHeading>

        <div className="section__content theatre__columns">
          {['left', 'right'].map((columnName) => (
            <div className={`theatre__column theatre__column--${columnName}`} key={columnName}>
              {theatreColumns[columnName].map((project) => (
                <TheatreCard project={project} key={project.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
