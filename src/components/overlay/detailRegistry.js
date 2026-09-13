import { lazy } from 'react';

/**
 * نگاشت نوع جزئیات به کامپوننت مربوطه
 * ------------------------------------------------------------
 * هر جزئیات با lazy بارگذاری می‌شود؛ یعنی کد مقاله‌ها در بسته اولیه سایت نیست
 * و فقط وقتی کاربر روی کارت کلیک کند دانلود می‌شود.
 *
 * برای اضافه کردن نوع جدید (مثلاً پادکست یا فیلم)، فقط یک خط اینجا اضافه کن.
 */
export const detailViews = {
  article: lazy(() => import('./details/ArticleDetail.jsx')),
  theatre: lazy(() => import('./details/TheatreDetail.jsx')),
};

export function getDetailView(type) {
  return detailViews[type] || null;
}
