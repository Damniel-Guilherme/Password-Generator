let sliderElement = document.querySelector("#slider");
let suasenha = document.querySelector("#suasenha")
let sizePassword = document.querySelector("#valor");
let password = document.querySelector("#password");
let containerPassword = document.querySelector("#container-password");

let novaSenha = '';

sizePassword.innerHTML = sliderElement.value;

sliderElement.oninput = function () {
    sizePassword.innerHTML = this.value;
}

function generatePassword () {


    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMaiuscula = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

    let charset = '';
    
    const incluirLetras = document.getElementById('apenasLetras').checked;
    const incluirLetrasMaisculunas = document.getElementById('apenasLetrasMaiusculas').checked;
    const incluirNumeros = document.getElementById('apenasNumeros').checked;
    const incluirSimbolos = document.getElementById('apenasSimbolos').checked;

    if (incluirLetras) {
        charset += letras;
    }

    if (incluirNumeros) {
        charset += numeros;
    }

    if (incluirSimbolos) {
        charset += simbolos;
    }

    if (incluirLetrasMaisculunas ) {
        charset += letrasMaiuscula ;
    }

    if (charset === '') {
        containerPassword.classList.remove("hide");
        suasenha.innerHTML = 'Escolha uma categoria de caracteres!';
        password.innerHTML = '❌❌❌❌❌❌';
        return; // Retorna sem gerar a senha se nenhuma opção estiver selecionada
    }

    let pass = "";
    for (let i = 0, n = charset.length;  i < sliderElement.value; ++i) {
        pass += charset.charAt(Math.floor(Math.random() * n));
    }  

    containerPassword.classList.remove("hide");
    suasenha.innerHTML = 'Sua senha gerada foi:';
    password.innerHTML = pass;
    novaSenha = pass;
    
}

function copyPassword () {
    navigator.clipboard.writeText(novaSenha);
    alert("Senha copiada com sucesso!")
}
