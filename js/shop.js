document.querySelectorAll('.carousel-container').forEach(container => {
    let currentIndex = 0;
    const images = container.querySelectorAll('.carousel-image');
    
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 7000);
});
