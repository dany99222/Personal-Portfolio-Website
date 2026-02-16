import {intents} from './intents.js'

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const modal = document.getElementById("chatModal");

// Función para eliminar acentos
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function addMessage(author, text, className) {
  const div = document.createElement("div");
  div.className = `message ${className} p-3 `;
  div.innerHTML = `<strong>${author}:</strong> ${text} <i class="bi bi-check  inline"></i><i class="bi bi-check  inline"></i>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(text) {
  const normalizedText = removeAccents(text.toLowerCase());
  for (const intent of intents) {
    const normalizedKeywords = intent.keywords.map(k => removeAccents(k.toLowerCase()));
    if (normalizedKeywords.some(k => normalizedText.includes(k))) {
      return intent.reply; 
    }
  }
  return "👋 Hi! I’m the assistant for this portfolio. What would you like to know?";
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("Tú", text, "user");
  input.value = "";

  const typing = document.createElement("div");
  typing.className = "message typing";
  typing.innerHTML = `<div class="m-1 spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>
<div class="m-1 spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>
<div class="m-1 spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>`;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  const reply = getBotResponse(text);

  setTimeout(() => {
    typing.remove();
    addMessage("Bot", reply, "bot");
  }, 500);
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

modal.addEventListener("shown.bs.modal", () => {
  input.focus();
});

// Mensaje inicial
addMessage(
  "Bot",
  "I can help you learn more about my experience, projects, technologies, or how to get in touch 😊",
  "bot",
);
