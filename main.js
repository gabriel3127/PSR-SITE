// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contato-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            tipo: document.getElementById('tipo').value,
            mensagem: document.getElementById('mensagem').value
        };

        // Basic validation
        if (!formData.nome || !formData.email || !formData.tipo || !formData.mensagem) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.produto-card, .diferencial-item, .hero-text, .sobre-text').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats (if we had any)
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString('pt-BR');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // WhatsApp integration
    function createWhatsAppLink(message) {
        const phoneNumber = '5561999998888'; // Remove spaces and add country code
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }

    // Add WhatsApp click events
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Orçamento')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const message = 'Olá! Gostaria de solicitar um orçamento para embalagens e artigos de festa.';
                window.open(createWhatsAppLink(message), '_blank');
            });
        }
    });

    // Product card hover effects
    document.querySelectorAll('.produto-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #febb0f;
        color: #214194;
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form field animations
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Loading animation for hero section
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');

    // Add initial animation classes
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateX(-50px)';
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateX(50px)';

    // Animate hero content on load
    setTimeout(() => {
        heroText.style.transition = 'all 0.8s ease';
        heroImage.style.transition = 'all 0.8s ease 0.2s';
        
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 200);
    }, 100);

    // Typewriter effect for hero title (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Contact info click events
    document.querySelector('.contato-item:nth-child(1)').addEventListener('click', function() {
        window.location.href = 'tel:+5561333344444';
    });

    document.querySelector('.contato-item:nth-child(2)').addEventListener('click', function() {
        const message = 'Olá! Vim através do site da FestPack e gostaria de mais informações.';
        window.open(createWhatsAppLink(message), '_blank');
    });

    document.querySelector('.contato-item:nth-child(3)').addEventListener('click', function() {
        window.location.href = 'mailto:contato@festpack.com.br?subject=Contato através do site';
    });

    // Lazy loading for images (if we had real images)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Call lazy loading if needed
    lazyLoadImages();

    // Add CSS animations through JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .form-group.focused input,
        .form-group.focused select,
        .form-group.focused textarea {
            border-color: #febb0f;
            box-shadow: 0 0 0 3px rgba(254, 187, 15, 0.1);
        }

        .scroll-to-top:hover {
            background-color: #e5a50d !important;
            transform: translateY(-2px);
        }

        .produto-card {
            transition: all 0.3s ease;
        }

        .diferencial-item {
            transition: all 0.3s ease;
        }

        .contato-item {
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 10px;
            border-radius: 5px;
        }

        .contato-item:hover {
            background-color: rgba(254, 187, 15, 0.1);
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    messageDiv.style.cssText = `
        padding: 12px 20px;
        margin: 15px 0;
        border-radius: 5px;
        font-weight: 500;
        text-align: center;
        animation: slideInDown 0.3s ease;
        ${type === 'success' 
            ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;

    const form = document.querySelector('.contato-form');
    form.insertBefore(messageDiv, form.firstChild);

    // Auto remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Google Analytics or other tracking code can be added here
function trackEvent(eventName, parameters) {
    // Example: gtag('event', eventName, parameters);
    console.log('Event tracked:', eventName, parameters);
}

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Track page load
    trackEvent('page_load', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// Error handling for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration (for PWA features if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js');
        // Uncomment above line if you create a service worker
    });
}