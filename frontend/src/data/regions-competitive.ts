// src/data/regions-competitive.ts
import type { RegionId } from "./regions";

export type CompetitivePokemonType =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export type GymInfo = {
  id: string;
  name: string;
  city: string;
  leader: string;
  badgeName: string;
  primaryType: CompetitivePokemonType;
  description: string;
  badgeImage?: string;
  leaderImage?: string;
  gymImage?: string;
  team: number[];
};

export type EliteTrainer = {
  id: string;
  name: string;
  role: "elite-four" | "champion";
  specialtyType?: CompetitivePokemonType;
  description: string;
  image?: string;
  acePokemonId?: number;

  /** NOVO → time do treinador */
  team: number[];
};

export type RegionCompetitiveInfo = {
  id: RegionId;
  name: string;
  leagueName: string;
  overview: string;
  gyms: GymInfo[];
  elite: EliteTrainer[];
  trivia: string[];
};

export const REGIONS_COMPETITIVE: RegionCompetitiveInfo[] = [
  {
    id: "kanto",
    name: "Kanto",
    leagueName: "Liga Pokémon de Kanto",
    overview:
      "A Liga Pokémon de Kanto é um dos sistemas competitivos mais antigos oficialmente reconhecidos. Muitos dos protocolos atuais de desafios de ginásio, certificação de Treinadores e registro de Insígnias foram padronizados a partir das estruturas de Kanto.",
    gyms: [
      {
        id: "pewter",
        name: "Ginásio de Pewter",
        city: "Pewter City",
        leader: "Brock",
        badgeName: "Insígnia de Rocha",
        primaryType: "rock",
        leaderImage: "/regionscompetitivo/kanto/brock.jpg",
        badgeImage: "/regionscompetitivo/kanto/insignia_pedra.png",
        gymImage: "/regionscompetitivo/kanto/Pewter_Gym.webp", 
        description:
          "Primeiro ginásio oficial para muitos Treinadores de Kanto. Especializado em Pokémon do tipo Pedra, é usado como teste básico de resistência e planejamento defensivo.",
        team: [74, 95], // Geodude, Onix
        
      },
      {
        id: "cerulean",
        name: "Ginásio de Cerulean",
        city: "Cerulean City",
        leader: "Misty",
        badgeName: "Insígnia da Cascata",
        primaryType: "water",
        leaderImage: "/regionscompetitivo/kanto/misty.jpg",
        badgeImage: "/regionscompetitivo/kanto/insignia_agua.png",
        gymImage: "/regionscompetitivo/kanto/Cerulean_Gym.webp",
        description:
          "Conduzido pela Líder Misty, o ginásio de Cerulean concentra-se em batalhas aquáticas rápidas e em controle de campo.",
        team: [120, 121], // Staryu, Starmie
      },
      {
        id: "vermilion",
        name: "Ginásio de Vermilion",
        city: "Vermilion City",
        leader: "Lt. Surge",
        badgeName: "Insígnia do Trovão",
        primaryType: "electric",
        leaderImage: "/regionscompetitivo/kanto/ltsurge.webp",
        badgeImage: "/regionscompetitivo/kanto/insignia_trovao.png",
        gymImage: "/regionscompetitivo/kanto/Vermilion_Gym.webp",
        description:
          "Baseado em estratégias de alta voltagem e pressão ofensiva, o ginásio de Vermilion é conhecido por seus Pokémon do tipo Elétrico.",
        team: [100, 25, 26], // Voltorb, Pikachu, Raichu
      },
      {
        id: "celadon",
        name: "Ginásio de Celadon",
        city: "Celadon City",
        leader: "Erika",
        badgeName: "Insígnia do Arco-Íris",
        primaryType: "grass",
        leaderImage: "/regionscompetitivo/kanto/erika.png",
        badgeImage: "/regionscompetitivo/kanto/insignia_planta.jpg",
        gymImage: "/regionscompetitivo/kanto/Celadon_Gym.webp",
        description:
          "Liderado por Erika, o ginásio de Celadon combina estética natural com táticas de desgaste e controle de status.",
        team: [43, 44, 45], // Oddish/Gloom/Vileplume
      },
      {
        id: "fuchsia",
        name: "Ginásio de Fuchsia",
        city: "Fuchsia City",
        leader: "Koga",
        badgeName: "Insígnia da Alma",
        primaryType: "poison",
        leaderImage: "/regionscompetitivo/kanto/koga.jpeg",
        badgeImage: "/regionscompetitivo/kanto/insignia_alma.jpg",
        gymImage: "/regionscompetitivo/kanto/Fuchsia_Gym.webp",
        description:
          "Especializado em venenos, armadilhas e batalhas de desgaste. Koga é conhecido por estratégias imprevisíveis.",
        team: [109, 109, 110, 88], // Koffing, Koffing, Weezing, Grimer
      },
      {
        id: "saffron",
        name: "Ginásio de Saffron",
        city: "Saffron City",
        leader: "Sabrina",
        badgeName: "Insígnia do Pântano",
        primaryType: "psychic",
        description:
          "Um dos ginásios mais temidos de Kanto, com foco em manipulação mental e ataques psíquicos.",
        team: [64, 63, 65], // Kadabra, Abra (às vezes), Alakazam
      },
      {
        id: "cinnabar",
        name: "Cinnabar Island",
        city: "Cinnabar Island",
        leader: "Blaine",
        badgeName: "Insígnia do Vulcão",
        primaryType: "fire",
        description:
          "Ginásio localizado em uma ilha vulcânica, especializado em calor extremo e ofensivas contínuas.",
        team: [58, 77, 126], // Growlithe, Ponyta, Magmar
      },
      {
        id: "viridian",
        name: "Ginásio de Viridian",
        city: "Viridian City",
        leader: "Giovanni",
        badgeName: "Insígnia da Terra",
        primaryType: "ground",
        description:
          "Último ginásio do circuito. Giovanni mistura táticas de solo com estratégias avançadas e disciplina militar.",
        team: [111, 51, 112], // Rhyhorn, Dugtrio, Rhydon
      },
    ],

    elite: [
      {
        id: "lorelei",
        name: "Lorelei",
        role: "elite-four",
        specialtyType: "ice",
        description:
          "Primeira integrante da Elite Four. Lorelei controla o campo com gelo e alta resistência.",
        acePokemonId: 131,
        team: [86, 87, 91, 124, 131], // Dewgong, Cloyster, Slowbro, Jynx, Lapras
      },
      {
        id: "bruno",
        name: "Bruno",
        role: "elite-four",
        specialtyType: "fighting",
        description:
          "Treinador focado em força física e pressão ofensiva. Suas batalhas são intensas e diretas.",
        acePokemonId: 68,
        team: [95, 66, 67, 68, 95], // Onix, Machop, Machoke, Machamp, Onix
      },
      {
        id: "agatha",
        name: "Agatha",
        role: "elite-four",
        specialtyType: "ghost",
        description:
          "Mestre do tipo Fantasma, famosa por batalhas longas, confusão e efeitos de status.",
        acePokemonId: 94,
        team: [93, 94, 42, 169, 94], // Haunter, Gengar, Golbat, Crobat*, outro Gengar
      },
      {
        id: "lance",
        name: "Lance",
        role: "elite-four",
        specialtyType: "dragon",
        description:
          "Mestre dos dragões e combatente aéreo. Suas formações exploram velocidade e dano massivo.",
        acePokemonId: 149,
        team: [130, 148, 148, 142, 149], // Gyarados, Dragonair x2, Aerodactyl, Dragonite
      },
      {
        id: "blue",
        name: "Blue",
        role: "champion",
        description:
          "Campeão de Kanto. Blue é conhecido por sua equipe extremamente adaptável, capaz de cobrir qualquer fraqueza.",
        acePokemonId: 3,
        team: [18, 65, 59, 112, 130, 3], // Pidgeot, Alakazam, Arcanine, Rhydon, Gyarados, Venusaur
      },
    ],

    trivia: [
      "A Liga de Kanto foi uma das primeiras a integrar registros à Pokédex global.",
      "A Elite Four de Kanto influenciou o design competitivo de outras regiões.",
      "Kanto é a única região onde o campeão muda frequentemente nas simulações históricas.",
    ],
  },

  // Stubs
  {
    id: "johto",
    name: "Johto",
    leagueName: "Liga Pokémon de Johto",
    overview:
      "Johto mantém uma forte ligação histórica com Kanto.",
    gyms: [],
    elite: [],
    trivia: [],
  },
  {
    id: "hoenn",
    name: "Hoenn",
    leagueName: "Liga Pokémon de Hoenn",
    overview:
      "Hoenn é conhecida por seus ecossistemas variados.",
    gyms: [],
    elite: [],
    trivia: [],
  },
];

export function getCompetitiveRegionById(
  id: string,
): RegionCompetitiveInfo | undefined {
  return REGIONS_COMPETITIVE.find(
    (region) => region.id.toLowerCase() === id.toLowerCase(),
  );
}
