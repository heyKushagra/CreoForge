/* ===================================================
   CreoForge — JavaScript
   Floating Icons, Scroll Animations, Counter, Nav
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // 1. Floating Social Media Icons Background
    // ─────────────────────────────────────────────
    const floatingContainer = document.getElementById('floatingIcons');
    const socialIcons = [
        'fab fa-instagram',
        'fab fa-facebook-f',
        'fab fa-x-twitter',
        'fab fa-tiktok',
        'fab fa-youtube',
        'fab fa-linkedin-in',
        'fab fa-pinterest-p',
        'fab fa-snapchat-ghost',
        'fab fa-threads',
        'fab fa-whatsapp',
        'fas fa-heart',
        'fas fa-comment',
        'fas fa-share',
        'fas fa-thumbs-up',
        'fas fa-hashtag',
        'fas fa-at',
        'fas fa-camera',
        'fas fa-video',
        'fas fa-bell',
        'fas fa-bookmark'
    ];

    function createFloatingIcon() {
        const icon = document.createElement('i');
        const randomIcon = socialIcons[Math.floor(Math.random() * socialIcons.length)];
        icon.className = `floating-icon ${randomIcon}`;

        // Random positioning & timing
        const left = Math.random() * 100;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 10;
        const size = 1.2 + Math.random() * 2;

        icon.style.left = `${left}%`;
        icon.style.fontSize = `${size}rem`;
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationDelay = `${delay}s`;

        floatingContainer.appendChild(icon);

        // Remove and recreate after animation ends
        setTimeout(() => {
            icon.remove();
            createFloatingIcon();
        }, (duration + delay) * 1000);
    }

    // Spawn initial batch of icons
    for (let i = 0; i < 30; i++) {
        createFloatingIcon();
    }

    // ─────────────────────────────────────────────
    // 2. Navbar Scroll Behavior
    // ─────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ─────────────────────────────────────────────
    // 3. Active Nav Link Highlight
    // ─────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ─────────────────────────────────────────────
    // 4. Mobile Menu Toggle
    // ─────────────────────────────────────────────
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─────────────────────────────────────────────
    // 5. Scroll Reveal Animations
    // ─────────────────────────────────────────────
    function setupRevealAnimations() {
        // Add reveal class to elements
        const revealSelectors = [
            '.service-card',
            '.process-step',
            '.package-card',
            '.result-card',
            '.testimonial-card',
            '.section-header',
            '.cta-content'
        ];

        revealSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('reveal');
                // Stagger children
                const delayClass = `reveal-delay-${Math.min(index % 4 + 1, 6)}`;
                el.classList.add(delayClass);
            });
        });

        // Intersection Observer for reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
    }

    setupRevealAnimations();

    // ─────────────────────────────────────────────
    // 6. Counter Animation
    // ─────────────────────────────────────────────
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // Observe stat numbers for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number, .result-number').forEach(el => {
        counterObserver.observe(el);
    });

    // ─────────────────────────────────────────────
    // 7. Form Handling
    // ─────────────────────────────────────────────
    const ctaForm = document.getElementById('ctaForm');
    const submitBtn = document.getElementById('formSubmitBtn');

    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
            submitBtn.style.opacity = '1';

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                ctaForm.reset();
            }, 3000);
        }, 1500);
    });

    // ─────────────────────────────────────────────
    // 8. Smooth Scroll for Anchor Links
    // ─────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.offsetTop - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─────────────────────────────────────────────
    // 9. Parallax Effect on Gradient Orbs
    // ─────────────────────────────────────────────
    const orbs = document.querySelectorAll('.hero-gradient-orb');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 15;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ─────────────────────────────────────────────
    // 10. Select dropdown arrow
    // ─────────────────────────────────────────────
    const selectEl = document.getElementById('formPackage');
    if (selectEl) {
        selectEl.parentElement.style.position = 'relative';
        const arrow = document.createElement('i');
        arrow.className = 'fas fa-chevron-down';
        arrow.style.cssText = `
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
            font-size: 0.8rem;
            pointer-events: none;
        `;
        selectEl.parentElement.appendChild(arrow);
    }

    // ─────────────────────────────────────────────
    // 11. Hide Scroll Indicator on Scroll
    // ─────────────────────────────────────────────
    const scrollIndicator = document.getElementById('scrollIndicator');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });

});
