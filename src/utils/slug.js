/** ساخت نشانی خوانا از نام فایل */
export function slugFromPath(path) {
  return String(path)
    .replace(/^\.\//, '')
    .replace(/\.md$/, '');
}
