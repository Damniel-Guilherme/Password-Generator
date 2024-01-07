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
  newPasswordElement.className = "item";
  newPasswordElement.title = pass;
  newPasswordElement.textContent = pass;
  newPasswordElement.setAttribute('draggable', 'true'); // Adiciona a propriedade draggable


  function deleteItem(event) {
    const itemToDelete = event.target.parentNode;
    itemToDelete.remove();
  }

  const delButton = document.createElement('button');
  delButton.textContent = "del";
  delButton.onclick = deleteItem; // Chama a função para deletar o item
  newPasswordElement.appendChild(delButton); // Adiciona o botão de delete


  // função de arrastar drag and drop

  const columns = document.querySelectorAll(".column");

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(item, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}


// butao de copiar

  const copyButton = document.createElement('button');
  copyButton.textContent = "Copy";
  copyButton.onclick = function() {
    copyPassword(pass);
  };

  newPasswordElement.appendChild(copyButton);
  createdPasswords.insertBefore(newPasswordElement, createdPasswords.firstChild);


  // const delButton = document.createElement('button');
  // delButton.textContent = "del";
  // delButton.onclick = function() {
  //   document.querySelectorAll('.item').remove()
  // };

  // newPasswordElement.appendChild(delButton);
  // createdPasswords.insertBefore(newPasswordElement, createdPasswords.firstChild);

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



