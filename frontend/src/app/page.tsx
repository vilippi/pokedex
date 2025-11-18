// app/page.tsx
import Image from "next/image";

type CountResponse = {
  count: number;
};

async function getPokedexStats() {
  const [pokemonRes, regionRes] = await Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1", {
      next: { revalidate: 3600 }, // revalida a cada 1h
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
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
          Global Pokédex System
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          MELHOR PokeNext
          <span className="block text-lg font-normal text-slate-300 sm:text-xl">
            Central Global da Pokédex · Monitoramento e estatísticas oficiais
          </span>
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
          Esta interface funciona como uma{" "}
          <span className="font-semibold text-sky-400">
            central de comando global da Pokédex
          </span>
          , exibindo informações consolidadas de todos os Pokémon e regiões
          disponíveis na PokéAPI. Nas próximas telas, você poderá navegar pelos
          registros individuais e fichas técnicas de cada espécie.
        </p>

        <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
          <span className="rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1 text-red-200">
            Pokédex Global · Dados oficiais da PokéAPI
          </span>
          <span className="rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1 text-slate-200">
            Next.js · TypeScript · Tailwind · shadcn/ui
          </span>
          <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-emerald-200">
            Status do sistema: Online
          </span>
        </div>
      </section>

      {/* 2. MAPA DE ATIVIDADE GLOBAL */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Mapa de Atividade da Pokédex Global
            </h2>
            <p className="text-xs text-slate-400 sm:text-sm">
              Visualização tática das regiões conhecidas e fluxo de dados
              sincronizados com a PokéAPI. Uma visão de “central de comando”
              abrangendo todas as regiões.
            </p>
          </div>
          <span className="hidden rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-200 sm:inline-flex">
            Visual de Sistema · Todas as regiões
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6">
          {/* grade “tech” */}
          <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22c55e22,transparent_55%),radial-gradient(circle_at_bottom,#38bdf822,transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-size-[32px_32px]" />
          </div>

          <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-center">
            {/* “mapa” estilizado */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60">
              {/* IMAGEM DO MAPA */}
              <Image
                src="/MAPAPOKEMON.jpeg"
                alt="Mapa global das regiões Pokémon"
                fill
                className="object-cover"
                priority
              />

              {/* overlays por cima da imagem */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#22c55e33,transparent_55%),radial-gradient(circle_at_80%_30%,#0ea5e933,transparent_55%),radial-gradient(circle_at_50%_80%,#f9731633,transparent_55%)]" />
              <div className="pointer-events-none absolute inset-[10%] rounded-3xl border border-slate-700/80 bg-slate-950/40 backdrop-blur-[1px]" />

              {/* “pontos” representando regiões */}
              <RegionPing
                className="left-[20%] top-[30%]"
                color="emerald"
                label="Região 1"
              />
              <RegionPing
                className="left-[60%] top-[25%]"
                color="sky"
                label="Região 2"
              />
              <RegionPing
                className="left-[75%] top-[60%]"
                color="amber"
                label="Região 3"
              />
              <RegionPing
                className="left-[40%] top-[70%]"
                color="red"
                label="Região 4"
              />
              <RegionPing
                className="left-[30%] top-[50%]"
                color="violet"
                label="Região 5"
              />
              <RegionPing
                className="left-[50%] top-[40%]"
                color="lime"
                label="Região 6"
              />
              <RegionPing
                className="left-[15%] top-[65%]"
                color="cyan"
                label="Região 7"
              />

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[10px] text-slate-100/90 drop-shadow">
                <span>Signal map · Todas as regiões registradas</span>
                <span>Overlay conceitual · Fase 1 (visual)</span>
              </div>
            </div>

            {/* legenda / info lateral */}
            <div className="space-y-4 text-xs text-slate-300 sm:text-sm">
              <p>
                Este painel representa um{" "}
                <span className="font-semibold">mapa de atividade global</span>{" "}
                da Pokédex. A imagem de fundo ilustra o mundo Pokémon, enquanto
                os pontos pulsando simbolizam regiões monitoradas pela PokéAPI.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Regiões ativas
                  </p>
                  <p className="text-sm font-semibold text-slate-50">
                    {regionCount.toLocaleString("pt-BR")} regiões
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Total de regiões retornadas pelo endpoint{" "}
                    <span className="font-mono text-sky-400">/region</span>.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Escopo dos dados
                  </p>
                  <p className="text-sm font-semibold text-slate-50">
                    Pokédex Global
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Inclui todas as gerações e regiões disponíveis na PokéAPI.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Nesta fase, o mapa é principalmente visual, focado em reforçar a
                estética de sistema oficial. Em versões futuras, ele pode ser
                conectado a filtros, seleção de região e rotas específicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARDS DE INFORMAÇÕES */}
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
              Número total de espécies disponíveis no endpoint{" "}
              <span className="font-mono text-sky-400">/pokemon</span> da
              PokéAPI.
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
              Quantidade de regiões disponíveis no endpoint{" "}
              <span className="font-mono text-sky-400">/region</span>, como
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

/* ==== TIPOS E COMPONENTE RegionPing ==== */

type RegionColor =
  | "emerald"
  | "sky"
  | "amber"
  | "red"
  | "violet"
  | "lime"
  | "cyan";

type RegionPingProps = {
  className?: string;
  color: RegionColor;
  label?: string;
};

function RegionPing({ className, color, label }: RegionPingProps) {
  const colorMap: Record<RegionColor, { base: string; ping: string }> = {
    emerald: {
      base: "bg-emerald-400",
      ping: "bg-emerald-400/70",
    },
    sky: {
      base: "bg-sky-400",
      ping: "bg-sky-400/70",
    },
    amber: {
      base: "bg-amber-400",
      ping: "bg-amber-400/70",
    },
    red: {
      base: "bg-red-400",
      ping: "bg-red-400/70",
    },
    violet: {
      base: "bg-violet-400",
      ping: "bg-violet-400/70",
    },
    lime: {
      base: "bg-lime-400",
      ping: "bg-lime-400/70",
    },
    cyan: {
      base: "bg-cyan-400",
      ping: "bg-cyan-400/70",
    },
  };

  const c = colorMap[color];

  return (
    <div className={`absolute ${className ?? ""}`}>
      <span
        className={`inline-flex h-2 w-2 animate-ping rounded-full ${c.ping}`}
      />
      <span className={`absolute inset-0 h-2 w-2 rounded-full ${c.base}`} />
      {label && (
        <span className="absolute left-3 top-1 text-[9px] font-medium text-slate-200 drop-shadow">
          {label}
        </span>
      )}
    </div>
  );
}
