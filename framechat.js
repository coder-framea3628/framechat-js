// ===== Injetar Link de Fontes =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// ===== Injetar CSS (estilo minimalista Apple-like com tons terrosos, animações leves) =====
const style = document.createElement('style');
style.textContent = `
body {
  margin: 0;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(to bottom, #f8f8f8, #e0d0c0);
  height: 100vh;
  overflow: hidden;
  color: #333;
}

#navMenu {
  position: fixed;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
  max-width: 1280px;
  background: linear-gradient(135deg, rgba(32,32,32,0.9), rgba(171,134,91,0.9));
  backdrop-filter: blur(12px);
  border-radius: 0 0 25px 25px;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  transition: all .5s cubic-bezier(0.25,0.46,0.45,0.94);
  z-index: 9999;
  border: 1px solid rgba(255,255,255,0.1);
}

#navMenu.active {
  top: 0;
}

.logo-img {
  width: 100px;
  height: auto;
  margin-right: auto;
  cursor: pointer;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-left: auto;
}

#navMenu svg, #navMenu img:not(.logo-img) {
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.25,0.46,0.45,0.94);
  vertical-align: middle;
}

#navMenu svg:hover, #navMenu img:not(.logo-img):hover {
  transform: scale(1.08) rotate(5deg);
  filter: drop-shadow(0 2px 4px rgba(171,134,91,0.3));
}

.notif-dot {
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #AB865B, #D3AD83);
  color: #fff;
  font-size: 11px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(171,134,91,0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(171,134,91,0.7); }
  70% { box-shadow: 0 0 0 10px rgba(171,134,91,0); }
  100% { box-shadow: 0 0 0 0 rgba(171,134,91,0); }
}

@keyframes shake {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.shake {
  animation: shake .7s ease-in-out;
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
  color: #fff;
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
  border: 1px solid rgba(255,255,255,0.1);
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

.close-popup {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  transition: all .3s;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.close-popup:hover {
  background: rgba(255,255,255,0.2);
  transform: rotate(90deg);
}

.popup h2 {
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.5px;
  padding-right: 24px;
}

.popup button {
  background: linear-gradient(135deg, #AB865B, #D3AD83);
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  transition: all .3s;
  width: 100%;
  box-shadow: 0 4px 12px rgba(171,134,91,0.3);
}

.popup button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(171,134,91,0.4);
}

.popup button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(171,134,91,0.2);
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #AB865B, #D3AD83);
  color: #fff;
  padding: 12px 20px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(171,134,91,0.4);
  transform: translateX(400px);
  opacity: 0;
  transition: all .4s cubic-bezier(0.25,0.46,0.45,0.94);
  z-index: 10001;
  font-size: 14px;
  font-weight: 500;
  min-width: 200px;
  text-align: center;
}

.toast.active {
  transform: translateX(0);
  opacity: 1;
}

.toast.exit {
  transform: translateX(400px);
  opacity: 0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10001;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #D3AD83;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#conversations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 80px;
  padding-bottom: 20px;
  transition: transform 0.3s ease;
}

#conversations.hidden {
  transform: translateX(-100%);
}

.conv-header {
  padding: 16px;
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  color: #333;
  border-bottom: 1px solid rgba(171,134,91,0.2);
}

.conv-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conv-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(171,134,91,0.1);
  cursor: pointer;
  transition: background 0.3s;
}

.conv-item:hover {
  background: rgba(171,134,91,0.05);
}

.conv-item.blurred {
  filter: blur(4px);
  pointer-events: none;
  position: relative;
}

.conv-item.blurred::after {
  content: 'Para acessar chats completos, torne-se Premium';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,0.8);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #AB865B;
  text-align: center;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.profile-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.conv-info {
  flex: 1;
}

.conv-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.conv-snippet {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.conv-time {
  font-size: 12px;
  color: #999;
  margin-left: auto;
}

#chat-view {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  background: #f8f8f8;
}

#chat-view.active {
  transform: translateX(-100%);
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(32,32,32,0.9), rgba(171,134,91,0.9));
  backdrop-filter: blur(12px);
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 16px;
  fill: #fff;
}

.chat-profile-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.chat-name {
  font-weight: 600;
  font-size: 18px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.4;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.received {
  align-self: flex-start;
  background: #e0d0c0;
  color: #333;
}

.message.sent {
  align-self: flex-end;
  background: linear-gradient(135deg, #AB865B, #D3AD83);
  color: #fff;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255,255,255,0.9);
  border-top: 1px solid rgba(171,134,91,0.1);
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.input-icons {
  display: flex;
  gap: 12px;
  margin-right: 12px;
}

.input-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #AB865B;
  transition: transform 0.3s;
}

.input-icon:hover {
  transform: scale(1.1);
}

#message-input {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 20px;
  background: #f0f0f0;
  font-size: 14px;
  outline: none;
  transition: box-shadow 0.3s;
}

#message-input:focus {
  box-shadow: 0 0 0 2px rgba(171,134,91,0.3);
}

#send-btn {
  background: linear-gradient(135deg, #AB865B, #D3AD83);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin-left: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

#send-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(171,134,91,0.3);
}

.premium-popup p {
  font-size: 14px;
  text-align: center;
  color: #ddd;
}

@media (max-width: 768px) {
  #navMenu { padding: 10px 20px; width: 98%; }
  .icon-wrapper { gap: 16px; }
  .logo-img { width: 80px; }
  .conv-item { padding: 10px 14px; }
  .messages { padding: 14px; }
  .chat-input { padding: 10px 14px; }
}
`;

// Injetar CSS
document.head.appendChild(style);

// ===== Injetar HTML (estrutura minimalista para FrameChat) =====
const appHTML = `
<div id="navMenu" role="navigation" aria-label="Menu principal">
  <a href="https://frameag.com"><img class="logo-img" src="https://framerusercontent.com/images/JaIvmSW2LTbs0XCR7tnpcmU8xA.png" alt="Logo FrameChat"></a>
  <div class="icon-wrapper">
    <div style="position:relative">
      <img id="notifIcon" src="https://framerusercontent.com/images/Yr7purGR3rArCX8H8FMYR7b40.png" alt="Notificações">
      <div class="notif-dot">1</div>
    </div>
    <svg id="favIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <svg id="searchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  </div>
</div>
<div id="conversations">
  <div class="conv-header">Conversas</div>
  <ul class="conv-list" id="convList"></ul>
</div>
<div id="chat-view">
  <div class="chat-header">
    <svg class="back-btn" id="backBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="#fff"/>
    </svg>
    <img class="chat-profile-photo" id="chatPhoto" src="" alt="Foto do perfil">
    <span class="chat-name" id="chatName"></span>
  </div>
  <div class="messages" id="messages"></div>
  <div class="chat-input">
    <div class="input-icons">
      <svg class="input-icon" title="Microfone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
      </svg>
      <svg class="input-icon" title="GIF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-1.5h2v-3h-2V10h3z"/>
      </svg>
      <svg class="input-icon" title="Mimo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 .81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <svg class="input-icon" title="Emoji" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2z"/>
      </svg>
    </div>
    <input type="text" id="message-input" placeholder="Digite uma mensagem...">
    <button id="send-btn">Enviar</button>
  </div>
</div>
<div class="overlay" id="premiumOverlay">
  <div class="popup premium-popup" id="premiumPopup">
    <button class="close-popup" id="closePremium">&times;</button>
    <h2>Torne-se Premium</h2>
    <p>Para enviar mensagens, áudios ou imagens, assine o Frame Premium agora!</p>
    <button id="premiumBtn">Assinar Premium</button>
  </div>
</div>
<div class="toast" id="toast"></div>
<div class="loading-overlay" id="loadingOverlay">
  <div class="loading-spinner"></div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', appHTML);

// ===== Lógica Principal para FrameChat =====
// Dados dos perfis (5 iniciais gratuitos, com mensagens padrão)
const profiles = [
  {
    name: 'Duda Brunet',
    photo: 'https://framerusercontent.com/images/FoK1KaGDLlF2436osMfHCSU9k.webp',
    snippet: 'Falando contigo hoje',
    time: 'set 16',
    messages: [
      { text: 'Oi! Tudo bem?', type: 'received' },
      { text: 'Sim, e você?', type: 'sent' },
      { text: 'Estou ótima, vamos conversar mais?', type: 'received' }
    ]
  },
  {
    name: 'Alice Ferraz',
    photo: 'https://framerusercontent.com/images/iGsZV81bLARO3rxg0B5S88J4GQU.jpg?scale-down-to=1024&width=1080&height=1440',
    snippet: 'Tentamos nos seguir o dia...',
    time: 'Ontem',
    messages: [
      { text: 'Olá, adorei seu perfil!', type: 'sent' },
      { text: 'Obrigada! O que você faz?', type: 'received' }
    ]
  },
  {
    name: 'Bianca Novelino',
    photo: 'https://framerusercontent.com/images/rVENuOaqP10FhfIg14tMT2EHFw.jpg',
    snippet: 'Vídeo inédito! Gozando gostoso...',
    time: 'set 24',
    messages: [
      { text: 'Amei o vídeo novo!', type: 'sent' },
      { text: 'Que bom! Quer mais?', type: 'received' },
      { text: 'Sim, por favor!', type: 'sent' }
    ]
  },
  {
    name: 'Brenda Trindade',
    photo: 'https://framerusercontent.com/images/AoXpk0CaadrGaZbN6hglCGqet0.jpg',
    snippet: 'Estou em live agora... corre antes...',
    time: 'set 10',
    messages: [
      { text: 'Entrando na live!', type: 'sent' },
      { text: 'Bem-vindo! Divirta-se.', type: 'received' }
    ]
  },
  {
    name: 'Mafe Esper',
    photo: 'https://framerusercontent.com/images/7PQbvug8ntTrX7ryp6PFIWVxUs.png?scale-down-to=1024&width=828&height=1060',
    snippet: 'Vai ficar muito feliz em receber seu mimo!',
    time: 'ago 18',
    messages: [
      { text: 'Enviei um mimo para você!', type: 'sent' },
      { text: 'Adorei, obrigada! ❤️', type: 'received' }
    ]
  }
];

// Perfis blurred (exemplos)
const blurredProfiles = [
  { name: 'Karol Rosalin', photo: 'placeholder.jpg', snippet: 'Conteúdo exclusivo...', time: 'Agora' },
  { name: 'Gigenesi Nifree', photo: 'placeholder.jpg', snippet: 'Novo post...', time: 'Hoje' }
];

// Elementos
const convList = document.getElementById('convList');
const chatView = document.getElementById('chat-view');
const backBtn = document.getElementById('backBtn');
const chatPhoto = document.getElementById('chatPhoto');
const chatName = document.getElementById('chatName');
const messagesEl = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const premiumOverlay = document.getElementById('premiumOverlay');
const premiumPopup = document.getElementById('premiumPopup');
const closePremium = document.getElementById('closePremium');
const premiumBtn = document.getElementById('premiumBtn');
const toastEl = document.getElementById('toast');
const loadingOverlay = document.getElementById('loadingOverlay');
const navMenu = document.getElementById('navMenu');
const notifIcon = document.getElementById('notifIcon');
const favIcon = document.getElementById('favIcon');

// Funções helpers
function showToast(msg, duration = 2500) {
  toastEl.textContent = msg;
  toastEl.classList.remove('exit');
  toastEl.classList.add('active');
  setTimeout(() => {
    toastEl.classList.add('exit');
    setTimeout(() => toastEl.classList.remove('active', 'exit'), 450);
  }, duration);
}

function showLoading() {
  loadingOverlay.style.display = 'flex';
  setTimeout(() => loadingOverlay.style.display = 'none', 1500);
}

function openChat(profile) {
  chatPhoto.src = profile.photo;
  chatName.textContent = profile.name;
  messagesEl.innerHTML = '';
  profile.messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message', msg.type);
    div.textContent = msg.text;
    messagesEl.appendChild(div);
  });
  chatView.classList.add('active');
  document.getElementById('conversations').classList.add('hidden');
  setTimeout(() => messagesEl.scrollTop = messagesEl.scrollHeight, 100);
}

function closeChat() {
  chatView.classList.remove('active');
  document.getElementById('conversations').classList.remove('hidden');
}

function showPremiumPopup() {
  premiumOverlay.style.display = 'flex';
  setTimeout(() => premiumPopup.classList.add('active'), 10);
}

function closePremiumPopup() {
  premiumPopup.classList.remove('active');
  setTimeout(() => premiumOverlay.style.display = 'none', 250);
}

// Popular lista de conversas
profiles.forEach(profile => {
  const li = document.createElement('li');
  li.classList.add('conv-item');
  li.innerHTML = `
    <img class="profile-photo" src="${profile.photo}" alt="${profile.name}">
    <div class="conv-info">
      <div class="conv-name">${profile.name}</div>
      <div class="conv-snippet">${profile.snippet}</div>
    </div>
    <div class="conv-time">${profile.time}</div>
  `;
  li.addEventListener('click', () => openChat(profile));
  convList.appendChild(li);
});

blurredProfiles.forEach(profile => {
  const li = document.createElement('li');
  li.classList.add('conv-item', 'blurred');
  li.innerHTML = `
    <img class="profile-photo" src="${profile.photo}" alt="${profile.name}">
    <div class="conv-info">
      <div class="conv-name">${profile.name}</div>
      <div class="conv-snippet">${profile.snippet}</div>
    </div>
    <div class="conv-time">${profile.time}</div>
  `;
  convList.appendChild(li);
});

// Eventos
backBtn.addEventListener('click', closeChat);

sendBtn.addEventListener('click', () => {
  if (messageInput.value.trim()) {
    showLoading();
    setTimeout(showPremiumPopup, 1000);
    messageInput.value = '';
  } else {
    showToast('Digite uma mensagem primeiro!');
  }
});

messageInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && messageInput.value.trim()) {
    showLoading();
    setTimeout(showPremiumPopup, 1000);
    messageInput.value = '';
  }
});

closePremium.addEventListener('click', closePremiumPopup);
premiumOverlay.addEventListener('click', e => { if (e.target === premiumOverlay) closePremiumPopup(); });
premiumBtn.addEventListener('click', () => {
  closePremiumPopup();
  showToast('Redirecionando para assinatura Premium...');
  // Simular redirect: window.location.href = 'https://frameag.com/premium';
});

document.querySelectorAll('.input-icon').forEach(icon => {
  icon.addEventListener('click', () => showPremiumPopup());
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navMenu.classList.toggle('active', y > 20);
});

favIcon.addEventListener('click', () => {
  favIcon.classList.toggle('filled');
  showToast(favIcon.classList.contains('filled') ? 'Adicionado aos favoritos!' : 'Removido dos favoritos');
});

notifIcon.addEventListener('click', () => showToast('Novas notificações: Confira o Premium!'));

setInterval(() => document.querySelector('.notif-dot')?.classList.toggle('shake', true), 10000);
setTimeout(() => document.querySelector('.notif-dot')?.classList.remove('shake'), 700);

// Init
navMenu.classList.add('active'); // Para chat page, menu sempre visível inicialmente