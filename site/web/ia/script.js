// Estado do chat
let messages = [];
let isLoading = false;
const API_URL = 'https://backend-tcc-iota.vercel.app/mensagem';

// Elementos do DOM
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Inicialização
function init() {
    // Mensagem de boas-vindas
    addMessage(
        "Olá! Sou sua assistente de saúde mental. Como posso ajudar você hoje? Pode falar sobre seus pensamentos, emoções ou qualquer coisa que esteja sentindo.",
        false
    );
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Adicionar mensagem ao chat
function addMessage(text, isUser) {
    const message = {
        text: text,
        isUser: isUser,
        timestamp: new Date()
    };
    messages.push(message);
    renderMessage(message);
    scrollToBottom();
}

// Renderizar mensagem
function renderMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.isUser ? 'user' : 'bot'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message.text;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = formatTime(message.timestamp);
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    
    chatBox.appendChild(messageDiv);
}

// Enviar mensagem
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text || isLoading) return;
    
    // Adicionar mensagem do usuário
    addMessage(text, true);
    userInput.value = '';
    
    // Mostrar indicador de digitação
    showTypingIndicator();
    isLoading = true;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                'text': text
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            const resposta = data.response || 'Desculpe, não consegui processar sua mensagem.';
            
            // Remover indicador de digitação
            removeTypingIndicator();
            
            // Adicionar resposta da IA
            addMessage(resposta, false);
        } else {
            throw new Error('Erro na API: ' + response.status);
        }
    } catch (error) {
        // Remover indicador de digitação
        removeTypingIndicator();
        
        // Adicionar mensagem de erro
        addMessage(
            "Desculpe, estou tendo problemas para me conectar. Por favor, tente novamente em alguns instantes.",
            false
        );
    }
    
    isLoading = false;
}

// Mostrar indicador de digitação
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message bot typing';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-content';
    typingContent.textContent = 'Digitando...';
    
    typingDiv.appendChild(typingContent);
    chatBox.appendChild(typingDiv);
    scrollToBottom();
}

// Remover indicador de digitação
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Formatar hora
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Scroll para o final
function scrollToBottom() {
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
}

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', init);