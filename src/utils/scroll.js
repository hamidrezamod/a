/**
 * اسکرول نرم به یک بخش از صفحه
 * (اگر کاربر در سیستم خودش «کاهش حرکت» را فعال کرده باشد، بدون انیمیشن انجام می‌شود)
 */
export function scrollToSection(targetId) {
  if (typeof document === 'undefined' || !targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}
