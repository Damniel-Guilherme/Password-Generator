let sliderElement = document.querySelector("#slider");
let suasenha = document.querySelector("#suasenha");
let sizePassword = document.querySelector("#valor");
let containerPassword = document.querySelector("#container-password");
let createdPasswords = document.querySelector("#createdPasswords");

sizePassword.innerHTML = sliderElement.value;

sliderElement.oninput = function () {
  sizePassword.innerHTML = this.value;
};

function generatePassword() {
  const caracteresABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const caracteresAbc = "abcdefghijklmnopqrstuvwxyz";
  const caracteresNumeros = "0123456789";
  const caracteresSimbolos = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  let charset = "";

  const letrasABC = document.getElementById("letrasABC").checked;
  const letrasabc = document.getElementById("letrasabc").checked;
  const numeros123 = document.getElementById("numeros123").checked;
  const simbolos = document.getElementById("simbolos").checked;

  if (letrasABC) {
    charset += caracteresABC;
  }

  if (letrasabc) {
    charset += caracteresAbc;
  }

  if (numeros123) {
    charset += caracteresNumeros;
  }

  if (simbolos) {
    charset += caracteresSimbolos;
  }

  if (charset === "") {
    containerPassword.classList.remove("hide");
    suasenha.innerHTML = "Choose a character category!";
    return; // Retorna sem gerar a senha se nenhuma opção estiver selecionada
  }

  let pass = "";
  for (let i = 0, n = charset.length; i < sliderElement.value; ++i) {
    pass += charset.charAt(Math.floor(Math.random() * n));
  }

  containerPassword.classList.remove("hide");
  suasenha.innerHTML = "Your generated password was:";
  password.innerHTML = pass;

  
  // Cria um novo elemento p com uma senha e um botão
  const newPasswordElement = document.createElement('li');
  newPasswordElement.className = "senha-gerada";
  newPasswordElement.title = pass;
  newPasswordElement.textContent = pass;

  const copyButton = document.createElement('button');
  copyButton.textContent = "Copy";
  copyButton.onclick = function() {
    copyPassword(pass);
  };

  newPasswordElement.appendChild(copyButton);
  createdPasswords.insertBefore(newPasswordElement, createdPasswords.firstChild);
}

function copyPassword(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Senha copiada com sucesso!");
    })
    .catch(err => {
      console.error('Erro ao copiar a senha: ', err);
    });
}
