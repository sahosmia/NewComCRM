export const formatCurrency = (amount: number | string, currency: string = 'BDT'): string => {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(value)) return `${currency} 0`;

    return new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value).replace('BDT', 'BDT ').replace('৳', 'BDT ');
};
