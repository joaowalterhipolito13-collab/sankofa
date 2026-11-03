// Header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  });
});

// Vídeo de fundo da marca: só carrega e toca quando a seção está perto da tela
const marcaVideo = document.getElementById('marcaVideo');
if (marcaVideo) {
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          marcaVideo.play().catch(() => {});
        } else {
          marcaVideo.pause();
        }
      });
    }, { rootMargin: '200px 0px' }).observe(marcaVideo.parentElement);
  } else {
    marcaVideo.play().catch(() => {});
  }
}

// Cardápio: carrossel de produtos (arrastar, setas, abas, inclinação e fundo que muda)
(() => {
  const track = document.getElementById('carrosselTrack');
  if (!track) return;
  const section = document.getElementById('cardapio');
  const cards = Array.from(track.querySelectorAll('.produto-card'));
  const tabs = Array.from(document.querySelectorAll('#cardapioTabs .tab-btn'));
  const prevBtn = document.getElementById('carrosselPrev');
  const nextBtn = document.getElementById('carrosselNext');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(c => { c.style.top = c.dataset.y + 'px'; });

  const centerOf = (card) => card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  const goTo = (card) => track.scrollTo({ left: centerOf(card), behavior: reduceMotion ? 'auto' : 'smooth' });

  tabs.forEach(btn => {
    btn.addEventListener('click', () => goTo(cards.find(c => c.dataset.cat === btn.dataset.cat)));
  });

  const dotsWrap = document.getElementById('carrosselDots');
  const dots = cards.map((card) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carrossel-dot';
    dot.tabIndex = -1;
    dot.addEventListener('click', () => goTo(card));
    dotsWrap.appendChild(dot);
    return dot;
  });

  let activeIndex = 0;
  prevBtn.addEventListener('click', () => goTo(cards[Math.max(0, activeIndex - 1)]));
  nextBtn.addEventListener('click', () => goTo(cards[Math.min(cards.length - 1, activeIndex + 1)]));

  // arrastar com o mouse (só começa depois de mover um pouco, para não atrapalhar os botões do cartão)
  let pressed = false, dragging = false, dragged = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    pressed = true; dragged = false;
    startX = e.clientX; startScroll = track.scrollLeft;
  });
  track.addEventListener('pointermove', (e) => {
    if (!pressed) return;
    const dx = e.clientX - startX;
    if (!dragging && Math.abs(dx) > 6) {
      dragging = true; dragged = true;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
    }
    if (dragging) track.scrollLeft = startScroll - dx;
  });
  const endDrag = () => { pressed = false; dragging = false; track.classList.remove('dragging'); };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('click', (e) => {
    if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
  }, true);

  // animação: cartão do centro se endireita e cresce; o resto balança conforme a velocidade
  let lastScroll = track.scrollLeft;
  let tilt = 0;
  let running = false;

  function update() {
    const vel = track.scrollLeft - lastScroll;
    lastScroll = track.scrollLeft;
    const target = reduceMotion ? 0 : Math.max(-14, Math.min(14, vel * 0.7));
    tilt += (target - tilt) * 0.14;

    const box = track.getBoundingClientRect();
    const center = box.left + box.width / 2;
    let best = 0, bestFocus = -1;

    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - center);
      const focus = Math.max(0, 1 - dist / (r.width * 1.1));
      const rot = Number(card.dataset.rot) * (1 - 0.85 * focus) + tilt * (0.5 + 0.5 * (1 - focus));
      card.style.rotate = rot.toFixed(2) + 'deg';
      card.style.scale = (1 + 0.1 * focus).toFixed(3);
      card.style.zIndex = Math.round(focus * 10);
      if (focus > bestFocus) { bestFocus = focus; best = i; }
    });

    if (best !== activeIndex || !section.style.getPropertyValue('--bg')) {
      activeIndex = best;
      const c = cards[best];
      section.style.setProperty('--bg', c.dataset.bg);
      tabs.forEach(b => b.classList.toggle('active', b.dataset.cat === c.dataset.cat));
      dots.forEach((d, i) => d.classList.toggle('active', i === best));
      prevBtn.disabled = best === 0;
      nextBtn.disabled = best === cards.length - 1;
    }
  }

  function loop() {
    if (!running) return;
    update();
    requestAnimationFrame(loop);
  }

  update();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting;
      if (visible && !running) { running = true; requestAnimationFrame(loop); }
      if (!visible) running = false;
    }).observe(track);
  } else {
    running = true;
    requestAnimationFrame(loop);
  }
})();

// Mobile: mostra as abas como rodapé fixo só enquanto a seção Cardápio está na tela
const cardapioSection = document.getElementById('cardapio');
const cardapioTabsEl = document.getElementById('cardapioTabs');
if ('IntersectionObserver' in window && cardapioSection && cardapioTabsEl) {
  const tabsVisibility = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      cardapioTabsEl.classList.toggle('tabs-visible', entry.isIntersecting);
    });
  });
  tabsVisibility.observe(cardapioSection);
}

// Carrinho de pedidos
const WHATSAPP_NUMBER = '5517991729955';

const cartFab = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartFooterEl = document.getElementById('cartFooter');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const cartWhatsappLink = document.getElementById('cartWhatsapp');
const cartContinue = document.getElementById('cartContinue');

const formatPrice = (value) => 'R$ ' + value.toFixed(2).replace('.', ',');

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('sankofa-cart')) || [];
  } catch {
    return [];
  }
}
function saveCart() {
  localStorage.setItem('sankofa-cart', JSON.stringify(cart));
}

let cart = loadCart();

function addToCart(id, name, price) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart();
  renderCart();
  bumpCount();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function bumpCount() {
  cartCountEl.classList.remove('bump');
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add('bump');
}

function renderCart() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  cartCountEl.textContent = totalQty;
  cartTotalEl.textContent = formatPrice(totalPrice);

  const isEmpty = cart.length === 0;
  cartEmptyEl.style.display = isEmpty ? 'block' : 'none';
  cartFooterEl.style.display = isEmpty ? 'none' : 'block';

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-item-price">${formatPrice(item.price)} cada</span>
      </div>
      <div class="cart-item-qty">
        <button class="cart-qty-btn" data-action="dec" aria-label="Diminuir quantidade">−</button>
        <span>${item.qty}</span>
        <button class="cart-qty-btn" data-action="inc" aria-label="Aumentar quantidade">+</button>
      </div>
      <button class="cart-item-remove" data-action="remove" aria-label="Remover item">×</button>
    </div>
  `).join('');

  if (!isEmpty) {
    const linhas = cart.map(i => `${i.qty}x ${i.name} - ${formatPrice(i.qty * i.price)}`).join('\n');
    const mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n${linhas}\n\nTotal: ${formatPrice(totalPrice)}`;
    cartWhatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
  }
}

document.querySelectorAll('.produto-add').forEach(btn => {
  btn.addEventListener('click', () => {
    addToCart(btn.dataset.id, btn.dataset.name, parseFloat(btn.dataset.price));
    openCart();
  });
});

cartItemsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = btn.closest('.cart-item').dataset.id;
  if (btn.dataset.action === 'inc') changeQty(id, 1);
  if (btn.dataset.action === 'dec') changeQty(id, -1);
  if (btn.dataset.action === 'remove') removeItem(id);
});

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

cartFab.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
cartContinue.addEventListener('click', closeCart);

cartWhatsappLink.addEventListener('click', () => {
  cart = [];
  saveCart();
  renderCart();
  closeCart();
});

renderCart();

// Modal informativo (Tangzong)
const infoOverlay = document.getElementById('infoOverlay');
const tangzongModal = document.getElementById('tangzongModal');
const tangzongClose = document.getElementById('tangzongClose');

function openInfoModal(modal) {
  modal.classList.add('open');
  infoOverlay.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
function closeInfoModal() {
  document.querySelectorAll('.info-modal.open').forEach(m => {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
  });
  infoOverlay.classList.remove('open');
}

document.querySelectorAll('.tangzong-word').forEach(btn => {
  btn.addEventListener('click', () => openInfoModal(tangzongModal));
});
tangzongClose.addEventListener('click', closeInfoModal);

// Pop-up automático: aviso das fornadas (uma vez por sessão)
const welcomeModal = document.getElementById('welcomeModal');
const welcomeClose = document.getElementById('welcomeClose');

welcomeClose.addEventListener('click', closeInfoModal);

// Clicar fora só fecha o Tangzong; o aviso de fornadas exige fechar pelo "×"
// pra não sumir sozinho com um toque acidental na tela.
infoOverlay.addEventListener('click', () => {
  if (welcomeModal.classList.contains('open')) return;
  closeInfoModal();
});

if (!sessionStorage.getItem('sankofa-welcome-seen')) {
  setTimeout(() => {
    openInfoModal(welcomeModal);
    sessionStorage.setItem('sankofa-welcome-seen', '1');
  }, 800);
}
