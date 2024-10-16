$(document).ready(function() {
    $('#main-image').ezPlus({
        zoomType: 'lens',
        lensShape: 'round',
        lensSize: 200,
        scrollZoom: true
    });
});

function changeMainImage(src, isVideo = false) {
    const mainImageContainer = document.getElementById('main-image-container');
    
    if (isVideo) {
        mainImageContainer.innerHTML = `<iframe width="300" height="300" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        mainImageContainer.innerHTML = `<img id="main-image" src="${src}" alt="Product 1" data-zoom-image="${src}">`;
        $('#main-image').ezPlus({
            zoomType: 'lens',
            lensShape: 'round',
            lensSize: 200,
            scrollZoom: true
        });
    }
}

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
    updateCartCount();
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const cartItems = getCartItems();
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Event listener for the Add to Cart button
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('add-to-cart-btn');
    const productInfo = document.querySelector('.price-and-cart p');
    
    if (addToCartButton && productInfo) {
        const productId = productInfo.getAttribute('data-id');
        const productName = productInfo.getAttribute('data-name');
        const productPrice = parseFloat(productInfo.getAttribute('data-price'));

        addToCartButton.addEventListener('click', () => {
            addToCart(productId, productName, productPrice);
        });
    }

    // Update cart count on page load
    updateCartCount();
});
