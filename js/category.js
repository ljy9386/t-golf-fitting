// Category Page JavaScript

// Sample product data for categories
const categoryProducts = {
    bag: [
        { id: 1, name: '스카티카메론 레플리카 2025 카트백 블랙', price: '3,700,000원', image: 'images/products/product1.jpg', isNew: true },
        { id: 2, name: '스카티카메론 레플리카 2025 카트백 다크 블루', price: '3,700,000원', image: 'images/products/product2.jpg', isNew: true },
        { id: 3, name: '스카티카메론 CT 마스터백 스탠드백', price: '3,200,000원', image: 'images/products/product3.jpg', isNew: true },
        { id: 4, name: 'Golf Bag Premium Navy', price: '2,800,000원', image: 'images/products/product4.jpg' },
        { id: 5, name: 'Golf Bag Classic Black', price: '2,500,000원', image: 'images/products/product5.jpg' },
        { id: 6, name: 'Golf Bag Limited Edition', price: '3,200,000원', image: 'images/products/product6.jpg' },
        { id: 7, name: 'Golf Bag Sport Red', price: '2,600,000원', image: 'images/products/product7.jpg' },
        { id: 8, name: 'Golf Bag Tour White', price: '2,900,000원', image: 'images/products/product8.jpg' },
    ],
    covers: [
        { id: 1, name: 'Scotty Cameron Putter Cover Red', price: '180,000원', image: 'images/products/product1.jpg', isNew: true },
        { id: 2, name: 'Scotty Cameron Putter Cover Blue', price: '180,000원', image: 'images/products/product2.jpg', isNew: true },
        { id: 3, name: 'Scotty Cameron Putter Cover Black', price: '180,000원', image: 'images/products/product3.jpg', isNew: true },
        { id: 4, name: 'Premium Head Cover Set', price: '150,000원', image: 'images/products/product4.jpg' },
        { id: 5, name: 'Classic Putter Cover', price: '120,000원', image: 'images/products/product5.jpg' },
        { id: 6, name: 'Limited Edition Cover', price: '220,000원', image: 'images/products/product6.jpg' },
        { id: 7, name: 'Tour Putter Cover', price: '190,000원', image: 'images/products/product7.jpg' },
        { id: 8, name: 'Vintage Putter Cover', price: '160,000원', image: 'images/products/product8.jpg' },
    ],
    putter: [
        { id: 1, name: 'Scotty Cameron Select Newport 2', price: '520,000원', image: 'images/products/product1.jpg', isNew: true },
        { id: 2, name: 'Scotty Cameron Special Select', price: '580,000원', image: 'images/products/product2.jpg', isNew: true },
        { id: 3, name: 'Scotty Cameron Phantom X', price: '620,000원', image: 'images/products/product3.jpg', isNew: true },
        { id: 4, name: 'Classic Blade Putter', price: '450,000원', image: 'images/products/product4.jpg' },
        { id: 5, name: 'Mallet Putter Pro', price: '480,000원', image: 'images/products/product5.jpg' },
        { id: 6, name: 'Tour Putter Limited', price: '680,000원', image: 'images/products/product6.jpg' },
        { id: 7, name: 'Heel-Toe Blade', price: '420,000원', image: 'images/products/product7.jpg' },
        { id: 8, name: 'Center Shaft Mallet', price: '550,000원', image: 'images/products/product8.jpg' },
    ]
};

// Get category from URL or page data
function getCurrentCategory() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename || 'bag';
}

// Load products for current category
function loadCategoryProducts() {
    const category = getCurrentCategory();
    const categoryKey = category.replace(/-/g, ''); // Remove hyphens for key lookup

    // Get products for this category or use default
    let products = categoryProducts[categoryKey] || categoryProducts.bag;

    // Load New Arrival products (first 3 with isNew flag)
    const newProducts = products.filter(p => p.isNew).slice(0, 3);
    loadNewArrivalProducts(newProducts);

    // Load all products in main grid
    loadMainProducts(products);

    // Update product count
    updateProductCount(products.length);
}

// Load New Arrival section
function loadNewArrivalProducts(products) {
    const container = document.getElementById('newArrivalGrid');
    if (!container) return;

    const productsHTML = products.map((product, index) => `
        <div class="product-card">
            <div class="new-arrival-badge">NEW ${index + 1}</div>
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22300%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E이미지 준비중%3C/text%3E%3C/svg%3E'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
            </div>
        </div>
    `).join('');

    container.innerHTML = productsHTML;
}

// Load main product grid
function loadMainProducts(products) {
    const container = document.getElementById('categoryProductGrid');
    if (!container) return;

    const productsHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22300%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E이미지 준비중%3C/text%3E%3C/svg%3E'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
            </div>
        </div>
    `).join('');

    container.innerHTML = productsHTML;
}

// Update product count display
function updateProductCount(count) {
    const countElement = document.querySelector('.product-count strong');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadCategoryProducts();

    // Sort dropdown functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            // Here you would implement sorting logic
            console.log('Sort by:', e.target.value);
        });
    }
});
