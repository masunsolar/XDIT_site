document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainMenu = document.getElementById('main-menu');
    const openServicos = document.getElementById('open-servicos');
    const dropdownServicos = document.getElementById('dropdown-servicos');

    function closeAllMenus() {
        mainMenu && mainMenu.classList.remove('open');
        dropdownServicos && dropdownServicos.classList.remove('open');
        openServicos && openServicos.classList.remove('open');
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
        if (window.innerWidth > 1024) return;
        e.preventDefault();
        dropdownServicos.classList.toggle('open');
        openServicos.classList.toggle('open');
    });

    document.querySelectorAll('[data-menu="close"]').forEach(link => {
        link.addEventListener('click', closeAllMenus);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeAllMenus();
        }
    });

    // --- Adicionando a lógica de scroll para mobile ---
    let lastScrollTop = 0;
    const mainHeader = document.querySelector('.main-header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        // Só executa a lógica se for uma tela pequena (mobile)
        if (window.innerWidth <= 1024) {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Rola para baixo, esconde o header
                mainHeader.classList.add('header-hidden');
            } else if (currentScroll < lastScrollTop) {
                // Rola para cima, mostra o header
                mainHeader.classList.remove('header-hidden');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        } else {
            // Em telas grandes, garante que o header esteja sempre visível
            mainHeader.classList.remove('header-hidden');
        }
    });
});