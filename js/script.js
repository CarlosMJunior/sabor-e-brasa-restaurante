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
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieConsentBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const declineCookiesBtn = document.getElementById('declineCookies');
    const customizeCookiesBtn = document.getElementById('customizeCookies');
    const cookiePreferencesModal = document.getElementById('cookiePreferencesModal');
    const saveCookiePreferencesBtn = document.getElementById('saveCookiePreferences');
    const closeCookieModalBtn = document.getElementById('closeCookieModal');

    const analyticsCheckbox = document.getElementById('analyticsCookies');
    const marketingCheckbox = document.getElementById('marketingCookies');

    // Função para definir um cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Função para ler um cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Função para apagar um cookie (tornando-o expirado)
    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    // Função para carregar scripts externos (simulando scripts de análise/marketing)
    function loadExternalScripts(preferences) {
        // Exemplo: Carregar script de análise apenas se o usuário consentiu
        if (preferences.analytics) {
            console.log("Carregando script de Análise (Ex: Google Analytics)");
            // Exemplo real:
            // const script = document.createElement('script');
            // script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y'; // Seu ID do GA
            // document.head.appendChild(script);
            // script.onload = () => {
            //     window.dataLayer = window.dataLayer || [];
            //     function gtag(){dataLayer.push(arguments);}
            //     gtag('js', new Date());
            //     gtag('config', 'UA-XXXXX-Y');
            // };
        }
        // Exemplo: Carregar script de marketing apenas se o usuário consentiu
        if (preferences.marketing) {
            console.log("Carregando script de Marketing (Ex: Pixel do Facebook)");
            // Exemplo real:
            // const script = document.createElement('script');
            // script.src = 'https://connect.facebook.net/en_US/fbevents.js'; // Seu pixel do FB
            // document.head.appendChild(script);
            // script.onload = () => {
            //     fbq('init', 'YOUR_PIXEL_ID');
            //     fbq('track', 'PageView');
            // };
        }
    }

    // Verifica se o usuário já consentiu
    const consentGiven = getCookie('sabor_e_brasa_cookie_consent');

    if (consentGiven) {
        cookieBanner.style.display = 'none'; // Esconde o banner
        try {
            const preferences = JSON.parse(consentGiven);
            loadExternalScripts(preferences); // Carrega scripts baseados nas preferências salvas
        } catch (e) {
            console.error("Erro ao parsear preferências de cookie:", e);
            // Se houver erro, assume consentimento básico ou mostra o banner novamente
            loadExternalScripts({ essential: true, analytics: false, marketing: false });
        }
    } else {
        cookieBanner.style.display = 'flex'; // Mostra o banner
    }

    // Event Listeners para os botões do banner
    acceptCookiesBtn.addEventListener('click', () => {
        const preferences = { essential: true, analytics: true, marketing: true };
        setCookie('sabor_e_brasa_cookie_consent', JSON.stringify(preferences), 365);
        loadExternalScripts(preferences);
        cookieBanner.style.display = 'none';
        console.log('Todos os cookies aceitos.');
    });

    declineCookiesBtn.addEventListener('click', () => {
        const preferences = { essential: true, analytics: false, marketing: false };
        setCookie('sabor_e_brasa_cookie_consent', JSON.stringify(preferences), 365);
        // Apaga cookies de análise/marketing existentes (se houver, para ser mais completo)
        // Ex: eraseCookie('_ga'); // Exemplo de cookie do Google Analytics
        loadExternalScripts(preferences); // Garante que apenas os essenciais são carregados
        cookieBanner.style.display = 'none';
        console.log('Apenas cookies essenciais aceitos.');
    });

    customizeCookiesBtn.addEventListener('click', () => {
        cookiePreferencesModal.style.display = 'flex';
        // Carrega as preferências atuais no modal, se existirem
        const currentConsent = getCookie('sabor_e_brasa_cookie_consent');
        if (currentConsent) {
            try {
                const preferences = JSON.parse(currentConsent);
                analyticsCheckbox.checked = preferences.analytics || false;
                marketingCheckbox.checked = preferences.marketing || false;
            } catch (e) {
                console.error("Erro ao carregar preferências no modal:", e);
            }
        }
    });

    // Event Listeners para o modal de preferências
    saveCookiePreferencesBtn.addEventListener('click', () => {
        const preferences = {
            essential: true, // Essenciais são sempre true
            analytics: analyticsCheckbox.checked,
            marketing: marketingCheckbox.checked
        };
        setCookie('sabor_e_brasa_cookie_consent', JSON.stringify(preferences), 365);
        loadExternalScripts(preferences); // Recarrega scripts com base nas novas preferências
        cookiePreferencesModal.style.display = 'none';
        cookieBanner.style.display = 'none';
        console.log('Preferências de cookies salvas:', preferences);
    });

    closeCookieModalBtn.addEventListener('click', () => {
        cookiePreferencesModal.style.display = 'none';
    });
});