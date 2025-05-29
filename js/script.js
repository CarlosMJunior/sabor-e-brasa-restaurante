document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Testimonial Carousel for Home Page
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial); // Show the first testimonial
        setInterval(nextTestimonial, 7000); // Change every 7 seconds
    }
});// Função para verificar e exibir o banner de cookies
function checkCookieConsent() {
    const consentGiven = localStorage.getItem('cookie_consent');
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const cookieSettingsModal = document.getElementById('cookie-settings-modal');

    if (!consentGiven) {
        cookieBanner.style.display = 'flex'; // Mostra o banner
    } else {
        cookieBanner.style.display = 'none'; // Esconde o banner se já houver consentimento
        // Você pode adicionar lógica aqui para carregar scripts de analytics/marketing
        // baseados no consentGiven ou em preferências mais detalhadas
    }

    // Botões do banner
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted_all');
        cookieBanner.style.display = 'none';
        // Aqui você pode carregar todos os scripts de cookies (analíticos, marketing)
    });

    document.getElementById('reject-cookies').addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'rejected_non_essential');
        cookieBanner.style.display = 'none';
        // Aqui você deve carregar apenas scripts de cookies essenciais
    });

    document.getElementById('customize-cookies').addEventListener('click', () => {
        cookieBanner.style.display = 'none';
        cookieSettingsModal.style.display = 'block'; // Mostra o modal de personalização
    });

    // Botões do modal de personalização
    document.getElementById('save-cookie-settings').addEventListener('click', () => {
        const analyticsConsent = document.getElementById('cookie-analytics').checked;
        const marketingConsent = document.getElementById('cookie-marketing').checked;

        const preferences = {
            necessary: true,
            analytics: analyticsConsent,
            marketing: marketingConsent
        };
        localStorage.setItem('cookie_consent', JSON.stringify(preferences));
        cookieSettingsModal.style.display = 'none';
        // Lógica para carregar scripts baseados nas preferências salvas
    });

    document.getElementById('close-cookie-settings').addEventListener('click', () => {
        cookieSettingsModal.style.display = 'none';
        // Se o usuário fechar sem salvar, o banner pode reaparecer na próxima visita
        // ou você pode definir um consentimento padrão se ainda não tiver um
        if (!localStorage.getItem('cookie_consent')) {
             cookieBanner.style.display = 'flex'; // Volta para o banner se nada foi salvo
        }
    });
}

// Chama a função quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', checkCookieConsent);

// Opcional: Adicione um link no rodapé ou política de privacidade para reabrir as configurações de cookies
// Exemplo: document.getElementById('open-cookie-settings').addEventListener('click', () => {
//     document.getElementById('cookie-consent-banner').style.display = 'none';
//     document.getElementById('cookie-settings-modal').style.display = 'block';
// });