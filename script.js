document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const progress = document.getElementById('scroll-progress');

    // --- Scroll: nav background + progress bar ---
    const onScroll = () => {
        // Nav
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Progress bar
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

    // --- Card glow: cursor tracking ---
    document.querySelectorAll('.card, .edu-card, .pub-item').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });
    });

    // --- Scroll reveal: staggered per section ---
    // Hero elements reveal on load with stagger
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, i) => {
        el.style.transitionDelay = `${0.2 + i * 0.12}s`;
        el.classList.add('visible');
    });

    // Section-based reveal: when a section enters, stagger its children
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
