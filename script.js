/* ========================================
   ASTE — Residenza Protetta per Anziani
   Site interactions
   ======================================== */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initYear();
        initMobileMenu();
        initStickyHeader();
        initScrollSpy();
        initRevealOnScroll();
        initContactForm();
        initCarousels();
        initNavDropdowns();
        initLightbox();
    });

    /* ----- Anno corrente nel footer ----- */
    function initYear() {
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ----- Menu mobile ----- */
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        // Chiudi menu al click su un link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.classList.remove('open');
            });
        });

        // Chiudi menu al click esterno
        document.addEventListener('click', e => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('open');
                toggle.classList.remove('open');
            }
        });
    }

    /* ----- Header con effetto scroll ----- */
    function initStickyHeader() {
        const header = document.getElementById('header');
        if (!header) return;
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ----- Highlight sezione attiva nel menu ----- */
    function initScrollSpy() {
        const links = document.querySelectorAll('.nav-link');
        const sections = Array.from(links)
            .map(link => {
                const id = link.getAttribute('href');
                return id && id.startsWith('#') ? document.querySelector(id) : null;
            })
            .filter(Boolean);

        if (!sections.length) return;

        const setActive = id => {
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(s => observer.observe(s));
    }

    /* ----- Reveal animations ----- */
    function initRevealOnScroll() {
        const items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('visible'));
            return;
        }

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        items.forEach(el => obs.observe(el));
    }

    /* ----- Form contatti: validazione + invio simulato ----- */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const successBox = document.getElementById('formSuccess');
        const fields = ['name', 'email', 'message'];

        const showError = (id, msg) => {
            const group = form.querySelector(`#${id}`).closest('.form-group');
            const err = form.querySelector(`.form-error[data-for="${id}"]`);
            if (group) group.classList.add('invalid');
            if (err) err.textContent = msg;
        };

        const clearError = id => {
            const group = form.querySelector(`#${id}`).closest('.form-group');
            const err = form.querySelector(`.form-error[data-for="${id}"]`);
            if (group) group.classList.remove('invalid');
            if (err) err.textContent = '';
        };

        // Cancella errore mentre l'utente scrive
        fields.forEach(id => {
            const input = form.querySelector(`#${id}`);
            if (input) input.addEventListener('input', () => clearError(id));
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            let valid = true;

            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const phone = form.querySelector('#phone').value.trim();
            const message = form.querySelector('#message').value.trim();
            const privacy = form.querySelector('#privacy').checked;

            if (name.length < 2) {
                showError('name', 'Inserisci nome e cognome.');
                valid = false;
            }

            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(email)) {
                showError('email', 'Inserisci un indirizzo email valido.');
                valid = false;
            }

            if (phone && !/^[+\d\s().-]{6,20}$/.test(phone)) {
                showError('phone', 'Numero non valido.');
                valid = false;
            }

            if (message.length < 10) {
                showError('message', 'Scrivi un messaggio di almeno 10 caratteri.');
                valid = false;
            }

            if (!privacy) {
                alert('È necessario accettare il trattamento dei dati per inviare il messaggio.');
                valid = false;
            }

            if (!valid) return;

            // Simulazione di invio: in produzione, sostituire con fetch verso un endpoint reale
            // (es. mailto, FormSpree, Netlify Forms, o un proprio backend).
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';

            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                if (successBox) {
                    successBox.classList.add('visible');
                    setTimeout(() => successBox.classList.remove('visible'), 6000);
                }
            }, 800);
        });
    }

    /* ----- Carousel: scroll-snap + frecce + dots + autoplay ----- */
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        carousels.forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            const slides = track ? Array.from(track.children) : [];
            if (!track || slides.length === 0) return;

            const prev = carousel.querySelector('.carousel-arrow.prev');
            const next = carousel.querySelector('.carousel-arrow.next');
            const dotsWrap = carousel.querySelector('.carousel-dots');
            const autoplay = carousel.dataset.autoplay === 'true' && !reduceMotion;
            const interval = parseInt(carousel.dataset.interval || '5000', 10);

            // Crea i dots dinamicamente
            let dots = [];
            if (dotsWrap) {
                dotsWrap.innerHTML = '';
                slides.forEach((_, i) => {
                    const b = document.createElement('button');
                    b.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                    b.setAttribute('aria-label', `Vai alla slide ${i + 1}`);
                    b.addEventListener('click', () => scrollToIndex(i));
                    dotsWrap.appendChild(b);
                    dots.push(b);
                });
            }

            const slideWidth = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);

            const scrollToIndex = i => {
                const idx = (i + slides.length) % slides.length;
                track.scrollTo({ left: idx * slideWidth(), behavior: reduceMotion ? 'auto' : 'smooth' });
            };

            const currentIndex = () => Math.round(track.scrollLeft / slideWidth());

            const updateUI = () => {
                const i = currentIndex();
                dots.forEach((d, di) => d.classList.toggle('active', di === i));
                if (prev) prev.disabled = i === 0;
                if (next) next.disabled = i === slides.length - 1;
            };

            if (prev) prev.addEventListener('click', () => scrollToIndex(currentIndex() - 1));
            if (next) next.addEventListener('click', () => scrollToIndex(currentIndex() + 1));

            let scrollTimeout;
            track.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(updateUI, 80);
            });
            window.addEventListener('resize', updateUI);
            updateUI();

            // Autoplay con pausa su hover/focus
            if (autoplay) {
                let timer = null;
                const start = () => {
                    stop();
                    timer = setInterval(() => {
                        const i = currentIndex();
                        scrollToIndex(i >= slides.length - 1 ? 0 : i + 1);
                    }, interval);
                };
                const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

                start();
                carousel.addEventListener('mouseenter', stop);
                carousel.addEventListener('mouseleave', start);
                carousel.addEventListener('focusin', stop);
                carousel.addEventListener('focusout', start);
                track.addEventListener('touchstart', stop, { passive: true });
                track.addEventListener('touchend', start, { passive: true });
                document.addEventListener('visibilitychange', () => {
                    document.hidden ? stop() : start();
                });
            }
        });
    }

    /* ----- Nav dropdown (Galleria) ----- */
    function initNavDropdowns() {
        document.querySelectorAll('.has-dropdown').forEach(item => {
            const toggle = item.querySelector('.dropdown-toggle');
            if (!toggle) return;
            toggle.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                document.querySelectorAll('.has-dropdown.open').forEach(o => {
                    if (o !== item) o.classList.remove('open');
                });
                item.classList.toggle('open');
            });
        });
        document.addEventListener('click', e => {
            if (!e.target.closest('.has-dropdown')) {
                document.querySelectorAll('.has-dropdown.open').forEach(o => o.classList.remove('open'));
            }
        });
    }

    /* ----- Lightbox per gallerie ----- */
    function initLightbox() {
        const items = Array.from(document.querySelectorAll('[data-lightbox]'));
        if (items.length === 0) return;

        // Raggruppa per data-lightbox group
        const groups = {};
        items.forEach(it => {
            const g = it.dataset.lightbox || 'default';
            (groups[g] = groups[g] || []).push(it);
        });

        // Crea overlay una volta sola
        const overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Chiudi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <button class="lightbox-nav prev" aria-label="Precedente">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div class="lightbox-content">
                <img class="lightbox-img" alt="">
                <div class="lightbox-counter"></div>
            </div>
            <button class="lightbox-nav next" aria-label="Successiva">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6"/></svg>
            </button>
        `;
        document.body.appendChild(overlay);

        const img = overlay.querySelector('.lightbox-img');
        const counter = overlay.querySelector('.lightbox-counter');
        const closeBtn = overlay.querySelector('.lightbox-close');
        const prevBtn = overlay.querySelector('.lightbox-nav.prev');
        const nextBtn = overlay.querySelector('.lightbox-nav.next');

        let currentGroup = [];
        let currentIndex = 0;

        const show = i => {
            currentIndex = (i + currentGroup.length) % currentGroup.length;
            const el = currentGroup[currentIndex];
            const src = el.dataset.full || el.querySelector('img')?.src || el.href;
            const alt = el.dataset.alt || el.querySelector('img')?.alt || '';
            img.src = src;
            img.alt = alt;
            counter.textContent = `${currentIndex + 1} / ${currentGroup.length}`;
            const single = currentGroup.length <= 1;
            prevBtn.style.display = single ? 'none' : '';
            nextBtn.style.display = single ? 'none' : '';
        };

        const open = (group, index) => {
            currentGroup = groups[group] || [];
            if (currentGroup.length === 0) return;
            show(index);
            overlay.classList.add('open');
            document.body.classList.add('lb-open');
        };

        const close = () => {
            overlay.classList.remove('open');
            document.body.classList.remove('lb-open');
            img.src = '';
        };

        items.forEach(it => {
            it.addEventListener('click', e => {
                e.preventDefault();
                const g = it.dataset.lightbox || 'default';
                const idx = (groups[g] || []).indexOf(it);
                open(g, Math.max(0, idx));
            });
        });

        closeBtn.addEventListener('click', close);
        prevBtn.addEventListener('click', () => show(currentIndex - 1));
        nextBtn.addEventListener('click', () => show(currentIndex + 1));

        overlay.addEventListener('click', e => {
            if (e.target === overlay) close();
        });

        document.addEventListener('keydown', e => {
            if (!overlay.classList.contains('open')) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') show(currentIndex - 1);
            else if (e.key === 'ArrowRight') show(currentIndex + 1);
        });

        // Swipe touch
        let touchStartX = 0;
        let touchStartY = 0;
        overlay.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        overlay.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
                show(dx > 0 ? currentIndex - 1 : currentIndex + 1);
            } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
                close();
            }
        }, { passive: true });
    }
})();
