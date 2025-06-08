$(document).ready(function () {
    const sections = $('section[id], header[id]');
    const navLinks = $('nav a[href^="#"]'); // solo link interni

    function onScroll() {
        let scrollPos = $(document).scrollTop();

        sections.each(function () {
            let currLink = navLinks.filter('[href="#' + this.id + '"]');
            let refElement = $(this);

            if (
                refElement.offset().top - 100 <= scrollPos &&
                refElement.offset().top + refElement.outerHeight() > scrollPos
            ) {
                navLinks.removeClass("active");
                currLink.addClass("active");
            }
        });
    }

    $(document).on("scroll", onScroll);
    onScroll();

    
});
