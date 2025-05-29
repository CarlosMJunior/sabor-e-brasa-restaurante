document.addEventListener('DOMContentLoaded', function() {
    // --- Funcionalidade do Menu Hamburguer ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.main-nav .nav-links'); 

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // --- Carrossel de Depoimentos para a Página Inicial ---
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
        showTestimonial(currentTestimonial); // Mostra o primeiro depoimento
        setInterval(nextTestimonial, 7000); // Troca a cada 7 segundos
    }

    // --- Funcionalidade do Banner e Modal de Cookies ---
    const cookieBanner = document.getElementById('cookie-banner'); 
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');
    const customizeCookiesBtn = document.getElementById('customize-cookies');

    const cookieModal = document.getElementById('cookie-modal'); 
    const saveCookieSettingsBtn = document.getElementById('save-cookie-settings');
    const closeCookieModalBtn = document.getElementById('close-cookie-modal');

    const essentialCheckbox = document.getElementById('essential-cookies');
    const analyticsCheckbox = document.getElementById('analytics-cookies');
    const marketingCheckbox = document.getElementById('marketing-cookies');


    // Função para definir um cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
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
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }

    // Função para carregar scripts externos (simulando scripts de análise/marketing)
    function loadExternalScripts(preferences) {
        // Exemplo: Carregar script de análise apenas se o usuário consentiu
        if (preferences.analytics) {
            console.log("LGPD: Carregando script de Análise (Ex: Google Analytics)");
            // Insira aqui o código real para carregar Google Analytics, etc.
            // Exemplo real de GA4 (Global Site Tag):
            /*
            const scriptGA = document.createElement('script');
            scriptGA.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA4_MEASUREMENT_ID'; 
            scriptGA.async = true;
            document.head.appendChild(scriptGA);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_GA4_MEASUREMENT_ID');
            */
        } else {
            console.log("LGPD: Analytics não consentido. Não carregando scripts de Análise e removendo cookies.");
            // Apaga cookies de análise existentes se o consentimento for revogado
            eraseCookie('_ga'); 
            eraseCookie('_gid');
            // Você também pode precisar remover o script se ele já foi carregado
            // Ex: remover elemento <script> de gtag.js
        }

        // Exemplo: Carregar script de marketing apenas se o usuário consentiu
        if (preferences.marketing) {
            console.log("LGPD: Carregando script de Marketing (Ex: Pixel do Facebook)");
            // Insira aqui o código real para carregar Pixel do Facebook, etc.
            // Exemplo real de Facebook Pixel:
            /*
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
            */
        } else {
            console.log("LGPD: Marketing não consentido. Não carregando scripts de Marketing e removendo cookies.");
            // Apaga cookies de marketing existentes se o consentimento for revogado
            eraseCookie('_fbp'); 
            eraseCookie('_fbc');
        }
    }

    // Função para exibir ou ocultar o banner de cookies
    function toggleCookieBanner(show) {
        if (cookieBanner) {
            if (show) {
                cookieBanner.classList.remove('hidden');
            } else {
                cookieBanner.classList.add('hidden');
            }
        }
    }

    // Verifica se o usuário já consentiu ao carregar a página
    const consentGiven = getCookie('sabor_e_brasa_cookie_consent');

    if (consentGiven) {
        toggleCookieBanner(false); // Esconde o banner
        try {
            const preferences = JSON.parse(consentGiven);
            loadExternalScripts(preferences); // Carrega scripts baseados nas preferências salvas
        } catch (e) {
            console.error("LGPD: Erro ao parsear preferências de cookie:", e);
            // Se houver erro ou dado corrompido, assume consentimento básico e mostra o banner novamente
            toggleCookieBanner(true);
            loadExternalScripts({ essential: true, analytics: false, marketing: false });
        }
    } else {
        toggleCookieBanner(true); // Mostra o banner
    }

    // Event Listeners para os botões do banner
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            const preferences = { essential: true, analytics: true, marketing: true };
            setCookie('sabor_e_brasa_cookie_consent', JSON.stringify(preferences), 365);
            loadExternalScripts(preferences);
            toggleCookieBanner(false);
            console.log('LGPD: Todos os cookies aceitos.');
        });
    }

    if (declineCookiesBtn) {
        declineCookiesBtn.addEventListener('click', () => {
            const preferences = { essential: true, analytics: false, marketing: false };
            setCookie('sabor_e_brasa_cookie_consent', JSON.stringify(preferences), 365);
            loadExternalScripts(preferences); // Garante que apenas os essenciais são carregados
            toggleCookieBanner(false);
            console.log('LGPD: Apenas cookies essenciais aceitos.');
        });
    }

    if (customizeCookiesBtn) {
        customizeCookiesBtn.addEventListener('click', () => {
            if (cookieModal) {
                cookieModal.classList.add('visible');
                // Carrega as preferências atuais no modal, se existirem
                const currentConsent = getCookie('sabor_e_brasa_cookie_consent');
                if (currentConsent) {
                    try {
                        const preferences = JSON.parse(currentConsent);
                        if (essentialCheckbox) essentialCheckbox.checked = true; // Essencial é sempre marcado
                        if (analyticsCheckbox) analyticsCheckbox.checked = preferences.analytics || false;
                        if (marketingCheckbox) marketingCheckbox.checked = preferences.marketing || false;
                    } catch (e) {
                        console.error("LGPD: Erro ao carregar preferências no modal:", e);
                    }
                } else {
                    // Se não há consentimento prévio, desmarca tudo exceto essencial por padrão
                    if (essentialCheckbox) essentialCheckbox.checked = true;
                    if (analyticsCheckbox) analyticsCheckbox.checked = false;
                    if (marketingCheckbox) marketingCheckbox.checked = false;
                }
            }
            toggleCookieBanner(false); // Esconde o banner ao abrir o modal
        });
    }

    // Event Listeners para o modal de preferências
    if (saveCookieSettingsBtn) {
        saveCookieSettingsBtn.addEventListener('click', () => {
            const preferences = {
                essential: true, // Essenciais são sempre true
                analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
                marketing: marketingCheckbox ? marketingCheckbox.checked : false
            };
            setCookie('sabor_e_brasa_cookie_consent', JSON.stringify(preferences), 365);
            loadExternalScripts(preferences); // Recarrega scripts com base nas novas preferências
            if (cookieModal) cookieModal.classList.remove('visible');
            toggleCookieBanner(false); // Garante que o banner esteja escondido após salvar
            console.log('LGPD: Preferências de cookies salvas:', preferences);
        });
    }

    if (closeCookieModalBtn) {
        closeCookieModalBtn.addEventListener('click', () => {
            if (cookieModal) cookieModal.classList.remove('visible');
            // Se o usuário fechar o modal sem salvar e não houver um consentimento anterior,
            // o banner pode reaparecer na próxima visita. Aqui, assumimos que se o modal for fechado,
            // o banner já foi escondido pela ação "Personalizar".
            // Se você quiser que o banner reapareça se nada foi aceito, adicione:
            // if (!getCookie('sabor_e_brasa_cookie_consent')) toggleCookieBanner(true);
        });
    }

    // Fechar o modal de cookies clicando fora dele
    if (cookieModal) {
        cookieModal.addEventListener('click', (event) => {
            if (event.target === cookieModal) { // Verifica se o clique foi no fundo do modal
                cookieModal.classList.remove('visible');
                // Se o usuário fechar o modal sem salvar e não houver um consentimento anterior,
                // pode ser necessário reexibir o banner.
                // if (!getCookie('sabor_e_brasa_cookie_consent')) toggleCookieBanner(true);
            }
        });
    }
});