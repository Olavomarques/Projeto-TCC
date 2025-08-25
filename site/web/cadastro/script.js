const diaSelect = document.getElementById("dia");
for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  diaSelect.appendChild(option);
}

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
const mesSelect = document.getElementById("mes");
meses.forEach(mes => {
  let option = document.createElement("option");
  option.value = mes;
  option.textContent = mes;
  mesSelect.appendChild(option);
});

const anoSelect = document.getElementById("ano");
const anoAtual = new Date().getFullYear();
for (let i = anoAtual; i >= 1950; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  anoSelect.appendChild(option);
}