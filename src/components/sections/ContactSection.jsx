import { contact } from '../../content/site/contact.js';
import { Icon } from '../ui/Icon.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** بخش اطلاعات تماس */
export function ContactSection() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="page-shell">
        <SectionHeading id="contact-title" align="center">
          {contact.title}
        </SectionHeading>

        <ul className="section__content contact__grid">
          {contact.items.map((item) => (
            <li className="contact__cell" key={item.id}>
              <ContactLink item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactLink({ item }) {
  const isExternal = Boolean(item.external) && item.href?.startsWith('http');

  return (
    <a
      className="contact__item"
      href={item.href}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <Icon name={item.icon} className="contact__icon" />
      <span className="contact__label">{item.label}</span>
    </a>
  );
}
