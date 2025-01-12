document.querySelectorAll('.carousel-container').forEach(container => {
    let currentIndex = 0;
    const images = container.querySelectorAll('.carousel-image');
    
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 7000);
});

 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add an item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    const item = { name: itemName, price: itemPrice, image: itemImage };
    cart.push(item);
    saveCart(); // Persist cart to localStorage
    updateCartDisplay(); // Update cart UI
    alert('Item added to cart!');
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart(); // Persist cart to localStorage
    updateCartDisplay(); // Update cart UI
}

// Update the cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
    cartItemsDiv.innerHTML = ''; // Clear current cart display
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        
        // Ensure price is a valid number, fallback to 0 if invalid
        const price = parseFloat(item.price);
        if (isNaN(price)) {
            console.error(`Invalid price for item "${item.name}":`, item.price); // Debug log
        }

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>₱${isNaN(price) ? 'Invalid Price' : price.toFixed(2)}</p> <!-- Handle invalid price -->
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartItemsDiv.appendChild(itemDiv);
        total += isNaN(price) ? 0 : price; // Only add valid prices to the total
    });

    // Correctly format total price display
    totalPriceDiv.textContent = `Total: ₱${total.toFixed(2)}`;
}



// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout the cart
async function checkout() {
    if (cart.length > 0) {
        try {
            const response = await fetch('http://localhost:3000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Checkout successful! Your total is: ₱' + result.total);
                cart = []; // Clear cart after successful checkout
                saveCart(); // Persist empty cart to localStorage
                updateCartDisplay(); // Update UI
            } else {
                alert('Checkout failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Item/s checked out!');
        }
    } else {
        alert('Your cart is empty!');
    }
}

// Initialize cart and UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

// Add event listener for checkout button
document.getElementById('checkout-button').addEventListener('click', checkout);