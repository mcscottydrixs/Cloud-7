// cart.js
window.onload = function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    
    if(cart.length > 0) {
        cart.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - ${item.price}`;
            cartItemsDiv.appendChild(itemDiv);
        });
    } else {
        cartItemsDiv.textContent = "Your cart is empty!";
    }
};
