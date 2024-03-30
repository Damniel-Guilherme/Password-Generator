document.addEventListener('DOMContentLoaded', function () {
  // Função para criar checkboxes para cada caractere em um modal
  function createCheckboxes(container, chars) {
    chars.split('').forEach(function(char) {
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = char;
      checkbox.checked = true;
      container.appendChild(checkbox);
      container.appendChild(document.createTextNode(char));
      container.appendChild(document.createElement('br'));
    });
  }

  // Chama a função para criar checkboxes para cada opção em cada modal
  createCheckboxes(document.getElementById('uppercase-options'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  createCheckboxes(document.getElementById('lowercase-options'), 'abcdefghijklmnopqrstuvwxyz');
  createCheckboxes(document.getElementById('numbers-options'), '0123456789');
  createCheckboxes(document.getElementById('symbols-options'), '!@#$%^&*()_+~`|}{[]\\:;?><,./-=');

  // Adiciona evento de clique ao botão "Personalizar" para abrir o modal correspondente
  document.querySelectorAll('.modal-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetModalId = btn.getAttribute('data-target');
      var modal = document.getElementById(targetModalId);
      modal.style.display = 'block';
    });
  });

  // Adiciona evento de clique para fechar os modais ao clicar no botão de fechar ou fora do modal
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
      }
    });
  });

  // Adiciona evento de clique ao botão "OK" em cada modal
  document.querySelectorAll('.modal-ok').forEach(function(okBtn) {
    okBtn.addEventListener('click', function() {
      var modal = okBtn.closest('.modal');
      modal.style.display = 'none';
    });
  });

  // Adiciona evento de clique ao botão "Gerar Senha"
  document.getElementById('generate-btn').addEventListener('click', function () {
    var length = document.getElementById('length').value;
    
    // Limita o comprimento da senha a 200 caracteres
    length = Math.min(length, 200);

    if (length > 200) {
      alert('O comprimento máximo da senha é 200 caracteres.');
      return;
    }

    var charset = '';
    var useUppercase = document.getElementById('uppercase').checked;
    var useLowercase = document.getElementById('lowercase').checked;
    var useNumbers = document.getElementById('numbers').checked;
    var useSymbols = document.getElementById('symbols').checked;

    if (useUppercase) {
      var uppercaseOptions = document.querySelectorAll('#uppercase-options input[type="checkbox"]:checked');
      uppercaseOptions.forEach(function(option) {
        charset += option.value;
      });
    }

    if (useLowercase) {
      var lowercaseOptions = document.querySelectorAll('#lowercase-options input[type="checkbox"]:checked');
      lowercaseOptions.forEach(function(option) {
        charset += option.value;
      });
    }

    if (useNumbers) {
      var numbersOptions = document.querySelectorAll('#numbers-options input[type="checkbox"]:checked');
      numbersOptions.forEach(function(option) {
        charset += option.value;
      });
    }

    if (useSymbols) {
      var symbolsOptions = document.querySelectorAll('#symbols-options input[type="checkbox"]:checked');
      symbolsOptions.forEach(function(option) {
        charset += option.value;
      });
    }

    if (charset === '') {
      alert('Selecione pelo menos um tipo de caractere.');
      return;
    }

    var password = generatePassword(charset, length);
    document.getElementById('password').innerText = password;
    document.getElementById('copy-btn').style.display = 'inline';
  });

  // Função para gerar uma senha
  function generatePassword(charset, length) {
    var password = '';
    for (var i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  // Adiciona evento de clique ao botão "Copiar"
  document.getElementById('copy-btn').addEventListener('click', function() {
    var passwordText = document.getElementById('password').innerText;
    navigator.clipboard.writeText(passwordText).then(function() {
      alert('Senha copiada para a área de transferência!');
    }, function(err) {
      console.error('Erro ao copiar a senha: ', err);
    });
  });
});
