document.querySelectorAll('.carousel-container').forEach(container => {
    let currentIndex = 0;
    const images = container.querySelectorAll('.carousel-image');
    
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 7000);
});

// shop.js: Function to add product to the cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Create an object for the product being added
    const product = {
        name: productName,
        price: productPrice
    };

    // Add the product to the cart
    cart.push(product);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart');
}

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

async function checkout() {
    if (cart.length > 0) {
        try {
            // Send cart data to the server
            const response = await fetch('http://localhost:3000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: cart })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Checkout successful! Your total is: ₱' + result.total);
                cart = []; // Clear the cart
                updateCartDisplay(); // Update the cart display
            } else {
                alert('Checkout failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred. Please try again.');
        }
    } else {
        alert('Your cart is empty!');
    }
}

document.getElementById('checkout-button').addEventListener('click', checkout);
