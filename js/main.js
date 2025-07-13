document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            // Controlla se bottomNav esiste prima di provare a prenderne l'altezza
            const bottomNavHeight = document.getElementById('bottomNav') ? document.getElementById('bottomNav').offsetHeight : 0;


            if (targetElement) {
                // Adjust scroll offset based on both top and potential bottom navs
                let offset = 0;
                // Applica l'offset della bottom nav solo su schermi dove è visibile (quindi < 768px)
                if (window.innerWidth < 768) {
                    offset = navbarHeight + bottomNavHeight + 20; // Add both nav heights + a bit more
                } else {
                    offset = navbarHeight + 70; // Original desktop offset
                }


                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // Manual Navbar Active State on Scroll (if not using Bootstrap Scrollspy)
    const sections = document.querySelectorAll('section[id]');
    const navLinksTop = document.querySelectorAll('.navbar-nav .nav-link');
    // Seleziona anche i link della bottom nav
    const navLinksBottom = document.querySelectorAll('#bottomNav .nav-link');


    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        // Controlla se bottomNav esiste prima di provare a prenderne l'altezza
        const bottomNavHeight = document.getElementById('bottomNav') ? document.getElementById('bottomNav').offsetHeight : 0;
        let offsetForActive = 0;

        if (window.innerWidth < 768) { // Mobile: usa l'offset maggiore per considerare anche la bottom nav
            offsetForActive = navbarHeight + bottomNavHeight + 50;
        } else { // Desktop: usa l'offset originale
            offsetForActive = navbarHeight + 80;
        }
    });

});