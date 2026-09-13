/**
 * رزومه — کاملاً جدا از کد و استایل
 * سه دسته داریم: تحصیلات، تجربه‌ها، مهارت‌های نرم‌افزاری
 * برای تغییر هر دسته، فقط همین فایل را ویرایش کن.
 */

export const resumeSection = {
  id: 'resume',
  title: 'Resume',
};

/** تحصیلات — label همان نام دانشگاه است که ۸ پیکسل پایین‌تر نوشته می‌شود */
export const education = {
  id: 'education',
  title: 'Education',
  items: [
    { id: 'ma', text: 'Master: Cinema — 2020–2023', label: 'Sooreh University' },
    { id: 'ba', text: 'Bachelor: Directing and Acting — 2015–2020', label: 'University of Tehran' },
  ],
};

/** تجربه‌های کاری */
export const experience = {
  id: 'experience',
  title: 'Experience',
  items: [
    { id: 'exp-1', text: 'Freelance UI/UX Designer — 2024–Present' },
    { id: 'exp-2', text: 'Content Creator & Content Consultant, Podgard Art Podcast — 2022–2025' },
    { id: 'exp-3', text: 'Literary Editor, Enba Magazine — 2018–2020' },
    { id: 'exp-4', text: 'Editorial Board Member, Practical Examination Guide for Theatre Arts — 2018' },
    { id: 'exp-5', text: 'Theatre Venue Supervisor, 19th Experience Theatre Festival — 2019' },
    { id: 'exp-6', text: 'Workshop & Panel Coordinator, 18th Experience Theatre Festival — 2018' },
    { id: 'exp-7', text: 'Executive Team Member, Practical Examination for Theatre Arts — 2016–2018' },
  ],
};

/**
 * مهارت‌های نرم‌افزاری
 * هر آیکون با نام فایل SVG داخل src/assets/icons شناخته می‌شود.
 * label فقط زمانی دیده می‌شود که فایل آیکون موجود نباشد.
 */
export const skills = {
  id: 'skills',
  title: 'Software Skills',
  groups: [
    {
      id: 'design',
      title: 'Design',
      icons: [
        { id: 'figma', name: 'figma', label: 'Figma' },
        { id: 'premiere', name: 'premiere', label: 'Premiere' },
        { id: 'illustrator', name: 'illustrator', label: 'Illustrator' },
        { id: 'photoshop', name: 'photoshop', label: 'Photoshop' },
      ],
    },
    {
      id: 'management',
      title: 'Project Management',
      icons: [
        { id: 'notion', name: 'notion', label: 'Notion' },
        { id: 'asana', name: 'asana', label: 'Asana' },
        { id: 'office365', name: 'office365', label: '365' },
      ],
    },
    {
      id: 'content',
      title: 'Writing & Content',
      icons: [
        { id: 'word', name: 'word', label: 'Word' },
        { id: 'docs', name: 'docs', label: 'Docs' },
      ],
    },
  ],
};

export const resumeCategories = [education, experience, skills];
