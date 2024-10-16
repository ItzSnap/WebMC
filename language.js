// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const currencySelector = document.getElementById('currency-selector');
    const productList = document.getElementById('product-list');
    const products = productList.querySelectorAll('li');

    const currencyRates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110,
        INR: 75
    };

    function updatePrices() {
        const selectedCurrency = currencySelector.value;
        products.forEach(product => {
            const basePrice = parseFloat(product.dataset.price);
            const convertedPrice = (basePrice * currencyRates[selectedCurrency]).toFixed(2);
            const priceElement = product.querySelector('.price');
            priceElement.textContent = `${getCurrencySymbol(selectedCurrency)}${convertedPrice}`;
            priceElement.dataset.currency = selectedCurrency;
        });
    }

    function getCurrencySymbol(currency) {
        switch (currency) {
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            case 'GBP':
                return '£';
            case 'JPY':
                return '¥';
            case 'INR':
                return '₹';
            default:
                return '';
        }
    }

    currencySelector.addEventListener('change', updatePrices);

    // Initialize prices on page load
    updatePrices();
});
