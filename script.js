document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────────
       1. SCROLL PROGRESS BAR
    ───────────────────────────────────────────── */
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar) progressBar.style.width = (scrollTop / docHeight * 100) + '%';
    }, { passive: true });


    /* ─────────────────────────────────────────────
       2. CUSTOM CURSOR
    ───────────────────────────────────────────── */
    const cursor    = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');

    if (cursor && cursorRing) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 5  + 'px';
            cursor.style.top  = mouseY - 5  + 'px';
        });

        (function animateRing() {
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;
            cursorRing.style.left = ringX - 20 + 'px';
            cursorRing.style.top  = ringY - 20 + 'px';
            requestAnimationFrame(animateRing);
        })();

        document.querySelectorAll('a, button, .service-category, .project-visual, .process-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-grow');
                cursorRing.classList.add('ring-grow');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-grow');
                cursorRing.classList.remove('ring-grow');
            });
        });

        /* Hide default cursor on desktop only */
        document.documentElement.style.cursor = window.innerWidth > 768 ? 'none' : 'auto';
    }


    /* ─────────────────────────────────────────────
       3. MOBILE NAV TOGGLE
    ───────────────────────────────────────────── */
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ─────────────────────────────────────────────
       4. TEXT ROTATOR
    ───────────────────────────────────────────── */
    const texts = document.querySelectorAll('.supporting-text');
    let textIdx = 0;

    if (texts.length > 0) {
        setInterval(() => {
            texts[textIdx].classList.remove('active');
            textIdx = (textIdx + 1) % texts.length;
            texts[textIdx].classList.add('active');
        }, 4000);
    }


    /* ─────────────────────────────────────────────
       5. FADE-UP ON SCROLL
    ───────────────────────────────────────────── */
    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


    /* ─────────────────────────────────────────────
       6. COUNTER ANIMATION
    ───────────────────────────────────────────── */
    function countUp(el, target, suffix, duration = 1800) {
        let current = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                if (!isNaN(target)) countUp(el, target, suffix);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


    /* ─────────────────────────────────────────────
       7. SMOOTH SCROLL
    ───────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const navH = document.querySelector('.navbar')?.offsetHeight || 0;
            window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
        });
    });


    /* ─────────────────────────────────────────────
       8. MAGNETIC BUTTONS
    ───────────────────────────────────────────── */
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const r = btn.getBoundingClientRect();
            const x = e.pageX - r.left - r.width  / 2;
            const y = e.pageY - r.top  - r.height / 2;
            btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0,0)';
        });
    });


    /* ─────────────────────────────────────────────
       9. NAVBAR SCROLL STYLE
    ───────────────────────────────────────────── */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.style.background    = 'rgba(10,10,8,0.96)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottomColor = 'rgba(242,237,228,0.08)';
        } else {
            navbar.style.background    = 'rgba(10,10,8,0.65)';
            navbar.style.backdropFilter = 'blur(12px)';
            navbar.style.borderBottomColor = 'rgba(242,237,228,0.04)';
        }
    }, { passive: true });


    /* ─────────────────────────────────────────────
       10. FILM GRAIN — random offset every frame
    ───────────────────────────────────────────── */
    const grain = document.querySelector('.film-grain');
    if (grain) {
        let lastTime = 0;
        function shiftGrain(time) {
            if (time - lastTime > 50) {           // update ~20fps to save CPU
                grain.style.backgroundPosition =
                    `${Math.random() * 100}% ${Math.random() * 100}%`;
                lastTime = time;
            }
            requestAnimationFrame(shiftGrain);
        }
        requestAnimationFrame(shiftGrain);
    }

});
