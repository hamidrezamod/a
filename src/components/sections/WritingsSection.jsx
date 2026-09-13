import { writingsSection } from '../../content/home/writings.js';
import { articles } from '../../content/writings/index.js';
import { WritingCard } from '../cards/WritingCard.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * بخش نوشته‌ها
 * فهرست مقالات از پوشه src/content/writings خوانده می‌شود؛
 * برای اضافه کردن مقاله فقط یک فایل .md جدید آنجا بگذار.
 */
export function WritingsSection() {
  return (
    <section id={writingsSection.id} className="section writings" aria-labelledby="writings-title">
      <div className="page-shell">
        <SectionHeading id="writings-title" align="right">
          {writingsSection.title}
        </SectionHeading>

        <ul className="section__content writings__list">
          {articles.map((article) => (
            <li className="writings__item" key={article.id}>
              <WritingCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
