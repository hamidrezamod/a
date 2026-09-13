/**
 * خواندن «سرصفحه» (front matter) فایل‌های متنی
 * ------------------------------------------------------------
 * همیشه فایل‌ها این شکل شروع می‌شوند:
 *
 *   ---
 *   title: عنوان
 *   year: 2024
 *   roles: [Director, Writer]
 *   ---
 *   متن اصلی...
 *
 * نکته‌ها:
 *  - مقادیر ساده: title: متن
 *  - فهرست افقی: roles: [Director, Writer]
 *  - فهرست عمودی:
 *      roles:
 *        - Director
 *        - Writer
 *  - گیومه لازم نیست ولی اگر متن با «:» یا «#» شروع شود، در گیومه بگذار.
 */

export function parseFrontMatter(raw) {
  const source = String(raw ?? '').replace(/^\uFEFF/, '');
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/.exec(source);

  if (!match) {
    return { data: {}, body: source.trim() };
  }

  const data = {};
  let listKey = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;

    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && listKey) {
      data[listKey].push(parseScalar(listItem[1]));
      continue;
    }

    const pair = /^([A-Za-z0-9_.-]+)\s*:\s*(.*)$/.exec(line);
    if (!pair) continue;

    const [, key, rawValue] = pair;
    if (rawValue.trim() === '') {
      listKey = key;
      data[key] = [];
    } else {
      listKey = null;
      data[key] = parseValue(rawValue);
    }
  }

  // اگر کلید خالی بدون آیتم ماند، به رشته خالی تبدیل می‌شود
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length === 0) data[key] = '';
  }

  return { data, body: match[1] ? source.slice(match[0].length).trim() : '' };
}

function parseValue(rawValue) {
  const value = rawValue.trim();

  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((part) => parseScalar(part));
  }

  return parseScalar(value);
}

function parseScalar(rawValue) {
  const value = String(rawValue).trim().replace(/^["']|["']$/g, '');

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

  return value;
}

/** تبدیل مقدار به رشته، برای مقادیری که ممکن است فهرست باشند */
export function toText(value, fallback = '') {
  if (Array.isArray(value)) return value.join(' · ');
  if (value === undefined || value === null) return fallback;
  return String(value);
}
