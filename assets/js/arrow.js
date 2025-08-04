document.addEventListener('DOMContentLoaded', () => {
    const scrollArrow = document.getElementById('scrollArrow');

    // Verifica se o elemento da seta existe na página
    if (scrollArrow) {
        window.addEventListener('scroll', () => {
            // A seta desaparece quando a rolagem for maior que 100 pixels
            if (window.scrollY > 5) {
                scrollArrow.classList.add('hidden');
            } else {
                scrollArrow.classList.remove('hidden');
            }
        });
    }
});