function addToCart(event) {
    const button = event.target;
    const productElement = button.parentElement;
    const productId = productElement.getAttribute('data-id');
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    // Add the product to the cart (you can implement this part)
    console.log(`Product ID: ${productId}, Name: ${productName}, Price: ${productPrice}`);

    // Optionally, provide feedback to the user (e.g., display a message)
    alert(`${productName} has been added to the cart.`);
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
