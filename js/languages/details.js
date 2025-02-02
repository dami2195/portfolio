$(window).on('load', function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const projectId = getQueryParam('id');

    const queryString = window.location.search; // "?parametro=valore"
    const urlParams = new URLSearchParams(queryString);
    const parametro = urlParams.get('lang') || 'it'; // Default to Italian if not specified
    const path = `./languages/${parametro}/projects.json`;

    // Imposta l'URL canonico
    const canonicalUrl = `${window.location.origin}${window.location.pathname}?lang=en${projectId ? `&id=${projectId}` : ''}`;
    $('head').append(`<link rel="canonical" href="${canonicalUrl}" />`);
    
    // Aggiunta dei tag hreflang per la gestione delle lingue
    const languages = ['it']; // Puoi aggiungere altre lingue
    languages.forEach(l => {
        const hrefLangUrl = `${window.location.origin}${window.location.pathname}?lang=${l}${projectId ? `&id=${projectId}` : ''}`;
        $('head').append(`<link rel="alternate" hreflang="${l}" href="${hrefLangUrl}" />`);

        const hrefUrl = `${window.location.origin}${window.location.pathname}?${projectId ? `&id=${projectId}` : ''}`;
        $('head').append(`<link rel="alternate" href="${hrefUrl}" />`);

    });

    $.getJSON(path)
        .done(function (projects) {
            const projectData = projects.projects.find(p => p.id === projectId);

            if (!projectData) {
                console.error("Progetto non trovato con ID:", projectId);
                return;
            }

            // Imposta il titolo della pagina
            $("title").text(projectData.title);

            // Imposta i meta tag per descrizione e parole chiave
            $("meta[name='description']").attr("content", projectData.meta.description || ""); // Usa il valore dal JSON, o una stringa vuota se non presente
            $("meta[name='keywords']").attr("content", projectData.meta.keywords || "");

            // Popola l'intestazione
            $("#header-title").text(projectData.header.h1);
            $("#header-paragraph").html(projectData.header.p);

            // Popola la sezione della descrizione
            const description = projectData.sections[0];
            $("#description-title").text(description.title);

            description.content.forEach(function (paragraph) {
                $("#description .content-description").append(`<p>${paragraph}</p>`);
            });

            const functions = projectData.sections[1];

            $("#functions-title").text(functions.title);

            functions.content.forEach(function (paragraph) {
                $("#functions .content-description").append(`<p>${paragraph}</p>`);
            });

            const motivation = projectData.sections[2];

            $("#motivation-title").text(motivation.title);

            motivation.content.forEach(function (paragraph) {
                $("#motivation .content-description").append(`<p>${paragraph}</p>`);
            });

            $(".tech-section-title").text(projectData.sections[3].title)
            const techSection = projectData.sections[3].techCategories;

            techSection.forEach(function (category) {
                let categoryHtml = `<div class="tech-category content-description"><h4 class="tech-title"><i class="fas fa-code"></i> ${category.title}</h4><ul class="tech-list">`;
                category.technologies.forEach(function (tech) {
                    categoryHtml += `<li><i class="fas fa-check-circle"></i> ${tech}</li>`;
                });
                categoryHtml += '</ul></div>';
                $("#tech-section").append(categoryHtml);
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            console.error("Errore nel caricamento del JSON:", textStatus, error);
        });
})
