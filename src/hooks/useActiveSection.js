import { useEffect, useState } from 'react';

/**
 * بخش فعال صفحه هنگام اسکرول
 * ------------------------------------------------------------
 * یک نوار باریک در وسط ارتفاع ویوپرت در نظر گرفته می‌شود
 * (rootMargin منفی از بالا و پایین) و هر بخشی که از آن نوار عبور کند
 * «فعال» می‌شود. اگر چند بخش هم‌زمان داخل نوار بودند، بخشی که
 * بیشترین سطح آن دیده می‌شود انتخاب می‌گردد.
 *
 * @param {string[]} sectionIds شناسه بخش‌ها (ترتیب سند)
 * @returns {string|null} شناسه بخش فعال
 */
export function useActiveSection(sectionIds) {
  const idsKey = Array.isArray(sectionIds) ? sectionIds.join(' ') : '';
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;

    const ids = idsKey ? idsKey.split(' ') : [];
    if (ids.length === 0) return undefined;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const ratios = new Map();

    const pickActive = () => {
      let best = null;
      let bestRatio = 0;

      // ترتیب سند اولویت دارد؛ پس فهرست ids را از اول پیمایش می‌کنیم
      ids.forEach((id) => {
        const ratio = ratios.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });

      setActiveId(best);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) ratios.set(entry.target.id, entry.intersectionRatio);
          else ratios.delete(entry.target.id);
        });
        pickActive();
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    pickActive();

    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
