import { navigation } from '../../content/site/navigation.js';
import { scrollToSection } from '../../utils/scroll.js';

/**
 * منوی اصلی
 * موقعیت دقیق و ظاهر منو پس از دریافت دیزاین نهایی تنظیم می‌شود.
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
      <div className="page-shell site-header__inner">
        <a
          className="site-header__brand"
          href={`#${navigation.brand.target}`}
          onClick={(event) => handleClick(event, navigation.brand.target)}
        >
          {navigation.brand.label}
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <ul className="site-nav__list">
            {navigation.links.map((link) => (
              <li key={link.id} className="site-nav__item">
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
      </div>
    </header>
  );
}
