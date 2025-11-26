// Hero Image Slider
class HeroSlider {
    constructor() {
        this.track = document.getElementById('sliderTrack');
        this.slides = document.querySelectorAll('.slider-slide');
        this.dotsContainer = document.getElementById('sliderDots');
        this.prevBtn = document.getElementById('sliderPrev');
        this.nextBtn = document.getElementById('sliderNext');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.createDots();
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            // 수동 클릭 후에도 자동 재생 계속
            this.startAutoPlay();
        });
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            // 수동 클릭 후에도 자동 재생 계속
            this.startAutoPlay();
        });
        
        // Auto play
        this.startAutoPlay();
        
        // Pause on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    createDots() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `슬라이드 ${i + 1}로 이동`);
            dot.addEventListener('click', () => {
                this.goToSlide(i);
                // 수동 클릭 후에도 자동 재생 계속
                this.startAutoPlay();
            });
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        const offset = -100 * this.currentIndex;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.goToSlide(this.currentIndex);
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.goToSlide(this.currentIndex);
    }
    
    startAutoPlay() {
        // 기존 인터벌이 있으면 제거
        this.stopAutoPlay();
        // 3초마다 자동으로 다음 슬라이드로 이동
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
