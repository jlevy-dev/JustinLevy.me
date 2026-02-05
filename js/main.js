/**
 * Justin Levy - Personal Website
 * Industrial/Technical Aesthetic
 */

// ============================================
// tsParticles Configuration - Technical Grid Style
// ============================================
const particlesConfig = {
    fullScreen: false,
    background: {
        color: { value: "transparent" }
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab"
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 180,
                links: {
                    opacity: 0.8,
                    color: "#00f0ff"
                }
            },
            push: {
                quantity: 3
            }
        }
    },
    particles: {
        color: {
            value: ["#00f0ff", "#a855f7", "#ffffff"]
        },
        links: {
            color: "#00f0ff",
            distance: 200,
            enable: true,
            opacity: 0.15,
            width: 1
        },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 0.8,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 1000
            },
            value: 60
        },
        opacity: {
            value: { min: 0.2, max: 0.6 }
        },
        shape: {
            type: "circle"
        },
        size: {
            value: { min: 1, max: 2 }
        }
    },
    detectRetina: true
};

// Initialize particles
async function initParticles() {
    if (typeof tsParticles !== 'undefined') {
        await tsParticles.load("particles-js", particlesConfig);
    }
}

// ============================================
// Intersection Observer for Scroll Animations
// ============================================
function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.querySelectorAll('.section-header, .about-content, .experience-card, .venture-card, .connect-link').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe section headers
    document.querySelectorAll('.section-header').forEach(el => observer.observe(el));

    // Observe about content
    document.querySelectorAll('.about-content').forEach(el => observer.observe(el));

    // Observe experience cards with stagger
    document.querySelectorAll('.experience-card').forEach((el, i) => {
        el.dataset.delay = i * 100;
        observer.observe(el);
    });

    // Observe venture cards with stagger
    document.querySelectorAll('.venture-card').forEach((el, i) => {
        el.dataset.delay = i * 100;
        observer.observe(el);
    });

    // Observe connect links with stagger
    document.querySelectorAll('.connect-link').forEach((el, i) => {
        el.dataset.delay = i * 80;
        observer.observe(el);
    });
}

// ============================================
// Dynamic Year
// ============================================
function updateYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}

// ============================================
// Scroll Indicator
// ============================================
function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.addEventListener('click', () => {
            const about = document.getElementById('about');
            if (about) {
                about.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// Parallax Hero
// ============================================
function initParallax() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const hero = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.2}px)`;
            hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    }, { passive: true });
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    updateYear();
    initScrollIndicator();
    initSmoothScroll();
    initParallax();
});