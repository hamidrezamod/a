/**
 * پادکست — در صورت نیاز به قسمت‌های بیشتر، به فهرست episodes اضافه کن
 */
export { podcastSection } from '../home/podcast.js';

export const podcastEpisodes = [
  {
    id: 'episode-01',
    title: 'A Symbol of Modernity or a Disgrace for the City',
    role: 'Researcher & Content Consultant',
    cover: 'podcast',
    coverAlt: 'Cover artwork of the podcast episode',
    links: [
      { id: 'castbox', label: 'Listen on Castbox', href: '#', icon: 'castbox' },
      { id: 'instagram', label: 'Podgard on Instagram', href: '#', icon: 'instagram' },
    ],
  },
];
