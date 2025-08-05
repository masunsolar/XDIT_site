document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainMenu = document.getElementById('main-menu');
    const openServicos = document.getElementById('open-servicos');
    const dropdownServicos = document.getElementById('dropdown-servicos');

    function closeAllMenus() {
        mainMenu && mainMenu.classList.remove('open');
        dropdownServicos && dropdownServicos.classList.remove('open');
        openServicos && openServicos.classList.remove('open'); // Adiciona esta linha
        document.body.classList.remove('menu-open');
    }

    hamburgerBtn && hamburgerBtn.addEventListener('click', () => {
        if (mainMenu.classList.contains('open')) {
            closeAllMenus();
        } else {
            mainMenu.classList.add('open');
            document.body.classList.add('menu-open');
        }
    });

    openServicos && openServicos.addEventListener('click', (e) => {
        // Só ativa no mobile
        if (window.innerWidth > 1024) return;
        e.preventDefault();
        dropdownServicos.classList.toggle('open');
        openServicos.classList.toggle('open'); // Adiciona esta linha
    });

    // Fecha menu ao clicar em qualquer link
    document.querySelectorAll('[data-menu="close"]').forEach(link => {
        link.addEventListener('click', closeAllMenus);
    });

    // Fecha menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeAllMenus();
        }
    });
});