// app/page.tsx

import { GlobalActivitySection } from "@/components/home/global-activity-section";


type CountResponse = {
  count: number;
};

async function getPokedexStats() {
  const [pokemonRes, regionRes] = await Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1", {
      next: { revalidate: 3600 },
    }),
    fetch("https://pokeapi.co/api/v2/region?limit=1", {
      next: { revalidate: 3600 },
    }),
  ]);

  if (!pokemonRes.ok || !regionRes.ok) {
    throw new Error("Falha ao carregar estatísticas da PokéAPI.");
  }

  const pokemonJson: CountResponse = await pokemonRes.json();
  const regionJson: CountResponse = await regionRes.json();

  return {
    pokemonCount: pokemonJson.count,
    regionCount: regionJson.count,
  };
}

export default async function HomePage() {
  const { pokemonCount, regionCount } = await getPokedexStats();

  return (
    <div className="space-y-10">
      {/* 1. INTRODUÇÃO */}
      <section className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
          Global Pokédex System
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Pokédex Control Center
          <span className="block text-lg font-normal text-slate-300 sm:text-xl">
            Central Global da Pokédex
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          Esta interface atua como a{" "}
          <span className="font-semibold text-sky-400">
            central oficial de monitoramento da Pokédex
          </span>
          , reunindo em um único painel dados de todas as regiões conhecidas do
          mundo Pokémon — de Kanto a Paldea. Aqui, pesquisadores e Treinadores
          podem acompanhar, em tempo quase real, as espécies catalogadas, sua
          distribuição e informações essenciais para jornadas, missões e estudos
          oficiais.
        </p>

        <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
          <span className="rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1 text-red-200">
            Pokédex Global · Dados oficiais da PokéAPI
          </span>
          <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-emerald-200">
            Status do sistema: Online
          </span>
        </div>
      </section>

      {/* 2. MAPA INTERATIVO: pings mudam o card ao lado */}
      <GlobalActivitySection
        pokemonCount={pokemonCount}
        regionCount={regionCount}
      />

      {/* 3. CARDS GERAIS (globais) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Estatísticas gerais da Pokédex
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Visão consolidada do total de Pokémon e regiões registrados na
            PokéAPI. Esses números são atualizados conforme novas gerações são
            adicionadas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total de Pokémon */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-md shadow-slate-950/40">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Total de Pokémon catalogados
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-50">
              {pokemonCount.toLocaleString("pt-BR")}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Número total de espécies registradas na{" "}
              <span className="font-mono text-sky-400">Pokédex</span>.
            </p>
          </div>

          {/* Total de regiões */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-md shadow-slate-950/40">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Regiões registradas
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-50">
              {regionCount.toLocaleString("pt-BR")}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Quantidade de regiões disponíveis no {" "}
              <span className="font-mono text-sky-400">Mundo Pokémon</span>, como
              Kanto, Johto, Hoenn e outras.
            </p>
          </div>

          {/* Fonte dos dados */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-md shadow-slate-950/40">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Fonte dos dados
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-50">
              PokéAPI · API pública e comunitária
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Todos os dados exibidos neste sistema são obtidos em tempo real da{" "}
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-sky-400 hover:text-sky-300"
              >
                PokéAPI
              </a>
              . Este projeto é apenas uma interface visual não oficial.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
