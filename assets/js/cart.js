// Cart functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(itemId, quantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            }
        }
        this.saveCart();
        this.updateCartCount();
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.header-action-btn .span');
        if (cartCount) {
            cartCount.textContent = this.cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Cart modal functionality
function createCartModal() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2>Shopping Cart</h2>
                <button class="cart-close-btn">&times;</button>
            </div>
            <div class="cart-items"></div>
            <div class="cart-total">
                <strong>Total: $<span class="cart-total-amount">0.00</span></strong>
            </div>
            <div class="cart-actions">
                <button class="btn checkout-btn">Checkout</button>
                <button class="btn clear-cart-btn">Clear Cart</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Event listeners will be added in main script.js 