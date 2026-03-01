/**
 * Visionary Canvas - Advanced Motion System
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Glass Navbar ---
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    const resetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class
                entry.target.classList.add('active');
                // Optional: Unobserve if we only want it to happen once
                // resetObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before element comes into view
    });

    revealElements.forEach(el => resetObserver.observe(el));

    // --- Initial Page Load Stagger ---
    setTimeout(() => {
        document.querySelectorAll('.hero-anim').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 150);
        });
    }, 100);

});
