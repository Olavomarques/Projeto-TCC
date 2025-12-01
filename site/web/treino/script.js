const API_URL = "https://backend-tcc-iota.vercel.app";
const id_user = 1; // depois você troca para o ID real do usuário logado

// Vai guardar os exercícios vindos do banco
let exercicios = [];

// Vai guardar os exercícios selecionados pelo usuário
let treinoSelecionado = [];

// ------------------- BUSCAR EXERCÍCIOS DO BACK -------------------
async function carregarExercicios() {
  try {
    const resposta = await fetch(`${API_URL}/exercicios`);
    if (!resposta.ok) throw new Error("Erro ao buscar exercícios");

    exercicios = await resposta.json();

    mostrarExercicios();
  } catch (erro) {
    console.error("Erro ao carregar exercícios:", erro);
    alert("Erro ao carregar exercícios do banco.");
  }
}

// ------------------- EXIBIR EXERCÍCIOS NA TELA -------------------
function mostrarExercicios() {
  const container = document.getElementById("exercicios-lista");
  container.innerHTML = "";

  exercicios.forEach(ex => {
    const card = document.createElement("div");
    card.className = "exercicio-card";
    card.innerHTML = `
      <img src="${ex.imagem}" alt="${ex.nome}">
      <div class="exercicio-info">
        <h3>${ex.nome}</h3>
        <p><strong>Grupo:</strong> ${ex.grupo_muscular}</p>
        <p>${ex.descricao}</p>
        <p><strong>Duração:</strong> ${ex.duracao ?? "-"}</p>
        <p><strong>Séries:</strong> ${ex.series} | <strong>Repetições:</strong> ${ex.repeticoes}</p>
        <button onclick="adicionarTreino(${ex.id_exercicio})">Adicionar ao treino</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ------------------- ADICIONAR / REMOVER -------------------
function adicionarTreino(id) {
  const ex = exercicios.find(e => e.id_exercicio === id);
  if (!treinoSelecionado.some(e => e.id_exercicio === id)) {
    treinoSelecionado.push(ex);
    mostrarTreino();
  }
}

function removerDoTreino(id) {
  treinoSelecionado = treinoSelecionado.filter(e => e.id_exercicio !== id);
  mostrarTreino();
}

// ------------------- EXIBIR TREINO -------------------
function mostrarTreino() {
  const container = document.getElementById("meu-treino");
  container.innerHTML = treinoSelecionado.length ? "<h3>Treino Atual</h3>" : "";

  treinoSelecionado.forEach(ex => {
    const div = document.createElement("div");
    div.className = "exercicio-card";
    div.innerHTML = `
      <img src="${ex.imagem}" alt="${ex.nome}">
      <div class="exercicio-info">
        <h3>${ex.nome}</h3>
        <p><strong>Grupo:</strong> ${ex.grupo_muscular}</p>
        <p>${ex.descricao}</p>
        <p><strong>Séries:</strong> ${ex.series} | <strong>Repetições:</strong> ${ex.repeticoes}</p>
        <button onclick="removerDoTreino(${ex.id_exercicio})">Remover</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// ------------------- SALVAR TREINO -------------------
async function salvarTreino() {
  const nomeTreino = document.getElementById("nome-treino").value.trim();

  if (!nomeTreino) {
    alert("Digite um nome para o treino!");
    return;
  }
  if (treinoSelecionado.length === 0) {
    alert("Selecione ao menos um exercício!");
    return;
  }

  try {
    // Cria treino
    const resTreino = await fetch(`${API_URL}/treino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeTreino,
        id_user: id_user
      })
    });

    if (!resTreino.ok) throw new Error("Erro ao criar treino");
    const treinoCriado = await resTreino.json();
    const id_treino = treinoCriado.id_treino;

    // Adiciona exercícios no treino
    for (const ex of treinoSelecionado) {
      const resEx = await fetch(`${API_URL}/exerselec`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_exercicio: ex.id_exercicio,
          series: ex.series,
          repeticoes: ex.repeticoes,
          peso: 0
        })
      });

      const exerSelec = await resEx.json();

      await fetch(`${API_URL}/treinoslink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_ExerSelec: exerSelec.id_ExerSelec,
          id_treino: id_treino
        })
      });
    }

    alert("Treino salvo com sucesso!");
    treinoSelecionado = [];
    mostrarTreino();

    // Redireciona
    window.location.href = "../treinoscriados/index.html";
  } catch (error) {
    console.error("Erro ao salvar treino:", error);
    alert("Erro ao salvar treino");
  }
}

// ------------------- INICIAR -------------------
document.addEventListener("DOMContentLoaded", () => {
  carregarExercicios();
  document.getElementById("salvar-treino").addEventListener("click", salvarTreino);
});