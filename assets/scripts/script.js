document.getElementById('generate-btn').addEventListener('click', function() {
  var length = document.getElementById('length').value;
  var useUppercase = document.getElementById('uppercase').checked;
  var useLowercase = document.getElementById('lowercase').checked;
  var useNumbers = document.getElementById('numbers').checked;
  var useSymbols = document.getElementById('symbols').checked;
  
  var charset = '';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumbers) charset += '0123456789';
  if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

  var password = '';
  for (var i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  document.getElementById('password').innerText = password;
  document.getElementById('copy-btn').style.display = 'inline';
});

document.getElementById('copy-btn').addEventListener('click', function() {
  var passwordText = document.getElementById('password').innerText;
  var textarea = document.createElement('textarea');
  textarea.value = passwordText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Senha copiada para a área de transferência!');
});
