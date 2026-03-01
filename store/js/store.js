/**
 * Aura Ultra Luxury Store - Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCart();
    initWishlist();
    initCompare();
    initFilters();
    initSearch();
    initCarousel();
    initCountdown();
    initCheckout();
    initForms();
    initNotifications();

    // Init animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
});

/* --- 1. Navigation & Drawers --- */
function initNavigation() {
    const mobileBtn = document.querySelector('.mobile-menu-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const closes = document.querySelectorAll('.drawer-close, .drawer-overlay');

    if (mobileBtn && navDrawer) {
        mobileBtn.addEventListener('click', () => {
            navDrawer.classList.add('open');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    closes.forEach(el => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Sticky header shrink
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.lux-header');
        if (header) {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
    });
}

/* --- 2. Cart Architecture --- */
// Cart structure: Array of objects {id, variantSku, qty, price, name, image}
function initCart() {
    updateCartCount();

    // Bind Add to Cart buttons (Event delegation)
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.closest('.add-to-cart-btn');
            const id = btn.dataset.id;
            const price = parseFloat(btn.dataset.price);
            const name = btn.dataset.name;
            const image = btn.dataset.image;

            addToCart(id, 1, price, name, image);
            showNotification(`Added ${name} to cart.`);

            // Open cart drawer
            const cartDrawer = document.getElementById('cart-drawer');
            const overlay = document.getElementById('drawer-overlay');
            if (cartDrawer && overlay) {
                cartDrawer.classList.add('open');
                overlay.classList.add('active');
            }
        }
    });

    // Render cart items if cart drawer is present
    renderCart();
}

function getCart() {
    return JSON.parse(localStorage.getItem('aura_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function addToCart(id, qty, price, name, image) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id, qty, price, name, image });
    }
    saveCart(cart);
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.innerText = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

function renderCart() {
    const cartEl = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    if (!cartEl) return;

    const cart = getCart();
    cartEl.innerHTML = '';

    let subtotal = 0;

    if (cart.length === 0) {
        cartEl.innerHTML = '<p style="text-align:center; padding: 2rem;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            subtotal += (item.price * item.qty);
            cartEl.innerHTML += `
                <div class="cart-item" style="display:flex; gap:1rem; margin-bottom:1.5rem; align-items:center;">
                    <img src="${item.image}" style="width:70px; height:90px; object-fit:cover;">
                    <div style="flex:1;">
                        <h4 style="font-size:0.9rem; margin:0 0 0.25rem;">${item.name}</h4>
                        <p style="margin:0; font-size:0.85rem; color:#555;">$${item.price.toFixed(2)}</p>
                        <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;">
                            <button onclick="updateQty('${item.id}', -1)" style="border:1px solid #ddd; background:none; padding:2px 8px; cursor:pointer;">-</button>
                            <span style="font-size:0.85rem;">${item.qty}</span>
                            <button onclick="updateQty('${item.id}', 1)" style="border:1px solid #ddd; background:none; padding:2px 8px; cursor:pointer;">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">&times;</button>
                </div>
            `;
        });
    }

    if (subtotalEl) {
        subtotalEl.innerText = '$' + subtotal.toFixed(2);

        // Progress bar logic (Free shipping over $200)
        const progressEl = document.getElementById('shipping-progress');
        const progressMsg = document.getElementById('shipping-msg');
        if (progressEl && progressMsg) {
            const threshold = 200;
            const percentage = Math.min((subtotal / threshold) * 100, 100);
            progressEl.style.width = percentage + '%';
            if (percentage >= 100) {
                progressMsg.innerText = "You've unlocked free luxury shipping.";
            } else {
                progressMsg.innerText = `Add $${(threshold - subtotal).toFixed(2)} more for free shipping.`;
            }
        }
    }
}

// Global functions for cart onclicks
window.updateQty = (id, delta) => {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            saveCart(cart);
        }
    }
};

window.removeFromCart = (id) => {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
};

/* --- 3. Notifications --- */
function initNotifications() {
    // Ensure container exists
    if (!document.getElementById('toast-container')) {
        const c = document.createElement('div');
        c.id = 'toast-container';
        document.body.appendChild(c);
    }
}

window.showNotification = (msg) => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

/* --- 4. Other Modules (Stubs for full implementation) --- */
function initWishlist() { }
function initCompare() { }
function initFilters() { }
function initSearch() { }
function initCarousel() { }
function initCountdown() { }
function initCheckout() { }
function initForms() { }
