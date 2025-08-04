document.addEventListener('DOMContentLoaded', () => {
    const scrollArrow = document.getElementById('scrollArrow');

    if (scrollArrow) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 5) {
                // Define a opacidade para 0
                scrollArrow.style.opacity = '0';
            } else {
                // Volta a opacidade para 1
                scrollArrow.style.opacity = '1';
            }
        });
    }
});