# راهنمای ویرایش محتوا

همه متن‌ها و تصاویر جدا از کد هستند. برای تغییر سایت **هیچ‌وقت لازم نیست کد کامپوننت‌ها را باز کنی.**

---

## ۱) افزودن یا ویرایش یک مقاله (نوشته‌ها)

پوشه: `src/content/writings/`

هر مقاله = یک فایل `.md` (متن ساده). برای مقاله جدید، یک فایل کپی کن، اسمش را عوض کن (اسم فایل همان آدرس مقاله می‌شود) و بعد ویرایش کن:

```md
---
title: A Pathology of Iranian Underground Cinema
subtitle: Read in Farsi
date: 2024
lang: fa
cover: writing01
coverAlt: A Pathology of Iranian Underground Cinema
mediaSide: left
order: 1
---

متن مقاله از اینجا شروع می‌شود...
```

| فیلد | توضیح |
| --- | --- |
| `title` | عنوان کارت و عنوان مقاله |
| `subtitle` | متن کوچک زیر عنوان کارت (مثلاً «Read in Farsi») |
| `date` | سال یا تاریخ |
| `lang` | `fa` برای متن فارسی (راست‌به‌چپ) |
| `cover` | نام فایل تصویر بدون پسوند (داخل `src/assets/images`) |
| `coverAlt` | توضیح تصویر برای دسترس‌پذیری |
| `mediaSide` | `left` یا `right` — تصویر کارت سمت کدام طرف باشد |
| `order` | ترتیب نمایش کارت‌ها (۱، ۲، ۳، ...) |

### امکانات داخل متن مقاله

```md
## تیتر بخش
### تیتر کوچک‌تر

متن ساده پاراگراف.

> این یک نقل‌قول است.

- آیتم فهرست
- آیتم دوم

![توضیح تصویر](image:writing02 "کپشن اختیاری زیر تصویر")

[متن لینک](https://example.com)
```

نکته مهم: برای تصویر، به‌جای آدرس، بنویس `image:نام‌فایل` تا سایت خودش مسیر درست را پیدا کند.

---

## ۲) افزودن یا ویرایش یک پروژه تئاتر

پوشه: `src/content/theatre/`

هر پروژه = یک فایل `.md`:

```md
---
title: Relingo
year: 2022
role: Assistant Director
poster: theatre-relingo
posterAlt: Relingo poster
column: left
order: 1
layout: standard
---

متن معرفی پروژه...
```

| فیلد | توضیح |
| --- | --- |
| `column` | `left` یا `right` — کارت در کدام ستون بنشیند (چیدمان پله‌ای طرح) |
| `order` | ترتیب کارت‌ها |
| `layout` | نوع چیدمان صفحه جزئیات؛ فعلاً `standard` (بعداً می‌شود چیدمان اختصاصی هر پروژه ساخت) |

---

## ۳) تغییر رزومه

فایل: `src/content/resume/index.js`

سه بخش دارد: `education` (تحصیلات)، `experience` (تجربه‌ها)، `skills` (مهارت‌های نرم‌افزاری).
متن هر آیتم را همان‌جا عوض کن یا آیتم جدید اضافه کن.

---

## ۴) تغییر افتخارات و گواهی‌نامه‌ها

۱. تصویر جدید را (با فرمت WebP) در `src/assets/images/` بگذار — مثلاً `award06.webp`
۲. فایل `src/content/awards/index.js` را باز کن و یک خط اضافه کن:

```js
{ id: 'award06', media: 'award06', alt: 'توضیح گواهی ششم' },
```

---

## ۵) تغییر تصاویر

- تصویر جدید را در `src/assets/images/` بگذار؛ فقط همین.
- اگر نام فایل را همان نام قبلی بگذاری، همه‌جا خودکار جایگزین می‌شود.
- اگر نام تازه است، در فایل محتوا مقدار `cover` یا `poster` یا `media` را به همان نام (بدون `.webp`) تغییر بده.
- اگر ابعاد تصویر با تصویر قبلی فرق دارد، در `src/assets/images/index.js` بخش `imageSizes` اندازه جدید را وارد کن (تا چیدمان نپرد).

## ۶) تغییر آیکون‌ها

آیکون‌ها در `src/assets/icons/` هستند و با نام فایل صدا زده می‌شوند (مثلاً `instagram.svg`).
اگر فایل جدیدی با همان نام بگذاری، جایگزین می‌شود. اگر آیکونی موجود نبود، به‌جایش یک برچسب متنی کوچک نمایش داده می‌شود.

## ۷) تغییر رنگ‌ها، اندازه‌ها و فاصله‌ها

همه در یک فایل: `src/styles/tokens.css`

- رنگ‌ها: `--color-canvas` و `--color-ink`
- اندازه فونت‌ها: `--fs-*`
- فاصله بخش‌ها: `--space-section` و `--space-title-content`
- اندازه‌های هیرو، تصاویر، پوسترها، ویدیو: با نام‌های واضح مثل `--hero-media-width`
- زمان‌بندی حرکت: `--motion-*`

## ۸) تغییر متن‌های عمومی سایت

- نام و عنوان: `src/content/site/profile.js`
- منو: `src/content/site/navigation.js`
- اطلاعات تماس: `src/content/site/contact.js` (لینک‌های «#» را با آدرس واقعی عوض کن)
- درباره من و هیرو: `src/content/home/`
- فیلم کوتاه و پادکست: `src/content/home/short-film.js` و `src/content/home/podcast.js`

## ۹) افزودن پری‌لودر و ترنزیشن‌های اختصاصی

پوشه `src/animation/` و فایل راهنمای همان پوشه را ببین: `src/animation/README.md`.


---

## ۱۰) جدول تایپوگرافی (رفرنس رسمی سایت)

همه این مقادیر در `src/styles/tokens.css` تعریف شده‌اند و در همه بخش‌ها استفاده می‌شوند:

| کاربرد | Size | Line Height | Weight | توکن |
| --- | --- | --- | --- | --- |
| Hero Title | ۱۲۸px | ۱۰۰px | ۶۰۰ | `--fs-hero` / `--lh-hero` / `--fw-hero` |
| Hero Subtitle | ۳۴px | ۳۸px | ۴۰۰ | `--fs-hero-subtitle` |
| Section Title | ۶۴px | ۶۹px | ۶۰۰ | `--fs-section-title` |
| Card Title | ۴۰px | ۴۴px | ۶۰۰ | `--fs-card-title` |
| Card Subtitle | ۲۴px | ۳۰px | ۴۰۰ | `--fs-card-subtitle` |
| Card Body | ۲۰px | ۳۱px | ۴۰۰ | `--fs-card-body` |
| Navbar / Menu | ۱۹px | Auto | ۵۰۰ | `--fs-nav` |
| Button | ۱۹px | Auto | ۵۰۰ | `--fs-button` |
| Label | ۱۶px | Auto | ۵۰۰ | `--fs-label` |

کلاس‌های آماده در `src/styles/typography.css`: `.type-hero-title`، `.type-hero-subtitle`،
`.type-section-title`، `.type-card-title`، `.type-card-subtitle`، `.type-label`، `.type-body`.


---

## ۱۱) جای خالی‌ها (چیزهایی که بعداً اضافه می‌شوند)

### آیکون‌ها
آیکون‌های SVG اصلی هنوز ارسال نشده‌اند و فعلاً نمونه‌های ساده جایشان هستند.
برای جایگزینی، فایل SVG را با همان نام در `src/assets/icons/` بگذار.
فهرست کامل نام‌ها داخل `src/assets/icons/README.md` نوشته شده است.

### فونت فارسی
فایل فونت را داخل `src/assets/fonts/persian/` بگذار؛ نام فایل باید وزن را داشته باشد:

```text
src/assets/fonts/persian/vazirmatn-400.woff2
src/assets/fonts/persian/vazirmatn-500.woff2
```

سایت خودش فونت را فعال می‌کند. تا آن زمان متن‌های فارسی با فونت جانشین نمایش داده می‌شوند.

### آدرس گوگل‌درایو فیلم کوتاه
در `src/content/home/short-film.js` این خط را پر کن:

```js
{ id: 'google-drive', label: 'Watch on Google Drive', href: '', icon: 'google-drive' }
```

### لینک‌های پادکست
در `src/content/home/podcast.js` آدرس دو مورد `castbox` و `instagram` را وارد کن.
تا وقتی آدرس خالی باشد، متن نمایش داده می‌شود ولی لینک نیست (تا کاربر روی لینک خالی کلیک نکند).
