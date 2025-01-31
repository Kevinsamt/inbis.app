document.addEventListener('DOMContentLoaded', () => {
    // Carousel Initialization
    class Carousel {
        constructor() {
            this.container = document.querySelector('.carousel-container');
            this.items = document.querySelectorAll('.carousel-item');
            this.dots = document.querySelectorAll('.carousel-dot');
            this.currentIndex = 0;
            this.totalItems = this.items.length;
            this.autoSlideInterval = 5000; // 5 seconds
            this.isAnimating = false;
            this.touchStartX = 0;
            this.touchEndX = 0;

            // Check if carousel container and items are present
            if (this.items.length === 0 || this.dots.length === 0) {
                console.warn("Carousel tidak ditemukan!");
                return;
            }

            this.init();
        }

        init() {
            // Add event listeners to dots for slide navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            const carousel = document.querySelector('.carousel');
            
            // Add touch events for swipe navigation
            carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e));

            // Add keyboard navigation
            document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

            // Ensure animation flag is reset after transition
            this.container.addEventListener('transitionend', () => {
                this.isAnimating = false;
            });

            // Start auto-slide functionality
            this.startAutoSlide();
        }

        updateCarousel(index) {
            // Prevent multiple transitions if animating
            if (this.isAnimating) return;
            this.isAnimating = true;

            // Reset active state for items and dots
            this.items.forEach(item => item.classList.remove('active'));
            this.items[index].classList.add('active');

            this.dots.forEach(dot => dot.classList.remove('active'));
            this.dots[index].classList.add('active');

            // Apply the transform for slide movement
            this.container.style.transform = `translateX(-${index * 100}%)`;
        }

        goToSlide(index) {
            this.currentIndex = index;
            this.updateCarousel(this.currentIndex);
            this.resetAutoSlide();
        }

        nextSlide() {
            // Move to the next slide, loop around if at the end
            this.currentIndex = (this.currentIndex + 1) % this.totalItems;
            this.updateCarousel(this.currentIndex);
        }

        previousSlide() {
            // Move to the previous slide, loop around if at the start
            this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
            this.updateCarousel(this.currentIndex);
        }

        handleTouchStart(e) {
            // Record touch start position
            this.touchStartX = e.changedTouches[0].screenX;
        }

        handleTouchEnd(e) {
            // Record touch end position and check for swipe direction
            this.touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;

            // Swipe left for next slide, swipe right for previous slide
            if (this.touchStartX - this.touchEndX > swipeThreshold) {
                this.nextSlide();
            } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
                this.previousSlide();
            }
            this.resetAutoSlide();
        }

        handleKeyboardNavigation(e) {
            // Handle left and right arrow key for navigation
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
            this.resetAutoSlide();
        }

        startAutoSlide() {
            // Start the auto slide interval
            this.autoSlideTimer = setInterval(() => {
                this.nextSlide();
            }, this.autoSlideInterval);
        }

        resetAutoSlide() {
            // Reset the auto slide timer after user interaction
            clearInterval(this.autoSlideTimer);
            this.startAutoSlide();
        }
    }

    // Initialize the carousel
    new Carousel();

    // Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });

    // Theme Toggle (Light/Dark mode)
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for theme preference in localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', currentTheme === 'dark');
    icon.classList.replace(currentTheme === 'dark' ? 'fa-sun' : 'fa-moon', currentTheme === 'dark' ? 'fa-moon' : 'fa-sun');

    themeToggle.addEventListener('click', () => {
        // Toggle between dark and light mode
        body.classList.toggle('dark-mode');
        const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        icon.classList.replace(newTheme === 'dark' ? 'fa-sun' : 'fa-moon', newTheme === 'dark' ? 'fa-moon' : 'fa-sun');
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector(".nav");  // Ganti .navbar menjadi .nav

    if (navbar) { // Pastikan elemen navbar ada
        window.addEventListener("scroll", () => {
            navbar.style.background = window.scrollY > 50 ? "rgba(0, 123, 255, 0.9)" : "#007bff";
        });
    } else {
        console.warn('Navbar tidak ditemukan!');
    }

    // Button Click Alert
    const button = document.querySelector(".button");
    if (button) {
        button.addEventListener("click", () => alert("Tombol diklik!"));
    }
});
