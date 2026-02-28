document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const progress = document.getElementById('scroll-progress');

    // --- Scroll: nav background + progress bar ---
    const onScroll = () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
            progress.style.width = (scrollTop / scrollHeight) * 100 + '%';
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Mobile menu toggle ---
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });

    // --- Card glow: pointer + touch tracking ---
    const glowEls = document.querySelectorAll('.card, .edu-card, .pub-item');

    glowEls.forEach(card => {
        // Desktop: pointer tracking
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });

        // Mobile: touch tracking
        card.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (touch.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (touch.clientY - rect.top) + 'px');
            card.classList.add('touch-active');
        }, { passive: true });

        card.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (touch.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (touch.clientY - rect.top) + 'px');
        }, { passive: true });

        card.addEventListener('touchend', () => {
            card.classList.remove('touch-active');
        }, { passive: true });

        card.addEventListener('touchcancel', () => {
            card.classList.remove('touch-active');
        }, { passive: true });
    });

    // --- Timeline touch interaction ---
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('touchstart', () => {
            item.classList.add('touch-active');
        }, { passive: true });

        item.addEventListener('touchend', () => {
            item.classList.remove('touch-active');
        }, { passive: true });

        item.addEventListener('touchcancel', () => {
            item.classList.remove('touch-active');
        }, { passive: true });
    });

    // --- Scroll reveal ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Show everything immediately
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    // Hero elements: stagger on load
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, i) => {
        el.style.transitionDelay = `${0.2 + i * 0.12}s`;
        el.classList.add('visible');
    });

    // Section-based reveal: stagger children when section enters viewport
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const reveals = entry.target.querySelectorAll('.reveal:not(.visible)');
                    reveals.forEach((el, i) => {
                        el.style.transitionDelay = `${i * 0.08}s`;
                        el.classList.add('visible');
                    });
                    sectionObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    sections.forEach(s => sectionObserver.observe(s));
});
