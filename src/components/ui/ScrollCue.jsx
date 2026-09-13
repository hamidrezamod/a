import { Icon } from './Icon.jsx';
import { scrollToSection } from '../../utils/scroll.js';

/** آیکون پایین هیرو برای رفتن به بخش درباره من */
export function ScrollCue({ target, label = 'Scroll down' }) {
  const handleClick = (event) => {
    event.preventDefault();
    scrollToSection(target);
    if (typeof history !== 'undefined') {
      history.replaceState(null, '', `#${target}`);
    }
  };

  return (
    <a className="scroll-cue" href={`#${target}`} aria-label={label} onClick={handleClick}>
      <Icon name="arrow-down" className="scroll-cue__icon" />
    </a>
  );
}
