/*const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});*/

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => {
        item.classList.remove('tab-active');
        item.classList.add('tab-inactive');
      });
      tab.classList.add('tab-active');
      tab.classList.remove('tab-inactive');

      const targetTab = tab.getAttribute('data-tab');
      tabPanes.forEach(pane => {
        if (pane.getAttribute('data-tab-content') === targetTab) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });

  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelinePanes = document.querySelectorAll('.timeline-pane');

  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      timelineItems.forEach(el => el.classList.remove('timeline-item-active'));
      item.classList.add('timeline-item-active');

      const targetTimeline = item.getAttribute('data-timeline');
      timelinePanes.forEach(pane => {
        if (pane.getAttribute('data-timeline-content') === targetTimeline) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });

  const ctx = document.getElementById('marketChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Clientes para Break-Even (60)', 'Potencial de Mercado Adicional (9,940)'],
      datasets: [{
        label: 'Clientes',
        data: [60, 9940],
        backgroundColor: [
          '#2563eb',
          '#dbeafe',
        ],
        borderColor: [
          '#ffffff',
          '#ffffff'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += new Intl.NumberFormat('pt-BR').format(context.parsed);
              }
              return label;
            }
          }
        }
      },
      cutout: '60%'
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os links que são ativadores de dropdown
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        // O menu dropdown é o elemento irmão que vem logo depois do toggle
        const dropdownMenu = toggle.nextElementSibling; 

        // Adiciona um evento de clique para abrir/fechar o dropdown
        toggle.addEventListener('click', (event) => {
            event.preventDefault(); // Impede a navegação padrão do link
            dropdownMenu.classList.toggle('active'); // Alterna a classe 'active' para mostrar/esconder

            // Fecha outros dropdowns abertos (opcional, mas boa prática)
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                if (menu !== dropdownMenu) { // Se não for o menu que acabamos de clicar
                    menu.classList.remove('active'); // Remove a classe 'active' para fechar
                }
            });
        });

        // Adiciona um evento para fechar o dropdown quando o mouse sai da área inteira do 'dropdown'
        // Isso pega o pai 'div.dropdown' para que o menu permaneça aberto enquanto o mouse está nele.
        const dropdownParent = toggle.closest('.dropdown');
        if (dropdownParent) {
            dropdownParent.addEventListener('mouseleave', () => {
                dropdownMenu.classList.remove('active');
            });
        }
    });

    // Adiciona um evento global para fechar qualquer dropdown aberto se o usuário clicar fora dele
    document.addEventListener('click', (event) => {
        // Se o clique não foi dentro de um elemento com a classe 'dropdown'
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active'); // Fecha todos os menus abertos
            });
        }
    });
});

