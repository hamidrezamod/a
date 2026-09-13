/**
 * تبدیل متن Markdown به HTML
 * ------------------------------------------------------------
 * قابلیت‌ها: تیتر، پاراگراف، فهرست، بلوک‌نقل، لینک، تصویر.
 *
 * نکته مهم درباره تصاویر داخل متن:
 *   ![توضیح تصویر](image:writing02 "کپشن اختیاری")
 * با نوشتن image:نام‌فایل، تصویر از پوشه src/assets/images خوانده می‌شود
 * و نام فایل به مسیر نهایی خودش تبدیل می‌شود.
 */

import { marked } from 'marked';
import { imageUrl, imageSize } from '../assets/images/index.js';

marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    image({ href, title, text }) {
      const isLocal = typeof href === 'string' && href.startsWith('image:');
      const key = isLocal ? href.slice('image:'.length) : '';
      const src = isLocal ? imageUrl(key) : href;

      if (!src) return '';

      const size = isLocal ? imageSize(key) : null;
      const dimensions = size ? ` width="${size[0]}" height="${size[1]}"` : '';
      const alt = escapeAttribute(text ?? '');
      const img = `<img src="${src}" alt="${alt}"${dimensions} loading="lazy" decoding="async" />`;

      if (!title) return img;

      return `<figure class="prose__figure">${img}<figcaption>${escapeHtml(title)}</figcaption></figure>`;
    },
  },
});

export function renderMarkdown(markdown) {
  const source = String(markdown ?? '').trim();
  if (!source) return '';
  return marked.parse(source);
}

function escapeAttribute(value) {
  return String(value).replace(/"/g, '&quot;');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
