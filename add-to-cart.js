// Function to get cart items from localStorage
function getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

// Function to save cart items to localStorage
function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to add item to the cart
function addToCart(id, name, price) {
    const cartItems = getCartItems();
    const itemIndex = cartItems.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += 1;
    } else {
        cartItems.push({ id, name, price, quantity: 1 });
    }

    saveCartItems(cartItems);
    alert('Added to Cart');
}

// Function to remove item from the cart
function removeFromCart(id) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id != id);
    saveCartItems(cartItems);
    displayCartItems();
}

// Currency conversion rates
const conversionRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 156,
    INR: 83
};

// Function to calculate total price
function calculateTotalPrice(cartItems, currency) {
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total * conversionRates[currency];
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const selectedCurrency = document.getElementById('currency-selector').value;

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} USD</span>
                <span>Quantity: ${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        if (totalPriceElement) {
            const totalPrice = calculateTotalPrice(cartItems, selectedCurrency);
            totalPriceElement.innerHTML = `Total Price: ${totalPrice.toFixed(2)} ${selectedCurrency}`;
        }
    }
}

// Event listener for the Add to Cart buttons on the product page
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productElement = event.target.parentElement;
        const id = productElement.dataset.id;
        const name = productElement.dataset.name;
        const price = parseFloat(productElement.dataset.price);

        addToCart(id, name, price);
    });
});

// Event listener for currency change
if (document.getElementById('currency-selector')) {
    document.getElementById('currency-selector').addEventListener('change', displayCartItems);
}

// Display cart items when the cart page is loaded
if (document.getElementById('cartItems')) {
    displayCartItems();
}

// Event listener for the checkout button
if (document.getElementById('checkout-btn')) {
    document.getElementById('checkout-btn').addEventListener('click', function () {
        alert('Thank you for your order! Your order has been received.');
        localStorage.removeItem('cartItems');
        window.location.href = 'amazon.html'; // Redirect to home page
    });
}
