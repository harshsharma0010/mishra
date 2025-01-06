document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlight
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    if (sections.length && navItems.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            console.log('Form submitted:', formData);
            contactForm.reset();
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    // Typing animation
    const typingElement = document.querySelector('.hero p');
    if (typingElement) {
        const text = "Transforming Data into Actionable Insights";
        let i = 0;
        
        const typing = () => {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 50);
            }
        };
        
        typing();
    }

    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-content > *', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 1.5
    });

    // Scroll animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // Project card animations
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    });

    // Add interactive glow effect to project cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Experience cards mouse tracking and flip effect
    const experienceCards = document.querySelectorAll('.experience-card');

    experienceCards.forEach(card => {
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');

        // Mouse tracking for glow effect
        [cardFront, cardBack].forEach(side => {
            side.addEventListener('mousemove', (e) => {
                const rect = side.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / side.clientWidth) * 100;
                const y = ((e.clientY - rect.top) / side.clientHeight) * 100;
                
                side.style.setProperty('--mouse-x', `${x}%`);
                side.style.setProperty('--mouse-y', `${y}%`);
            });
        });

        // Optional: Add touch support for mobile
        card.addEventListener('touchstart', () => {
            card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('touchend', () => {
            card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
        });
    });

    // Add interactive glow effect to experience cards
    experienceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
});

// Loading Screen
document.body.classList.add('loading');

window.addEventListener('load', () => {
    // Ensure all images are loaded
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    function tryFinishLoading() {
        loadedImages++;
        if (loadedImages >= images.length) {
            // All images loaded, hide loader
            setTimeout(() => {
                document.querySelector('.loader-wrapper').classList.add('fade-out');
                document.body.classList.remove('loading');
                // Initialize other animations after loading
                initializeAnimations();
            }, 500); // Add a small delay for smoother transition
        }
    }

    images.forEach(img => {
        if (img.complete) {
            tryFinishLoading();
        } else {
            img.addEventListener('load', tryFinishLoading);
            img.addEventListener('error', tryFinishLoading); // Handle error cases
        }
    });

    // If there are no images, still remove the loader
    if (images.length === 0) {
        setTimeout(() => {
            document.querySelector('.loader-wrapper').classList.add('fade-out');
            document.body.classList.remove('loading');
            initializeAnimations();
        }, 500);
    }
});

function initializeAnimations() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--progress', width / 100);
    });

    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-content > *', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 1.5
    });

    // Scroll animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // Project card animations
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    });
}

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursor && cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
        cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
    });

    // Add hover effect for clickable elements
    document.querySelectorAll('a, button, .project-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}
