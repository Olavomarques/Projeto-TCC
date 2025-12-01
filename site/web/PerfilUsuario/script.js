// perfil.js — versão robusta para debugar e funcionar com várias respostas
const API_URL = "https://backend-tcc-iota.vercel.app/validacao"; // <<< ajuste aqui pro seu deploy Vercel
const token = localStorage.getItem("token");

if (!token) {
  console.warn("Token não encontrado em localStorage. Redirecionando para login.");
  return window.location.href = "../inicio/index.html";
}

// Elementos da UI (garanta que existam esses IDs no HTML)
const nomeSpan = document.getElementById("nomeUser");
const emailSpan = document.getElementById("emailUser");
const dataNascSpan = document.getElementById("dataNascUser");
const generoSpan = document.getElementById("generoUser");

const btnEditar = document.getElementById("btnEditar");
const visualizacao = document.getElementById("visualizacao");
const edicao = document.getElementById("edicao");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

const editNome = document.getElementById("editNome");
const editEmail = document.getElementById("editEmail");
const editDataNasc = document.getElementById("editDataNasc");
const editGenero = document.getElementById("editGenero");

let usuarioLogado = null; // objeto do usuário recuperado

// Helper: formatar data pra pt-BR (dd/mm/yyyy)
function formatDateBR(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("pt-BR");
}

// Helper: transformar YYYY-MM-DD ou ISO em valor para input type=date (YYYY-MM-DD)
function toISODateForInput(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr.split("T")[0] || "";
  return d.toISOString().slice(0,10);
}

// 1) Chama /validacao para tentar descobrir id/email do token
async function validarToken() {
  try {
    const res = await fetch(`${API_URL}/validacao`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      console.warn("/validacao retornou não-ok:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("Resposta /validacao:", data);

    // tenta extrair id e email de formatos comuns
    const payload = data.message || data.user || data || null;
    const id = payload?.id || payload?.id_user || payload?.userId || null;
    const email = payload?.email || null;

    return { id, email, raw: data };
  } catch (err) {
    console.error("Erro na chamada /validacao:", err);
    return null;
  }
}

// 2) Busca usuários e encontra o logado (caso /validacao não devolva id)
async function buscarUsuarios() {
  try {
    const res = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) {
      console.error("GET /user falhou com status", res.status);
      throw new Error("Erro GET /user");
    }
    const data = await res.json();
    console.log("Resposta /user:", data);
    return data;
  } catch (err) {
    console.error("Erro ao buscar /user:", err);
    throw err;
  }
}

// 3) Função principal para carregar perfil
async function carregarPerfil() {
  try {
    const v = await validarToken();
    const usersRaw = await buscarUsuarios();

    // normaliza lista de users
    let usersList = [];
    if (Array.isArray(usersRaw)) usersList = usersRaw;
    else if (usersRaw.users) usersList = usersRaw.users;
    else if (usersRaw.data) usersList = usersRaw.data;
    else if (typeof usersRaw === "object") {
      // se veio um objeto único, transformamos em array para facilitar
      // ex.: { id_user:1, nome:... } -> [usersRaw]
      usersList = Object.keys(usersRaw).length ? [usersRaw] : [];
    }

    // tenta achar usuário por id do token
    let user = null;
    if (v && v.id) {
      user = usersList.find(u => (u.id_user == v.id || u.id == v.id || u.idUser == v.id));
      console.log("Procurando usuário por id do token:", v.id, "achou:", !!user);
    }

    // se não achou por id, tenta por email do token
    if (!user && v && v.email) {
      user = usersList.find(u => ( (u.email || "").toLowerCase() === v.email.toLowerCase() ));
      console.log("Procurando usuário por email do token:", v.email, "achou:", !!user);
    }

    // se ainda não achou e só existe 1 usuário (dev), pega o único
    if (!user && usersList.length === 1) {
      user = usersList[0];
      console.log("Pegando o único usuário retornado por /user");
    }

    if (!user) {
      // se não conseguiu identificar, mostra console e aborta
      console.error("Não foi possível identificar o usuário logado. usersList:", usersList, "validacao:", v);
      alert("Não foi possível carregar seu perfil — verifique console para mais detalhes.");
      return;
    }

    usuarioLogado = user;
    preencherVisualizacao(user);
    preencherEdicao(user);

  } catch (err) {
    console.error("Erro geral ao carregar perfil:", err);
    alert("Erro ao carregar perfil. Veja console para mais detalhes.");
  }
}

// preencher a área de visualização
function preencherVisualizacao(user) {
  nomeSpan.textContent = user.nome ?? "—";
  emailSpan.textContent = user.email ?? "—";

  // aceita vários nomes de campo para nascimento: nascimento, data_nascimento, nascimento
  const nascimentoVal = user.nascimento || user.data_nascimento || user.dataNascimento || user.birth || null;
  dataNascSpan.textContent = nascimentoVal ? formatDateBR(nascimentoVal) : "—";

  // genero: genero ou generoUser ou sexo
  const generoVal = user.genero || user.sexo || user.generoUser || null;
  generoSpan.textContent = generoVal ?? "—";
}

// preencher os inputs de edição
function preencherEdicao(user) {
  editNome.value = user.nome ?? "";
  editEmail.value = user.email ?? "";
  const nascimentoVal = user.nascimento || user.data_nascimento || user.dataNascimento || user.birth || "";
  editDataNasc.value = toISODateForInput(nascimentoVal);
  editGenero.value = user.genero || user.sexo || "";
}

// abrir / fechar edição
btnEditar.addEventListener("click", () => {
  visualizacao.style.display = "none";
  edicao.style.display = "block";
});
btnCancelar.addEventListener("click", () => {
  edicao.style.display = "none";
  visualizacao.style.display = "block";
  if (usuarioLogado) preencherEdicao(usuarioLogado);
});

// salvar edição (PUT /user/:id)
btnSalvar.addEventListener("click", async () => {
  if (!usuarioLogado) return alert("Usuário não carregado");
  const id = usuarioLogado.id_user ?? usuarioLogado.id ?? usuarioLogado.idUser;
  if (!id) {
    console.error("ID do usuário não encontrado em objeto:", usuarioLogado);
    return alert("ID do usuário não encontrado. Veja console.");
  }

  // monta body só com campos presentes
  const body = {
    nome: editNome.value,
    email: editEmail.value,
    nascimento: editDataNasc.value || undefined, // seu back usa 'nascimento' segundo controller
    genero: editGenero.value || undefined
  };

  // se o back exigir senha no PUT e você não tiver, remova a propriedade senha do body
  // (não incluí senha aqui por segurança)

  // limpa undefined
  Object.keys(body).forEach(k => (body[k] === undefined || body[k] === "") && delete body[k]);

  try {
    const res = await fetch(`${API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    console.log("PUT /user res:", res.status);
    if (!res.ok) {
      const txt = await res.text();
      console.error("Resposta de erro PUT /user:", res.status, txt);
      alert("Falha ao atualizar perfil. Veja console.");
      return;
    }

    alert("Perfil atualizado com sucesso!");
    edicao.style.display = "none";
    visualizacao.style.display = "block";
    // recarregar dados
    await carregarPerfil();
  } catch (err) {
    console.error("Erro ao enviar PUT /user:", err);
    alert("Erro ao salvar. Veja console.");
  }
});

// inicializa
carregarPerfil();
