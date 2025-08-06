    const form = document.querySelector('.contact-form');
    const successPopup = document.getElementById('successPopup');
    const submitButton = document.getElementById('submitButton');

    // Função para mostrar o pop-up
    function showPopup() {
        successPopup.style.display = 'flex';
    }

    // Função para esconder o pop-up (usada no botão "OK")
    function hidePopup() {
        successPopup.style.display = 'none';
        // Opcional: redirecionar após fechar o pop-up
        // window.location.href = 'URL_da_sua_pagina_de_sucesso'; 
    }

    // Adiciona o evento de 'submit' no formulário
    form.addEventListener('submit', function(event) {
        // Impede o envio padrão do formulário
        event.preventDefault();

        // Obtém os dados do formulário
        const formData = new FormData(form);

        // Envia os dados para o FormSubmit usando Fetch API
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Se o envio for bem-sucedido, mostra o pop-up
                showPopup();
                // Limpa o formulário após o envio
                form.reset();
            } else {
                // Se houver erro, exibe um alerta simples
                alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        });
    });