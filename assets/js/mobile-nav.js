// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Create mobile navigation bar
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav-bar';
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    
    mobileNav.innerHTML = `
        <a href="index.html" class="mobile-nav-item" aria-label="Home">
            <ion-icon name="home-outline"></ion-icon>
            <span>Home</span>
        </a>
        <a href="#" class="mobile-nav-item" aria-label="Search">
            <ion-icon name="search-outline"></ion-icon>
            <span>Search</span>
        </a>
        <a href="#" class="mobile-nav-item cart-btn" aria-label="Cart">
            <ion-icon name="bag-handle-outline"></ion-icon>
            <span>Cart</span>
        </a>
        <a href="contact.html" class="mobile-nav-item" aria-label="Contact">
            <ion-icon name="mail-outline"></ion-icon>
            <span>Contact</span>
        </a>
    `;

    // Only show on mobile devices
    if (window.innerWidth <= 768) {
        document.body.appendChild(mobileNav);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-nav-bar')) {
                document.body.appendChild(mobileNav);
            }
        } else {
            const existingNav = document.querySelector('.mobile-nav-bar');
            if (existingNav) {
                existingNav.remove();
            }
        }
    });

    // Add click handlers
    const cartBtn = mobileNav.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cartModal = document.querySelector('.cart-modal');
            if (cartModal) {
                cartModal.classList.add('active');
                updateCartDisplay();
            }
        });
    }
}); 