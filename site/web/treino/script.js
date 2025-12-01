const API_URL = "https://backend-tcc-iota.vercel.app/exercicio";

const grid = document.getElementById("exercises-grid");
const loading = document.getElementById("loading-state");
const empty = document.getElementById("empty-state");
const errorState = document.getElementById("error-state");
const errorMsg = document.getElementById("error-message");

const modal = document.getElementById("exercise-modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-image");
const modalDesc = document.getElementById("modal-description");
const closeModal = document.getElementById("close-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");

async function carregarExercicios() {
  try {
    loading.classList.remove("hidden");

    const res = await fetch(API_URL);
    const data = await res.json();

    loading.classList.add("hidden");

    if (!data || data.length === 0) {
      empty.classList.remove("hidden");
      return;
    }

    grid.classList.remove("hidden");
    renderizarExercicios(data);

  } catch (err) {
    loading.classList.add("hidden");
    errorState.classList.remove("hidden");
    errorMsg.textContent = "Erro ao carregar.";
  }
}

function renderizarExercicios(lista) {
  grid.innerHTML = "";

  lista.forEach(ex => {
    const nome = ex.nome;
    const imagem = ex.imagem || ex.img || ex.foto;
    const descricao = ex.descricao || "Sem descrição.";

    const card = document.createElement("div");
    card.classList.add("exercise-card");
    card.innerHTML = `
      <img src="${imagem}">
      <div class="exercise-info">${nome}</div>
    `;

    card.addEventListener("click", () => abrirModal(ex));
    grid.appendChild(card);
  });
}

function abrirModal(ex) {
  modalTitle.textContent = ex.nome;
  modalImg.style.backgroundImage = `url('${ex.imagem || ex.img || ex.foto}')`;
  modalDesc.textContent = ex.descricao || "Sem descrição";
  modal.classList.remove("hidden");
}

closeModal.onclick = () => modal.classList.add("hidden");
modalCloseBtn.onclick = () => modal.classList.add("hidden");

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

carregarExercicios();