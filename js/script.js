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

// Cardápio: destaca a categoria visível enquanto rola
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.cardapio-panel');
if ('IntersectionObserver' in window && panels.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const panel = entry.target.dataset.panel;
      tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === panel));
    });
  }, { rootMargin: '-170px 0px -60% 0px' });
  panels.forEach(p => spy.observe(p));
}

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

// Banner rotativo (cardápio)
const bannerTrack = document.getElementById('bannerTrack');
if (bannerTrack) {
  const slides = Array.from(bannerTrack.children);
  const dotsWrap = document.getElementById('bannerDots');
  const prevBtn = document.getElementById('bannerPrev');
  const nextBtn = document.getElementById('bannerNext');
  const bannerEl = document.getElementById('cardapioBanner');
  let current = 0;
  let autoplayId = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir para o banner ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    bannerTrack.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(next, 5000);
  }
  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  bannerEl.addEventListener('mouseenter', stopAutoplay);
  bannerEl.addEventListener('mouseleave', startAutoplay);

  if (slides.length > 1) startAutoplay();
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

renderCart();
