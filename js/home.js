const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Create dots dynamically
images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    dot.addEventListener('click', () => moveToSlide(index));
    dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('.carousel-dot');
updateDots();

// Update dots' active state
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Move to specific slide
function moveToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, images.length - 1)); // Clamp index to valid range
    carouselImages.style.transform = `translateX(-${currentIndex * images[currentIndex].clientWidth}px)`;
    updateDots();
}

// Arrow navigation
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) moveToSlide(currentIndex - 1);
});

rightArrow.addEventListener('click', () => {
    if (currentIndex < images.length - 1) moveToSlide(currentIndex + 1);
});

// Handle resizing for responsiveness
window.addEventListener('resize', () => {
    moveToSlide(currentIndex); // Adjust positioning on window resize
});
