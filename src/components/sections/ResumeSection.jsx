import {
  education,
  experience,
  resumeSection,
  skills,
} from '../../content/resume/index.js';
import { Icon } from '../ui/Icon.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * بخش رزومه
 * محتوا از src/content/resume خوانده می‌شود؛ این کامپوننت فقط چیدمان است.
 */
export function ResumeSection() {
  return (
    <section id={resumeSection.id} className="section resume" aria-labelledby="resume-title">
      <div className="page-shell">
        <SectionHeading id="resume-title">{resumeSection.title}</SectionHeading>

        <div className="section__content resume__categories">
          <EducationCategory category={education} />
          <ExperienceCategory category={experience} />
          <SkillsCategory category={skills} />
        </div>
      </div>
    </section>
  );
}

/** تحصیلات: متن + برچسب دانشگاه (۸ پیکسل پایین‌تر) */
function EducationCategory({ category }) {
  return (
    <section className="resume-category" aria-labelledby={`resume-${category.id}`}>
      <h3 className="resume-category__title" id={`resume-${category.id}`}>
        {category.title}
      </h3>

      <div className="resume-category__items">
        {category.items.map((item) => (
          <div className="resume-item" key={item.id}>
            <p className="resume-item__text">{item.text}</p>
            {item.label ? <p className="resume-item__label">{item.label}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

/** تجربه‌های کاری: فهرست ساده با فاصله ۱۶ */
function ExperienceCategory({ category }) {
  return (
    <section className="resume-category" aria-labelledby={`resume-${category.id}`}>
      <h3 className="resume-category__title" id={`resume-${category.id}`}>
        {category.title}
      </h3>

      <ul className="resume-category__items">
        {category.items.map((item) => (
          <li className="resume-item" key={item.id}>
            <p className="resume-item__text">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** مهارت‌های نرم‌افزاری: گروه‌های آیکونی با فاصله ۳۲ و آیکون‌هایی با فاصله ۱۶ */
function SkillsCategory({ category }) {
  return (
    <section className="resume-category" aria-labelledby={`resume-${category.id}`}>
      <h3 className="resume-category__title" id={`resume-${category.id}`}>
        {category.title}
      </h3>

      <div className="resume-groups">
        {category.groups.map((group) => (
          <div className="resume-group" key={group.id}>
            <p className="resume-group__title">{group.title}</p>

            <ul className="resume-group__icons">
              {group.icons.map((icon) => (
                <li className="resume-group__item" key={icon.id}>
                  <Icon
                    name={icon.name}
                    className="resume-group__icon"
                    label={icon.label}
                    fallback={<span className="resume-group__badge">{icon.label}</span>}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
