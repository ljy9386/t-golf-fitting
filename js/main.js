// Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Load products for product sections
    loadNewProducts();
    loadHitProducts();
});

// Sample product data
const sampleProducts = [
    { id: 1, name: '스카티카메론 레플리카 2025 카트백 블랙', price: '3,700,000원', image: 'images/products/product6.jpg' },
    { id: 2, name: '스카티카메론 레플리카 2025 카트백 다크 블루', price: '3,700,000원', image: 'images/products/product7.jpg' },
    { id: 3, name: '스카티카메론 CT 마스터백 스탠드백', price: '3,200,000원', image: 'images/products/product6.jpg' },
    { id: 4, name: 'Scotty Cameron Putter Cover Red', price: '180,000원', image: 'images/products/product7.jpg' },
    { id: 5, name: 'Scotty Cameron Select Newport 2', price: '520,000원', image: 'images/products/product6.jpg' },
    { id: 6, name: 'Premium Head Cover Set', price: '150,000원', image: 'images/products/product6.jpg' },
    { id: 7, name: 'Classic Blade Putter', price: '450,000원', image: 'images/products/product7.jpg' },
    { id: 8, name: 'Golf Bag Limited Edition', price: '3,200,000원', image: 'images/products/product6.jpg' },
];

// Create product card HTML
function createProductCard(product) {
    const priceHTML = product.sale
        ? `<div class="product-price product-price-sale">${product.price} <span class="product-price-original">${product.sale}</span></div>`
        : `<div class="product-price">${product.price}</div>`;

    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22300%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E이미지 준비중%3C/text%3E%3C/svg%3E'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                ${priceHTML}
            </div>
        </div>
    `;
}

// Load new products
function loadNewProducts() {
    const container = document.getElementById('newProducts');
    if (!container) return;

    const productsHTML = sampleProducts.map(product => createProductCard(product)).join('');
    container.innerHTML = productsHTML;
}

// Load hit products
function loadHitProducts() {
    const container = document.getElementById('hitProducts');
    if (!container) return;

    // Shuffle products for variety
    const shuffled = [...sampleProducts].sort(() => Math.random() - 0.5);
    const productsHTML = shuffled.map(product => createProductCard(product)).join('');
    container.innerHTML = productsHTML;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll event for header
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // You can add header scroll effects here if needed
    // For example: sticky header, show/hide on scroll, etc.

    lastScroll = currentScroll;
});
