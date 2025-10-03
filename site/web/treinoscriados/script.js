const API_URL = "https://backend-tcc-iota.vercel.app/";
const userId = 1; // ID do usuário logado

// Função para buscar treinos do usuário
async function buscarTreinos() {
  try {
    const res = await fetch(`${API_URL}/treino`);
    if (!res.ok) throw new Error("Erro ao buscar treinos");

    const treinos = await res.json();
    const meusTreinos = treinos.filter(t => t.usuarioId === userId);
    mostrarTreinos(meusTreinos);
  } catch (err) {
    console.error(err);
    alert("Não foi possível carregar os treinos");
  }
}

// Função para mostrar treinos na tela
function mostrarTreinos(treinos) {
  const container = document.getElementById("treinos-lista");
  container.innerHTML = "";

  if (treinos.length === 0) {
    container.innerHTML = "<p>Você ainda não tem treinos salvos.</p>";
    return;
  }

  treinos.forEach(t => {
    const div = document.createElement("div");
    div.className = "treino-card";
    div.innerHTML = `
      <h3>Treino ID: ${t.id}</h3>
      <p><strong>Data:</strong> ${new Date(t.data).toLocaleDateString()}</p>
      <button onclick="verDetalhes(${t.id})">Ver Detalhes</button>
    `;
    container.appendChild(div);
  });
}

// Função para ver detalhes do treino
async function verDetalhes(treinoId) {
  try {
    const res = await fetch(`${API_URL}/treinolink`);
    if (!res.ok) throw new Error("Erro ao buscar detalhes do treino");

    const links = await res.json();
    const treinoLinks = links.filter(l => l.treinoId === treinoId);

    if (treinoLinks.length === 0) {
      alert("Este treino não possui exercícios vinculados.");
      return;
    }

    let detalhes = "Exercícios do treino:\n\n";
    treinoLinks.forEach((l, i) => {
      detalhes += `${i + 1}. ${l.nome} - ${l.grupo} (${l.series}x${l.repeticoes})\n`;
    });

    alert(detalhes);
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar detalhes do treino");
  }
}

// Inicializa
buscarTreinos();