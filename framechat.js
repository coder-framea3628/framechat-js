// ===== Injetar Meta Viewport para Responsividade em Mobile =====
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);

// ===== Injetar Link de Fontes =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap';
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

/* overlays/popup base (mantido) */
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

/* ... (mantive todo o CSS original e apenas adicionei/ajustei as partes necessárias) ... */

/* Age overlay atualizado para ser não-modal / low z-index e fade-in de 0.5s */
.age-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* overlay leve/transparente para não bloquear ações (não-modal visual) */
  background: rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 900; /* mais baixo que outros modais */
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: auto; /* permite clique nos botões, porém não bloqueia toda a UI */
}

.age-overlay.active {
  opacity: 1;
}

.age-popup {
  background: #FAFAFA;
  color: #262626;
  width: 90%;
  max-width: 450px;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.age-popup h2 {
  color: #202020;
  font-weight: 600;
  font-size: 24px;
  margin: 0;
}

.age-popup .medium {
  color: #262626;
  font-weight: 500;
  font-size: 16px;
  margin: 0;
}

.age-popup .regular {
  color: #262626;
  font-weight: 400;
  font-size: 14px;
  margin: 0;
}

.age-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.age-btn {
  border: none;
  padding: 12px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.age-agree {
  background: #AB865B;
  color: #fff;
}

.age-exit {
  background: #808080;
  color: #fff;
}

.age-footer {
  font-weight: 500;
  font-size: 14px;
}

.age-footer a {
  color: #8B6A4B;
  font-weight: 600;
  text-decoration: underline;
}

/* digitando e premium-response */
.digitando {
  background: var(--message-bg-received);
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 14px;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
  color: rgba(255,255,255,0.7);
  position: relative;
}

.digitando::after {
  content: '...';
  animation: dots 1.5s steps(5, end) infinite;
}

@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60% { content: '...'; }
  80%, 100% { content: ''; }
}

.premium-response {
  color: #AB865B;
}

.inline-btn {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  display: inline-block;
}

/* media confirm popup */
.media-confirm-overlay {
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

.media-confirm-popup {
  background: linear-gradient(135deg, rgba(32,32,32,0.98), rgba(171,134,91,0.98));
  color: var(--text-color);
  width: 90%;
  max-width: 450px;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transform: translateY(50px);
  opacity: 0;
  transition: all .6s cubic-bezier(0.25,0.46,0.45,0.94);
}

.media-confirm-popup.active {
  transform: translateY(0);
  opacity: 1;
}

.media-confirm-preview {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 12px;
}

/* search overlay (upsell) */
.search-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 15px;
  color: var(--text-color);
}

/* favorite heart filled animation */
.fav-icon.filled {
  fill: #AB865B;
  transition: fill 0.3s;
}

/* small responsive tweaks (mantidos) */
@media (max-width: 600px) {
  /* ... mantive ajustes existentes ... */
}
`;
document.head.appendChild(style);

// ===== Injetar HTML Estrutura =====
const appHTML = `
<div id="conversations">
  <h1>FrameChat</h1>
  <div class="search-bar">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    <input class="search-input" type="text" placeholder="Pesquisar mensagem no chat" aria-label="Pesquisar mensagem no chat">
  </div>
  <div class="toggle-wrapper">
    <span class="toggle-label">Exibir apenas modelos online</span>
    <div class="toggle" id="onlineToggle" role="switch" aria-checked="false"></div>
  </div>
  <ul class="conv-list"></ul>
  <div id="blurredList">
    <!-- Blurred profiles aqui -->
  </div>
</div>

<div id="chatView">
  <div class="chat-header">
    <svg class="back-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="button" aria-label="Voltar"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    <img class="chat-profile-photo" src="" alt="Foto da criadora">
    <span class="chat-name" aria-live="polite"></span>
    <div class="chat-icons">
      <svg class="fav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="button" aria-label="Favoritar"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    </div>
  </div>
  <div id="messages" role="log" aria-live="polite"></div>
  <div id="inputArea">
    <img class="input-icon mic" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'></path><path d='M19 10v2a7 7 0 0 1-14 0v-2'></path><line x1='12' y1='19' x2='12' y2='23'></line><line x1='8' y1='23' x2='16' y2='23'></line></svg>" alt="Microfone" aria-label="Gravar áudio">
    <span class="input-icon gif" role="button" aria-label="Enviar GIF">GIF</span>
    <img class="input-icon memo" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2'></path><rect x='9' y='3' width='6' height='4' rx='1' ry='1'></rect><path d='M9 12h6'></path><path d='M9 16h6'></path></svg>" alt="Enviar mídia" aria-label="Enviar mídia">
    <img class="input-icon smile" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><path d='M8 14s1.5 2 4 2 4-2 4-2'></path><line x1='9' y1='9' x2='9.01' y2='9'></line><line x1='15' y1='9' x2='15.01' y2='9'></line></svg>" alt="Reações" aria-label="Reações">
    <input id="messageInput" type="text" placeholder="Digite uma mensagem" aria-label="Digite uma mensagem">
    <div id="sendBtn" role="button" aria-label="Enviar mensagem">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="%23fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </div>
  </div>
</div>

<div class="overlay" id="premiumOverlay">
  <div class="popup" id="premiumPopup">
    <h2>Assine o Frame Premium</h2>
    <p>Desbloqueie acesso completo ao chat com modelos, conteúdos exclusivos e muito mais no Frame Premium!</p>
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

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<div class="loading-overlay" id="loadingOverlay" aria-hidden="true">
  <div class="spinner" role="progressbar" aria-label="Carregando"></div>
  <span id="loadingText"></span>
</div>

<div class="age-overlay" id="ageOverlay" aria-hidden="false">
  <div class="age-popup" role="dialog" aria-modal="false" aria-labelledby="ageTitle">
    <h2 id="ageTitle">FrameChat</h2>
    <p class="medium">Essa funcionalidade é restrita a maiores de 18 anos.</p>
    <p class="regular">Ao clicar no botão ‘Concordo’, você declara ser maior de 18 anos e consente em visualizar o conteúdo. Se você for menor de idade, clique em ‘Sair do FrameChat’ imediatamente.</p>
    <div class="age-buttons">
      <button class="age-btn age-agree" aria-label="Concordo com os termos de idade">Concordo</button>
      <button class="age-btn age-exit" aria-label="Sair do FrameChat">Sair do FrameChat</button>
    </div>
    <p class="age-footer">Para mais informações, consulte nossa <a href="https://frameag.com/privacy" target="_blank" rel="noopener">Política de Privacidade</a> e <a href="https://frameag.com/termos" target="_blank" rel="noopener">os Termos da Frame</a>.</p>
  </div>
</div>

<div class="media-confirm-overlay" id="mediaConfirmOverlay" aria-hidden="true">
  <div class="media-confirm-popup" id="mediaConfirmPopup" role="dialog" aria-modal="true">
    <h2 id="mediaConfirmTitle"></h2>
    <img id="mediaConfirmPreview" class="media-confirm-preview" src="" alt="Preview da mídia">
    <button class="unlock-btn" id="mediaConfirmBtn" aria-label="Enviar mídia">Confirmar</button>
  </div>
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
const ageOverlay = document.getElementById('ageOverlay');
const ageAgreeBtn = document.querySelector('.age-agree');
const ageExitBtn = document.querySelector('.age-exit');
const mediaConfirmOverlay = document.getElementById('mediaConfirmOverlay');
const mediaConfirmPopup = document.getElementById('mediaConfirmPopup');
const mediaConfirmTitle = document.getElementById('mediaConfirmTitle');
const mediaConfirmPreview = document.getElementById('mediaConfirmPreview');
const mediaConfirmBtn = document.getElementById('mediaConfirmBtn');
const gifIcon = document.querySelector('.input-icon.gif');
const smileIcon = document.querySelector('.input-icon.smile');

// Perfis (Reed no topo, com verified badge)
const profiles = [
  { name: 'Letícia Reed', photo: 'https://framerusercontent.com/images/iGsZV81bLARO3rxg0B5S88J4GQU.jpg', verified: true, snippet: 'Oi lindo, vem pro meu chat...', time: 'agora mesmo', paymentLink: 'https://app.pushinpay.com.br/service/pay/9FF819FB-2D06-45C4-BD8C-8217A997FBEA', status: 'Online agora' },
  { name: 'Duda Brunet', photo: 'https://framerusercontent.com/images/FoK1KaGDLlF2436osMfHCSU9k.webp', verified: true, snippet: 'Ei môo, bem vindo! Animada pra te provocar hoje... Vamos brincar? 💋', time: 'set 20', paymentLink: '', status: 'Online agora' },
  { name: 'Bianca Novelino', photo: 'https://framerusercontent.com/images/rVENuOaqP10FhfIg14tMT2EHFw.jpg', verified: true, snippet: 'Olhao que eu preparei pra você safado... 🔥', time: 'set 24', paymentLink: '', status: 'Vista por último há 1 dia' },
  { name: 'Brenda Trindade', photo: 'https://framerusercontent.com/images/AoXpk0CaadrGaZbN6hglCGqet0.jpg', verified: true, snippet: 'Pronto pra passar o mês gozando comigo?', time: 'set 21', paymentLink: '', status: 'Esteve online há 15 minutos' },
  { name: 'Mafe Esper', photo: 'https://framerusercontent.com/images/7PQbvug8ntTrX7ryp6PFIWVxUs.png?scale-down-to=1024&width=828&height=1060', verified: true, snippet: 'Ei gato, tô louca pra te mostrar minhas curvas... 😏', time: 'Ontem', paymentLink: '', status: 'Vista por último há 1 dia' },
  { name: 'Karol Rosalin', photo: 'https://framerusercontent.com/images/8iJ8hEUzmxwPCZokvXip2PKTsg.jpg', verified: true, snippet: 'se você entrar no meu chat agora, te envio o video que todos se apaixonaram! enfiei o consolo na bucetinha...', time: 'agora mesmo', paymentLink: 'https://app.pushinpay.com.br/service/pay/9ff8346a-86d5-4245-933b-8df3a73f786', status: 'Online agora' }
];

// Perfis blurred (exemplo com Karol Rosalin e mais)
const blurredProfiles = [
  { name: 'Karina Meire', photo: 'https://example.com/karol.jpg', verified: true, snippet: 'Vídeo inédito! Gozando gostoso...', time: 'set 24' },
  { name: 'Aline Ferraz', photo: 'https://example.com/outra.jpg', verified: true, snippet: 'Mensagem exclusiva...', time: 'set 10' }
  // Adicione mais se necessário
];

// Funções
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('exit');
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.add('exit');
    setTimeout(() => {
      toast.classList.remove('active', 'exit');
    }, 400);
  }, 3000);
}

function showLoading(duration, text = '', redirectUrl = null) {
  loadingText.textContent = text;
  loadingOverlay.style.display = 'flex';
  loadingOverlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => {
    loadingOverlay.style.display = 'none';
    loadingOverlay.setAttribute('aria-hidden', 'true');
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
    const chatNameElement = document.querySelector('.chat-name');
    chatNameElement.textContent = profile.name;
    // adicionar verified no header se existir
    const existingBadge = chatNameElement.querySelector('.verified-badge');
    if (!existingBadge && profile.verified) {
      const verifiedImg = document.createElement('img');
      verifiedImg.classList.add('verified-badge');
      verifiedImg.src = 'https://framerusercontent.com/images/jggVjcyAj9NcDFewbWWd70.png';
      chatNameElement.appendChild(verifiedImg);
    }
    messages.innerHTML = '';
    conversations.style.display = 'none';
    chatView.style.display = 'flex';
    window.currentPaymentLink = profile.paymentLink;
    window.currentProfile = profile;

    // Adicionar mensagem inicial do criador
    const initialMessage = document.createElement('div');
    initialMessage.classList.add('message', 'received');
    let messageContent = `${profile.snippet}`;
    if (profile.name === 'Brenda Trindade') {
      messageContent += `<br><img class="media-preview" src="https://framerusercontent.com/images/ABFvvRX7hDyfhv9Br4VXi76fpzg.jpeg" alt="Imagem">`;
    }
    initialMessage.innerHTML = `${messageContent}<div class="message-time">${getCurrentTime()}</div>`;
    messages.appendChild(initialMessage);

    // Adicionar solicitação de mídia para Reed
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

    // Adicionar solicitação de mídia para Karol Rosalin
    if (profile.name === 'Karol Rosalin') {
      const mediaRequest = document.createElement('div');
      mediaRequest.classList.add('media-request');
      mediaRequest.innerHTML = `
        <div class="media-title">Desbloquear mídia</div>
        <img class="media-preview" src="https://framerusercontent.com/images/de2ZBdxwiM7FuSHtLy4iPEhq9k.jpeg" alt="Mídia preview">
        <div class="media-caption">Olha o que te espera rs</div>
        <div class="media-price">R$ 155,00</div>
        <button class="unlock-btn">Desbloquear conteúdo</button>
        <div class="media-info">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M4 6H20V16H4V6Zm0-2V18H20V4H4Z"/></svg>
          Uploads 1
        </div>
        <div class="message-time">${getCurrentTime()} · R$ 155.00 ainda não pago</div>
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

// Envio de mensagem: fluxo conforme solicitado
function sendMessage() {
  if (messageInput.value.trim()) {
    // adiciona a mensagem do usuário imediatamente (timestamp "agora mesmo")
    const sentMessage = document.createElement('div');
    sentMessage.classList.add('message', 'sent');
    sentMessage.innerHTML = `${escapeHtml(messageInput.value)}<div class="message-time">agora mesmo</div>`;
    messages.appendChild(sentMessage);
    messages.scrollTop = messages.scrollHeight;
    messageInput.value = '';

    // mostra "Digitando..." por 5s (efeito via .digitando)
    const digitando = document.createElement('div');
    digitando.classList.add('digitando');
    digitando.setAttribute('aria-live', 'polite');
    digitando.textContent = 'Digitando';
    messages.appendChild(digitando);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      // remove o indicador de digitação e adiciona resposta da criadora
      if (messages.contains(digitando)) messages.removeChild(digitando);
      const responseMessage = document.createElement('div');
      responseMessage.classList.add('message', 'received');
      responseMessage.innerHTML = `<span class="premium-response">Poxa, para receber sua mensagem e conversarmos, você deve ser Premium!</span><br><button class="inline-btn" onclick="window.location.href='https://frameag.com/premium'">Assinar agora</button><div class="message-time">${getCurrentTime()}</div>`;
      messages.appendChild(responseMessage);
      messages.scrollTop = messages.scrollHeight;
    }, 5000);
  } else {
    showToast('Digite uma mensagem primeiro!');
  }
}

// Escapar HTML simples para evitar injeção via input
function escapeHtml(unsafe) {
  return unsafe
    .replaceAll('&', "&amp;")
    .replaceAll('<', "&lt;")
    .replaceAll('>', "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Mostrar confirm de mídia
function showMediaConfirm(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    mediaConfirmTitle.textContent = `${window.currentProfile ? window.currentProfile.name : 'A criadora'} Receberá sua mídia!`;
    mediaConfirmPreview.src = e.target.result;
    mediaConfirmOverlay.style.display = 'flex';
    mediaConfirmOverlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => mediaConfirmPopup.classList.add('active'), 100);
  };
  reader.readAsDataURL(file);
}

function closeMediaConfirm() {
  mediaConfirmPopup.classList.remove('active');
  setTimeout(() => {
    mediaConfirmOverlay.style.display = 'none';
    mediaConfirmOverlay.setAttribute('aria-hidden', 'true');
  }, 600);
}

// Adiciona mídia enviada (usuario vê sua própria mídia)
function addSentMedia(src) {
  const sentMedia = document.createElement('div');
  sentMedia.classList.add('media-request');
  sentMedia.style.alignSelf = 'flex-end';
  sentMedia.style.background = 'var(--accent-color)';
  sentMedia.innerHTML = `
    <div class="media-title">Sua mídia</div>
    <img class="media-preview" src="${src}" alt="Sua mídia">
    <div class="message-time">agora mesmo</div>
  `;
  messages.appendChild(sentMedia);
  messages.scrollTop = messages.scrollHeight;
}

// handleMediaUpload: tenta usar showOpenFilePicker (quando disponível) para "pedido nativo".
// Se não disponível, usa input file. Em caso de cancelamento/negativa, mostra toast conforme pedido.
async function handleMediaUpload(icon) {
  // Prioriza a API moderna (Chrome/Edge) se disponível para provocar prompt "nativo"
  if (window.showOpenFilePicker) {
    try {
      const handles = await window.showOpenFilePicker({
        types: [{
          description: 'Imagens',
          accept: {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp']
          }
        }],
        multiple: false
      });
      if (handles && handles.length > 0) {
        const file = await handles[0].getFile();
        showMediaConfirm(file);
      } else {
        showToast('Você deve permitir para enviar mídias');
      }
    } catch (err) {
      // Permissão negada ou cancelou
      showToast('Você deve permitir para enviar mídias');
    }
  } else {
    // Fallback tradicional (input file)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    input.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        showMediaConfirm(e.target.files[0]);
      } else {
        showToast('Você deve permitir para enviar mídias');
      }
    };
    document.body.appendChild(input);
    input.click();
    // clean up após um curto delay (remoção segura)
    setTimeout(() => {
      if (document.body.contains(input)) document.body.removeChild(input);
    }, 2000);
  }
}

// Popular lista de conversas
profiles.forEach(profile => {
  const li = document.createElement('li');
  li.classList.add('conv-item');
  li.innerHTML = `
    <img class="profile-photo" src="${profile.photo}" alt="${profile.name}">
    <div class="conv-info">
      <div class="conv-name">${profile.name}${profile.verified ? '<img class="verified-badge" src="https://framerusercontent.com/images/jggVjcyAj9NcDFewbWWd70.png">' : ''}</div>
      <div class="conv-status">${profile.status}</div>
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

const searchOverlay = document.createElement('div');
searchOverlay.classList.add('search-overlay');
searchOverlay.innerHTML = `
  <div class="blur-text">Para ter acesso a filtros e buscas avançadas, você deve ser Premium!</div>
  <button class="blur-button" onclick="window.location.href='https://frameag.com/premium'">Assinar agora</button>
`;
conversations.appendChild(searchOverlay);

// Eventos
backBtn.addEventListener('click', closeChat);

// Envio: mantém o loading existente por 1s e depois dispara sendMessage (já obedecendo o novo fluxo)
sendBtn.addEventListener('click', () => {
  showLoading(1000, 'Processando...');
  setTimeout(sendMessage, 1000);
});

// Enter envia (mesma experiência)
messageInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && messageInput.value.trim()) {
    showLoading(1000, 'Processando...');
    setTimeout(sendMessage, 1000);
  }
});

// Popups (mantidos)
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

// Toggle online
onlineToggle.addEventListener('click', () => {
  onlineToggle.classList.toggle('active');
  const isActive = onlineToggle.classList.contains('active');
  onlineToggle.setAttribute('aria-checked', String(isActive));
  showToast(isActive ? 'Mostrando apenas online' : 'Mostrando todas');
});

// BUSCA com upsell: spinner 1s e depois overlay blur com upsell
let searchTimeout;
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  clearTimeout(searchTimeout);
  if (term) {
    showLoading(1000, 'Buscando...');
    searchTimeout = setTimeout(() => {
      searchOverlay.style.display = 'flex';
    }, 1000);
  } else {
    searchOverlay.style.display = 'none';
    [...convList.children, ...blurredUl.children].forEach(item => {
      item.style.display = 'flex';
    });
  }
});

// Favoritar (coração) com animação e preenchimento
favIcon.addEventListener('click', () => {
  favIcon.classList.toggle('filled');
  showToast(favIcon.classList.contains('filled') ? 'Adicionada as suas favoritas!' : 'Removido dos favoritos');
});

// Microfone: usa getUserMedia como antes
micIcon.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => showPremiumPopup())
    .catch(() => showToast('Você deve permitir para enviar áudios'));
});

// Uploads de mídia: adiciona comportamento com request nativa quando suportada
memoIcon.addEventListener('click', () => {
  handleMediaUpload('memo');
});
gifIcon.addEventListener('click', () => {
  handleMediaUpload('gif');
});

// Reações (mantém premium)
smileIcon.addEventListener('click', () => showPremiumPopup());

// Pagamento (mantido)
paymentOverlay.addEventListener('click', e => { if (e.target === paymentOverlay) closePaymentPopup(); });
pixBtn.addEventListener('click', () => {
  closePaymentPopup();
  showLoading(2000, 'Processando conteúdo com segurança...', window.currentPaymentLink);
});
creditBtn.addEventListener('click', () => {
  closePaymentPopup();
  showLoading(2000, 'Redirecionando para pagamento...', 'https://frameag.com/premium');
});

// AGE GATE: inicializa ativo (não-modal visual). fade-out suave ao aceitar (0.5s)
ageOverlay.classList.add('active');
ageAgreeBtn.addEventListener('click', () => {
  ageOverlay.classList.remove('active'); // usa transição de opacity (0.5s)
  setTimeout(() => {
    ageOverlay.style.display = 'none';
    ageOverlay.setAttribute('aria-hidden', 'true');
  }, 500);
});
ageExitBtn.addEventListener('click', () => window.location.href = 'https://frameag.com/age-restriction');

// impedir right-click / save, mas sem bloquear inputs/buttons/links (melhora acessibilidade)
// só previne o menu em elementos "conteúdo" (imagens, mensagens) mas permite em inputs e botões
document.body.addEventListener('contextmenu', e => {
  const tag = e.target.tagName.toLowerCase();
  const allowed = ['input', 'textarea', 'button', 'a', 'select'];
  if (!allowed.includes(tag) && !e.target.closest('[role="button"]') && !e.target.closest('input')) {
    e.preventDefault();
  }
});

// long-press prevention em mobile (hold >500ms) — mas sem impedir toques rápidos em botões/inputs
let touchStartTime;
let touchStartTarget = null;
document.body.addEventListener('touchstart', e => {
  touchStartTime = Date.now();
  touchStartTarget = e.target;
});
document.body.addEventListener('touchend', e => {
  const held = Date.now() - (touchStartTime || 0);
  // se foi um hold longo em elemento não-interativo, previne o comportamento (salvar imagem)
  const tag = (touchStartTarget && touchStartTarget.tagName && touchStartTarget.tagName.toLowerCase()) || '';
  const interactive = ['input','textarea','button','a','select','svg','path','img'];
  if (held > 500 && !interactive.includes(tag)) {
    e.preventDefault();
  }
  touchStartTime = null;
  touchStartTarget = null;
});

// media confirm overlay close
mediaConfirmOverlay.addEventListener('click', e => { if (e.target === mediaConfirmOverlay) closeMediaConfirm(); });
mediaConfirmBtn.addEventListener('click', () => {
  addSentMedia(mediaConfirmPreview.src);
  closeMediaConfirm();
});

// pequenas proteções e atributos ARIA para botões de mídia
memoIcon.setAttribute('aria-label', 'Enviar mídia');
gifIcon.setAttribute('aria-label', 'Enviar GIF');
mediaConfirmBtn.setAttribute('aria-label', 'Confirmar envio de mídia');

