document.querySelectorAll('.carousel-container').forEach(container => {
    let currentIndex = 0;
    const images = container.querySelectorAll('.carousel-image');
    
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 7000);
});

let cart = [];

function addToCart(itemName, itemPrice, itemImage) {
    const item = { name: itemName, price: itemPrice, image: itemImage };
    cart.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
    cartItemsDiv.innerHTML = ''; // Clear current cart display
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>₱${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        
        cartItemsDiv.appendChild(itemDiv);
        total += item.price;
    });

    totalPriceDiv.innerHTML = `Total: ₱${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function checkout() {
    if (cart.length > 0) {
        alert('Checkout successful! Your total is: ₱' + cart.reduce((sum, item) => sum + item.price, 0));
        cart = []; // Clear the cart
        updateCartDisplay(); // Update the cart display
    } else {
        alert('Your cart is empty!');
    }
}

document.getElementById('checkout-button').addEventListener('click', checkout);