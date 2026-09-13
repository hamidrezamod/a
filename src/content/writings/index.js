/**
 * فهرست نوشته‌ها
 * ------------------------------------------------------------
 * هر فایل .md که در همین پوشه بگذاری، به‌صورت خودکار به کارت نوشته‌ها
 * تبدیل می‌شود. نام فایل، نشانی (slug) همان مقاله است.
 * ترتیب کارت‌ها با مقدار order در سرصفحه فایل مشخص می‌شود.
 *
 * برای اضافه کردن مقاله جدید: یک فایل .md کپی کن، اسمش را عوض کن
 * و مقدارهای سرصفحه را تغییر بده. همین!
 */

import { parseFrontMatter } from '../../utils/frontmatter.js';
import { slugFromPath } from '../../utils/slug.js';

const sources = import.meta.glob('./*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function toArticle([path, raw]) {
  const slug = slugFromPath(path);
  const { data, body } = parseFrontMatter(raw);

  return {
    id: slug,
    slug,
    type: 'article',
    title: data.title || slug,
    subtitle: data.subtitle || '',
    date: data.date ? String(data.date) : '',
    lang: data.lang || 'fa',
    cover: data.cover || '',
    coverAlt: data.coverAlt || data.title || '',
    mediaSide: data.mediaSide === 'right' ? 'right' : 'left',
    order: typeof data.order === 'number' ? data.order : 100,
    // متن خام مارک‌داون؛ تبدیل به HTML فقط وقتی پاپ‌آپ باز شود انجام می‌شود
    body,
  };
}

export const articles = Object.entries(sources)
  .map(toArticle)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug) || null;
}
