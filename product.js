// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const currencySelector = document.getElementById('currency-selector');
    const productList = document.getElementById('product-list');
    const products = productList.querySelectorAll('p');
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

    // Add to Cart functionality
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (productList) {
        productList.addEventListener('click', function (e) {
            if (e.target.classList.contains('add-to-cart')) {
                const productElement = e.target.closest('li');
                const productId = productElement.dataset.id;
                const productName = productElement.dataset.name;
                const productPrice = productElement.dataset.price;
                const productCurrency = productElement.querySelector('.price').dataset.currency;

                const cartItem = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    currency: productCurrency
                };

                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));

                alert('Added to Cart');

                displayCartItems(); // Update cart display
            }
        });
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemPrice = parseFloat(item.price) * currencyRates[item.currency];
            total += itemPrice;

            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                ${item.name}: <span class="price">${getCurrencySymbol(item.currency)}${itemPrice.toFixed(2)}</span>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalContainer.innerHTML = `Total: ${getCurrencySymbol('USD')}${total.toFixed(2)}`;
    }

    // Remove from Cart functionality
    cartItemsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = e.target.dataset.id;
            const updatedCart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            displayCartItems(); // Update cart display
        }
    });

    // Display items on page load
    displayCartItems();
});
