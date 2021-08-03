/* eslint-disable import/prefer-default-export */
export const formatNumber = (number: number, withDecimal = false, locale = 'en-US'): string => {
  if (withDecimal) {
    return number.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return number.toLocaleString(locale);
};
