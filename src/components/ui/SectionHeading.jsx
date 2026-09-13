/** عنوان بخش‌های صفحه — راست‌چین / چپ‌چین / وسط‌چین */
export function SectionHeading({ id, align = 'left', children, className = '', ...rest }) {
  const alignClass =
    align === 'right'
      ? 'section__title--right'
      : align === 'center'
        ? 'section__title--center'
        : '';

  return (
    <h2 id={id} className={['section__title', alignClass, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </h2>
  );
}
