document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });

        // Close menu on link click (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('open');
                menuToggle.classList.remove('open');
            });
        });
    }

    // 2. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        // Toggle Scrolled Class for Header shrink effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Arithmetic Captcha & Form Handler
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('form-captcha');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    let captchaAnswer = 0;

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        const num2 = Math.floor(Math.random() * 9) + 1;  // 1-9
        captchaAnswer = num1 + num2;
        if (captchaLabel) {
            captchaLabel.textContent = `Security Check: What is ${num1} + ${num2}?`;
        }
    };

    // Initialize Captcha
    generateCaptcha();

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate Captcha
            const userAnswer = parseInt(captchaInput.value.trim(), 10);
            if (userAnswer !== captchaAnswer) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '❌ Incorrect answer to the security check. Please try again.';
                captchaInput.value = '';
                generateCaptcha();
                return;
            }

            // Simple Form Submission Feedback
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your quote request has been received. JPS Tree & Garden Services will contact you shortly.';
                
                // Reset Form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Inquiry';
                
                // Regenerate captcha for next submission
                generateCaptcha();
            }, 1200);
        });
    }
});
