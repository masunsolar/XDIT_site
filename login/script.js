// --- Funções para alternar entre login e registro ---
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    // Limpar validações quando mudar de formulário
    clearAllFormValidations();
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    // Limpar validações quando mudar de formulário
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

            // Em seguida, verifique se as senhas coincidem, mas apenas se ambos tiverem algum valor
            if (password !== '' && confirmPassword !== '') {
                if (password !== confirmPassword) {
                    passwordMismatchMessage.style.display = 'block'; // Mostra mensagem de "não coincide"
                    confirmPasswordField.classList.add('error');
                    registerPasswordField.classList.add('error');
                } else {
                    passwordMismatchMessage.style.display = 'none'; // Esconde mensagem de "não coincide"
                    // Remova a classe 'error' se coincidem e estiverem preenchidos
                    if (confirmPasswordField.value !== '') confirmPasswordField.classList.remove('error');
                    if (registerPasswordField.value !== '') registerPasswordField.classList.remove('error');
                }
            } else {
                 passwordMismatchMessage.style.display = 'none'; // Esconde se algum estiver vazio
            }
        }
    }

    // --- Validação de Campos Obrigatórios (Geral) ---
    const requiredFields = document.querySelectorAll(
        '#login input[required], #register input[required]'
    );

    function validateField(inputElement, errorId) {
        const errorMessageElement = document.getElementById(errorId);
        if (!errorMessageElement) return; // Garante que o elemento de erro existe

        if (inputElement.value.trim() === '') {
            inputElement.classList.add('error');
            errorMessageElement.style.display = 'block';
            return false;
        } else {
            inputElement.classList.remove('error');
            errorMessageElement.style.display = 'none';
            return true;
        }
    }

    // Adiciona listener 'blur' para cada campo obrigatório
    requiredFields.forEach(field => {
        // Encontra o ID do span de erro correspondente
        const errorId = field.id + 'Error';
        field.addEventListener('blur', () => validateField(field, errorId));
        field.addEventListener('input', () => validateField(field, errorId)); // Valida também ao digitar para remover o erro
    });

    // --- Validação no Submit do Formulário ---
    // Precisamos de um listener no próprio formulário, não apenas nos inputs
    // Envolva seus inputs em tags <form> para que o submit funcione corretamente.
    // Exemplo: <form id="loginForm"> ... inputs ... </form>
    // Se não for um <form>, o type="submit" não irá disparar o evento "submit" do formulário.

    const loginForm = document.querySelector('#login .input-box .submit').closest('div.login-container'); // Pega o contêiner do formulário de login
    const registerForm = document.querySelector('#register .input-box .submit').closest('div.register-container'); // Pega o contêiner do formulário de registro

    // Adiciona event listener para o clique no botão de submit ( workaround se não usar <form> )
    // Idealmente, você envolveria os inputs em tags <form> e usaria form.addEventListener('submit', ...)
    const loginSubmitBtn = document.querySelector('#login .submit');
    const registerSubmitBtn = document.querySelector('#register .submit');

    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', (event) => {
            // Se você usar um <form>, mude para event.preventDefault(); no form.addEventListener('submit')
            // event.preventDefault(); 
            let isValid = true;
            // Valida todos os campos obrigatórios do formulário de login
            const loginRequiredInputs = loginForm.querySelectorAll('input[required]');
            loginRequiredInputs.forEach(input => {
                const errorId = input.id + 'Error';
                if (!validateField(input, errorId)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                event.preventDefault(); // Impede o envio se houver erros
            }
            // console.log("Login form valid:", isValid); // Para depuração
        });
    }

    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener('click', (event) => {
            // event.preventDefault(); 
            let isValid = true;
            // Valida todos os campos obrigatórios do formulário de registro
            const registerRequiredInputs = registerForm.querySelectorAll('input[required]');
            registerRequiredInputs.forEach(input => {
                const errorId = input.id + 'Error';
                if (!validateField(input, errorId)) {
                    isValid = false;
                }
            });
            
            // Validação específica da senha
            if (registerPasswordField && confirmPasswordField) {
                checkPasswords(); // Força a verificação de senha no submit
                if (passwordMismatchMessage.style.display === 'block') {
                    isValid = false; // Se a mensagem de mismatch estiver visível, não é válido
                }
            }


            if (!isValid) {
                event.preventDefault(); // Impede o envio se houver erros
            }
            // console.log("Register form valid:", isValid); // Para depuração
        });
    }

    // Função para limpar validações ao trocar de formulário
    function clearAllFormValidations() {
        document.querySelectorAll('.input-field.error').forEach(input => {
            input.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(message => {
            message.style.display = 'none';
        });
        if (passwordMismatchMessage) {
            passwordMismatchMessage.style.display = 'none';
        }
    }
});