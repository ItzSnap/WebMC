function removeFromCart(event) {
    const button = event.target;
    const productElement = button.parentElement;
    const productId = productElement.getAttribute('data-id');
    
    // Remove the product from the cart (you can implement this part)
    console.log(`Removing product with ID ${productId} from the cart.`);
    
    // Remove the product item from the DOM
    productElement.remove();
}

const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
removeFromCartButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
});


