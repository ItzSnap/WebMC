document.addEventListener('DOMContentLoaded', function () {
    // Function to handle adding items to the cart
    function addToCart(event) {
        const button = event.target;
        const productElement = button.parentElement;
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));

        // Get the current cart from local storage or initialize it
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            // If product is already in the cart, increase the quantity
            existingProduct.quantity += 1;
        } else {
            // If product is not in the cart, add it
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        // Save the updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Display a confirmation message
        alert(`${productName} has been added to the cart.`);
    }

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Function to display cart items and calculate total price
    function displayCartItems() {
        const cartContainer = document.getElementById('cart-items');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalAmount = 0;

        // Clear previous items
        cartContainer.innerHTML = '';

        // Add items to cart container
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p data.id=${item.id}>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}<button class="remove-from-cart">Remove</button></p>
            `;
            cartContainer.appendChild(itemElement);
            totalAmount += item.price * item.quantity;
        });

        // Update total amount
        document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    }

    // Display cart items on cart page load
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }

    // Checkout button event listener
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Placeholder checkout functionality
            alert('Thank you for your purchase!');
        });
    }
    function removeFromCart(event) {
        const button = event.target;
        const productElement = button.parentElement;
        const productId = productElement.getAttribute('data-id');
        
        // Remove the product from the cart (you can implement this part)
        //console.log(`Removing product with ID ${productId} from the cart.`);
        
        // Remove the product item from the DOM
        cart.remove({ id: productId });
        productElement.remove();
    }
    
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
});



