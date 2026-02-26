const fs = require('fs');
const path = require('path');

const cssToInject = `
        /* --- NEW STUNNING FEATURES --- */
        /* Infinite Marquee */
        .marquee-container {
            width: 100%;
            background: var(--store-text);
            color: white;
            padding: 1.2rem 0;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            align-items: center;
        }
        .marquee-content {
            display: inline-block;
            animation: marquee 25s linear infinite;
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .marquee-content span {
            margin: 0 3rem;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        /* Wishlist Buttons */
        .wishlist-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255,255,255,0.9);
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(5px);
        }
        .product-card:hover .wishlist-btn {
            opacity: 1;
            transform: translateY(0);
        }
        .wishlist-btn:hover {
            transform: scale(1.1);
            background: white;
        }
        .wishlist-btn svg {
            width: 18px;
            height: 18px;
            fill: none;
            stroke: var(--store-text);
            stroke-width: 2;
            transition: fill 0.3s, stroke 0.3s;
        }
        .wishlist-btn.active svg {
            fill: var(--store-accent);
            stroke: var(--store-accent);
        }
`;

const marqueeHTML = `
    <!-- Infinite Marquee Banner -->
    <div class="marquee-container reveal">
        <div class="marquee-content">
            <span>PREMIUM QUALITY</span><span>•</span>
            <span>FREE WORLDWIDE SHIPPING</span><span>•</span>
            <span>NEW ARRIVALS JUST DROPPED</span><span>•</span>
            <span>SUSTAINABLE MATERIALS</span><span>•</span>
            <span>URBAN STREETWEAR ESSENTIALS</span><span>•</span>
            <!-- Duplicate for infinite seamless loop -->
            <span>PREMIUM QUALITY</span><span>•</span>
            <span>FREE WORLDWIDE SHIPPING</span><span>•</span>
            <span>NEW ARRIVALS JUST DROPPED</span><span>•</span>
            <span>SUSTAINABLE MATERIALS</span><span>•</span>
            <span>URBAN STREETWEAR ESSENTIALS</span><span>•</span>
        </div>
    </div>
`;

const wishlistBtn = `
                    <button class="wishlist-btn" onclick="this.classList.toggle('active')">
                        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <img`;

const files = [
    'demo-storefront-arrivals.html',
    'demo-storefront-men.html',
    'demo-storefront-women.html',
    'demo-storefront-accessories.html'
];

for (const file of files) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Inject CSS
        if (!content.includes('/* --- NEW STUNNING FEATURES --- */')) {
            content = content.replace('        .footer-bottom {', cssToInject + '\n        .footer-bottom {');
        }

        // 2. Inject Marquee
        if (!content.includes('<!-- Infinite Marquee Banner -->')) {
            content = content.replace('    </header>', '    </header>\n' + marqueeHTML);
        }

        // 3. Inject Wishlist Buttons
        if (!content.includes('wishlist-btn')) {
            content = content.replace(/<div class="product-img-wrapper">\s*<img/g, `<div class="product-img-wrapper">${wishlistBtn}`);
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
