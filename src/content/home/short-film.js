/**
 * بخش فیلم کوتاه
 * پلیر ویمیو + تصویر جانشین (poster)
 */
export const shortFilmSection = {
  id: 'short-film',
  title: 'Short Film',
  film: {
    title: 'The Problem Statement: Reframing Migration',
    year: '2024',
    role: 'Director & Writer',
    poster: 'short-film',
    posterAlt: 'Still frame from The Problem Statement: Reframing Migration',
    watchLabel: 'Watch on:',
    vimeo: {
      videoId: '1225059359',
      pageUrl: 'https://vimeo.com/1225059359',
      // عنوان رسمی ویدیو در ویمیو
      title: 'The Problem Statement: Reframing Migration - صورت مسئله: بازخوانی کوچ ها',
    },
    platforms: [
      { id: 'vimeo', label: 'Watch on Vimeo', href: 'https://vimeo.com/1225059359', icon: 'play' },
      { id: 'vimeo-link', label: 'Open the film on Vimeo', href: 'https://vimeo.com/1225059359', icon: 'arrow-up-right' },
    ],
  },
};
