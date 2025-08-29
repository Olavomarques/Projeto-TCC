document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("calcImc").addEventListener("click", () => {
  const peso = parseFloat(document.getElementById("peso").value);
  const alturaCm = parseFloat(document.getElementById("altura").value);
  if (!peso || !alturaCm) return alert("Preencha peso e altura");

  const altura = alturaCm / 100;
  const imc = peso / (altura * altura);
  document.getElementById("imcValor").textContent = imc.toFixed(1);

  let label = "";
  if (imc < 18.5) label = "Abaixo do peso";
  else if (imc < 25) label = "Normal";
  else if (imc < 30) label = "Sobrepeso";
  else label = "Obesidade";

  document.getElementById("imcLabel").textContent = label;
});

document.getElementById("calcTmb").addEventListener("click", () => {
  const sexo = document.getElementById("sexo").value;
  const idade = parseInt(document.getElementById("idade").value);
  const altura = parseFloat(document.getElementById("tmbAltura").value);
  const peso = parseFloat(document.getElementById("tmbPeso").value);
  const atividade = parseFloat(document.getElementById("atividade").value);

  if (!sexo || !idade || !altura || !peso) return alert("Preencha todos os campos");

  let tmb = 0;
  if (sexo === "f") tmb = 655 + 9.6*peso + 1.8*altura - 4.7*idade;
  else tmb = 66 + 13.7*peso + 5*altura - 6.8*idade;

  const manutencao = tmb * atividade;

  document.getElementById("tmbValor").textContent = tmb.toFixed(0);
  document.getElementById("manutencaoValor").textContent = manutencao.toFixed(0);
});