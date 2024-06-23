

document.addEventListener("DOMContentLoaded", function() {
    var profileDescription = document.querySelector(".profile-description");
    
    // Ottieni il testo completo da mostrare
    var fullText = profileDescription.textContent.trim().replace(/\s\s+/g, ' ');
    
    // Nascondi il testo inizialmente
    profileDescription.textContent = "";
    
    // Aggiungi il testo carattere per carattere con un timeout per simulare la digitazione
    function typeWriter(text, i) {
        if (i < text.length) {
            profileDescription.textContent += text.charAt(i);
            i++;
            setTimeout(function() {
                typeWriter(text, i);
            }, 35); // Tempo tra ogni carattere (millisecondi)
        } else {
            // Mostra il testo completamente visibile
            profileDescription.classList.remove("hidden");
        }
    }
    
    // Chiamata alla funzione di scrittura
    typeWriter(fullText, 0);

    const projects = document.querySelectorAll('.project');
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <div class="popup-arrow left">&#10094;</div>
            <div class="popup-images"></div>
            <div class="popup-arrow right">&#10095;</div>
        </div>
    `;
    document.body.appendChild(popup);

    const popupContent = popup.querySelector('.popup-content');
    const popupClose = popup.querySelector('.popup-close');
    const popupImages = popup.querySelector('.popup-images');
    const popupArrowLeft = popup.querySelector('.popup-arrow.left');
    const popupArrowRight = popup.querySelector('.popup-arrow.right');
    let currentIndex = 0;
    let images = [];

    projects.forEach(project => {
        project.addEventListener('click', () => {
            const gallery = project.querySelector('.popup');
            images = Array.from(gallery.querySelectorAll('img'));
            currentIndex = 0;
            showImage(currentIndex);
            popup.style.display = 'flex';
        });
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    popupArrowLeft.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    popupArrowRight.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    function showImage(index) {
        popupImages.innerHTML = '';
        const clone = images[index].cloneNode();
        popupImages.appendChild(clone);
        
        // Gestione visibilità delle frecce
        if (index === 0) {
            popupArrowLeft.style.display = 'none';
        } else {
            popupArrowLeft.style.display = 'flex';
        }

        if (index === images.length - 1) {
            popupArrowRight.style.display = 'none';
        } else {
            popupArrowRight.style.display = 'flex';
        }
    }
});
