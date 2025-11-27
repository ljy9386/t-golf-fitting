// Category Page JavaScript

// Pagination settings
const PRODUCTS_PER_PAGE = 20; // 4 columns x 5 rows
let currentPage = 1;
let allProducts = [];

// Generate product data (40 products for 2 full pages)
function generateProducts(baseProducts, totalCount = 40) {
    const products = [];
    for (let i = 0; i < totalCount; i++) {
        const baseProduct = baseProducts[i % baseProducts.length];
        // Alternate between product6.jpg and product7.jpg
        const imageIndex = (i % 2) + 6;
        products.push({
            id: i + 1,
            name: `${baseProduct.name} ${i + 1}`,
            price: baseProduct.price,
            image: `images/products/product${imageIndex}.jpg`,
            isNew: i < 3 // First 3 products are new
        });
    }
    return products;
}

// Sample product data for categories
const categoryProducts = {
    bag: generateProducts([
        { name: '스카티카메론 레플리카 2025 카트백', price: '3,700,000원' },
        { name: '스카티카메론 CT 마스터백 스탠드백', price: '3,200,000원' },
        { name: 'Golf Bag Premium', price: '2,800,000원' },
        { name: 'Golf Bag Classic', price: '2,500,000원' },
    ], 40),
    covers: generateProducts([
        { name: 'Scotty Cameron Putter Cover', price: '180,000원' },
        { name: 'Premium Head Cover Set', price: '150,000원' },
        { name: 'Classic Putter Cover', price: '120,000원' },
        { name: 'Limited Edition Cover', price: '220,000원' },
    ], 40),
    putter: generateProducts([
        { name: 'Scotty Cameron Select Newport', price: '520,000원' },
        { name: 'Scotty Cameron Special Select', price: '580,000원' },
        { name: 'Scotty Cameron Phantom X', price: '620,000원' },
        { name: 'Classic Blade Putter', price: '450,000원' },
    ], 40)
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
    allProducts = categoryProducts[categoryKey] || categoryProducts.bag;

    // Load New Arrival products (first 3 with isNew flag)
    const newProducts = allProducts.filter(p => p.isNew).slice(0, 3);
    loadNewArrivalProducts(newProducts);

    // Update product count
    updateProductCount(allProducts.length);

    // Render first page
    renderPage(1);
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

// Render specific page
function renderPage(pageNumber) {
    currentPage = pageNumber;
    
    // Calculate start and end indices
    const startIndex = (pageNumber - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    
    // Get products for this page
    const pageProducts = allProducts.slice(startIndex, endIndex);
    
    // Load products
    loadMainProducts(pageProducts);
    
    // Update pagination UI
    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
    updatePagination(totalPages);
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
    
    // Scroll to top of product grid
    const productSection = document.querySelector('.category-product-section');
    if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Update pagination buttons
function updatePagination(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    // Clear existing pagination
    paginationContainer.innerHTML = '';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.setAttribute('aria-label', '이전');
    prevBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 2L5 8l6 6V2z" />
        </svg>
    `;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            renderPage(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevBtn);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            renderPage(i);
        });
        paginationContainer.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.setAttribute('aria-label', '다음');
    nextBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 2l6 6-6 6V2z" />
        </svg>
    `;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            renderPage(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextBtn);
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
