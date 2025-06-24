// Lazy Loading Implementation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('lazy-image');
                
                img.onload = () => {
                    img.classList.add('loaded');
                };
                
                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}); 