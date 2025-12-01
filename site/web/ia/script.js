const API_URL = "https://backend-tcc-iota.vercel.app/mensagem"; 

const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

sendBtn.addEventListener("click", enviarMensagem);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensagem();
});

function adicionarMensagem(texto, classe) {
    const msg = document.createElement("div");
    msg.classList.add("message", classe);
    msg.textContent = texto;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function enviarMensagem() {
    const texto = userInput.value.trim();
    if (texto === "") return;

    adicionarMensagem(texto, "user");
    userInput.value = "";

    try {
        const resposta = await fetch(`${API_URL}/mensagem`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagem: texto })
        });

        const dados = await resposta.json();

        adicionarMensagem(dados.resposta || "Erro: resposta vazia da IA", "ia");

    } catch (erro) {
        adicionarMensagem("Erro ao conectar com a IA.", "ia");
        console.log("Erro no chat: ", erro);
    }
}
