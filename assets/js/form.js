const form = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    // Desabilita o botão e mostra um status de carregamento
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    formStatus.style.display = 'none'; // Esconde mensagens anteriores

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form), // Envia os dados do formulário
            headers: {
                'Accept': 'application/json' // Solicita uma resposta JSON
            }
        });

        if (response.ok) {
            formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            formStatus.className = 'form-status-message success';
            formStatus.style.display = 'block';
            form.reset(); // Limpa o formulário
        } else {
            const data = await response.json();
            if (data.errors) {
                formStatus.textContent = 'Erro ao enviar: ' + data.errors.map(err => err.message).join(', ');
            } else {
                formStatus.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
            }
            formStatus.className = 'form-status-message error';
            formStatus.style.display = 'block';
        }
    } catch (error) {
        formStatus.textContent = 'Ocorreu um erro de conexão. Verifique sua internet e tente novamente.';
        formStatus.className = 'form-status-message error';
        formStatus.style.display = 'block';
        console.error('Erro de envio:', error);
    } finally {
        // Habilita o botão novamente
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});