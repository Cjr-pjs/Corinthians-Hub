export type HistoriaItem = {
  ano: string;
  titulo: string;
  descricao: string;
};

export type WallpaperItem = {
  titulo: string;
  descricao: string;
  src: string;
  alt: string;
  aspectRatio: string;
};

export type TrofeuItem = {
  nome: string;
  quantidade: number;
  categoria: string;
  destaque?: boolean;
  imagem: string;
  alt: string;
};

export type TrofeuResumoItem = {
  nome: string;
  quantidade: number;
  descricao: string;
};

export type IdolItem = {
  nome: string;
  epoca: string;
  foto: string;
  resumo: string;
};

export type RouteCardItem = {
  href: string;
  title: string;
  description: string;
  label: string;
};

function escapeText(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export function createSvgDataUri(
  title: string,
  subtitle: string,
  accent = "#ffffff",
  background = "#111111",
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" role="img" aria-label="${escapeText(title)}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#000000"/>
          <stop offset="100%" stop-color="${background}"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#bg)"/>
      <circle cx="600" cy="420" r="420" fill="url(#glow)"/>
      <g opacity="0.88" fill="none" stroke="${accent}" stroke-width="16">
        <path d="M335 940c95-186 200-282 265-282 65 0 170 96 265 282"/>
        <circle cx="600" cy="470" r="120"/>
        <path d="M470 630h260"/>
      </g>
      <text x="600" y="1110" text-anchor="middle" fill="#ffffff" font-family="Bebas Neue, Arial, sans-serif" font-size="142" letter-spacing="10">${escapeText(title)}</text>
      <text x="600" y="1195" text-anchor="middle" fill="#c7c7c7" font-family="Roboto Condensed, Arial, sans-serif" font-size="50" letter-spacing="4">${escapeText(subtitle)}</text>
      <g opacity="0.18" fill="#ffffff">
        <circle cx="180" cy="240" r="4"/>
        <circle cx="280" cy="156" r="3"/>
        <circle cx="960" cy="220" r="4"/>
        <circle cx="1040" cy="360" r="3"/>
        <circle cx="860" cy="1230" r="4"/>
        <circle cx="320" cy="1300" r="3"/>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function createPlayerPortrait(name: string, number: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" role="img" aria-label="${escapeText(name)}">
      <rect width="900" height="1200" fill="#050505"/>
      <rect x="0" y="0" width="900" height="1200" fill="url(#g)"/>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#202020"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="450" cy="290" r="210" fill="url(#halo)"/>
      <path d="M450 305c83 0 150-67 150-150S533 5 450 5 300 72 300 155s67 150 150 150Z" transform="translate(0 250)" fill="#ffffff" opacity="0.94"/>
      <path d="M195 1090c18-174 115-258 255-258s237 84 255 258" fill="#ffffff" opacity="0.92"/>
      <path d="M270 650c0 0 72 72 180 72s180-72 180-72" fill="none" stroke="#0f0f0f" stroke-width="20" opacity="0.55"/>
      <text x="80" y="150" fill="#ffffff" font-family="Bebas Neue, Arial, sans-serif" font-size="100" letter-spacing="8">SCCP</text>
      <text x="450" y="1030" text-anchor="middle" fill="#ffffff" font-family="Bebas Neue, Arial, sans-serif" font-size="230" letter-spacing="14">${escapeText(number)}</text>
      <text x="450" y="1120" text-anchor="middle" fill="#d6d6d6" font-family="Roboto Condensed, Arial, sans-serif" font-size="42" letter-spacing="5">${escapeText(name)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function createIdolPortrait(label: string, accent = "#ffffff") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${escapeText(label)}">
      <defs>
        <radialGradient id="bg" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.24"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="800" height="800" fill="#050505"/>
      <rect width="800" height="800" fill="url(#bg)"/>
      <circle cx="400" cy="280" r="132" fill="#ffffff" opacity="0.93"/>
      <path d="M186 670c12-114 86-192 214-192s202 78 214 192" fill="#ffffff" opacity="0.92"/>
      <text x="400" y="116" text-anchor="middle" fill="#ffffff" font-family="Bebas Neue, Arial, sans-serif" font-size="92" letter-spacing="8">SCCP</text>
      <text x="400" y="736" text-anchor="middle" fill="#d8d8d8" font-family="Roboto Condensed, Arial, sans-serif" font-size="38" letter-spacing="4">${escapeText(label)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const routeCardsData: RouteCardItem[] = [
  {
    href: "/historia",
    title: "História",
    description: "Linha do tempo do clube com os capítulos mais marcantes.",
    label: "Abrir página",
  },
  {
    href: "/jogadores",
    title: "Jogadores",
    description: "Cards editoriais com elenco, posição e número da camisa.",
    label: "Ver elenco",
  },
  {
    href: "/trofeus",
    title: "Troféus",
    description: "Conquistas nacionais e internacionais em destaque.",
    label: "Explorar títulos",
  },
  {
    href: "/wallpapers",
    title: "Wallpapers",
    description: "Galeria visual para baixar e trocar imagens facilmente.",
    label: "Abrir galeria",
  },
  {
    href: "/estadio",
    title: "Estádio",
    description: "Neo Química Arena com leitura 3D e biografia curta.",
    label: "Explorar arena",
  },
  {
    href: "/idolos",
    title: "Ídolos",
    description: "Cards prontos para você preencher com seus nomes e histórias.",
    label: "Ver cards",
  },
];

export const historiaData: HistoriaItem[] = [
  {
    ano: "1910",
    titulo: "Fundação do Timão",
    descricao:
      "Cinco operários transformam uma ideia simples em um clube popular que nasce para pertencer à Fiel.",
  },
  {
    ano: "1914",
    titulo: "Primeiro título paulista",
    descricao:
      "A conquista inaugura a cultura vencedora e consolida o Corinthians no mapa do futebol brasileiro.",
  },
  {
    ano: "1977",
    titulo: "Fim do jejum",
    descricao:
      "A massa alvinegra explode em emoção e devolve ao clube uma das noites mais simbólicas de sua história.",
  },
  {
    ano: "1990",
    titulo: "Primeiro Brasileirão",
    descricao:
      "O Corinthians vence o país e abre uma década de afirmação nacional com futebol intenso e competitivo.",
  },
  {
    ano: "2000",
    titulo: "Mundial de Clubes",
    descricao:
      "No início do novo milênio, o Timão escreve uma página eterna ao conquistar o mundo diante da Fiel.",
  },
  {
    ano: "2012",
    titulo: "Libertadores e segundo Mundial",
    descricao:
      "A fase mais desejada da América e a consagração internacional completam uma trajetória de grandeza.",
  },
];

export const wallpapersData: WallpaperItem[] = [
  {
    titulo: "Estátua de São Jorge",
    descricao: "coragem, proteção espiritual e o triunfo do bem sobre o mal",
    src: "/assets/images/wallpapers/22.jpg",
    alt: "Wallpaper abstrato do Corinthians em preto e branco",
    aspectRatio: "4 / 5",
  },
  {
    titulo: "Grito da Fiel",
    descricao: "Composição vertical com profundidade e atmosfera dramática.",
    src: "/assets/images/wallpapers/2.jpg",
    alt: "Wallpaper vertical do Corinthians com destaque dourado",
    aspectRatio: "3 / 4",
  },
  {
    titulo: "Fiel Torcida",
    descricao: "Perspectiva panorâmica com linhas fortes e contraste brutal.",
    src: "/assets/images/wallpapers/3.jpg",
    alt: "Wallpaper horizontal da Neo Química Arena em tons escuros",
    aspectRatio: "16 / 10",
  },
  {
    titulo: "Doutor Socrates",
    descricao: "Homenagem ao ícone da Democracia Corintiana, com estética de pôster vintage.",
    src: "/assets/images/wallpapers/4.jpg",
    alt: "Wallpaper do escudo estilizado do Corinthians",
    aspectRatio: "1 / 1",
  },
  {
    titulo: "clique espetacular",
    descricao: "Textura mais fechada, ideal para smartphones e lock screens.",
    src: "/assets/images/wallpapers/9.jpg",
    alt: "Wallpaper com estética editorial do Corinthians",
    aspectRatio: "9 / 16",
  },
  {
    titulo: "Trio de Craques",
    descricao: "A junção da qualidade estrangeira",
    src: "/assets/images/wallpapers/6.jpg",
    alt: "Wallpaper limpo e editorial do Corinthians",
    aspectRatio: "5 / 4",
  },
];

export const trofeusData: TrofeuItem[] = [
  {
    nome: "Campeonato Brasileiro",
    quantidade: 7,
    categoria: "Nacional",
    imagem: "/assets/images/Trofeus/Trofeu2017.jpg",
    alt: "Imagem representativa do Campeonato Brasileiro do Corinthians",
  },
  {
    nome: "Copa do Brasil",
    quantidade: 4,
    categoria: "Copa",
    imagem:"/assets/images/Trofeus/CopaDoBrasil.jpg",
    alt: "Imagem representativa da Copa do Brasil do Corinthians",
  },
  {
    nome: "Libertadores",
    quantidade: 1,
    categoria: "Continental",
    imagem: "/assets/images/Trofeus/Libertadores.jpg",
    alt: "Imagem representativa da Libertadores do Corinthians",
  },
  {
    nome: "Mundial de Clubes",
    quantidade: 2,
    categoria: "Global",
    destaque: true,
    imagem: "/assets/images/Trofeus/Mundial.jpg",
    alt: "Imagem representativa do Mundial de Clubes do Corinthians",
  },
  {
    nome: "Paulistão",
    quantidade: 30,
    categoria: "Estadual",
    imagem: "/assets/images/Trofeus/Paulistão.jpg",
    alt: "Imagem representativa do Paulistão do Corinthians",
  },
  {
    nome: "Supercopa do Brasil",
    quantidade: 2,
    categoria: "Especial",
    imagem: "/assets/images/Trofeus/SuperCopa.jpg",
    alt: "Imagem representativa da Supercopa do Brasil do Corinthians",
  },
];

export const trofeusResumoData: TrofeuResumoItem[] = [
  {
    nome: "Campeonato Brasileiro de 2017",
    quantidade: 7,
    descricao: "O time de 2017 foi o primeiro clube a concluir um primeiro turno inteiro sem derrotas desde a adoção dos pontos corridos",
  },
  {
    nome: "Libertadores de 2012",
    quantidade: 4,
    descricao: "O Corinthians conquistou sua primeira Libertadores sem perder nenhum jogo: foram 8 vitórias e 6 empates em 14 partidas.",
  },
];

export const idolosData: IdolItem[] = [
  {
    nome: "Cassio",
    epoca: "2012-2024",
    foto: "/assets/images/CassioRamos.jpg",
    resumo: "Considerado por muitos o maior ídolo da história do Corinthians, foi um goleiro decisivo e líder dentro de campo, eternizado por suas atuações nas conquistas da Libertadores e do Mundial de 2012.",
  },
  {
    nome: "Marcelinho Carioca",
    epoca: "1ª Passagem: 1994 a 1997\n2ª Passagem: 1998 a 2001\n3ª Passagem: 2006-aposentadoria",
    foto: "/assets/images/Carioca.jpg",
    resumo: "Conhecido como Pé de Anjo, Marcelinho Carioca marcou época com seus gols e cobranças de falta. Campeão brasileiro, mundial e multicampeão pelo Corinthians, é considerado um dos maiores ídolos da história alvinegra.",
  },
  {
    nome: "Socrates",
    epoca: "1978-1984",
    foto: "/assets/images/Socrates.jpg",
       resumo: "Um dos maiores jogadores da história do futebol brasileiro e do Corinthians.Campeão Paulista em 1979, 1982 e 1983, liderou a histórica Democracia Corintiana, tornando-se símbolo da luta pela democracia dentro e fora dos gramados.",
  },
  {
    nome: "Craque Neto",
    epoca: "1ª Passagem: 1989-1993\n2ª Passagem: 1996-1997",
    foto: "/assets/images/Neto.jpg",
    resumo: "Ídolo eterno do Corinthians, Neto foi o principal nome da conquista do Campeonato Brasileiro de 1990, o primeiro título nacional da história do clube. Dono de um talento excepcional, destacou-se pelos gols, passes precisos e cobranças de falta marcantes, tornando-se um dos maiores camisas 10 da história corintiana.",
  },
];
