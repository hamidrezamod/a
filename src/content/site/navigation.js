/**
 * آیتم‌های منوی اصلی
 * ------------------------------------------------------------
 * منو به‌شکل یک نوار شناور (Dock) در پایین و وسط صفحه قرار می‌گیرد.
 * هر آیتم به id همان بخش در صفحه اصلی لینک می‌شود.
 *
 * گروه «Works» جمع‌شونده (collapsible) است: با کلیک باز می‌شود و
 * زیرمجموعه‌هایش در پنلی بالای نوار ظاهر می‌شوند.
 *
 * برای تغییر ترتیب یا نام منو، فقط همین فهرست را ویرایش کن.
 */
export const navigation = {
  brand: { label: 'Hamid Reza Mohammadi', target: 'top' },
  items: [
    { id: 'about', label: 'About Me' },
    {
      id: 'works',
      label: 'Works',
      collapsible: true,
      items: [
        { id: 'writings', label: 'Writings' },
        { id: 'short-film', label: 'Short Film' },
        { id: 'theatre', label: 'Theatre' },
        { id: 'podcast', label: 'Podcast' },
      ],
    },
    { id: 'resume', label: 'Resume' },
    { id: 'awards', label: 'Awards' },
    { id: 'contact', label: 'Contact' },
  ],
};

/**
 * فهرست مسطح همه لینک‌های منو (شامل زیرمجموعه‌های «Works»)
 * برای مشخص کردن بخش فعال هنگام اسکرول استفاده می‌شود.
 */
export const navigationTargets = navigation.items.flatMap((item) =>
  item.collapsible ? item.items : [item],
);

/** شناسه بخش‌های منو، به همان ترتیبی که در صفحه ظاهر می‌شوند */
export const navigationTargetIds = navigationTargets.map((item) => item.id);
