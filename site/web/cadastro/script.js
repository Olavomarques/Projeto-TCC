// Preencher selects de dia, mês e ano
window.addEventListener("DOMContentLoaded", () => {
  const diaSelect = document.getElementById("dia");
  const mesSelect = document.getElementById("mes");
  const anoSelect = document.getElementById("ano");

  // Dias
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i.toString().padStart(2, "0");
    option.textContent = i;
    diaSelect.appendChild(option);
  }

  // Meses
  const meses = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];
  meses.forEach((mes, index) => {
    const option = document.createElement("option");
    option.value = mes;
    option.textContent = index + 1;
    mesSelect.appendChild(option);
  });

  // Anos
  const anoAtual = new Date().getFullYear();
  for (let i = anoAtual; i >= 1900; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    anoSelect.appendChild(option);
  }
});

// Envio do formulário
const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const dia = document.getElementById("dia").value;
  const mes = document.getElementById("mes").value;
  const ano = document.getElementById("ano").value;
  const nascimento = `${ano}-${mes}-${dia}`;

  const genero = document.querySelector('input[name="genero"]:checked')?.value;

  const user = { nome, email, senha, nascimento, genero };

  try {
    const res = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (res.ok) {
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "../inicio/index.html";
    } else {
      const err = await res.json();
      alert("Erro: " + (err.message || "Não foi possível cadastrar."));
    }
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Não foi possível conectar à API.");
  }
});