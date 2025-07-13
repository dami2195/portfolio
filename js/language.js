document.addEventListener('DOMContentLoaded', function() {
    // Funzione per chiudere tutti i dropdown delle lingue
    function closeAllLanguageDropdowns() {
        const allDropdowns = document.querySelectorAll('.lang-dropdown');
        allDropdowns.forEach(dropdown => {
            dropdown.setAttribute('hidden', '');
            const button = document.querySelector(`[aria-controls="${dropdown.id}"]`);
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Funzione per impostare la lingua attiva nel pulsante
    function setActiveLanguageButton(langCode) {
       

    }

    // Recupera la lingua salvata o imposta un default (es. 'it')
    const savedLanguage = localStorage.getItem('userLanguage') || 'it';
    setActiveLanguageButton(savedLanguage); // Imposta il pulsante iniziale

    // Gestione dei clic sui pulsanti della lingua (APERTURA/CHIUSURA)
    const languageButtons = document.querySelectorAll('[id^="lang-btn-"]');

    languageButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();

            const targetMenuId = this.getAttribute('aria-controls');
            const targetMenu = document.getElementById(targetMenuId);

            if (targetMenu) {
                const isHidden = targetMenu.hasAttribute('hidden');

                closeAllLanguageDropdowns(); // Chiude tutti gli altri menu a tendina

                if (isHidden) {
                    targetMenu.removeAttribute('hidden');
                    this.setAttribute('aria-expanded', 'true');
                } else {
                    targetMenu.setAttribute('hidden', '');
                    this.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Gestione dei clic sulle opzioni di cambio lingua (CAMBIO LINGUA)
    const changeLanguageLinks = document.querySelectorAll('.change-lang');

    changeLanguageLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del link (che sarebbe quello di ricaricare la pagina o navigare)

            const newLang = this.getAttribute('data-lang'); // Ottiene il codice lingua (es. 'it', 'en')

            // Salva la preferenza di lingua

            const linkAlternate = document.querySelector(`link[rel="alternate"][hreflang="${newLang}"]`).getAttribute('href');

            if (linkAlternate) {
                // Reindirizza a quel link
                window.location.href = linkAlternate;
            } else {
                // Se non trova il link alternate, rimane nella pagina attuale
                alert('Lingua non disponibile per questa pagina');
            }

            setActiveLanguageButton(newLang);

            closeAllLanguageDropdowns();

            
            console.log("Lingua cambiata a:", newLang);
        });
    });


    // Chiudi il dropdown quando si clicca al di fuori di esso
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.language-switcher')) {
            closeAllLanguageDropdowns();
        }
    });
});