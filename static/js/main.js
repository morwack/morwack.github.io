/* ============================================
   Main JS - Parallax scrolling & nav effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');
    const nav = document.querySelector('.main-nav');
    const heroBanner = document.querySelector('.hero-banner');

    // Parallax scroll effect for hero image
    if (heroImage && heroBanner) {
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const bannerHeight = heroBanner.offsetHeight;

            if (scrolled <= bannerHeight) {
                // Move image at 40% of scroll speed for parallax effect
                heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
            }

            // Scale effect - image zooms out slightly as you scroll
            const scale = 1 + (scrolled * 0.0003);
            heroImage.style.transform = `translateY(${scrolled * 0.4}px) scale(${Math.min(scale, 1.15)})`;

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Nav background change on scroll (subtle)
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    }

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-links');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        });
    });
});
