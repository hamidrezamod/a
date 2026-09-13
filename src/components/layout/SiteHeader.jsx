import { navigation } from '../../content/site/navigation.js';
import { scrollToSection } from '../../utils/scroll.js';

/**
 * منوی اصلی (Navbar / Menu)
 * طبق دیزاین: بالای صفحه، چسبان (sticky)، فهرست وسط‌چین با فونت ۱۹px و وزن ۵۰۰.
 * لینک‌ها به بخش‌های همان صفحه اسکرول می‌کنند و برای پاپ‌آپ‌های آینده آماده‌اند.
 */
export function SiteHeader() {
  const handleClick = (event, targetId) => {
    event.preventDefault();
    scrollToSection(targetId);
    if (typeof history !== 'undefined') {
      history.replaceState(null, '', `#${targetId}`);
    }
  };

  return (
    <header className="site-header">
      <nav className="page-shell site-header__inner" aria-label="Main navigation">
        <ul className="site-nav__list">
          {navigation.links.map((link) => (
            <li className="site-nav__item" key={link.id}>
              <a
                className="site-nav__link"
                href={`#${link.id}`}
                onClick={(event) => handleClick(event, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
