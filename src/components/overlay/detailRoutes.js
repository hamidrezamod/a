/** آدرس‌های hash برای هر نوع جزئیات؛ آدرس قابل اشتراک‌گذاری می‌ماند */
const TYPES = {
  article: { path: 'writing', hashPrefix: '#/writing/' },
  theatre: { path: 'theatre', hashPrefix: '#/theatre/' },
};

export const DETAIL_TYPES = TYPES;

export function buildDetailHash(type, slug) {
  const config = TYPES[type];
  if (!config || !slug) return '';
  return `${config.hashPrefix}${encodeURIComponent(slug)}`;
}

/** خواندن نوع و slug از آدرس صفحه: مثلاً #/writing/a-pathology... */
export function parseDetailHash(hash) {
  const value = String(hash || '');
  const match = /^#\/([a-z-]+)\/([^?]+)$/.exec(value);
  if (!match) return null;

  const [, path, rawSlug] = match;
  const type = Object.keys(TYPES).find((key) => TYPES[key].path === path);
  if (!type) return null;

  return { type, slug: decodeURIComponent(rawSlug) };
}
