import { MediaFrame } from '../media/MediaFrame.jsx';

/** یک گواهی/افتخار — عرض تصویر ۳۳۰.۶۷ طبق دیزاین */
export function AwardCard({ award }) {
  return (
    <figure className="award-card">
      <MediaFrame className="award-card__media" media={award.media} alt={award.alt} />
    </figure>
  );
}
