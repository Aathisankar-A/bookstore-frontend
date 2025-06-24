'use strict';



/**
 * add event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toogle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);



/**
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);



/**
 * filter functionality
 */

const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].dataset.filter === this.dataset.filterBtn) {
      filterItems[i].style.display = "block";
    } else {
      filterItems[i].style.display = "none";
    }
  }
}

addEventOnElem(filterBtn, "click", filter);

// Initialize cart modal
const cartModal = createCartModal();
const cartBtn = document.querySelector('.header-action-btn[aria-label="cart"]');
const cartCloseBtn = document.querySelector('.cart-close-btn');

cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    updateCartDisplay();
});

cartCloseBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Add to cart functionality for product cards
document.querySelectorAll('.product-card').forEach((card, index) => {
    // Add unique ID to each product card
    card.dataset.id = `product-${index + 1}`;
    
    const addToCartBtn = card.querySelector('.action-btn[aria-label="add to cart"]');
    const title = card.querySelector('.card-title').textContent;
    const price = parseFloat(card.querySelector('.card-price').textContent.replace('$', ''));
    
    addToCartBtn.addEventListener('click', () => {
        cart.addItem({
            id: card.dataset.id,
            title: title,
            price: price
        });
        
        // Show feedback animation
        addToCartBtn.classList.add('added');
        setTimeout(() => addToCartBtn.classList.remove('added'), 1500);
    });
});

// Update cart display
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('.cart-total-amount');
    
    cartItems.innerHTML = cart.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus">+</button>
            </div>
        </div>
    `).join('');
    
    cartTotalAmount.textContent = cart.getTotal().toFixed(2);
    
    // Add quantity button handlers
    cartItems.querySelectorAll('.cart-item').forEach(item => {
        const minusBtn = item.querySelector('.minus');
        const plusBtn = item.querySelector('.plus');
        const itemId = item.dataset.id;
        
        minusBtn.addEventListener('click', () => {
            const currentItem = cart.cart.find(cartItem => cartItem.id === itemId);
            if (currentItem) {
                cart.updateQuantity(itemId, currentItem.quantity - 1);
                updateCartDisplay();
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const currentItem = cart.cart.find(cartItem => cartItem.id === itemId);
            if (currentItem) {
                cart.updateQuantity(itemId, currentItem.quantity + 1);
                updateCartDisplay();
            }
        });
    });
}

// Clear cart button
document.querySelector('.clear-cart-btn').addEventListener('click', () => {
    cart.clearCart();
    updateCartDisplay();
});

// Checkout button
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase! This is a demo site, no actual purchase was made.');
    cart.clearCart();
    updateCartDisplay();
    cartModal.classList.remove('active');
});

// Theme toggle functionality
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
    document.body.appendChild(themeToggle);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        themeToggle.innerHTML = `<ion-icon name="${newTheme === 'dark' ? 'moon-outline' : 'sunny-outline'}"></ion-icon>`;
    });
}

// Initialize theme toggle
createThemeToggle();