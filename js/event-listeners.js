document.addEventListener('DOMContentLoaded', function () {
    // Hero section scroll effect
    const heroContainer = document.querySelector('.hero-container');
    const navbar = document.querySelector('.navbar');

    if (heroContainer && navbar) {
        const heroHeight = heroContainer.offsetHeight;

        window.addEventListener('scroll', function () {
            if (window.scrollY > heroHeight - 75) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});
