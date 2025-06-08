$(document).ready(function () {
    const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('menu');

  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

    
});
