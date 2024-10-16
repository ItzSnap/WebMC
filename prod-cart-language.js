// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const currencySelector = document.getElementById('currency-selector');
    const productList = document.getElementById('product-list');
    const products = productList.querySelectorAll('li');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    const currencyRates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 156,
        INR: 83
    };

    function updatePrices() {
        const selectedCurrency = currencySelector ? currencySelector.value : 'USD';
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

    if (currencySelector) {
        currencySelector.addEventListener('change', updatePrices);
    }

    // Initialize prices on page load
    updatePrices();

    
});
