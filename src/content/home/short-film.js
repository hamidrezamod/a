/**
 * بخش فیلم کوتاه
 * پلیر ویمیو + تصویر جانشین (poster)
 * آیکون‌های زیر پلیر: ویمیو و گوگل درایو
 * آدرس گوگل درایو را وقتی فرستادی، فقط مقدار را عوض کن.
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
    vimeo: {
      videoId: '1225059359',
      pageUrl: 'https://vimeo.com/1225059359',
      title:
        'The Problem Statement: Reframing Migration - صورت مسئله: بازخوانی کوچ ها',
    },
    platforms: [
      {
        id: 'vimeo',
        label: 'Watch on Vimeo',
        href: 'https://vimeo.com/1225059359',
        icon: 'vimeo',
      },
      {
        id: 'google-drive',
        label: 'Watch on Google Drive',
        // TODO: آدرس گوگل درایو را اینجا بگذار
        href: '',
        icon: 'google-drive',
      },
    ],
  },
};
