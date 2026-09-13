# Hamid Reza Mohammadi — Static Portfolio

این نسخه عمداً با HTML، CSS و JavaScript ساده ساخته شده است.

## ساختار اصلی

- `index.html`: صفحه اصلی
- `css/style.css`: طراحی و اندازه‌ها
- `js/main.js`: کد بسیار ساده برای نمایش خودکار تصاویر واقعی
- `assets/images/`: محل تصاویر WebP
- `assets/icons/`: محل آیکون‌های SVG
- `content/articles/`: متن جداگانه مقاله‌ها
- `content/theatre/`: متن جداگانه پروژه‌های تئاتر

فعلاً کارت‌های مقاله و تئاتر فقط اطلاعات صفحه اصلی را نشان می‌دهند. در مرحله Popup، فایل‌های داخل `content` با یک قالب ثابت خوانده می‌شوند.

## اجرای ساده

برای نسخه فعلی کافی است روی `index.html` دوبار کلیک کنید.

در مرحله‌ای که Popupها و فراخوانی فایل‌های جداگانه اضافه شوند، بهتر است پروژه با VS Code و افزونه Live Server اجرا شود.

## محل قرار دادن تصاویر

برای مثال:

```text
assets/images/hero.webp
assets/images/about.webp
assets/images/writing-01.webp
assets/images/theatre-relingo.webp
```

نام فایل‌ها داخل `index.html` مشخص شده است. اگر فایل را با همان نام و مسیر اضافه کنی، Placeholder خودش به تصویر واقعی تبدیل می‌شود.
