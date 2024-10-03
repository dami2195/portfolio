$(window).on('load', function () {
    const queryString = window.location.search; // "?parametro=valore"
    const urlParams = new URLSearchParams(queryString);
    const parametro = urlParams.get('lang') || 'it'; // Default to Italian if not specified
    const path = `./languages/${parametro}/menu.json`;

    $.getJSON(path)
        .done(function (lang) {
            // Aggiorna il testo e l'href della voce "Chi sono"
            $(".about-me a").html(`<i class="fas fa-user"></i> ${lang.menu.aboutMe.label}`);
            $(".about-me a").attr("href", lang.menu.aboutMe.href);

            // Aggiorna il testo e l'href della voce "Progetti"
            $(".list-projects a").html(`<i class="fas fa-code"></i> ${lang.menu.projects.label}`);
            $(".list-projects a").attr("href", lang.menu.projects.href);

            // Aggiorna il testo e l'href della voce "Contatti"
            $(".contact-me a").html(`<i class="fas fa-envelope"></i> ${lang.menu.contactMe.label}`);
            $(".contact-me a").attr("href", lang.menu.contactMe.href);
        })
        .fail(function (jqxhr, textStatus, error) {
            console.error("Errore nel caricamento del JSON:", textStatus, error);
        });
});

$(document).ready(function () {
    $(".menu-item-language>a").click(function () {
        const selectedLang = $(this).text();
        const currentUrl = window.location.href.split('?');

        if (currentUrl.length == 1) {
            var url = `${currentUrl[0]}index.html?lang=${selectedLang}`;
            window.location.href = url;
        }


        var url = '';
        if (currentUrl[1].indexOf("lang=it") != -1 || currentUrl[1].indexOf("lang=en") != -1)
        {
            if(currentUrl[1].indexOf("lang=it") != -1)
                currentUrl[1] = currentUrl[1].replace("lang=it", "lang=en");
            else
                currentUrl[1] = currentUrl[1].replace("lang=en", "lang=it");

            url = `${currentUrl[0]}?${currentUrl[1]}`;
        }
        else
        {
            currentUrl.push(`lang=${selectedLang}`);
            url = `${currentUrl[0]}?${currentUrl[2]}&${currentUrl[1]}`;
        }
            
        window.location.href = url;
    });
});