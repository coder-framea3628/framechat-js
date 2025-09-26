// ===== Injetar Link de Fontes (mantive Montserrat + Apple system fallback) =====
(function(){
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // ===== Injetar CSS =====
  const style = document.createElement('style');
  style.id = 'framechat-styles';
  style.textContent = `
    :root{
      --bg-1: #0b0b0c;
      --card-bg: rgba(255,255,255,0.02);
      --glass: rgba(255,255,255,0.04);
      --accent: linear-gradient(135deg,#AB865B,#D3AD83);
      --muted: rgba(255,255,255,0.65);
      --radius: 14px;
    }
    /* Reset / font */
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Montserrat", Arial, sans-serif; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; background: #f6f6f7; }
    /* Container (centers content with similar structure to your nav injection) */
    #framechat-root{position:relative;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:28px 16px 80px;box-sizing:border-box}
    .fc-wrap{width:100%;max-width:1180px;background:transparent;display:flex;gap:24px;align-items:stretch}
    /* Left column: list */
    .fc-list{width:360px;max-width:42%;min-width:300px;background:rgba(255,255,255,0.02);backdrop-filter:blur(6px);border-radius:18px;padding:14px;box-shadow:0 8px 30px rgba(2,6,23,0.06);border:1px solid rgba(0,0,0,0.03)}
    .fc-header{display:flex;align-items:center;gap:12px;padding:6px 8px;margin-bottom:8px}
    .fc-logo{width:110px;height:auto;display:block}
    .fc-search{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.03);padding:8px;border-radius:12px;margin:8px 0}
    .fc-search input{border:0;background:transparent;outline:none;color:var(--muted);font-weight:500;width:100%}
    .profiles{display:flex;flex-direction:column;gap:10px;margin-top:6px;overflow:auto;max-height:calc(100vh - 220px);padding-right:6px}
    .profile{display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;cursor:pointer;transition:all .18s;position:relative}
    .profile:hover{transform:translateY(-3px)}
    .profile img{width:56px;height:56px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid rgba(255,255,255,0.06)}
    .profile .meta{display:flex;flex-direction:column}
    .profile .name{font-weight:600;color:#111}
    .profile .sub{font-size:13px;color:#666;margin-top:3px}
    .badge-prem{position:absolute;right:12px;top:12px;background:linear-gradient(135deg,#ffcc80,#ff9f43);color:#fff;padding:6px 8px;border-radius:999px;font-size:12px;font-weight:700;box-shadow:0 6px 14px rgba(0,0,0,0.08)}
    /* Right column: chat area */
    .fc-chat{flex:1;min-height:560px;background:linear-gradient(180deg, #fff 0%, #fcfcfc 100%);border-radius:18px;padding:18px;display:flex;flex-direction:column;box-shadow:0 8px 40px rgba(12,16,23,0.04)}
    .chat-top{display:flex;align-items:center;gap:12px;border-bottom:1px solid #eee;padding-bottom:10px;margin-bottom:12px}
    .chat-top .avatar{width:48px;height:48px;border-radius:10px;object-fit:cover}
    .chat-top .title{display:flex;flex-direction:column}
    .chat-top .title .name{font-weight:700}
    .chat-top .title .status{font-size:13px;color:#888}
    .messages{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:10px}
    .msg{max-width:72%;padding:12px 14px;border-radius:14px;font-weight:500;line-height:1.35}
    .msg.me{align-self:flex-end;background:var(--accent);color:#111;border-radius:14px 14px 6px 14px}
    .msg.them{align-self:flex-start;background:var(--glass);color:#111;border-radius:14px 14px 14px 6px}
    .input-row{display:flex;gap:10px;padding-top:12px;align-items:center}
    .compose{flex:1;background:rgba(0,0,0,0.02);padding:10px;border-radius:12px;display:flex;gap:8px;align-items:center;border:1px solid rgba(0,0,0,0.03)}
    .compose input{border:0;background:transparent;outline:none;width:100%;font-weight:500}
    .icon-btn{width:44px;height:44px;border-radius:12px;background:transparent;border:1px solid rgba(0,0,0,0.04);display:flex;align-items:center;justify-content:center;cursor:pointer}
    .send-btn{background:linear-gradient(135deg,#AB865B,#D3AD83);color:white;padding:10px 14px;border-radius:12px;border:0;font-weight:700;cursor:pointer}
    /* Locked chat overlay (blurred previews) */
    .locked-list-item{position:relative;border-radius:12px;overflow:hidden}
    .locked-list-item .locked-blur{filter:blur(6px) grayscale(.06);opacity:.85;transform:scale(1.02)}
    .locked-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;background:linear-gradient(0deg, rgba(255,255,255,0.38), rgba(255,255,255,0.18));backdrop-filter:blur(4px)}
    .locked-overlay button{background:var(--accent);border:0;padding:10px 14px;border-radius:12px;color:#111;font-weight:700;cursor:pointer}
    .small-x{position:absolute;top:8px;right:8px;width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.03);font-weight:700;color:#333;cursor:pointer;font-size:14px}
    /* Premium banner on attempts */
    .premium-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) scale(.98);min-width:320px;max-width:420px;padding:18px;border-radius:16px;background:linear-gradient(135deg,#0b0b0c,#141414);color:#fff;z-index:12000;box-shadow:0 24px 80px rgba(2,6,23,0.5);opacity:0;transition:all .18s}
    .premium-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
    .premium-modal h3{margin:0 0 8px;font-weight:700}
    .premium-modal p{margin:0 0 12px;color: #d4d4d4}
    .premium-modal .actions{display:flex;gap:8px}
    .overlay-back{position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:11990;backdrop-filter:blur(2px);opacity:0;transition:opacity .18s}
    .overlay-back.show{opacity:1}
    /* small helper */
    .sending-dot{width:8px;height:8px;border-radius:50%;background:#fff;display:inline-block;margin-right:6px;animation:blink 1s infinite}
    @keyframes blink{0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2}}
    /* responsive */
    @media (max-width:880px){
      .fc-wrap{flex-direction:column;gap:12px;padding-bottom:40px}
      .fc-list{width:100%;max-width:none;min-width:unset;order:2}
      .fc-chat{order:1;padding:14px;border-radius:12px}
      .profile img{width:48px;height:48px}
      .chat-top .avatar{width:42px;height:42px}
    }
    @media (max-width:420px){
      #framechat-root{padding:12px}
      .fc-list{padding:10px;border-radius:12px}
      .profile{padding:10px}
      .fc-chat{padding:12px;border-radius:12px}
      .messages{padding:8px;gap:8px}
      .send-btn{padding:9px 12px}
    }
  `;
  document.head.appendChild(style);

  // ===== Injetar HTML =====
  const root = document.createElement('div');
  root.id = 'framechat-root';
  root.innerHTML = `
    <div class="fc-wrap" role="main" aria-label="FrameChat interface">
      <div class="fc-list" aria-label="Lista de chats">
        <div class="fc-header">
          <img class="fc-logo" src="https://framerusercontent.com/images/JaIvmSW2LTbs0XCR7tnpcmU8xA.png" alt="Frame Logo">
          <div style="flex:1"></div>
          <div class="small-x" title="Fechar">✕</div>
        </div>
        <div class="fc-search" role="search" aria-label="Pesquisar chats">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#888" stroke-width="2" stroke-linecap="round"/></svg>
          <input placeholder="Buscar criadoras..." aria-label="Buscar">
        </div>

        <div class="profiles" id="profilesList" aria-live="polite">
          <!-- profiles injected by JS -->
        </div>
      </div>

      <div class="fc-chat" role="region" aria-label="Janela de chat">
        <div class="chat-top" id="chatTop">
          <img src="" alt="avatar" class="avatar" id="chatAvatar">
          <div class="title">
            <div class="name" id="chatName">Selecionar conversa</div>
            <div class="status" id="chatStatus">Toque em um perfil para abrir o chat</div>
          </div>
        </div>

        <div class="messages" id="messages" aria-live="polite" aria-atomic="false">
          <div style="width:100%;text-align:center;color:#999;font-weight:600">Toque em um perfil para começar</div>
        </div>

        <div class="input-row" aria-hidden="true">
          <div class="compose" id="composeBox">
            <button class="icon-btn" id="attachBtn" title="Anexar">📎</button>
            <input id="composeInput" placeholder="Escreva uma mensagem..." aria-label="Campo de digitação">
            <button class="icon-btn" id="micBtn" title="Enviar áudio">🎤</button>
          </div>
          <button class="send-btn" id="sendBtn" title="Enviar">Enviar</button>
        </div>
      </div>
    </div>

    <!-- premium modal -->
    <div class="overlay-back" id="overlayBack" aria-hidden="true"></div>
    <div class="premium-modal" id="premiumModal" role="dialog" aria-modal="true" aria-labelledby="pmTitle">
      <h3 id="pmTitle">Acesso Premium necessário</h3>
      <p>Desbloqueie mensagens completas, áudios e envio de imagens. Torne-se Premium e tenha acesso ilimitado.</p>
      <div class="actions">
        <button id="buyPremium" class="send-btn">Assinar Premium</button>
        <button id="closePremium" class="icon-btn">Fechar</button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // ===== Perfis iniciais (suas imagens) =====
  const profiles = [
    { id:'duda', name:'Duda Brunet', img:'https://framerusercontent.com/images/FoK1KaGDLlF2436osMfHCSU9k.webp', preview:'Oi, eu sou a Duda — quer saber mais?' },
    { id:'alice', name:'Alice Ferraz', img:'https://framerusercontent.com/images/rVENuOaqP10FhfIg14tMT2EHFw.jpg', preview:'Oi! Vamos conversar sobre colabs?' },
    { id:'bianca', name:'Bianca Novelino', img:'https://framerusercontent.com/images/AoXpk0CaadrGaZbN6hglCGqet0.jpg', preview:'Novidades e lançamentos ✨' },
    { id:'brenda', name:'Brenda Trindade', img:'https://framerusercontent.com/images/7PQbvug8ntTrX7ryp6PFIWVxUs.png?scale-down-to=1024&width=828&height=1060', preview:'Conteúdo exclusivo aqui.' },
    { id:'mafe', name:'Mafe Esper', img:'https://framerusercontent.com/images/iGsZV81bLARO3rxg0B5S88J4GQU.jpg?scale-down-to=1024&width=1080&height=1440', preview:'Fala comigo 💬' }
  ];

  // render profiles list with some locked items to show blur + premium CTA
  const profilesList = document.getElementById('profilesList');
  profiles.forEach((p, idx)=>{
    const item = document.createElement('div');
    item.className = 'profile locked-list-item';
    item.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;width:100%">
        <img src="${p.img}" alt="${p.name}">
        <div class="meta">
          <div class="name">${p.name}</div>
          <div class="sub">${p.preview}</div>
        </div>
      </div>
      <div class="locked-overlay" aria-hidden="true">
        <div style="font-weight:800;color:#222;background:#fff;padding:6px 10px;border-radius:10px">Premium</div>
        <div style="font-size:13px;color:#222">Toque para ver conversa completa</div>
        <button data-profile="${p.id}" class="unlock-btn">Tornar-me Premium</button>
      </div>
    `;
    // small X minimal
    const x = document.createElement('div');
    x.className = 'small-x';
    x.textContent = '✕';
    item.appendChild(x);

    // small blur wrapper for visual (we already apply blur globally)
    profilesList.appendChild(item);

    // click to open chat (but if locked show preview + premium CTA)
    item.addEventListener('click', (e)=>{
      openChat(p, idx);
      e.stopPropagation();
    });
    // unlock btn
    item.querySelector('.unlock-btn').addEventListener('click', (ev)=>{
      ev.stopPropagation();
      showPremiumModal();
    });
    // x close small
    x.addEventListener('click',(ev)=>{ ev.stopPropagation(); item.style.display='none';});
  });

  // ===== Chat logic (visual only) =====
  const chatAvatar = document.getElementById('chatAvatar');
  const chatName = document.getElementById('chatName');
  const chatStatus = document.getElementById('chatStatus');
  const messagesEl = document.getElementById('messages');
  const composeInput = document.getElementById('composeInput');
  const sendBtn = document.getElementById('sendBtn');
  const attachBtn = document.getElementById('attachBtn');
  const micBtn = document.getElementById('micBtn');
  const overlayBack = document.getElementById('overlayBack');
  const premiumModal = document.getElementById('premiumModal');
  const buyPremium = document.getElementById('buyPremium');
  const closePremium = document.getElementById('closePremium');

  let activeProfile = null;
  let premium = false; // simulate user not premium
  let sending = false;

  function openChat(profile, idx){
    activeProfile = profile;
    chatAvatar.src = profile.img;
    chatName.textContent = profile.name;
    chatStatus.textContent = 'Online • Último visto agora';
    // present a short preview of conversation (locked)
    messagesEl.innerHTML = `
      <div style="opacity:.9;max-width:70%;background:linear-gradient(180deg,rgba(255,255,255,0.9),rgba(250,250,250,0.9));padding:12px;border-radius:12px;color:#333;font-weight:600">Olá! Para ver a conversa completa torne-se Premium.</div>
      <div style="height:12px"></div>
      <div style="opacity:.6;max-width:62%;background:rgba(0,0,0,0.02);padding:10px;border-radius:12px;color:#555">Preview — mensagem bloqueada</div>
    `;
    // show compose area as interactive, but sends will require premium
    document.querySelector('.input-row').setAttribute('aria-hidden','false');
    // visually mark profiles as selected
    document.querySelectorAll('.profile').forEach(el=>el.style.background='transparent');
  }

  function appendMessage(text, fromMe=true, fakeSending=false){
    const el = document.createElement('div');
    el.className = 'msg '+(fromMe?'me':'them');
    el.innerHTML = fakeSending ? `<span class="sending-dot" aria-hidden="true"></span>Enviando...` : text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  sendBtn.addEventListener('click', ()=>{
    if (!activeProfile) { flashSelectProfile(); return; }
    const txt = composeInput.value.trim();
    if (!txt) { shake(composeInput); return; }
    if (sending) return; // prevent double click
    // simulate sending flow but block for non-premium
    sending = true;
    appendMessage('', true, true);
    setTimeout(()=>{
      // remove the "enviando" element
      const last = messagesEl.querySelector('.msg.me:last-child');
      if (last) last.remove();
      if (!premium){
        // show premium modal and a toast
        appendMessage('Mensagens completas desbloqueadas somente no Premium. Toque para assinar.', false);
        showPremiumModal();
      } else {
        appendMessage(txt, true);
        // simulate auto-reply
        setTimeout(()=> appendMessage('Obrigado! Vou responder em breve 😊', false), 900);
      }
      composeInput.value = '';
      sending = false;
    }, 1200);
  });

  // attachments simulate
  attachBtn.addEventListener('click', ()=>{
    if (!activeProfile){ flashSelectProfile(); return; }
    showPremiumModal();
  });
  micBtn.addEventListener('click', ()=>{
    if (!activeProfile){ flashSelectProfile(); return; }
    // show small pseudo-record UI then premium
    showToast('Gravando... (disponível no Premium)');
    setTimeout(()=> showPremiumModal(), 1000);
  });

  // Premium modal logic
  function showPremiumModal(){
    overlayBack.classList.add('show');
    overlayBack.style.zIndex = 11990;
    premiumModal.classList.add('show');
    overlayBack.classList.add('show');
    overlayBack.setAttribute('aria-hidden','false');
    premiumModal.setAttribute('aria-hidden','false');
  }
  function hidePremiumModal(){
    premiumModal.classList.remove('show');
    overlayBack.classList.remove('show');
    overlayBack.setAttribute('aria-hidden','true');
    premiumModal.setAttribute('aria-hidden','true');
  }
  buyPremium.addEventListener('click', ()=>{
    // simulate redirect/flow
    hidePremiumModal();
    showToast('Redirecionando para assinatura…');
    setTimeout(()=> window.location.href = 'https://frameag.com/premium', 900);
  });
  closePremium.addEventListener('click', hidePremiumModal);
  overlayBack.addEventListener('click', hidePremiumModal);

  // small helpers
  function showToast(msg, time=2000){
    // lightweight toast using alert fallback for environments without CSS injection
    const t = document.createElement('div');
    t.style.position='fixed'; t.style.right='18px'; t.style.top='18px'; t.style.zIndex=13000;
    t.style.padding='10px 14px'; t.style.borderRadius='12px'; t.style.background='linear-gradient(135deg,#AB865B,#D3AD83)';
    t.style.color='#111'; t.style.fontWeight=700; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateY(-6px)'; }, time-300);
    setTimeout(()=> t.remove(), time);
  }

  function flashSelectProfile(){
    // quick visual hint
    const el = document.querySelector('.fc-list');
    el.animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(0)'}],{duration:260,iterations:1});
    showToast('Selecione um perfil à esquerda');
  }

  function shake(el){
    el.animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}],{duration:260,iterations:1});
  }

  // initial small UX niceties
  document.querySelectorAll('.profile')[0]?.click();

  // make "locked" items visually blurred a bit (already styled)
  // also add a small behavior: when scrolling list, show a subtle top indicator
  const profilesContainer = document.querySelector('.profiles');
  profilesContainer.addEventListener('scroll', ()=>{
    // if scrolled to bottom, show toast suggestion
    if (profilesContainer.scrollTop + profilesContainer.clientHeight >= profilesContainer.scrollHeight - 8) {
      // do nothing heavy
    }
  });

  // Accessibility: keyboard enter to send
  composeInput.addEventListener('keydown', (e)=> {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendBtn.click(); }
  });

  // small close X in header: hide entire widget (keeps code minimal)
  document.querySelector('.small-x').addEventListener('click', ()=> {
    const rootEl = document.getElementById('framechat-root');
    rootEl.style.transition='all .25s'; rootEl.style.opacity='0'; setTimeout(()=>rootEl.remove(),250);
  });

  // Expose a small debug object (useful during dev)
  window.FrameChat = {
    openChat, showPremiumModal, setPremium: (v)=>{ premium = !!v; showToast('Premium: '+(v? 'ON':'OFF')); }
  };

})();