$(window).on('load', function () {



    const queryString = window.location.search; // "?parametro=valore"
    const urlParams = new URLSearchParams(queryString);
    const parametro = urlParams.get('lang') || 'it'; // Default to Italian if not specified
    const path = `./languages/${parametro}/index.json`;

    $.getJSON(path)
        .done(function (lang) {
            
            $('meta[name="description"]').attr('content', lang.meta.description);
            $('meta[name="keywords"]').attr('content', lang.meta.keywords);
            
            // Aggiornamento contenuti
            $("title").text(lang.title);
            $(".header-content h1").text("Damiano Gazzino");
            $(".header-content h2").text(lang.headerContent);
            $("#description-title").text(lang.aboutMe.title);
            const aboutMeContainer = $(".content-description");
            aboutMeContainer.empty();
            lang.aboutMe.description.forEach(paragraph => {
                aboutMeContainer.append(`<p>${paragraph}</p>`);
            });

            // Caricamento progetti
            $(".projects h2").text(lang.projects.title);
            const projectsContainer = $(".tech-section");
            lang.projects.items.forEach(item => {
                projectsContainer.append(`
                    <div class="col-md-6 content-description fade-in-left">
                        <div class="card">
                            <div class="card-header">
                                <img src="images/${item.image}" class="project-image" alt="${item.name}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"><strong>${item.name}</strong></h5>
                                <p class="card-text">${item.description}</p>
                                <a href="${item.link}" class="btn btn-primary">${item.button}</a>
                            </div>
                        </div>
                    </div>
                `);
            });

            $("#footer-text").html(lang.footer.text);

            // Avvio delle animazioni solo quando i progetti sono caricati
            initAnimations();
        })
        .fail(function (jqxhr, textStatus, error) {
            console.error("Errore nel caricamento del JSON:", textStatus, error);
        });
});



function initAnimations() {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .zoom-in, .fade-in-title');
    let animatedElements = new Set();

    function animateElements() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !animatedElements.has(el)) {
                animatedElements.add(el);
                el.classList.add('animate-in');
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(animateElements);
    });

    animateElements(); // Inizializza subito per gli elementi già visibili
}
