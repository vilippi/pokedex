// src/data/regions.ts

export type RegionId =
  | "kanto"
  | "johto"
  | "hoenn"
  | "sinnoh"
  | "unova"
  | "kalos"
  | "alola"
  | "galar"
  | "hisui"
  | "paldea";

export type FeaturedPokemon = {
  id: number; // id da Pokédex nacional (usado na rota /pokemon/[id])
  name: string; // nome em inglês da PokéAPI
};

export type RegionInfo = {
  id: RegionId;
  name: string;
  generation: string;
  totalPokemon: number;
  // imagem principal (lista / cards)
  image: string;
  // imagens para carrossel da página da região
  images: string[];
  // texto de história / contexto da região
  history: string;
  // curiosidades rápidas
  facts: string[];
  // alguns Pokémon em destaque dessa região
  featuredPokemon: FeaturedPokemon[];
};

export const REGIONS: RegionInfo[] = [
  {
    id: "kanto",
    name: "Kanto",
    generation: "Geração I",
    totalPokemon: 151,
    image: "/regions/kanto.jpg",
    images: [
      "/regions/kanto-1.jpg",
      "/regions/kanto-2.jpg",
      "/regions/kanto-3.jpg",
    ],
    history:
      "Kanto foi a primeira região oficialmente integrada aos sistemas da Pokédex. É considerada o berço das jornadas de Treinadores modernos, abrigando centros de pesquisa como o laboratório do Professor Oak e diversas cidades conectadas por rotas clássicas. Seus ecossistemas vão de florestas densas a cavernas profundas, servindo de base para muitos dos estudos iniciais da Liga Pokémon.",
    facts: [
      "O laboratório do Professor Oak em Pallet Town foi um dos primeiros pontos de sincronização com a Pokédex global.",
      "Grande parte da literatura acadêmica inicial sobre tipos e vantagens em batalha foi produzida com base em espécies de Kanto.",
      "Rotas marítimas da região são amplamente usadas para monitorar migrações de Pokémon aquáticos.",
    ],
    featuredPokemon: [
      { id: 1, name: "bulbasaur" },
      { id: 4, name: "charmander" },
      { id: 7, name: "squirtle" },
      { id: 25, name: "pikachu" },
      { id: 94, name: "gengar" },
      { id: 149, name: "dragonite" },
    ],
  },
  {
    id: "johto",
    name: "Johto",
    generation: "Geração II",
    totalPokemon: 100,
    image: "/regions/johto.jpg",
    images: [
      "/regions/johto-1.jpg",
      "/regions/johto-2.jpg",
      "/regions/johto-3.jpg",
    ],
    history:
      "Johto é uma região fortemente ligada a tradições antigas, templos e lendas envolvendo os Pokémon lendários Ho-Oh e Lugia. Suas cidades preservam arquiteturas históricas ao mesmo tempo em que adotam tecnologia de monitoramento da Pokédex. A conexão histórica com Kanto permitiu a criação de rotas conjuntas de pesquisa e intercâmbio de Treinadores.",
    facts: [
      "As torres de Ecruteak são frequentemente usadas como pontos de calibração para sensores atmosféricos da Pokédex.",
      "Johto foi pioneira em estudos sobre evolução por amizade e por itens específicos.",
      "Grande parte das formas bebês catalogadas na Pokédex foram identificadas em Johto.",
    ],
    featuredPokemon: [
      { id: 152, name: "chikorita" },
      { id: 155, name: "cyndaquil" },
      { id: 158, name: "totodile" },
      { id: 172, name: "pichu" },
      { id: 197, name: "umbreon" },
      { id: 249, name: "lugia" },
    ],
  },
  {
    id: "hoenn",
    name: "Hoenn",
    generation: "Geração III",
    totalPokemon: 135,
    image: "/regions/hoenn.jpg",
    images: [
      "/regions/hoenn-1.jpg",
      "/regions/hoenn-2.jpg",
      "/regions/hoenn-3.jpg",
    ],
    history:
      "Hoenn é um arquipélago caracterizado por clima intenso, com áreas de forte atividade vulcânica e tempestades frequentes. A região se tornou essencial para pesquisas sobre clima e seu impacto em espécies de Pokémon, especialmente após eventos envolvendo Groudon e Kyogre. A diversidade de rotas marítimas tornou a Pokédex marítima de Hoenn uma das mais completas.",
    facts: [
      "Hoenn abriga uma das maiores concentrações de Pokémon do tipo Água já registradas.",
      "A região foi central em estudos sobre formações de correntes marítimas e migração de cardumes.",
      "Dados climáticos extremos de Hoenn são usados como referência em simulações da Pokédex global.",
    ],
    featuredPokemon: [
      { id: 252, name: "treecko" },
      { id: 255, name: "torchic" },
      { id: 258, name: "mudkip" },
      { id: 282, name: "gardevoir" },
      { id: 373, name: "salamence" },
      { id: 384, name: "rayquaza" },
    ],
  },
  {
    id: "sinnoh",
    name: "Sinnoh",
    generation: "Geração IV",
    totalPokemon: 107,
    image: "/regions/sinnoh.jpg",
    images: [
      "/regions/sinnoh-1.jpg",
      "/regions/sinnoh-2.jpg",
      "/regions/sinnoh-3.jpg",
    ],
    history:
      "Sinnoh é uma região montanhosa e fria, famosa por ruínas antigas e mitos ligados à origem do mundo Pokémon. Muitos estudos sobre espaço-tempo, dimensões alternativas e fenômenos de Distortion World foram conduzidos aqui. A região se destaca por integrar lendas ancestrais com tecnologia de ponta da Pokédex.",
    facts: [
      "Registros de campo de Sinnoh são frequentemente cruzados com relatos históricos de Hisui.",
      "A região possui uma quantidade incomum de Pokémon relacionados a mitos de criação e controle de dimensões.",
      "Pesquisas em cavernas de Sinnoh ajudaram a calibrar sensores de energia da Pokédex.",
    ],
    featuredPokemon: [
      { id: 387, name: "turtwig" },
      { id: 390, name: "chimchar" },
      { id: 393, name: "piplup" },
      { id: 448, name: "lucario" },
      { id: 487, name: "giratina" },
      { id: 493, name: "arceus" },
    ],
  },
  {
    id: "unova",
    name: "Unova",
    generation: "Geração V",
    totalPokemon: 156,
    image: "/regions/unova.jpg",
    images: [
      "/regions/unova-1.jpg",
      "/regions/unova-2.jpg",
      "/regions/unova-3.jpg",
    ],
    history:
      "Unova é uma região distante, marcada por grandes centros urbanos, sistemas de transporte avançados e forte diversidade cultural. Foi uma das primeiras áreas a utilizar redes de comunicação em larga escala para sincronizar a Pokédex em tempo real, permitindo uma resposta rápida a eventos de campo e aparições raras.",
    facts: [
      "Unova foi pioneira em integrar infraestrutura de metrô à logística de pesquisa Pokémon.",
      "A maioria das espécies inicialmente encontradas em Unova eram totalmente inéditas em outras regiões.",
      "Sistemas de monitoramento da Pokédex em Unova foram usados como modelo para outras regiões urbanas.",
    ],
    featuredPokemon: [
      { id: 495, name: "snivy" },
      { id: 498, name: "tepig" },
      { id: 501, name: "oshawott" },
      { id: 571, name: "zoroark" },
      { id: 635, name: "hydreigon" },
      { id: 643, name: "reshiram" },
    ],
  },
  {
    id: "kalos",
    name: "Kalos",
    generation: "Geração VI",
    totalPokemon: 72,
    image: "/regions/kalos.jpg",
    images: [
      "/regions/kalos-1.jpg",
      "/regions/kalos-2.jpg",
      "/regions/kalos-3.jpg",
    ],
    history:
      "Kalos é conhecida por sua estética elegante, cidades inspiradas em grandes capitais e pelo avanço em estudos de Mega Evolução. A região uniu moda, cultura e tecnologia em um só ecossistema, tornando a coleta de dados da Pokédex quase tão presente quanto a vida urbana.",
    facts: [
      "Muitos dos primeiros experimentos controlados de Mega Evolução foram conduzidos em Kalos.",
      "Centros da Liga em Kalos implementaram sistemas avançados de transmissão de dados para a Pokédex.",
      "Linhas férreas e rotas aéreas de Kalos facilitam o deslocamento rápido de pesquisadores.",
    ],
    featuredPokemon: [
      { id: 650, name: "chespin" },
      { id: 653, name: "fennekin" },
      { id: 656, name: "froakie" },
      { id: 700, name: "sylveon" },
      { id: 716, name: "xerneas" },
      { id: 718, name: "zygarde" },
    ],
  },
  {
    id: "alola",
    name: "Alola",
    generation: "Geração VII",
    totalPokemon: 88,
    image: "/regions/alola.jpg",
    images: [
      "/regions/alola-1.jpg",
      "/regions/alola-2.jpg",
      "/regions/alola-3.jpg",
    ],
    history:
      "Alola é um arquipélago tropical com forte influência cultural local e rituais tradicionais. A região é conhecida por suas formas regionais, em que espécies de outras regiões se adaptaram ao clima e ao estilo de vida insular. O sistema de desafios de ilhas substitui os ginásios tradicionais, criando novos cenários de coleta de dados.",
    facts: [
      "Formas de Alola apresentam padrões únicos de adaptação ambiental na Pokédex.",
      "As provas das ilhas são frequentemente usadas como estudo de caso em relatórios de campo.",
      "As Ultra Wormholes de Alola trouxeram dados inéditos sobre Pokémon de outras dimensões.",
    ],
    featuredPokemon: [
      { id: 722, name: "rowlet" },
      { id: 725, name: "litten" },
      { id: 728, name: "popplio" },
      { id: 745, name: "lycanroc" },
      { id: 791, name: "solgaleo" },
      { id: 792, name: "lunala" },
    ],
  },
  {
    id: "galar",
    name: "Galar",
    generation: "Geração VIII",
    totalPokemon: 89,
    image: "/regions/galar.jpg",
    images: [
      "/regions/galar-1.jpg",
      "/regions/galar-2.jpg",
      "/regions/galar-3.jpg",
    ],
    history:
      "Galar é uma região industrial e esportiva, famosa por seus estádios gigantes e batalhas oficiais transmitidas em larga escala. A energia usada nos fenômenos Dynamax e Gigantamax se tornou objeto de estudo crítico para a Pokédex global, exigindo sensores específicos e protocolos de segurança.",
    facts: [
      "Os estádios de Galar possuem integração direta com sistemas de telemetria da Pokédex.",
      "Pesquisas sobre Dynamax influenciaram o design de baterias e módulos de energia portáteis.",
      "Rotas ferroviárias interligam grande parte da região, facilitando missões de campo.",
    ],
    featuredPokemon: [
      { id: 810, name: "grookey" },
      { id: 813, name: "scorbunny" },
      { id: 816, name: "sobble" },
      { id: 887, name: "dragapult" },
      { id: 888, name: "zacian" },
      { id: 889, name: "zamazenta" },
    ],
  },
  {
    id: "hisui",
    name: "Hisui",
    generation: "Período antigo de Sinnoh",
    totalPokemon: 103,
    image: "/regions/hisui.jpg",
    images: [
      "/regions/hisui-1.jpg",
      "/regions/hisui-2.jpg",
      "/regions/hisui-3.jpg",
    ],
    history:
      "Hisui representa registros históricos de uma versão antiga de Sinnoh, quando a presença humana era limitada e grande parte do território ainda era selvagem. Os dados da Pokédex sobre Hisui são reconstruídos a partir de relatos, documentos antigos e estudos comparativos com Sinnoh moderna.",
    facts: [
      "Muitas formas Hisuian são reconstruções baseadas em fósseis, manuscritos e descrições antigas.",
      "Hisui é fundamental para entender como ecossistemas inteiros se transformaram ao longo do tempo.",
      "Parte dos dados de Hisui ainda é classificada como 'em revisão' nos sistemas da Pokédex.",
    ],
    featuredPokemon: [
      { id: 899, name: "wyrdeer" },
      { id: 900, name: "kleavor" },
      { id: 901, name: "ursaluna" },
      { id: 902, name: "basculegion-male" },
      { id: 903, name: "sneasler" },
      { id: 904, name: "overqwil" },
    ],
  },
  {
    id: "paldea",
    name: "Paldea",
    generation: "Geração IX",
    totalPokemon: 103,
    image: "/regions/paldea.jpg",
    images: [
      "/regions/paldea-1.jpg",
      "/regions/paldea-2.jpg",
      "/regions/paldea-3.jpg",
    ],
    history:
      "Paldea é uma região recente nos registros da Pokédex, marcada por academias, estudos de campo guiados por professores e o fenômeno da Terastalização. A coleta de dados aqui é altamente estruturada, com muitos Treinadores atuando diretamente como pesquisadores em treinamento.",
    facts: [
      "Academias de Paldea integram os dispositivos da Pokédex às atividades de sala de aula.",
      "Terastalização exige módulos especiais de leitura de energia na Pokédex.",
      "Os mapas de Paldea são atualizados com frequência devido a áreas de exploração em expansão.",
    ],
    featuredPokemon: [
      { id: 906, name: "sprigatito" },
      { id: 909, name: "fuecoco" },
      { id: 912, name: "quaxly" },
      { id: 927, name: "maushold" },
      { id: 1008, name: "koraidon" },
      { id: 1009, name: "miraidon" },
    ],
  },
];

export function getRegionById(id: string): RegionInfo | undefined {
  const normalized = id.toLowerCase() as RegionId;
  return REGIONS.find((r) => r.id === normalized);
}
