// این فایل عمداً ساده نگه داشته شده است.
// اگر تصویر واقعی در مسیر مشخص‌شده وجود داشته باشد، خودکار جای Placeholder نمایش داده می‌شود.

document.querySelectorAll('[data-media]').forEach((slot) => {
  const image = slot.querySelector('img');
  if (!image) return;

  const showImage = () => slot.classList.add('has-image');
  const keepPlaceholder = () => slot.classList.remove('has-image');

  image.addEventListener('load', showImage);
  image.addEventListener('error', keepPlaceholder);

  if (image.complete && image.naturalWidth > 0) {
    showImage();
  }
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
