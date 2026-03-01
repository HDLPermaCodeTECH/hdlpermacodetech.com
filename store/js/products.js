/**
 * Aura Ultra Luxury Store - Product Data Management
 */

let productsData = [];

async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        productsData = await response.json();
        return productsData;
    } catch (error) {
        console.error("Failed to load products:", error);
        return [];
    }
}

function renderProductGrid(containerId, products, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const displayProducts = limit ? products.slice(0, limit) : products;

    displayProducts.forEach((product, index) => {
        let badgesHtml = '';
        if (product.badges && product.badges.length > 0) {
            badgesHtml = `<div class="product-badges" style="position:absolute; top:1rem; left:1rem; z-index:10; display:flex; gap:0.5rem; flex-direction:column;">
                ${product.badges.map(b => `<span style="background:var(--lux-text); color:var(--lux-bg); font-size:0.65rem; padding:0.3rem 0.6rem; text-transform:uppercase; letter-spacing:1px; font-weight:600;">${b}</span>`).join('')}
            </div>`;
        }

        const html = `
            <article class="product-card reveal" style="transition-delay: ${index * 0.1}s">
                ${badgesHtml}
                <div style="position:relative; overflow:hidden;" class="product-image-wrap">
                    <a href="store-product.html?id=${product.id}" style="display:block; width:100%; height:100%;">
                        <img src="${product.images[0]}" alt="${product.name}" class="main-img" style="width:100%; height:100%; object-fit:cover; transition:var(--transition-slow);">
                        ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.name} alternate" class="hover-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:var(--transition-slow);">` : ''}
                    </a>
                </div>
                <div class="product-info" style="padding-top:1.5rem; text-align:center;">
                    <p style="color:#777; font-size:0.7rem; text-transform:uppercase; letter-spacing:2px; margin-bottom:0.5rem;">${product.brand}</p>
                    <a href="store-product.html?id=${product.id}">
                        <h3 class="product-title" style="font-size:1rem; margin-bottom:0.5rem;">${product.name}</h3>
                    </a>
                    <div style="display:flex; justify-content:center; align-items:center; gap:0.75rem; margin-top:0.5rem;">
                        <span class="product-price" style="font-weight:500;">$${product.price.toFixed(2)}</span>
                        ${product.compare_price > product.price ? `<span style="text-decoration:line-through; color:#999; font-size:0.85rem;">$${product.compare_price.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="btn btn-outline add-to-cart-btn" style="width:100%; margin-top:1.5rem;" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        data-image="${product.images[0]}">
                        Add to Cart
                    </button>
                </div>
            </article>
        `;
        container.innerHTML += html;
    });

    // Custom hover logic for cinematic image swap
    container.querySelectorAll('.product-card').forEach(card => {
        const hoverImg = card.querySelector('.hover-img');
        const mainImg = card.querySelector('.main-img');
        if (hoverImg && mainImg) {
            card.addEventListener('mouseenter', () => {
                hoverImg.style.opacity = '1';
                hoverImg.style.transform = 'scale(1.05)';
                mainImg.style.opacity = '0';
            });
            card.addEventListener('mouseleave', () => {
                hoverImg.style.opacity = '0';
                hoverImg.style.transform = 'scale(1)';
                mainImg.style.opacity = '1';
                mainImg.style.transform = 'scale(1)';
            });
        }
    });

    setTimeout(() => {
        container.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 50);
}
