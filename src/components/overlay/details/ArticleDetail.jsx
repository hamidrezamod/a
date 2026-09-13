import { getArticle } from '../../../content/writings/index.js';
import { StandardArticleLayout } from '../layouts/StandardArticleLayout.jsx';

/**
 * جزئیات نوشته (مقاله)
 * محتوا از فایل markdown همان مقاله خوانده می‌شود.
 * چیدمان نهایی مقاله پس از دریافت دیزاین اختصاصی، فقط در همین فایل و
 * فایل layouts/StandardArticleLayout.jsx تغییر می‌کند.
 */
export default function ArticleDetail({ slug }) {
  const article = getArticle(slug);

  if (!article) {
    return <p className="detail-overlay__placeholder">This article was not found.</p>;
  }

  return <StandardArticleLayout article={article} />;
}
