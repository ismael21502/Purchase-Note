/**
 * Formatea un número como un string de moneda.
 * @param {number | string} amount - El valor a formatear (ej. 1250).
 * @param {string} currency - El código de moneda (ej. 'USD' o 'MXN').
 * @param {string} locale - El local para el formato (ej. 'en-US' o 'es-MX').
 * @returns {string} - El string formateado (ej. "$1,250.00").
 */
export const formatCurrency = (amount, currency = 'MXN', locale = 'es-MX') => {
    // 1. Asegura que sea un número
    const num = parseFloat(amount) || 0;

    // 2. Usa la API Intl para formatear
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(num);
};