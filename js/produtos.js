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

// ===== Conteúdo dos produtos (fichas oficiais da Sankofa) =====
// sobre e origem: lista de parágrafos.
// ingredientes: lista preliminar, em ordem decrescente de quantidade (sem quantidades).
// fotos: imagens extras (a galeria só aparece quando há mais de uma foto no total).
const CONSERVACAO = 'Todos os nossos produtos duram aproximadamente 3 dias quando armazenados na geladeira. Para conservar por mais tempo, também podem ser congelados.';

const PRODUTOS = [
  {
    id: 'pao-artesano-simples',
    curto: 'Artesano Simples',
    cat: 'Pães Artesanais',
    nome: 'Pão Artesano Simples',
    bg: '#EBDCC7',
    foto: 'assets/img/produtos/pao-artesano-simples.jpg',
    fotos: [],
    sobre: [
      'Um pão para o dia a dia: massa enriquecida com ovo e leite, preparada com a técnica Tangzhong para ser macia e leve. Casca fina, miolo fofo e sabor delicado que combina com tudo, do café da manhã ao lanche da tarde.',
    ],
    origemTitulo: 'Tangzhong: técnica de origem asiática',
    origem: [
      'O Tangzhong é uma técnica de panificação de origem asiática, popularizada em pães macios como o shokupan japonês. Consiste em aquecer parte da farinha com um líquido até formar uma mistura gelatinizada, incorporada depois à massa. Esse processo favorece a retenção de água e contribui para um miolo macio, leve e úmido.',
    ],
    ficha: [
      { rotulo: 'Peso', valor: '350 a 400 g' },
      { rotulo: 'Categoria', valor: 'Pão artesanal enriquecido' },
      { rotulo: 'Técnica', valor: 'Tangzhong' },
      { rotulo: 'Massa', valor: 'Enriquecida com ovo e leite' },
      { rotulo: 'Textura', valor: 'Miolo macio e muito leve, casca fina' },
      { rotulo: 'Alérgenos', valor: 'Contém trigo, leite, ovo e derivados de soja. Contém glúten.' },
    ],
    ingredientes: 'Farinha de trigo, água, ovo, açúcar, óleo de soja, leite em pó, vinagre de álcool, sal e fermento biológico seco.',
    dicas: [
      'Corte em fatias antes de congelar, para retirar apenas a quantidade desejada.',
      'Leve as fatias congeladas diretamente à torradeira ou ao forno para aquecer e recuperar a maciez do miolo e a textura da casca.',
    ],
  },
  {
    id: 'pao-artesano-calabresa',
    curto: 'Artesano Calabresa',
    cat: 'Pães Artesanais',
    nome: 'Pão Artesano Calabresa',
    bg: '#E9CFC0',
    foto: 'assets/img/produtos/pao-artesano-calabresa.jpg',
    fotos: [],
    sobre: [
      'O nosso Artesano de Calabresa combina a maciez característica da linha com o sabor marcante da calabresa moída, distribuída por toda a massa. Preparado com a técnica Tangzhong, tem miolo leve e aveludado, casca fina e um toque defumado que aparece a cada fatia. Uma opção para o café da manhã, lanche da tarde ou para acompanhar uma refeição.',
    ],
    origemTitulo: 'Calabresa: da tradição italiana à panificação brasileira',
    origem: [
      'A linguiça calabresa brasileira tem inspiração nas tradições de embutidos da Calábria, região do sul da Itália. Com o tempo, ganhou características próprias e se tornou um ingrediente muito presente na culinária brasileira.',
      'Na Sankofa, ela é incorporada à massa do nosso Artesano, que utiliza o Tangzhong, técnica de origem asiática em que parte da farinha é aquecida com líquido antes de entrar na massa. Essa combinação proporciona um pão de miolo macio e sabor levemente defumado.',
    ],
    ficha: [
      { rotulo: 'Peso', valor: '350 a 400 g' },
      { rotulo: 'Categoria', valor: 'Pão artesanal enriquecido' },
      { rotulo: 'Técnica', valor: 'Tangzhong' },
      { rotulo: 'Massa', valor: 'Enriquecida com ovo' },
      { rotulo: 'Recheio', valor: 'Calabresa moída incorporada à massa' },
      { rotulo: 'Textura', valor: 'Miolo macio e aveludado, casca fina' },
      { rotulo: 'Sabor', valor: 'Salgado, com toque defumado' },
      { rotulo: 'Alérgenos', valor: 'Contém trigo, leite, ovo e derivados de soja. Contém glúten.' },
    ],
    ingredientes: 'Farinha de trigo, calabresa, Tangzhong, água, ovo, açúcar, óleo de soja, leite em pó, vinagre de álcool, sal e fermento biológico seco.',
    dicas: [
      'Corte o pão em fatias antes de congelar e retire apenas a quantidade que deseja consumir.',
      'Não precisa descongelar antes! Leve as fatias diretamente ao forno ou à torradeira para aquecer e recuperar a maciez do miolo.',
      'Aquecer levemente antes de servir ajuda a realçar o aroma e o sabor da calabresa.',
    ],
  },
  {
    id: 'pao-artesano-cacau',
    curto: 'Artesano Cacau',
    cat: 'Pães Artesanais',
    nome: 'Pão Artesano de Cacau e Raspas de Laranja',
    bg: '#D9BB99',
    foto: 'assets/img/produtos/pao-artesano-cacau.jpg',
    fotos: [],
    sobre: [
      'Cacau em pó incorporado à massa, raspas frescas de laranja e chocolate ao leite que trazem um equilíbrio entre o doce, o sabor intenso do cacau e as notas cítricas.',
      'Preparado com a técnica Tangzhong, apresenta um miolo macio e leve, com aroma marcante de laranja e pedaços de chocolate em cada fatia. Uma combinação que vai do café da manhã ao lanche da tarde, perfeita para acompanhar um café.',
    ],
    origemTitulo: 'Cacau e laranja: uma combinação clássica',
    origem: [
      'Originário das Américas, o cacau conquistou a confeitaria mundial e encontrou nas frutas cítricas uma de suas combinações mais apreciadas. A laranja complementa a intensidade do cacau com seu aroma fresco e levemente ácido.',
      'Na Sankofa, essa combinação encontra o Tangzhong, técnica de panificação de origem asiática que utiliza parte da farinha aquecida com líquido para aumentar a retenção de umidade da massa. O resultado é um pão de miolo macio, que reúne sabores tradicionais da confeitaria em uma receita artesanal.',
    ],
    ficha: [
      { rotulo: 'Peso', valor: '350 a 400 g' },
      { rotulo: 'Categoria', valor: 'Pão artesanal enriquecido' },
      { rotulo: 'Técnica', valor: 'Tangzhong' },
      { rotulo: 'Massa', valor: 'Enriquecida com ovo e leite' },
      { rotulo: 'Sabores', valor: 'Cacau, raspas de laranja e chocolate ao leite' },
      { rotulo: 'Textura', valor: 'Miolo macio e leve, com pedaços de chocolate' },
      { rotulo: 'Alérgenos', valor: 'Contém trigo, leite, ovo e derivados de soja. Contém glúten.' },
    ],
    ingredientes: 'Farinha de trigo, chocolate ao leite forneável, Tangzhong, água, ovo, cacau em pó, açúcar, açúcar mascavo, raspas de laranja, óleo de soja, leite em pó, vinagre de álcool, sal e fermento biológico seco.',
    dicas: [
      'Corte o pão em fatias antes de congelar e retire apenas a quantidade que deseja consumir.',
      'Não precisa descongelar antes! Leve diretamente ao forno ou à torradeira para aquecer e recuperar a maciez do miolo.',
      'Aquecer levemente também ajuda a deixar o chocolate mais macio e realçar o aroma da laranja.',
    ],
  },
  {
    id: 'focaccia-mussarela-tomate',
    curto: 'Mussarela e Tomate',
    cat: 'Focaccias',
    nome: 'Focaccia Pizza - Mussarela com Tomate Cereja',
    bg: '#EBD3B5',
    foto: 'assets/img/produtos/focaccia-mussarela-tomate.jpg',
    fotos: [],
    sobre: [
      'Uma focaccia com jeito de pizza, feita com massa de fermentação natural, leve e aerada por dentro, com uma casca delicadamente crocante. Coberta com molho de tomate, mussarela derretida e tomates cereja que assam junto à massa, recebe uma finalização com azeite extravirgem, realçando os sabores e aromas. Perfeita para um lanche mais completo, para compartilhar ou como uma refeição.',
    ],
    origemTitulo: 'Focaccia: uma tradição italiana reinventada',
    origem: [
      'A focaccia é um pão tradicional italiano, especialmente associado à região da Ligúria. Seu nome tem raízes no latim focus, relacionado ao fogo e ao preparo de pães assados próximos às brasas. Conhecida pela massa macia, pelos alvéolos e pela superfície dourada, a focaccia conquistou diferentes versões ao longo do tempo.',
      'Na Sankofa, reinterpretamos essa tradição em uma versão inspirada na pizza, utilizando fermentação natural com levain e uma cobertura de molho de tomate, mussarela e tomates cereja. O resultado reúne a leveza de um pão artesanal com os sabores de uma pizza.',
    ],
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 380 g' },
      { rotulo: 'Categoria', valor: 'Focaccia Pizza' },
      { rotulo: 'Fermentação', valor: 'Natural longa, com levain' },
      { rotulo: 'Massa', valor: 'Leve, macia e aerada' },
      { rotulo: 'Cobertura', valor: 'Molho de tomate, mussarela e tomate cereja' },
      { rotulo: 'Finalização', valor: 'Azeite extravirgem' },
      { rotulo: 'Textura', valor: 'Miolo aerado e exterior levemente crocante' },
      { rotulo: 'Alérgenos', valor: 'Contém trigo e leite. Contém glúten.' },
    ],
    ingredientes: 'Farinha de trigo, água, mussarela, extrato de tomate, fermento natural (levain), tomate cereja, azeite extravirgem e sal.',
    dicas: [
      'Para recuperar a textura, aqueça diretamente no forno ou na airfryer por alguns minutos, até o queijo derreter e a superfície voltar a ficar crocante.',
      'Para congelar, divida em porções e retire apenas a quantidade que deseja consumir.',
      'Evite o micro-ondas, pois pode deixar a massa borrachuda.',
    ],
  },
  {
    id: 'focaccia-pepperoni-mussarela',
    curto: 'Pepperoni',
    cat: 'Focaccias',
    nome: 'Focaccia Pizza - Pepperoni com Mussarela',
    bg: '#E6C4A4',
    foto: 'assets/img/produtos/focaccia-pepperoni-mussarela.jpg',
    fotos: [],
    sobre: [
      'Uma focaccia com inspiração nas pizzas clássicas, preparada com massa de fermentação natural, miolo macio e aerado e uma superfície delicadamente crocante.',
      'Coberta com molho de tomate, mussarela derretida e fatias de pepperoni, que assam juntas até ficarem levemente douradas, recebe uma finalização com azeite extravirgem.',
      'O resultado é uma combinação de sabores intensos, com o toque condimentado do pepperoni, a cremosidade do queijo e a leveza da nossa massa artesanal. Ideal para um lanche reforçado, jantar ou para compartilhar.',
    ],
    origemTitulo: 'Pepperoni: um clássico ítalo-americano',
    origem: [
      'O pepperoni surgiu nos Estados Unidos, inspirado nas tradições italianas de produção de salames e embutidos. Com seu sabor condimentado e característico, tornou-se um dos ingredientes mais populares das pizzas americanas.',
      'Na Sankofa, esse clássico encontra a focaccia, pão tradicional italiano especialmente associado à região da Ligúria.',
      'Nossa versão combina a fermentação natural com levain, responsável pelo desenvolvimento da massa, com uma cobertura inspirada na pizza de pepperoni. Uma união entre duas tradições gastronômicas, reinterpretada pela panificação artesanal.',
    ],
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 380 g' },
      { rotulo: 'Categoria', valor: 'Focaccia Pizza' },
      { rotulo: 'Fermentação', valor: 'Natural longa, com levain' },
      { rotulo: 'Massa', valor: 'Leve, macia e aerada' },
      { rotulo: 'Cobertura', valor: 'Molho de tomate, mussarela e pepperoni' },
      { rotulo: 'Finalização', valor: 'Azeite extravirgem' },
      { rotulo: 'Textura', valor: 'Miolo aerado, exterior levemente crocante e cobertura dourada' },
      { rotulo: 'Sabor', valor: 'Salgado, levemente condimentado' },
      { rotulo: 'Alérgenos', valor: 'Contém trigo e leite. Contém glúten.' },
    ],
    ingredientes: 'Farinha de trigo, água, mussarela, extrato de tomate, fermento natural (levain), pepperoni, azeite extravirgem e sal.',
    dicas: [
      'Para recuperar a textura, aqueça diretamente no forno ou na airfryer por alguns minutos, até o queijo derreter e a superfície voltar a ficar crocante.',
      'Se preferir congelar, divida em porções e retire apenas a quantidade que deseja consumir.',
      'Evite o micro-ondas, pois pode deixar a massa excessivamente macia e borrachuda.',
    ],
  },
  {
    id: 'focaccia-parmesao-alho',
    curto: 'Parmesão e Alho',
    cat: 'Focaccias',
    nome: 'Focaccia - Parmesão com Alho',
    bg: '#CFD2B0',
    foto: 'assets/img/produtos/focaccia-parmesao-alho.jpg',
    fotos: [],
    sobre: [
      'Uma focaccia que combina a intensidade do parmesão com o aroma irresistível do alho frito, ambos incorporados à massa artesanal de fermentação natural e também distribuídos pela superfície.',
      'Com miolo macio e aerado, exterior levemente crocante e finalização com azeite extravirgem, cada pedaço traz o sabor marcante do queijo e o toque aromático do alho, tanto por dentro quanto por fora. Perfeita para acompanhar refeições, servir como entrada ou saborear ainda quentinha.',
    ],
    origemTitulo: 'Parmesão e alho: sabores da tradição italiana',
    origem: [
      'O queijo parmesão tem suas raízes na região da Emília-Romanha, no norte da Itália, onde é produzido o tradicional Parmigiano Reggiano, conhecido por seu sabor intenso e processo de maturação. Já a focaccia é um pão tradicional italiano, especialmente associado à Ligúria, reconhecido por sua massa macia, superfície dourada e uso de azeite.',
      'Na Sankofa, reunimos essas referências em uma focaccia de fermentação natural com levain, incorporando parmesão e alho frito à massa e também à cobertura. Finalizada com azeite extravirgem, ela combina a tradição italiana com sabores intensos em cada pedaço.',
    ],
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 380 g' },
      { rotulo: 'Categoria', valor: 'Focaccia' },
      { rotulo: 'Fermentação', valor: 'Natural longa, com levain' },
      { rotulo: 'Massa', valor: 'Macia e aerada, com parmesão e alho frito incorporados' },
      { rotulo: 'Cobertura', valor: 'Parmesão e alho frito' },
      { rotulo: 'Finalização', valor: 'Azeite extravirgem' },
      { rotulo: 'Textura', valor: 'Miolo macio e exterior levemente crocante' },
      { rotulo: 'Sabor', valor: 'Intenso e aromático' },
      { rotulo: 'Alérgenos', valor: 'Contém trigo e leite. Contém glúten.' },
    ],
    ingredientes: 'Farinha de trigo, água, fermento natural (levain), queijo parmesão, azeite, alho frito e sal.',
    dicas: [
      'Aqueça diretamente no forno ou na airfryer por alguns minutos para recuperar a textura e realçar o aroma do parmesão e do alho.',
      'Para congelar, divida em porções e retire apenas a quantidade que deseja consumir.',
      'Evite o micro-ondas, pois pode deixar a massa borrachuda.',
    ],
  },
  {
    id: 'focaccia-cacau-chocolate',
    curto: 'Cacau e Chocolate',
    cat: 'Focaccias',
    nome: 'Focaccia Cacau com Chocolate ao Leite',
    bg: '#D8C2AE',
    foto: 'assets/img/produtos/focaccia-cacau-chocolate.jpg',
    fotos: [],
    sobre: [
      'Uma versão doce da nossa focaccia artesanal, preparada com cacau em pó incorporado à massa, açúcar mascavo e pedaços de chocolate ao leite distribuídos pelo interior. A fermentação natural com levain proporciona uma massa macia e aerada, enquanto o cacau traz intensidade e o chocolate acrescenta doçura e cremosidade a cada pedaço. Uma combinação entre pão e sobremesa, perfeita para acompanhar um café, saborear no lanche da tarde ou servir levemente aquecida, com o chocolate ainda mais macio.',
    ],
    origemTitulo: 'Focaccia doce: uma nova interpretação da tradição italiana',
    origem: [
      'A focaccia é um pão tradicional italiano, especialmente associado à região da Ligúria, conhecido pela massa aerada, pelo azeite e pela superfície característica. Embora suas versões salgadas sejam as mais conhecidas, também existem preparações doces de focaccia na tradição italiana, com diferentes ingredientes e sabores.',
      'Na Sankofa, essa tradição ganha uma interpretação com cacau e chocolate ao leite. A massa mantém a fermentação natural com levain, enquanto o cacau e o açúcar mascavo equilibram a intensidade e a doçura, criando uma focaccia com personalidade própria.',
    ],
    ficha: [
      { rotulo: 'Peso', valor: 'Aproximadamente 380 g' },
      { rotulo: 'Categoria', valor: 'Focaccia doce' },
      { rotulo: 'Fermentação', valor: 'Natural longa, com levain' },
      { rotulo: 'Massa', valor: 'Com cacau em pó e açúcar mascavo' },
      { rotulo: 'Recheio', valor: 'Chocolate ao leite incorporado à massa' },
      { rotulo: 'Textura', valor: 'Miolo macio e aerado; chocolate cremoso quando aquecido' },
      { rotulo: 'Sabores', valor: 'Cacau e chocolate ao leite' },
      { rotulo: 'Alérgenos', valor: 'Contém trigo, leite e derivados de soja. Contém glúten.' },
    ],
    ingredientes: 'Farinha de trigo, água, fermento natural (levain), chocolate ao leite forneável, cacau em pó, açúcar mascavo, azeite e sal.',
    dicas: [
      'Aqueça levemente no forno ou na airfryer para recuperar a maciez e deixar o chocolate mais cremoso.',
      'Para congelar, corte em porções e retire apenas a quantidade desejada.',
      'Não é necessário descongelar previamente; aqueça diretamente no forno ou na airfryer.',
      'Evite o micro-ondas, pois pode deixar a massa borrachuda.',
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

const paragrafos = (lista) => lista.map((t) => `<p>${t}</p>`).join('');
const linhaFicha = (f) => `<div class="ficha-linha"><dt>${f.rotulo}</dt><dd>${f.valor}</dd></div>`;

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
          ${paragrafos(p.sobre)}
        </section>

        <section class="info-bloco">
          <h3>Origem</h3>
          <p class="info-origem-titulo">${p.origemTitulo}</p>
          ${paragrafos(p.origem)}
        </section>

        <section class="info-bloco">
          <h3>Ficha técnica</h3>
          <dl class="ficha">${p.ficha.map(linhaFicha).join('')}</dl>
        </section>

        <section class="info-bloco">
          <h3>Ingredientes</h3>
          <p>${p.ingredientes}</p>
          <p class="info-nota">Lista preliminar, em ordem decrescente de quantidade.</p>
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
