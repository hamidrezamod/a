import { useMemo } from 'react';
import { MediaFrame } from '../../media/MediaFrame.jsx';
import { renderMarkdown } from '../../../utils/markdown.js';

/**
 * قالب استاندارد مقاله — مشترک بین همه مقاله‌ها
 * داده‌ها از فایل محتوای هر مقاله می‌آید: عنوان، زیرعنوان، تاریخ، تصویر، متن.
 * چیدمان نهایی (Article Detail) پس از دریافت دیزاین ارسالی تکمیل می‌شود.
 */
export function StandardArticleLayout({ article }) {
  const isRtl = article.lang === 'fa';
  const html = useMemo(() => renderMarkdown(article.body), [article.body]);

  return (
    <article className="detail-article" data-detail-type="article">
      <header className="detail-article__header">
        <h1 className="detail-article__title" id="detail-title">
          {article.title}
        </h1>
        {article.subtitle ? <p className="detail-article__subtitle">{article.subtitle}</p> : null}
        {article.date ? <p className="detail-article__date">{article.date}</p> : null}
      </header>

      {article.cover ? (
        <MediaFrame
          className="detail-article__cover"
          media={article.cover}
          alt={article.coverAlt}
          ratio="670 / 355.77"
        />
      ) : null}

      {html ? (
        <div
          className={['prose', isRtl ? 'prose--fa' : ''].filter(Boolean).join(' ')}
          dir={isRtl ? 'rtl' : undefined}
          lang={isRtl ? 'fa' : undefined}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : null}
    </article>
  );
}
