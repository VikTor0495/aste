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
})();
