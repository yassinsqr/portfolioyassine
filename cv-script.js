// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hamburger menu functionality
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.nav-link');

navbarToggler.addEventListener('click', () => {
    navbarToggler.classList.toggle('active');
    navbarCollapse.classList.toggle('show');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarToggler.classList.remove('active');
        navbarCollapse.classList.remove('show');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
        navbarToggler.classList.remove('active');
        navbarCollapse.classList.remove('show');
    }
});
// Hero section animations
gsap.from(".hero-title", {
    opacity: 0,
    y: 30,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 30,
    duration: 1.5,
    delay: 0.8,
    ease: "power3.out"
});

// Navigation scroll effect
const nav = document.querySelector('.nav-wrapper');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 70
            },
            ease: "power2.inOut"
        });
    });
});

// Timeline items animation
gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
        opacity: 0,
        x: item.offsetLeft < window.innerWidth / 2 ? -50 : 50,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Skills progress bars animation
gsap.utils.toArray('.skill-progress-bar').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    gsap.to(bar, {
        scaleX: progress / 100,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Portfolio items animation
gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Theme switcher
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Error sending message. Please try again.', 'error');
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    gsap.to(notification, {
        opacity: 1,
        y: -20,
        duration: 0.3,
        ease: "power2.out"
    });
    
    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => notification.remove()
        });
    }, 3000);
}

// Section titles animation
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Initialize section animations on load
window.addEventListener('load', () => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
// Initialize carousel functionality
const initCarousel = () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.children);
    
    // Set initial state
    updateSlides();
    
    // Update slides position and appearance
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
            
            if (index === currentIndex) {
                slide.classList.add('active');
                dots[index].classList.add('active');
            }
        });
        
        const offset = -currentIndex * (100 / slides.length);
        track.style.transform = `translateX(${offset}%)`;
    }
    
    // Next slide
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    });
    
    // Previous slide
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlides();
        });
    });
    
    // Auto advance
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    }, 3000);
};
window.addEventListener('load', () => {
    initCarousel();
    // ... your existing load event handlers
});
