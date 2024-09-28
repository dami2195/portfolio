document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .zoom-in, .fade-in-title');
    let animatedElements = new Set(); // Set per tenere traccia degli elementi già animati

    // Funzione per animare gli elementi visibili
    function animateElements() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !animatedElements.has(el)) {
                animatedElements.add(el); // Aggiungi l'elemento al set
                el.classList.add('animate-in');
            }
        });
    }

    // Aggiungi listener di scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(animateElements);
    });

    // Inizializza l'animazione per gli elementi già visibili
    animateElements();
});
