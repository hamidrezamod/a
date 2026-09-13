/**
 * فهرست پروژه‌های تئاتر
 * ------------------------------------------------------------
 * هر فایل .md در همین پوشه = یک پوستر/پروژه روی صفحه اصلی.
 * فیلدهای سرصفحه:
 *   title      عنوان پروژه
 *   year       سال
 *   role       نقش (مثلاً Director & Dramaturge)
 *   poster     نام فایل تصویر بدون پسوند (داخل src/assets/images)
 *   posterAlt  توضیح تصویر برای دسترس‌پذیری
 *   column     left یا right → این کارت در کدام ستون بنشیند
 *   order      ترتیب نمایش
 *   layout     نوع چیدمان صفحه جزئیات (فعلاً standard؛ بعداً قابل توسعه)
 */

import { parseFrontMatter } from '../../utils/frontmatter.js';
import { slugFromPath } from '../../utils/slug.js';

const sources = import.meta.glob('./*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function toProject([path, raw]) {
  const slug = slugFromPath(path);
  const { data, body } = parseFrontMatter(raw);

  return {
    id: slug,
    slug,
    type: 'theatre',
    title: data.title || slug,
    year: data.year ? String(data.year) : '',
    role: data.role || '',
    poster: data.poster || '',
    posterAlt: data.posterAlt || data.title || '',
    column: data.column === 'right' ? 'right' : 'left',
    layout: data.layout || 'standard',
    order: typeof data.order === 'number' ? data.order : 100,
    credits: Array.isArray(data.credits) ? data.credits : [],
    body,
  };
}

export const theatreProjects = Object.entries(sources)
  .map(toProject)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

/** پروژه‌ها به تفکیک ستون چیدمان (چیدمان پله‌ای طرح اصلی) */
export const theatreColumns = {
  left: theatreProjects.filter((project) => project.column === 'left'),
  right: theatreProjects.filter((project) => project.column === 'right'),
};

export function getTheatreProject(slug) {
  return theatreProjects.find((project) => project.slug === slug) || null;
}
