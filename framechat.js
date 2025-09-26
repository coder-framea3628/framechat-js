// ===== Injetar Meta Viewport para Responsividade em Mobile =====
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);

// ===== Injetar Link de Fontes =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// ===== Injetar CSS (estilo dark theme minimalista Apple-like, responsividade aprimorada) =====
const style = document.createElement('style');
style.textContent = `
:root {
  --bg-color: #141414;
  --text-color: #fff;
  --accent-color: #AB865B;
  --accent-light: #D3AD83;
  --secondary-bg: #1a1a1a;
  --message-bg-received: #2a2a2a;
  --border-color: rgba(255,255,255,0.1);
}

body {
  margin: 0;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-color);
  height: 100vh;
  overflow: hidden;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.popup {
  background: linear-gradient(135deg, rgba(32,32,32,0.98), rgba(171,134,91,0.98));
  color: var(--text-color);
  width: 90%;
  max-width: 450px;
  min-width: 320px;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transform: translateY(50px);
  opacity: 0;
  transition: all .6s cubic-bezier(0.25,0.46,0.45,0.94);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.popup::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
}

.popup.active {
  transform: translateY(0);
  opacity: 1;
}

.popup h2 {
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.5px;
}

.popup button {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all .3s;
  box-shadow: 0 4px 12px rgba(171,134,91,0.3);
}

.popup button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(171,134,91,0.4);
}

#conversations {
  margin-top: 20px;
  padding: 15px;
  overflow-y: auto;
  flex: 1;
}

#conversations h1 {
  font-size: 22px;
  margin-bottom: 12px;
}

.search-bar {
  background: var(--secondary-bg);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.search-bar svg {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  fill: var(--text-color);
}

.search-input {
  background: transparent;
  border: none;
  color: var(--text-color);
  flex: 1;
  font-size: 16px;
}

.search-input::placeholder {
  color: rgba(255,255,255,0.6);
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.toggle-label {
  font-size: 13px;
}

.toggle {
  width: 45px;
  height: 24px;
  background: var(--secondary-bg);
  border-radius: 24px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: var(--text-color);
  border-radius: 50%;
  transition: transform 0.3s;
}

.toggle.active {
  background: var(--accent-color);
}

.toggle.active::before {
  transform: translateX(21px);
}

.conv-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conv-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 16px;
  margin-bottom: 10px;
  background: var(--secondary-bg);
  cursor: pointer;
  transition: all .3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.conv-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(171,134,91,0.2);
}

.profile-photo {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.conv-info {
  flex: 1;
  min-width: 0;
}

.conv-name {
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.verified-badge {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}

.conv-snippet {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conv-time {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  text-align: right;
  white-space: nowrap;
}

#chatView {
  display: none;
  flex-direction: column;
  height: 100vh;
}

.chat-header {
  background: linear-gradient(135deg, rgba(32,32,32,0.9), rgba(171,134,91,0.9));
  backdrop-filter: blur(12px);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9998;
}

.back-btn {
  width: 22px;
  height: 22px;
  margin-right: 14px;
  cursor: pointer;
}

.chat-profile-photo {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-name {
  font-weight: 600;
  font-size: 17px;
  flex: 1;
}

.chat-icons {
  display: flex;
  gap: 18px;
}

.chat-icons svg {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

#messages {
  margin-top: 60px;
  padding: 15px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
}

.received {
  background: var(--message-bg-received);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.sent {
  background: var(--accent-color);
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 10px;
  color: rgba(255,255,255,0.5);
  margin-top: 4px;
  text-align: right;
}

.media-request {
  background: var(--message-bg-received);
  border-radius: 20px;
  padding: 14px;
  max-width: 80%;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.media-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.media-price {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
}

.unlock-btn {
  background: var(--accent-color);
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.media-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.7);
  margin-top: 10px;
}

.media-caption {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
}

.media-preview {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 8px;
}

#inputArea {
  background: var(--secondary-bg);
  padding: 20px 18px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.3);
}

.input-icon {
  width: 22px;
  height: 22px;
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.input-icon:hover {
  transform: scale(1.1);
}

#messageInput {
  flex: 1;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 8px 14px;
  color: var(--text-color);
  font-size: 16px;
}

#messageInput:focus {
  border-color: var(--accent-color);
  outline: none;
}

#sendBtn {
  width: 36px;
  height: 36px;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
}

#blurredList {
  position: relative;
  margin-top: 15px;
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 15px;
  color: var(--text-color);
}

.blur-lock {
  width: 36px;
  height: 36px;
  margin-bottom: 10px;
  stroke: var(--accent-color);
}

.blur-text {
  font-size: 13px;
  margin-bottom: 14px;
  line-height: 1.4;
}

.blur-button {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(171,134,91,0.3);
  transition: all .3s;
}

.blur-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(171,134,91,0.4);
}

.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.9);
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 10001;
  box-shadow: 0 4px 12px rgba(171,134,91,0.3);
  animation: fadeInOut 3s ease-in-out;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(-10px);
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10002;
  flex-direction: column;
  gap: 10px;
  color: var(--text-color);
  font-size: 14px;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.spinner {
  width: 45px;
  height: 45px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top: 4px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Melhorias de responsividade - Ajustado para max-width:600px para cobrir mais dispositivos mobile */
@media (max-width: 600px) {
  #conversations {
    margin-top: 10px;
    padding: 10px;
  }

  .search-bar {
    padding: 8px 10px;
  }

  .search-input {
    font-size: 16px;
  }

  .conv-item {
    padding: 8px;
    margin-bottom: 8px;
  }

  .profile-photo {
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }

  .conv-name {
    font-size: 13px;
  }

  .conv-snippet {
    font-size: 11px;
  }

  .conv-time {
    font-size: 9px;
  }

  .chat-header {
    padding: 10px 12px;
  }

  .chat-profile-photo {
    width: 32px;
    height: 32px;
  }

  .chat-name {
    font-size: 15px;
  }

  #messages {
    margin-top: 50px;
    padding: 12px;
  }

  .message {
    font-size: 13px;
    padding: 8px 12px;
  }

  #inputArea {
    padding: 15px 12px;
  }

  .input-icon {
    margin-right: 15px;
  }

  #messageInput {
    font-size: 16px;
    padding: 6px 12px;
  }

  #sendBtn {
    width: 32px;
    height: 32px;
    margin-left: 8px;
  }

  .popup {
    padding: 18px;
    max-width: 95%;
  }

  .popup h2 {
    font-size: 17px;
  }

  .popup button {
    padding: 10px;
    font-size: 14px;
  }
}

@media (min-width: 768px) {
  #conversations {
    max-width: 600px;
    margin: 20px auto 0;
    padding: 30px;
  }

  .popup {
    max-width: 400px;
  }
}

/* Melhorias estéticas: mais sombras, gradients, detalhes */
.conv-item {
  background: linear-gradient(135deg, var(--secondary-bg), rgba(171,134,91,0.05));
}

.message {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.media-request {
  box-shadow: 0 4px 12px rgba(171,134,91,0.2);
}

.unlock-btn {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
  box-shadow: 0 4px 12px rgba(171,134,91,0.3);
}

.unlock-btn:hover {
  transform: translateY(-1px);
}

/* SVGs melhorados (usando paths mais suaves e modernos) */
.input-icon.mic {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>');
}

.input-icon.gif {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-color);
  background: rgba(255,255,255,0.1);
  padding: 4px 8px;
  border-radius: 8px;
  margin-right: 12px;
}

.input-icon.memo {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path><rect x="9" y="3" width="6" height="4" rx="1" ry="1"></rect><path d="M9 12h6"></path><path d="M9 16h6"></path></svg>');
}

.input-icon.smile {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>');
}
`;
document.head.appendChild(style);

// ===== Injetar HTML Estrutura =====
const appHTML = `
<div id="conversations">
  <h1>FrameChat!</h1>
  <div class="search-bar">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    <input class="search-input" type="text" placeholder="Pesquisar em minhas conversas">
  </div>
  <div class="toggle-wrapper">
    <span class="toggle-label">Exibir apenas modelos online</span>
    <div class="toggle" id="onlineToggle"></div>
  </div>
  <ul class="conv-list"></ul>
  <div id="blurredList">
    <!-- Blurred profiles aqui -->
  </div>
</div>

<div id="chatView">
  <div class="chat-header">
    <svg class="back-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    <img class="chat-profile-photo" src="">
    <span class="chat-name"></span>
    <div class="chat-icons">
      <svg class="fav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    </div>
  </div>
  <div id="messages"></div>
  <div id="inputArea">
    <img class="input-icon mic" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'></path><path d='M19 10v2a7 7 0 0 1-14 0v-2'></path><line x1='12' y1='19' x2='12' y2='23'></line><line x1='8' y1='23' x2='16' y2='23'></line></svg>">
    <span class="input-icon gif">GIF</span>
    <img class="input-icon memo" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2'></path><rect x='9' y='3' width='6' height='4' rx='1' ry='1'></rect><path d='M9 12h6'></path><path d='M9 16h6'></path></svg>">
    <img class="input-icon smile" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><path d='M8 14s1.5 2 4 2 4-2 4-2'></path><line x1='9' y1='9' x2='9.01' y2='9'></line><line x1='15' y1='9' x2='15.01' y2='9'></line></svg>">
    <input id="messageInput" type="text" placeholder="Digite uma mensagem">
    <div id="sendBtn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="%23fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </div>
  </div>
</div>

<div class="overlay" id="premiumOverlay">
  <div class="popup" id="premiumPopup">
    <h2>Assine o Frame Premium</h2>
    <p>Desbloqueie acesso completo a conversas, conteúdos exclusivos e muito mais!</p>
    <button id="premiumBtn">Assinar Agora</button>
  </div>
</div>

<div class="overlay" id="infoOverlay">
  <div class="popup" id="infoPopup">
    <h2>Frame Premium</h2>
    <p>Acesse o histórico completo, listas, contatos de WhatsApp e conteúdo 100% exclusivo.</p>
    <button id="infoBtn">Assinar</button>
  </div>
</div>

<div class="overlay" id="paymentOverlay">
  <div class="popup" id="paymentPopup">
    <h2>Forma de pagamento</h2>
    <button id="pixBtn">PIX</button>
    <button id="creditBtn">Cartão de Crédito</button>
  </div>
</div>

<div class="toast" id="toast"></div>

<div class="loading-overlay" id="loadingOverlay">
  <div class="spinner"></div>
  <span id="loadingText"></span>
</div>
`;
document.body.innerHTML = appHTML;

// Elementos
const conversations = document.getElementById('conversations');
const chatView = document.getElementById('chatView');
const backBtn = document.querySelector('.back-btn');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const premiumOverlay = document.getElementById('premiumOverlay');
const premiumPopup = document.getElementById('premiumPopup');
const premiumBtn = document.getElementById('premiumBtn');
const infoOverlay = document.getElementById('infoOverlay');
const infoPopup = document.getElementById('infoPopup');
const infoBtn = document.getElementById('infoBtn');
const paymentOverlay = document.getElementById('paymentOverlay');
const paymentPopup = document.getElementById('paymentPopup');
const pixBtn = document.getElementById('pixBtn');
const creditBtn = document.getElementById('creditBtn');
const toast = document.getElementById('toast');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const searchInput = document.querySelector('.search-input');
const onlineToggle = document.getElementById('onlineToggle');
const convList = conversations.querySelector('.conv-list');
const blurredList = document.getElementById('blurredList');
const favIcon = document.querySelector('.fav-icon');
const micIcon = document.querySelector('.input-icon.mic');
const memoIcon = document.querySelector('.input-icon.memo');

// Perfis (Reed no topo, com verified badge)
const profiles = [
  { name: 'Letícia Reed', photo: 'https://framerusercontent.com/images/iGsZV81bLARO3rxg0B5S88J4GQU.jpg', verified: true, snippet: 'Tentamos nos seguir o di...', time: 'ago 18' },
  { name: 'Duda Brunet', photo: 'https://framerusercontent.com/images/FoK1KaGDLlF2436osMfHCSU9k.webp', verified: true, snippet: 'Bem vindo, amor! Pronta para te fazer delirar... 😘', time: 'set 16' },
  { name: 'Bianca Novelino', photo: 'https://framerusercontent.com/images/rVENuOaqP10FhfIg14tMT2EHFw.jpg', verified: true, snippet: 'Oi delícia, vem ver o que eu preparei pra você... 🔥', time: 'set 24' },
  { name: 'Brenda Trindade', photo: 'https://framerusercontent.com/images/AoXpk0CaadrGaZbN6hglCGqet0.jpg', verified: true, snippet: 'Animada pra te provocar hoje... Vamos brincar? 💋', time: 'set 10' },
  { name: 'Mafe Esper', photo: 'https://framerusercontent.com/images/7PQbvug8ntTrX7ryp6PFIWVxUs.png?scale-down-to=1024&width=828&height=1060', verified: true, snippet: 'Ei gato, tô louca pra te mostrar minhas curvas... 😏', time: 'Ontem' }
];

// Perfis blurred (exemplo com Karol Rosalin e mais)
const blurredProfiles = [
  { name: 'Karol Rosalin', photo: 'https://example.com/karol.jpg', verified: true, snippet: 'Vídeo inédito! Gozando gostoso...', time: 'set 24' },
  { name: 'Outra Criadora', photo: 'https://example.com/outra.jpg', verified: true, snippet: 'Mensagem exclusiva...', time: 'set 10' }
  // Adicione mais se necessário
];

// Funções
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function showLoading(duration, text = '', redirectUrl = null) {
  loadingText.textContent = text;
  loadingOverlay.style.display = 'flex';
  setTimeout(() => {
    loadingOverlay.style.display = 'none';
    if (redirectUrl) window.location.href = redirectUrl;
  }, duration);
}

function showPremiumPopup() {
  premiumOverlay.style.display = 'flex';
  setTimeout(() => premiumPopup.classList.add('active'), 100);
}

function closePremiumPopup() {
  premiumPopup.classList.remove('active');
  setTimeout(() => premiumOverlay.style.display = 'none', 600);
}

function showInfoPopup() {
  infoOverlay.style.display = 'flex';
  setTimeout(() => infoPopup.classList.add('active'), 100);
}

function closeInfoPopup() {
  infoPopup.classList.remove('active');
  setTimeout(() => infoOverlay.style.display = 'none', 600);
}

function showPaymentPopup() {
  paymentOverlay.style.display = 'flex';
  setTimeout(() => paymentPopup.classList.add('active'), 100);
}

function closePaymentPopup() {
  paymentPopup.classList.remove('active');
  setTimeout(() => paymentOverlay.style.display = 'none', 600);
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function openChat(profile) {
  showLoading(800, 'Carregando chat...');
  setTimeout(() => {
    document.querySelector('.chat-profile-photo').src = profile.photo;
    document.querySelector('.chat-name').textContent = profile.name;
    messages.innerHTML = '';
    conversations.style.display = 'none';
    chatView.style.display = 'flex';

    // Adicionar mensagem inicial do criador
    const initialMessage = document.createElement('div');
    initialMessage.classList.add('message', 'received');
    initialMessage.innerHTML = `${profile.snippet}<div class="message-time">${getCurrentTime()}</div>`;
    messages.appendChild(initialMessage);

    // Adicionar solicitação de mídia apenas para Reed
    if (profile.name === 'Letícia Reed') {
      const mediaRequest = document.createElement('div');
      mediaRequest.classList.add('media-request');
      mediaRequest.innerHTML = `
        <div class="media-title">Desbloquear mídia</div>
        <img class="media-preview" src="https://framerusercontent.com/images/tuwsvBFBBNyS1f3pRpMsFivaXU.jpeg" alt="Mídia preview">
        <div class="media-caption">Quero te mostrar esse vídeo gostoso que eu fiz😍</div>
        <div class="media-price">R$ 79,99</div>
        <button class="unlock-btn">Desbloquear conteúdo</button>
        <div class="media-info">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M4 6H20V16H4V6Zm0-2V18H20V4H4Z"/></svg>
          Uploads 1
        </div>
        <div class="message-time">${getCurrentTime()} · R$ 79.99 ainda não pago</div>
      `;
      messages.appendChild(mediaRequest);
      mediaRequest.querySelector('.unlock-btn').addEventListener('click', showPaymentPopup);
    }

    messages.scrollTop = messages.scrollHeight;
    favIcon.classList.remove('filled');
  }, 800);
}

function closeChat() {
  chatView.style.display = 'none';
  conversations.style.display = 'block';
}

// Popular lista de conversas
profiles.forEach(profile => {
  const li = document.createElement('li');
  li.classList.add('conv-item');
  li.innerHTML = `
    <img class="profile-photo" src="${profile.photo}" alt="${profile.name}">
    <div class="conv-info">
      <div class="conv-name">${profile.name}${profile.verified ? '<img class="verified-badge" src="https://framerusercontent.com/images/jggVjcyAj9NcDFewbWWd70.png">' : ''}</div>
      <div class="conv-snippet">${profile.snippet}</div>
    </div>
    <div class="conv-time">${profile.time}</div>
  `;
  li.addEventListener('click', () => openChat(profile));
  convList.appendChild(li);
});

// Blurred section
const blurredUl = document.createElement('ul');
blurredUl.classList.add('conv-list');
blurredProfiles.forEach(profile => {
  const li = document.createElement('li');
  li.classList.add('conv-item');
  li.innerHTML = `
    <img class="profile-photo" src="${profile.photo}" alt="${profile.name}">
    <div class="conv-info">
      <div class="conv-name">${profile.name}${profile.verified ? '<img class="verified-badge" src="https://framerusercontent.com/images/jggVjcyAj9NcDFewbWWd70.png">' : ''}</div>
      <div class="conv-snippet">${profile.snippet}</div>
    </div>
    <div class="conv-time">${profile.time}</div>
  `;
  blurredUl.appendChild(li);
});
blurredList.appendChild(blurredUl);

const blurOverlay = document.createElement('div');
blurOverlay.classList.add('blur-overlay');
blurOverlay.innerHTML = `
  <svg class="blur-lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
  <div class="blur-text">Quer ter acesso a todos os chats de modelos do site e muito mais? Listas, lives e conteúdo 100% exclusivo. Disponível no Frame Premium.</div>
  <button class="blur-button" id="infoBlurBtn">Saiba Mais</button>
`;
blurredList.appendChild(blurOverlay);

// Eventos
backBtn.addEventListener('click', closeChat);

sendBtn.addEventListener('click', () => {
  if (messageInput.value.trim()) {
    showLoading(1000, 'Processando...');
    setTimeout(showPremiumPopup, 1000);
    messageInput.value = '';
  } else {
    showToast('Digite uma mensagem primeiro!');
  }
});

messageInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && messageInput.value.trim()) {
    showLoading(1000, 'Processando...');
    setTimeout(showPremiumPopup, 1000);
    messageInput.value = '';
  }
});

premiumOverlay.addEventListener('click', e => { if (e.target === premiumOverlay) closePremiumPopup(); });
premiumBtn.addEventListener('click', () => {
  closePremiumPopup();
  showLoading(2000, 'Redirecionando para assinatura...', 'https://frameag.com/premium');
});

infoOverlay.addEventListener('click', e => { if (e.target === infoOverlay) closeInfoPopup(); });
infoBtn.addEventListener('click', () => {
  closeInfoPopup();
  showLoading(2000, 'Redirecionando para assinatura...', 'https://frameag.com/premium');
});

document.getElementById('infoBlurBtn')?.addEventListener('click', showInfoPopup);

onlineToggle.addEventListener('click', () => {
  onlineToggle.classList.toggle('active');
  showToast(onlineToggle.classList.contains('active') ? 'Mostrando apenas online' : 'Mostrando todos');
});

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  [...convList.children, ...blurredUl.children].forEach(item => {
    item.style.display = item.querySelector('.conv-name').textContent.toLowerCase().includes(term) ? 'flex' : 'none';
  });
});

favIcon.addEventListener('click', () => {
  favIcon.classList.toggle('filled');
  showToast(favIcon.classList.contains('filled') ? 'Adicionado aos favoritos!' : 'Removido dos favoritos');
});

micIcon.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => showPremiumPopup())
    .catch(() => showToast('Permissão de áudio negada!'));
});

memoIcon.addEventListener('click', () => showPremiumPopup());

document.querySelector('.input-icon.gif').addEventListener('click', () => showPremiumPopup());
document.querySelector('.input-icon.smile').addEventListener('click', () => showPremiumPopup());

paymentOverlay.addEventListener('click', e => { if (e.target === paymentOverlay) closePaymentPopup(); });
pixBtn.addEventListener('click', () => {
  closePaymentPopup();
  showLoading(2000, 'Processando conteúdo com segurança...', 'https://app.pushinpay.com.br/service/pay/9FF819FB-2D06-45C4-BD8C-8217A997FBEA');
});
creditBtn.addEventListener('click', () => {
  closePaymentPopup();
  showLoading(2000, 'Redirecionando para pagamento...', 'https://frameag.com/premium');
});