// Carousel functionality for ONLY! ON section
document.addEventListener('DOMContentLoaded', function () {
    const carouselProducts = [
        {
            name: '스카티카메론 2025 아카페코 스페셜팩',
            price: '2,200,000원',
            image: 'images/products/product1.jpg'
        },
        {
            name: '스카티카메론 2025 퍼터스트랩 커버세트',
            price: '2,800,000원',
            image: 'images/products/product2.jpg'
        },
        {
            name: '스카티카메론 SSS 티아이블랙스트 트리플',
            price: '17,000,000원',
            image: 'images/products/product3.jpg'
        },
        {
            name: '스카티카메론 SSS 스카티독',
            price: '17,000,000원',
            image: 'images/products/product4.jpg'
        },
        {
            name: '스카티카메론 SSS 티앤알',
            price: '17,000,000원',
            image: 'images/products/product5.jpg'
        },
        {
            name: '스카티카메론 2025 아카페코 스페셜팩',
            price: '2,200,000원',
            image: 'images/products/product1.jpg'
        },
        {
            name: '스카티카메론 2025 퍼터스트랩 커버세트',
            price: '2,800,000원',
            image: 'images/products/product2.jpg'
        }
    ];

    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const progressBar = document.getElementById('carouselProgressBar');

    if (!track) return;

    let currentIndex = 0;
    const itemsToShow = 5;
    const autoPlayInterval = 3000; // 3 seconds
    let autoPlayTimer;
    const totalSlides = carouselProducts.length;

    // Clone products for infinite scroll
    const allProducts = [...carouselProducts, ...carouselProducts, ...carouselProducts];

    // Update progress bar
    function updateProgressBar() {
        if (!progressBar) return;
        
        // Calculate progress position
        const slideIndex = ((currentIndex % totalSlides) + totalSlides) % totalSlides;
        const segmentWidth = 100 / totalSlides;
        const leftPosition = slideIndex * segmentWidth;
        
        progressBar.style.left = leftPosition + '%';
        progressBar.style.width = segmentWidth + '%';
    }

    // Load products
    function loadProducts() {
        track.innerHTML = allProducts.map(product => `
            <div class="carousel-item product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                </div>
            </div>
        `).join('');
    }

    // Move carousel
    function moveCarousel(direction) {
        const itemWidth = track.querySelector('.carousel-item').offsetWidth;
        const gap = 20; // var(--spacing-md)
        const moveAmount = itemWidth + gap;

        if (direction === 'next') {
            currentIndex++;
        } else {
            currentIndex--;
        }

        track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
        updateProgressBar();

        // Reset for infinite scroll
        if (currentIndex >= carouselProducts.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                track.style.transform = `translateX(0)`;
                updateProgressBar();
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        } else if (currentIndex < 0) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = carouselProducts.length - 1;
                track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
                updateProgressBar();
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    }

    // Auto play
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            moveCarousel('next');
        }, autoPlayInterval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            moveCarousel('next');
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            moveCarousel('prev');
            startAutoPlay();
        });
    }

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    loadProducts();
    updateProgressBar();
    startAutoPlay();
});
