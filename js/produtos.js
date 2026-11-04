// ===== Cabeçalho (rolagem e menu mobile) =====
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll);
onScroll();

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// ===== Conteúdo dos produtos =====
// pendente: true  -> dado que só a padaria sabe; aparece como "a confirmar" até ser preenchido.
// fotos: lista de imagens extras (a galeria só aparece quando há mais de uma foto no total).
const FICHA_COMUM = [
  { rotulo: 'Alérgenos', pendente: true },
];

const CONSERVACAO = 'Todos os nossos produtos duram por volta de 3 dias guardados na geladeira. Se quiser guardar por mais tempo, também podem ser congelados.';

const PRODUTOS = [
  {
    id: 'pao-artesano-simples',
    curto: 'Artesano Simples',
    dicas: [
      'Fatie antes de congelar e retire só as fatias que for consumir.',
      'Descongele em temperatura ambiente e aqueça na torradeira ou no forno para devolver a maciez e a casca.',
    ],
    cat: 'Pães Artesanais',
    nome: 'Pão Artesano Simples',
    bg: '#EBDCC7',
    foto: 'assets/img/produtos/pao-artesano-simples.jpg',
    fotos: [],
    sobre: 'Um pão para o dia a dia: massa enriquecida com ovo e tangzong, feita para ser macia e leve. Casca fina, miolo fofo e um sabor que combina com tudo, do café da manhã ao lanche da tarde.',
    origemTitulo: 'Tangzong: técnica de origem asiática',
    origem: 'O tangzong (também escrito tangzhong) é uma técnica de panificação de origem asiática, muito ligada ao pão de leite japonês, o shokupan. Parte da farinha é cozida com líquido antes de entrar na massa, o que faz o pão reter muito mais umidade e ficar macio por mais tempo.',
    ficha: [
      { rotulo: 'Peso', valor: '350/400g' },
      { rotulo: 'Categoria', valor: 'Pão artesanal enriquecido' },
      { rotulo: 'Técnica', valor: 'Tangzong' },
      { rotulo: 'Massa', valor: 'Enriquecida com ovo' },
      { rotulo: 'Textura', valor: 'Miolo macio e muito leve, casca fina' },
      ...FICHA_COMUM,
    ],
  },
  {
    id: 'pao-artesano-calabresa',
    curto: 'Artesano Calabresa',
    dicas: [
      'Aqueça por alguns minutos no forno antes de servir: o aroma da calabresa volta a aparecer.',
      'Fatie antes de congelar para descongelar só o que for comer.',
    ],
    cat: 'Pães Artesanais',
    nome: 'Pão Artesano Calabresa',
    bg: '#E9CFC0',
    foto: 'assets/img/produtos/pao-artesano-calabresa.jpg',
    fotos: [],
    sobre: 'O mesmo pão macio da linha, agora com calabresa moída espalhada pela massa. O sabor defumado é suave e se mistura ao miolo aveludado: serve de lanche e de acompanhamento, e costuma desaparecer rápido.',
    origemTitulo: 'Calabresa: da Itália para o Brasil',
    origem: 'A calabresa brasileira é inspirada nas linguiças da Calábria, região do sul da Itália, e chegou ao país com a imigração italiana. Aqui ela vai moída dentro da massa, que também leva tangzong, técnica de origem asiática que deixa o miolo macio.',
    ficha: [
      { rotulo: 'Peso', valor: '350/400g' },
      { rotulo: 'Categoria', valor: 'Pão artesanal enriquecido' },
      { rotulo: 'Técnica', valor: 'Tangzong' },
      { rotulo: 'Recheio', valor: 'Calabresa moída na massa' },
      { rotulo: 'Textura', valor: 'Miolo aveludado, sabor defumado suave' },
      ...FICHA_COMUM,
    ],
  },
  {
    id: 'pao-artesano-cacau',
    curto: 'Artesano Cacau',
    dicas: [
      'Aquecer a fatia de leve deixa o chocolate macio e o aroma de laranja mais presente.',
      'Combina com manteiga ou queijo cremoso.',
    ],
    cat: 'Pães Artesanais',
    nome: 'Pão Artesano de Cacau e Raspas de Laranja',
    bg: '#D9BB99',
    foto: 'assets/img/produtos/pao-artesano-cacau.jpg',
    fotos: [],
    sobre: 'Cacau em pó na massa, raspas de laranja e gotas de chocolate ao leite: um pão que fica entre o doce e o pão de café da manhã. O aroma cítrico chega primeiro, e o chocolate aparece em cada fatia.',
    origemTitulo: 'Cacau e laranja: uma dupla clássica',
    origem: 'O cacau é originário das Américas, e a combinação com laranja é uma das mais tradicionais da confeitaria e da panificação. Na Sankofa, a dupla encontra o tangzong, técnica de origem asiática que deixa o miolo macio.',
    ficha: [
      { rotulo: 'Peso', valor: '350/400g' },
      { rotulo: 'Categoria', valor: 'Pão artesanal enriquecido' },
      { rotulo: 'Técnica', valor: 'Tangzong' },
      { rotulo: 'Sabores', valor: 'Cacau, laranja e chocolate ao leite' },
      { rotulo: 'Textura', valor: 'Miolo macio, aroma cítrico' },
      ...FICHA_COMUM,
    ],
  },
  {
    id: 'focaccia-mussarela-tomate',
    curto: 'Mussarela e Tomate',
    dicas: [
      'Aqueça no forno ou na airfryer por alguns minutos para a borda voltar a ficar crocante.',
      'Evite o micro-ondas, que deixa a massa borrachuda.',
    ],
    cat: 'Focaccias',
    nome: 'Focaccia Pizza - Mussarela com Tomate Cereja',
    bg: '#EBD3B5',
    foto: 'assets/img/produtos/focaccia-mussarela-tomate.jpg',
    fotos: [],
    sobre: 'Uma focaccia com jeito de pizza: base leve por dentro e crocante por fora, coberta com mussarela derretida e tomates cereja assados, que trazem frescor e acidez a cada mordida.',
    origemTitulo: 'Focaccia: pão tradicional italiano',
    origem: 'A focaccia é um pão tradicional italiano, famoso na região da Ligúria. O nome vem do latim panis focacius, o pão assado na lareira. Coberta à moda das pizzas, ela lembra as pizzas em tabuleiro, muito comuns na Itália.',
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 250g' },
      { rotulo: 'Categoria', valor: 'Focaccia' },
      { rotulo: 'Fermentação', valor: 'Longa' },
      { rotulo: 'Cobertura', valor: 'Mussarela e tomate cereja assado' },
      { rotulo: 'Textura', valor: 'Leve por dentro, crocante por fora' },
      ...FICHA_COMUM,
    ],
  },
  {
    id: 'focaccia-pepperoni-mussarela',
    curto: 'Pepperoni',
    dicas: [
      'Aqueça no forno ou na airfryer por alguns minutos para a borda voltar a ficar crocante.',
      'Evite o micro-ondas, que deixa a massa borrachuda.',
    ],
    cat: 'Focaccias',
    nome: 'Focaccia Pizza - Pepperoni com Mussarela',
    bg: '#E6C4A4',
    foto: 'assets/img/produtos/focaccia-pepperoni-mussarela.jpg',
    fotos: [],
    sobre: 'Base macia e aerada, coberta com mussarela e pepperoni que assam juntos até a borda dourar. Um clássico reinventado com o cuidado da nossa massa.',
    origemTitulo: 'Pepperoni: um clássico ítalo-americano',
    origem: 'O pepperoni é um salame de origem ítalo-americana, muito popular nas pizzas dos Estados Unidos. Aqui ele encontra a focaccia, pão tradicional italiano famoso na região da Ligúria.',
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 250g' },
      { rotulo: 'Categoria', valor: 'Focaccia' },
      { rotulo: 'Fermentação', valor: 'Longa' },
      { rotulo: 'Cobertura', valor: 'Mussarela e pepperoni' },
      { rotulo: 'Textura', valor: 'Macia e aerada, borda dourada' },
      ...FICHA_COMUM,
    ],
  },
  {
    id: 'focaccia-parmesao-alho',
    curto: 'Parmesão e Alho',
    dicas: [
      'Aqueça no forno ou na airfryer por alguns minutos para o parmesão e o alho voltarem a perfumar.',
      'Evite o micro-ondas, que deixa a massa borrachuda.',
    ],
    cat: 'Focaccias',
    nome: 'Focaccia - Parmesão com Alho',
    bg: '#CFD2B0',
    foto: 'assets/img/produtos/focaccia-parmesao-alho.jpg',
    fotos: [],
    sobre: 'Simples e direta: alho na massa de fermentação longa e, por cima, alho frito e parmesão generoso. Uma focaccia intensa, aromática e viciante.',
    origemTitulo: 'Parmesão: tradição da Emília-Romanha',
    origem: 'O queijo parmesão tem origem na região italiana da Emília-Romanha, onde é produzido o Parmigiano Reggiano. No Brasil, o nome também é usado para queijos duros inspirados nele. A focaccia, por sua vez, é um pão tradicional da Ligúria.',
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 250g' },
      { rotulo: 'Categoria', valor: 'Focaccia' },
      { rotulo: 'Fermentação', valor: 'Longa' },
      { rotulo: 'Cobertura', valor: 'Alho frito e parmesão' },
      { rotulo: 'Sabor', valor: 'Intenso e aromático' },
      ...FICHA_COMUM,
    ],
  },
  {
    id: 'focaccia-cacau-chocolate',
    curto: 'Cacau e Chocolate',
    dicas: [
      'Aqueça rapidamente no forno para o chocolate voltar a ficar macio.',
      'Evite o micro-ondas, que deixa a massa borrachuda.',
    ],
    cat: 'Focaccias',
    nome: 'Focaccia Cacau com Chocolate ao Leite',
    bg: '#D8C2AE',
    foto: 'assets/img/produtos/focaccia-cacau-chocolate.jpg',
    fotos: [],
    sobre: 'A mesma fermentação longa das focaccias salgadas, aqui como base para cacau na massa e pedaços de chocolate ao leite derretido. Doce, densa e surpreendente: pão e sobremesa em uma coisa só.',
    origemTitulo: 'Focaccia doce: uma variação moderna',
    origem: 'A focaccia é um pão tradicional italiano, em geral salgado. A versão doce, com cacau e chocolate, é uma variação moderna da receita, que mantém a fermentação longa e os alvéolos característicos.',
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 250g' },
      { rotulo: 'Categoria', valor: 'Focaccia doce' },
      { rotulo: 'Fermentação', valor: 'Longa' },
      { rotulo: 'Sabores', valor: 'Cacau e chocolate ao leite' },
      { rotulo: 'Textura', valor: 'Doce, densa e macia' },
      ...FICHA_COMUM,
    ],
  },
];

// ===== Tela =====
const indice = document.getElementById('indice');
const produtoEl = document.getElementById('produto');
const main = document.getElementById('info');
const total = PRODUTOS.length;
let atual = -1;

function montarIndice() {
  let html = '';
  PRODUTOS.forEach((p, i) => {
    if (i > 0 && PRODUTOS[i - 1].cat !== p.cat) html += '<span class="info-sep" aria-hidden="true"></span>';
    html += `<button type="button" class="info-item" data-i="${i}" aria-label="${p.nome}"><span class="info-thumb"><img src="${p.foto}" alt=""></span><span class="info-nome">${p.curto}</span></button>`;
  });
  indice.innerHTML = html;
  indice.addEventListener('click', (e) => {
    const b = e.target.closest('.info-item');
    if (b) ir(Number(b.dataset.i));
  });
}

function linhaFicha(f) {
  return f.pendente
    ? `<div class="ficha-linha"><dt>${f.rotulo}</dt><dd class="pendente">a confirmar</dd></div>`
    : `<div class="ficha-linha"><dt>${f.rotulo}</dt><dd>${f.valor}</dd></div>`;
}

function render(i) {
  const p = PRODUTOS[i];
  const fotos = [p.foto, ...p.fotos];
  const galeria = fotos.length > 1
    ? `<div class="info-galeria">${fotos.map((f, k) => `<button type="button" class="info-galeria-item${k === 0 ? ' ativa' : ''}" data-src="${f}" aria-label="Foto ${k + 1}"><img src="${f}" alt=""></button>`).join('')}</div>`
    : '';

  produtoEl.innerHTML = `
    <div class="container info-grid">
      <div class="info-foto-col">
        <figure class="info-foto"><img id="fotoPrincipal" src="${p.foto}" alt="${p.nome}"></figure>
        ${galeria}
      </div>
      <div class="info-texto">
        <p class="eyebrow">${p.cat}</p>
        <h2>${p.nome}</h2>

        <section class="info-bloco">
          <h3>Sobre</h3>
          <p>${p.sobre}</p>
        </section>

        <section class="info-bloco">
          <h3>Origem</h3>
          <p class="info-origem-titulo">${p.origemTitulo}</p>
          <p>${p.origem}</p>
        </section>

        <section class="info-bloco">
          <h3>Ficha técnica</h3>
          <dl class="ficha">${p.ficha.map(linhaFicha).join('')}</dl>
        </section>

        <section class="info-bloco">
          <h3>Conservação e dicas</h3>
          <p>${CONSERVACAO}</p>
          <ul class="dicas">${p.dicas.map((d) => `<li>${d}</li>`).join('')}</ul>
        </section>

        <div class="info-cta">
          <a class="btn btn-primary" href="index.html#cardapio">Ver no cardápio</a>
        </div>
      </div>
    </div>`;

  produtoEl.querySelectorAll('.info-galeria-item').forEach((b) => {
    b.addEventListener('click', () => {
      document.getElementById('fotoPrincipal').src = b.dataset.src;
      produtoEl.querySelectorAll('.info-galeria-item').forEach((x) => x.classList.toggle('ativa', x === b));
    });
  });
}

function ir(i, { rolar = true } = {}) {
  if (i < 0 || i >= total || i === atual) return;
  const primeira = atual === -1;
  atual = i;
  const p = PRODUTOS[i];
  if (history.replaceState) history.replaceState(null, '', '#' + p.id);
  main.style.setProperty('--bg', p.bg);
  indice.querySelectorAll('.info-item').forEach((b) => b.classList.toggle('ativo', Number(b.dataset.i) === i));
  const ativo = indice.querySelector('.info-item.ativo');
  if (ativo) ativo.scrollIntoView({ inline: 'center', block: 'nearest', behavior: primeira ? 'auto' : 'smooth' });

  if (primeira) { render(i); return; }
  produtoEl.classList.add('trocando');
  setTimeout(() => {
    render(i);
    produtoEl.classList.remove('trocando');
    if (rolar) {
      const topo = indice.getBoundingClientRect().top + window.scrollY - 110;
      if (window.scrollY > topo) window.scrollTo({ top: topo, behavior: 'smooth' });
    }
  }, 220);
}

function indiceDoHash() {
  const id = location.hash.replace('#', '');
  const i = PRODUTOS.findIndex((p) => p.id === id);
  return i >= 0 ? i : 0;
}

montarIndice();
ir(indiceDoHash());
window.addEventListener('hashchange', () => ir(indiceDoHash()));
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') ir(atual - 1);
  if (e.key === 'ArrowRight') ir(atual + 1);
});
