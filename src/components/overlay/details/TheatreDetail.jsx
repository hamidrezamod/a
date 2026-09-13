import { getTheatreProject } from '../../../content/theatre/index.js';
import { StandardProjectLayout } from '../layouts/StandardProjectLayout.jsx';

/**
 * جزئیات پروژه تئاتر
 * اگر پروژه‌ای چیدمان اختصاصی داشته باشد، در فایل محتوای خودش فیلد
 * layout را تغییر می‌دهیم و اینجا چیدمان مناسب انتخاب می‌شود.
 */
export default function TheatreDetail({ slug }) {
  const project = getTheatreProject(slug);

  if (!project) {
    return <p className="detail-overlay__placeholder">This project was not found.</p>;
  }

  switch (project.layout) {
    case 'standard':
    default:
      return <StandardProjectLayout project={project} />;
  }
}
