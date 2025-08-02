// Seleciona o container principal
const formBox = document.querySelector('.form-box');

// Função para mostrar o formulário de cadastro
function showRegisterForm() {
    formBox.classList.add('active');
    clearAllFormValidations(); 
}

// Função para mostrar o formulário de login
function showLoginForm() {
    formBox.classList.remove('active');
    clearAllFormValidations(); 
}

// --- Funções de Máscara de Input e Verificação de Senha ---
document.addEventListener('DOMContentLoaded', () => {
    // Máscara de CNPJ
    const cnpjLoginField = document.getElementById('cnpjLogin');
    const cnpjRegisterField = document.getElementById('cnpjRegister');

    if (cnpjLoginField) {
        cnpjLoginField.addEventListener('input', formatCnpj);
    }
    if (cnpjRegisterField) {
        cnpjRegisterField.addEventListener('input', formatCnpj);
    }

    function formatCnpj(event) {
        let value = event.target.value;
        value = value.replace(/\D/g, ""); // Remove tudo que não for dígito
        value = value.replace(/^(\d{2})(\d)/, "$1.$2"); // 00.0
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); // 00.000.0
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2"); // 00.000.000/0
        value = value.replace(/(\d{4})(\d)/, "$1-$2"); // 00.000.000/0000-00
        event.target.value = value.slice(0, 18); // Limita a 18 caracteres
    }

    // Máscara de Email
    const emailRegisterField = document.getElementById('emailRegister');

    if (emailRegisterField) {
        emailRegisterField.addEventListener('blur', (event) => {
            let value = event.target.value;
            value = value.trim();
            value = value.toLowerCase();
            event.target.value = value;
            // Valida email no blur
            validateField(emailRegisterField, 'emailRegisterError');
        });

        emailRegisterField.addEventListener('keypress', (event) => {
            if (event.key === ' ') {
                event.preventDefault();
            }
        });
    }

    // --- Verificação de Senhas ---
    const registerPasswordField = document.getElementById('registerPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const passwordMismatchMessage = document.getElementById('passwordMismatchMessage');

    if (registerPasswordField && confirmPasswordField && passwordMismatchMessage) {
        confirmPasswordField.addEventListener('input', checkPasswords);
        registerPasswordField.addEventListener('input', checkPasswords);
        confirmPasswordField.addEventListener('blur', checkPasswords); // Verifica também no blur
        registerPasswordField.addEventListener('blur', checkPasswords); // Verifica também no blur

        function checkPasswords() {
            const password = registerPasswordField.value;
            const confirmPassword = confirmPasswordField.value;

            // Primeiro, verifique a obrigatoriedade dos campos de senha
            validateField(registerPasswordField, 'registerPasswordError');
            validateField(confirmPasswordField, 'confirmPasswordError');

            // Em seguida, verifique se as senhas coincidem, mas apenas se ambos tiverem algum valor e não estiverem vazios
            const regPassParent = registerPasswordField.closest('.input-box.input-field-container');
            const confPassParent = confirmPasswordField.closest('.input-box.input-field-container');

            if (password !== '' && confirmPassword !== '') {
                if (password !== confirmPassword) {
                    passwordMismatchMessage.style.display = 'block'; // Mostra mensagem de "não coincide"
                    confirmPasswordField.classList.add('error');
                    registerPasswordField.classList.add('error');
                    // Adiciona has-error apenas ao container do campo de confirmação
                    if (confPassParent) confPassParent.classList.add('has-error');
                } else {
                    passwordMismatchMessage.style.display = 'none'; // Esconde mensagem de "não coincide"
                    confirmPasswordField.classList.remove('error');
                    registerPasswordField.classList.remove('error');
                    if (confPassParent) confPassParent.classList.remove('has-error');
                }
            } else {
                passwordMismatchMessage.style.display = 'none'; // Esconde se algum estiver vazio
                confirmPasswordField.classList.remove('error');
                registerPasswordField.classList.remove('error');
                if (confPassParent) confPassParent.classList.remove('has-error');
            }
        }
    }

    // --- Validação de Campos Obrigatórios (Geral) ---
    // Seleciona todos os inputs com o atributo 'required'
    const requiredFields = document.querySelectorAll('input[required]');

    function validateField(inputElement, errorId) {
        const errorMessageElement = document.getElementById(errorId);
        // Encontra o contêiner pai mais próximo com as classes input-box e input-field-container
        const parentContainer = inputElement.closest('.input-box.input-field-container');

        if (!errorMessageElement) return true; // Se o elemento de erro não existe, considera válido

        if (inputElement.value.trim() === '') {
            inputElement.classList.add('error');
            errorMessageElement.style.display = 'block';
            if (parentContainer) {
                parentContainer.classList.add('has-error'); // Adiciona a classe has-error ao pai
                // Detecta se a mensagem de erro quebrou para duas linhas
                setTimeout(() => {
                    const style = getComputedStyle(errorMessageElement);
                    let lineHeight = parseFloat(style.lineHeight);
                    if (isNaN(lineHeight)) {
                        // fallback para altura da fonte se lineHeight for 'normal'
                        lineHeight = parseFloat(style.fontSize) * 1.2;
                    }
                    if (errorMessageElement.offsetHeight > lineHeight * 1.2) {
                        parentContainer.classList.add('two-lines');
                    } else {
                        parentContainer.classList.remove('two-lines');
                    }
                }, 10);
            }
            return false;
        } else {
            inputElement.classList.remove('error');
            errorMessageElement.style.display = 'none';
            if (parentContainer) {
                parentContainer.classList.remove('has-error'); // Remove a classe has-error do pai
                parentContainer.classList.remove('two-lines');
            }
            return true;
        }
    }

    // Adiciona listener 'blur' e 'input' para cada campo obrigatório
    requiredFields.forEach(field => {
        const errorId = field.id + 'Error';
        field.addEventListener('blur', () => validateField(field, errorId));
        field.addEventListener('input', () => validateField(field, errorId));
    });

    // --- Validação no Submit do Formulário ---
    // Os botões de submit agora acionam a validação
    const loginSubmitBtn = document.querySelector('#login .submit');
    const registerSubmitBtn = document.querySelector('#register .submit');

    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', (event) => {
            let isValid = true;
            const loginInputs = document.querySelectorAll('#login input[required]');
            loginInputs.forEach(input => {
                const errorId = input.id + 'Error';
                if (!validateField(input, errorId)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                event.preventDefault(); // Impede o envio se houver erros
            }
        });
    }

    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener('click', (event) => {
            let isValid = true;
            const registerInputs = document.querySelectorAll('#register input[required]');
            registerInputs.forEach(input => {
                const errorId = input.id + 'Error';
                if (!validateField(input, errorId)) {
                    isValid = false;
                }
            });

            // Validação específica da senha
            if (registerPasswordField && confirmPasswordField) {
                checkPasswords(); // Força a verificação de senha no submit
                if (passwordMismatchMessage.style.display === 'block' || registerPasswordField.classList.contains('error') || confirmPasswordField.classList.contains('error')) {
                    isValid = false; // Se houver erro de senha (mismatch ou vazio), não é válido
                }
            }

            if (!isValid) {
                event.preventDefault(); // Impede o envio se houver erros
            }
        });
    }

    // Função para limpar validações ao trocar de formulário
    window.clearAllFormValidations = function() {
        // Remove classe de erro dos inputs
        document.querySelectorAll('.input-field.error').forEach(input => {
            input.classList.remove('error');
        });

        // Remove classes de erro dos containers
        document.querySelectorAll('.input-box.input-field-container.has-error, .input-box.input-field-container.two-lines').forEach(container => {
            container.classList.remove('has-error', 'two-lines');
        });

        // Esconde todas as mensagens de erro
        document.querySelectorAll('.error-message').forEach(message => {
            message.style.display = 'none';
        });

        // Esconde a mensagem de senhas não coincidem
        var passwordMismatchMessage = document.getElementById('passwordMismatchMessage');
        if (passwordMismatchMessage) {
            passwordMismatchMessage.style.display = 'none';
        }
    }
});