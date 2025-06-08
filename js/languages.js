$(function () {
    $('.change-lang').click(function (e) {
        e.preventDefault();
        const targetLang = $(this).data('lang');

        // Cerca il link <link rel="alternate" hreflang="targetLang">
        const linkAlternate = $('link[rel="alternate"][hreflang="' + targetLang + '"]').attr('href');

        console.log(linkAlternate);
        if (linkAlternate) {
            // Reindirizza a quel link
            window.location.href = linkAlternate;
        } else {
            // Se non trova il link alternate, rimane nella pagina attuale
            alert('Lingua non disponibile per questa pagina');
        }
    });
});

$(document).ready(function() {
  const $btn = $('#lang-btn');
  const $menu = $('#lang-menu');

  $btn.on('click', function(e) {
    e.stopPropagation();
    const isShown = $menu.hasClass('show');
    if (isShown) {
      $menu.removeClass('show');
      $btn.attr('aria-expanded', 'false');
    } else {
      $menu.addClass('show');
      $btn.attr('aria-expanded', 'true');
    }
  });

  $('.change-lang').on('click', function(e) {
    e.preventDefault();
    // Qui aggiungi il cambio lingua effettivo
    $menu.removeClass('show');
    $btn.attr('aria-expanded', 'false');
  });

  $(document).on('click', function() {
    $menu.removeClass('show');
    $btn.attr('aria-expanded', 'false');
  });

  $menu.on('click', function(e) {
    e.stopPropagation();
  });
});

