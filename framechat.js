// ===== Injetar Meta Viewport e Link de Fontes =====
(function() {
  // Meta viewport (importante para mobile responsivo)
  let meta = document.querySelector('meta[name="viewport"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    document.head.appendChild(meta);
  }

  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
})();

// ===== Injetar CSS (estilo dark theme minimalista, responsividade aprimorada) =====
const style = document.createElement('style');
style.textContent = `
:root {
  --bg-color: #202020; /* solicitado */
  --text-color: #ffffff;
  --accent-color: #ff7a18; /* laranja quente */
  --accent-dark: #cc5f10;
  --accent-light: #ffb97a;
  --secondary-bg: #161616;
  --message-bg-received: #262626;
  --border-color: rgba(255,255,255,0.06);
  --muted: rgba(255,255,255,0.65);
}

/* Reset & base */
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html,body { height:100%; width:100%; }
body {
  margin: 0;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

/* Nav */
#navMenu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(180deg, rgba(24,24,24,0.85), rgba(24,24,24,0.9));
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  border-bottom: 1px solid var(--border-color);
  gap: 12px;
}
.logo-img { width: 92px; height: auto; object-fit:contain; cursor:pointer; }
.icon-wrapper { display:flex; gap:16px; align-items:center; }

/* notification dot */
.notif-dot {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--accent-color);
  color: #fff;
  font-size: 11px;
  width: 18px;
  height: 18px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
}

/* Main containers */
#conversations {
  margin-top: 72px; /* header height */
  padding: 14px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}
#conversations h1 { font-size:20px; margin: 0 0 10px 6px; font-weight:600; }

/* Search */
.search-bar {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  padding: 10px 12px;
  display:flex;
  gap:8px;
  align-items:center;
  margin-bottom:12px;
  border: 1px solid var(--border-color);
}
.search-bar svg { width:18px; height:18px; opacity:0.9; }
.search-input {
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 15px;
  flex:1;
}
.search-input::placeholder { color: rgba(255,255,255,0.45); }

/* Toggle */
.toggle-wrapper { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; gap:10px; }
.toggle-label { font-size:13px; color:var(--muted); }
.toggle { width:46px; height:26px; background: #101010; border-radius:26px; position:relative; border:1px solid var(--border-color); cursor:pointer; }
.toggle::before { content:''; position:absolute; top:3px; left:3px; width:20px; height:20px; background: #fff; border-radius:50%; transition:transform .25s ease; }
.toggle.active { background: var(--accent-dark); }
.toggle.active::before { transform: translateX(20px); }

/* Conversation list */
.conv-list { list-style:none; padding:0; margin:0 0 16px 0; display:flex; flex-direction:column; gap:10px; }
.conv-item {
  display:flex; align-items:center; gap:12px; padding:10px; border-radius:14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.03));
  border: 1px solid var(--border-color);
  transition: transform .18s ease, box-shadow .18s ease;
}
.conv-item:active { transform: translateY(-1px); }
.profile-photo { width:62px; height:62px; border-radius:50%; object-fit:cover; flex-shrink:0; border: 2px solid transparent; }

/* name + badge */
.conv-info { flex:1; min-width:0; }
.conv-name { display:flex; align-items:center; gap:8px; font-weight:600; font-size:16px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.verified-badge { width:18px; height:18px; display:inline-block; object-fit:contain; }
.conv-snippet { color: rgba(255,255,255,0.68); font-size:13px; margin-top:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

/* time */
.conv-time { font-size:12px; color: rgba(255,255,255,0.45); flex-shrink:0; }

/* Chat view */
#chatView { display:none; flex-direction:column; height:100vh; }
.chat-header {
  position: fixed; top: 0; left:0; right:0; z-index:9998;
  background: linear-gradient(180deg, rgba(20,20,20,0.95), rgba(20,20,20,0.92));
  padding: 10px 12px; display:flex; align-items:center; gap:10px; border-bottom:1px solid var(--border-color);
}
.back-btn { width:28px; height:28px; cursor:pointer; opacity:0.95; }
.chat-profile-photo { width:44px; height:44px; border-radius:50%; object-fit:cover; }
.chat-name { font-size:16px; font-weight:600; display:flex; gap:8px; align-items:center; color:var(--text-color); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:55vw; }

/* messages area */
#messages { margin-top:64px; padding:14px; flex:1; overflow-y:auto; -webkit-overflow-scrolling:touch; display:flex; flex-direction:column; gap:12px; padding-bottom:120px; }
.message { max-width:78%; padding:12px 14px; border-radius:16px; font-size:15px; line-height:1.35; position:relative; box-shadow: 0 2px 6px rgba(0,0,0,0.5); }
.received { background: var(--message-bg-received); align-self:flex-start; color:var(--text-color); }
.sent { background: linear-gradient(90deg,var(--accent-color),var(--accent-light)); color:#fff; align-self:flex-end; }
.message-time { font-size:11px; color: rgba(255,255,255,0.45); margin-top:6px; text-align:right; }

/* media-request */
.media-request { background: linear-gradient(180deg, rgba(25,25,25,0.95), rgba(20,20,20,0.95)); border-radius:16px; padding:14px; max-width:86%; }
.media-title { font-weight:700; margin-bottom:8px; color:var(--muted); }
.media-price { font-size:22px; font-weight:800; margin-bottom:10px; color:var(--text-color); }
.unlock-btn { background: linear-gradient(90deg,var(--accent-color),var(--accent-light)); color:#fff; border:none; padding:10px 12px; border-radius:12px; font-weight:700; cursor:pointer; width:100%; box-shadow: 0 6px 16px rgba(0,0,0,0.5); }

/* input area */
#inputArea { position: fixed; left:0; right:0; bottom:0; padding:10px 12px; display:flex; gap:10px; align-items:center; background: linear-gradient(180deg, rgba(16,16,16,0.9), rgba(12,12,12,0.95)); border-top:1px solid var(--border-color); z-index:9999; }
.input-icon { width:36px; height:36px; display:inline-flex; align-items:center; justify-content:center; border-radius:10px; cursor:pointer; flex-shrink:0; }
.input-icon img, .input-icon svg { width:20px; height:20px; display:block; }
.input-icon.gif { font-weight:700; color:var(--accent-color); padding:6px 8px; border-radius:10px; background: rgba(255,255,255,0.02); }
#messageInput { flex:1; border-radius:20px; padding:10px 14px; font-size:15px; background: transparent; border:1px solid var(--border-color); color:var(--text-color); outline:none; }
#sendBtn { width:44px; height:44px; background: linear-gradient(90deg,var(--accent-color),var(--accent-light)); border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow: 0 6px 14px rgba(0,0,0,0.5); }

/* blurred list */
#blurredList { margin-top:8px; position:relative; }
.blur-overlay { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:12px; background: linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.55)); border-radius:12px; color:var(--text-color); text-align:center; }
.blur-lock { width:44px; height:44px; margin-bottom:6px; fill:var(--accent-color); }
.blur-text { font-size:13px; color:var(--muted); max-width:84%; }
.blur-button { background: linear-gradient(90deg,var(--accent-color),var(--accent-light)); color:#fff; border:none; padding:10px 18px; border-radius:12px; font-weight:700; cursor:pointer; }

/* small screens tweaks */
@media (max-width:420px) {
  .logo-img { width:84px; }
  .profile-photo { width:56px; height:56px; }
  .conv-item { padding:10px; border-radius:12px; }
  .conv-name { font-size:15px; }
  .conv-snippet { font-size:12px; }
  .conv-time { font-size:11px; }
  #messages { padding:12px; margin-top:64px; padding-bottom:140px; }
  .chat-name { max-width:48vw; }
  .chat-profile-photo { width:40px; height:40px; }
  #inputArea { padding:8px 10px; }
  #messageInput { padding:10px; font-size:14px; }
  #sendBtn { width:40px; height:40px; }
}

/* medium+ screens */
@media (min-width:768px) {
  #conversations { max-width:720px; margin:72px auto 0; }
  #navMenu { left:50%; transform:translateX(-50%); max-width:980px; border-radius:0 0 18px 18px; }
}

/* micro-interactions */
.conv-item:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(0,0,0,0.6); }
.unlock-btn:hover { transform: translateY(-2px); }
`;
document.head.appendChild(style);

// ===== Injetar HTML Estrutura =====
const appHTML = `
<div id="navMenu">
  <img class="logo-img" src="https://framerusercontent.com/images/..."> <!-- Coloque o URL real da logo -->
  <div class="icon-wrapper">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    <div style="position:relative;">
      <svg class="notif-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S11 3.17 11 4v.68C8.63 5.36 7 7.92 7 11v5l-2 2v1h14v-1l-2-2z"/></svg>
      <div class="notif-dot">3</div>
    </div>
  </div>
</div>

<div id="conversations">
  <h1>Conversas</h1>
  <div class="search-bar">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    <input class="search-input" type="text" placeholder="Pesquisar em minhas conversas">
  </div>

  <div class="toggle-wrapper">
    <span class="toggle-label">Exibir apenas usuários online</span>
    <div class="toggle" id="onlineToggle"></div>
  </div>

  <ul class="conv-list"></ul>

  <div id="blurredList"></div>
</div>

<div id="chatView">
  <div class="chat-header">
    <svg class="back-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    <img class="chat-profile-photo" src="">
    <div class="chat-name"><span class="chat-name-text"></span><img class="verified-badge chat-verified" src=""></div>
    <div class="chat-icons">
      <svg class="fav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    </div>
  </div>

  <div id="messages"></div>

  <div id="inputArea">
    <div class="input-icon mic" title="Gravar">
      <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'></path><path d='M19 10v2a7 7 0 0 1-14 0v-2'></path><line x1='12' y1='19' x2='12' y2='23'></line><line x1='8' y1='23' x2='16' y2='23'></line></svg>">
    </div>
    <div class="input-icon gif">GIF</div>
    <div class="input-icon memo" title="Mimo">
      <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2'></path><rect x='9' y='3' width='6' height='4' rx='1' ry='1'></rect><path d='M9 12h6'></path></svg>">
    </div>
    <div class="input-icon smile" title="Emoji">
      <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><path d='M8 14s1.5 2 4 2 4-2 4-2'></path><line x1='9' y1='9' x2='9.01' y2='9'></line><line x1='15' y1='9' x2='15.01' y2='9'></line></svg>">
    </div>

    <input id="messageInput" type="text" placeholder="Digite uma mensagem">
    <div id="sendBtn" title="Enviar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M2 21L23 12 2 3 2 10l15 2-15 2z"/></svg>
    </div>
  </div>
</div>

<div class="overlay" id="premiumOverlay" style="display:none;">
  <div class="popup" id="premiumPopup">
    <h2>Assine o Frame Premium</h2>
    <p>Desbloqueie acesso completo a conversas, conteúdos exclusivos e muito mais!</p>
    <button id="premiumBtn">Assinar Agora</button>
  </div>
</div>

<div class="overlay" id="infoOverlay" style="display:none;">
  <div class="popup" id="infoPopup">
    <h2>Frame Premium</h2>
    <p>Acesse o histórico completo, listas, contatos de WhatsApp e conteúdo 100% exclusivo.</p>
    <button id="infoBtn">Assinar</button>
  </div>
</div>

<div class="toast" id="toast" style="display:none;"></div>

<div class="loading-overlay" id="loadingOverlay" style="display:none;">
  <div class="spinner" style="width:40px;height:40px;border:4px solid rgba(255,255,255,0.12);border-top:4px solid var(--accent-color);border-radius:50%;animation:spin 1s linear infinite;"></div>
</div>
`;
document.body.innerHTML = appHTML;

// Elementos
const navMenu = document.getElementById('navMenu');
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
const toast = document.getElementById('toast');
const loadingOverlay = document.getElementById('loadingOverlay');
const searchInput = document.querySelector('.search-input');
const onlineToggle = document.getElementById('onlineToggle');
const convList = document.querySelector('.conv-list');
const blurredList = document.getElementById('blurredList');
const favIcon = document.querySelector('.fav-icon');
const notifIcon = document.querySelector('.notif-icon');

// Verified badge image (usada ao lado de todos os nomes)
const VERIFIED_BADGE_URL = 'https://framerusercontent.com/images/jggVjcyAj9NcDFewbWWd70.png';

// ===== Perfis (5 visíveis; Reed é o 1º e é o único com mídia paga) =====
const profiles = [
  { name: 'Reed', photo: 'https://framerusercontent.com/images/iGsZV81bLARO3rxg0B5S88J4GQU.jpg', snippet: 'Estou em live agora ... corre antes ...', time: 'ontem', hasMedia: true, price: 'R$ 157,89' },
  { name: 'Duda Brunet', photo: 'https://framerusercontent.com/images/FoK1KaGDLlF2436osMfHCSU9k.webp', snippet: 'Falando contigo hehe', time: 'set 16', hasMedia: false },
  { name: 'Bianca', photo: 'https://framerusercontent.com/images/rVENuOaqP10FhfIg14tMT2EHFw.jpg', snippet: 'Vídeo inédito! Gozando gostoso...', time: 'set 24', hasMedia: false },
  { name: 'Brenda Trindade', photo: 'https://framerusercontent.com/images/AoXpk0CaadrGaZbN6hglCGqet0.jpg', snippet: 'Estou em live agora ...', time: 'set 10', hasMedia: false },
  { name: 'Mafe', photo: 'https://framerusercontent.com/images/7PQbvug8ntTrX7ryp6PFIWVxUs.png?scale-down-to=1024&width=828&height=1060', snippet: 'Boom dia amor ... hoje acordei animadinha', time: 'Ontem', hasMedia: false }
];

// Blurred / locked profiles (aparecem atrás do blur)
const blurredProfiles = [
  { name: 'Karol Rosalin', photo: 'https://framerusercontent.com/images/...', snippet: 'Vídeo inédito!', time: 'set 24' },
  { name: 'gigenesinifree', photo: 'https://framerusercontent.com/images/...', snippet: 'post link', time: 'set 8' },
  { name: 'Outra Criadora', photo: 'https://framerusercontent.com/images/...', snippet: 'Mensagem exclusiva...', time: 'ago 18' }
];

// Funções utilitárias
function showToast(message, ms = 2500) {
  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.opacity = '0';
  setTimeout(()=> toast.style.opacity = '1', 10);
  setTimeout(()=> { toast.style.opacity = '0'; setTimeout(()=> toast.style.display = 'none',220); }, ms);
}

function showLoading(duration = 800) {
  loadingOverlay.style.display = 'flex';
  setTimeout(() => loadingOverlay.style.display = 'none', duration);
}

function showPremiumPopup() {
  premiumOverlay.style.display = 'flex';
  setTimeout(()=> premiumPopup.classList.add('active'), 80);
}
function closePremiumPopup() {
  premiumPopup.classList.remove('active');
  setTimeout(()=> premiumOverlay.style.display = 'none', 260);
}
function showInfoPopup() {
  infoOverlay.style.display = 'flex';
  setTimeout(()=> infoPopup.classList.add('active'), 80);
}
function closeInfoPopup() {
  infoPopup.classList.remove('active');
  setTimeout(()=> infoOverlay.style.display = 'none', 260);
}

// Abre chat com profile
function openChat(profile) {
  document.querySelector('.chat-profile-photo').src = profile.photo;
  document.querySelector('.chat-name-text').textContent = profile.name;
  document.querySelector('.chat-verified').src = VERIFIED_BADGE_URL;
  messages.innerHTML = '';
  conversations.style.display = 'none';
  chatView.style.display = 'flex';

  // Mensagem inicial do criador
  const initialMessage = document.createElement('div');
  initialMessage.classList.add('message', 'received');
  initialMessage.innerHTML = `${profile.snippet}<div class="message-time">08:40</div>`;
  messages.appendChild(initialMessage);

  // Só Reed mostra a solicitação de mídia (com preço R$ 157,89 e botão "Assine e desbloqueie")
  if (profile.hasMedia) {
    const mediaRequest = document.createElement('div');
    mediaRequest.classList.add('media-request');
    mediaRequest.innerHTML = `
      <div class="media-title">Solicitação Mídia</div>
      <div class="media-price">${profile.price}</div>
      <button class="unlock-btn" id="unlockSubscribeBtn">Assine e desbloqueie</button>
      <div class="media-info" style="margin-top:10px; color:rgba(255,255,255,0.65); font-size:13px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M4 6H20V16H4V6Zm0-2V18H20V4H4Z"/></svg>
        Uploads 1
      </div>
      <div class="message-time">08:42 · ${profile.price} ainda não pago</div>
    `;
    messages.appendChild(mediaRequest);

    // evento do botão dentro do chat
    setTimeout(()=>{
      const unlockSubscribeBtn = document.getElementById('unlockSubscribeBtn');
      if (unlockSubscribeBtn) {
        unlockSubscribeBtn.addEventListener('click', ()=>{
          // aqui abrimos o fluxo de assinatura
          showPremiumPopup();
        });
      }
    },50);
  } else {
    // para demais, só mostramos que não há mídia paga nesta conversa
    const note = document.createElement('div');
    note.classList.add('message','received');
    note.innerHTML = `Nenhuma mídia paga disponível nesta conversa.<div class="message-time">08:42</div>`;
    messages.appendChild(note);
  }

  messages.scrollTop = messages.scrollHeight;
}

// Fecha chat
function closeChat() {
  chatView.style.display = 'none';
  conversations.style.display = 'block';
}

// Popular lista de conversas (5 visíveis)
convList.innerHTML = '';
profiles.forEach(profile => {
  const li = document.createElement('li');
  li.classList.add('conv-item');
  li.innerHTML = `
    <img class="profile-photo" src="${profile.photo}" alt="${profile.name}">
    <div class="conv-info">
      <div class="conv-name">
        <span style="max-width:62%;">${profile.name}</span>
        <img class="verified-badge" src="${VERIFIED_BADGE_URL}" alt="verified">
      </div>
      <div class="conv-snippet">${profile.snippet}</div>
    </div>
    <div class="conv-time">${profile.time}</div>
  `;
  li.addEventListener('click', () => openChat(profile));
  convList.appendChild(li);
});

// Blurred section (aparece abaixo)
const blurredUl = document.createElement('ul');
blurredUl.classList.add('conv-list');
blurredProfiles.forEach(profile => {
  const li = document.createElement('li');
  li.classList.add('conv-item');
  li.innerHTML = `
    <img class="profile-photo" src="${profile.photo}" alt="${profile.name}">
    <div class="conv-info">
      <div class="conv-name">
        <span style="max-width:62%;">${profile.name}</span>
        <img class="verified-badge" src="${VERIFIED_BADGE_URL}" alt="verified">
      </div>
      <div class="conv-snippet">${profile.snippet}</div>
    </div>
    <div class="conv-time">${profile.time}</div>
  `;
  blurredUl.appendChild(li);
});
blurredList.appendChild(blurredUl);

// blur overlay
const blurOverlay = document.createElement('div');
blurOverlay.classList.add('blur-overlay');
blurOverlay.innerHTML = `
  <svg class="blur-lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
  <div class="blur-text">Quer ter acesso ao histórico completo e muito mais? Listas, contatos de WhatsApp, conteúdo 100% exclusivo. Disponível no Frame Premium.</div>
  <button class="blur-button" id="infoBlurBtn">Saiba Mais</button>
`;
blurredList.appendChild(blurOverlay);

// Eventos
backBtn.addEventListener('click', closeChat);

sendBtn.addEventListener('click', () => {
  if (messageInput.value.trim()) {
    showLoading(600);
    setTimeout(showPremiumPopup, 600);
    messageInput.value = '';
  } else {
    showToast('Digite uma mensagem primeiro!');
  }
});

messageInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && messageInput.value.trim()) {
    showLoading(600);
    setTimeout(showPremiumPopup, 600);
    messageInput.value = '';
  }
});

premiumOverlay.addEventListener('click', e => { if (e.target === premiumOverlay) closePremiumPopup(); });
premiumBtn.addEventListener('click', () => {
  closePremiumPopup();
  showToast('Redirecionando para assinatura Frame Premium...');
});

infoOverlay.addEventListener('click', e => { if (e.target === infoOverlay) closeInfoPopup(); });
infoBtn.addEventListener('click', () => {
  closeInfoPopup();
  showPremiumPopup();
});

document.getElementById('infoBlurBtn')?.addEventListener('click', showInfoPopup);

onlineToggle.addEventListener('click', () => {
  onlineToggle.classList.toggle('active');
  showToast(onlineToggle.classList.contains('active') ? 'Mostrando apenas online' : 'Mostrando todos');
});

// search filter (funciona tanto na lista visível quanto na blur)
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  [...convList.children].forEach(item => {
    const name = item.querySelector('.conv-name span')?.textContent?.toLowerCase() || '';
    item.style.display = name.includes(term) ? 'flex' : 'none';
  });
  [...blurredUl.children].forEach(item => {
    const name = item.querySelector('.conv-name span')?.textContent?.toLowerCase() || '';
    item.style.display = name.includes(term) ? 'flex' : 'none';
  });
});

favIcon && favIcon.addEventListener && favIcon.addEventListener('click', () => {
  favIcon.classList.toggle('filled');
  showToast(favIcon.classList.contains('filled') ? 'Adicionado aos favoritos!' : 'Removido dos favoritos');
});

notifIcon && notifIcon.addEventListener && notifIcon.addEventListener('click', () => showToast('Novas notificações: Confira o Frame Premium!'));

document.querySelectorAll('.input-icon').forEach(icon => {
  icon.addEventListener('click', () => showPremiumPopup());
});

// animação leve no dot
const dot = document.querySelector('.notif-dot');
if (dot) {
  dot.style.transition = 'transform .35s ease';
  dot.style.transformOrigin = 'center';
  setTimeout(()=> dot.style.transform = 'translateY(-2px)', 400);
  setTimeout(()=> dot.style.transform = 'translateY(0)', 800);
}

// Init: coloca badge nas chat header (default)
document.querySelector('.chat-verified').src = VERIFIED_BADGE_URL;
navMenu.style.top = '0';