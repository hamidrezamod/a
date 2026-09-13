import { useCallback, useEffect, useRef, useState } from 'react';
import { navigation, navigationTargetIds } from '../../content/site/navigation.js';
import { scrollToSection } from '../../utils/scroll.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { useEscapeKey } from '../../hooks/useEscapeKey.js';
import { Icon } from '../ui/Icon.jsx';

const WORKS_PANEL_ID = 'site-menu-works';

/**
 * منوی اصلی (Bottom Dock Menu)
 * ------------------------------------------------------------
 * یک نوار ثابت، وسط‌چین و چسبان به پایین صفحه که با اسکرول هم
 * همان‌جا (پایین و وسط) باقی می‌ماند و کل عرض صفحه را نمی‌گیرد.
 *
 * گروه «Works» باز و بسته می‌شود: با کلیک روی همان دکمه، کلید
 * Escape یا کلیک بیرون از منو بسته می‌شود و فوکوس به دکمه برمی‌گردد.
 * پنل زیرمجموعه‌ها بالای نوار باز می‌شود و در جریان فوکوس دقیقاً
 * بعد از دکمه «Works» قرار دارد.
 */
export function SiteMenu() {
  const [isWorksOpen, setWorksOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);
  const activeSection = useActiveSection(navigationTargetIds);

  const closeWorks = useCallback(() => setWorksOpen(false), []);
  const toggleWorks = useCallback(() => setWorksOpen((open) => !open), []);

  /* بستن پنل با کلیک/لمس بیرون از منو */
  useEffect(() => {
    if (!isWorksOpen) return undefined;

    const onPointerDown = (event) => {
      const root = rootRef.current;
      if (root && !root.contains(event.target)) closeWorks();
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isWorksOpen, closeWorks]);

  /* بستن پنل با Escape و بازگرداندن فوکوس به دکمه «Works» */
  const handleEscape = useCallback(() => {
    setWorksOpen(false);
    toggleRef.current?.focus();
  }, []);
  useEscapeKey(handleEscape, isWorksOpen);

  const goToSection = (event, targetId) => {
    event.preventDefault();
    scrollToSection(targetId);
    if (typeof history !== 'undefined') {
      history.replaceState(null, '', `#${targetId}`);
    }
    closeWorks();
  };

  const classOf = (...names) => names.filter(Boolean).join(' ');

  const renderItem = (item) => {
    /* آیتم ساده: لینک به همان بخش */
    if (!item.collapsible) {
      const isActive = item.id === activeSection;

      return (
        <li className="site-menu__item" key={item.id}>
          <a
            className={classOf('site-menu__link', isActive && 'is-active')}
            href={`#${item.id}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={(event) => goToSection(event, item.id)}
          >
            {item.label}
          </a>
        </li>
      );
    }

    /* آیتم جمع‌شونده («Works») با پنل زیرمجموعه‌ها */
    const children = item.items ?? [];
    const isActive = children.some((child) => child.id === activeSection);

    return (
      <li className="site-menu__item site-menu__item--group" key={item.id}>
        <button
          ref={toggleRef}
          type="button"
          className={classOf(
            'site-menu__toggle',
            isWorksOpen && 'is-open',
            isActive && 'is-active',
          )}
          aria-expanded={isWorksOpen}
          aria-controls={WORKS_PANEL_ID}
          onClick={toggleWorks}
        >
          {item.label}
          <Icon name="arrow-down" className="site-menu__chevron" size={14} />
        </button>

        <div
          id={WORKS_PANEL_ID}
          className={classOf('site-menu__panel', isWorksOpen && 'is-open')}
          aria-hidden={!isWorksOpen}
        >
          <ul className="site-menu__panel-list" role="list">
            {children.map((child) => {
              const isChildActive = child.id === activeSection;

              return (
                <li className="site-menu__panel-item" key={child.id}>
                  <a
                    className={classOf('site-menu__panel-link', isChildActive && 'is-active')}
                    href={`#${child.id}`}
                    aria-current={isChildActive ? 'true' : undefined}
                    onClick={(event) => goToSection(event, child.id)}
                  >
                    {child.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    );
  };

  return (
    <nav className="site-menu" aria-label="Main navigation" ref={rootRef}>
      <ul className="site-menu__bar" role="list">
        {navigation.items.map(renderItem)}
      </ul>
    </nav>
  );
}
