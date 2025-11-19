import Image from "next/image";
import Link from "next/link";

type RegionId =
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

type RegionInfo = {
    id: RegionId;
    name: string;
    generation: string;
    totalPokemon: number;
    image: string; // caminho em /public
};

const REGIONS: RegionInfo[] = [
    {
        id: "kanto",
        name: "Kanto",
        generation: "Geração I",
        totalPokemon: 151,
        image: "/regions/kanto.jpg",
    },
    {
        id: "johto",
        name: "Johto",
        generation: "Geração II",
        totalPokemon: 100,
        image: "/regions/johto.jpg",
    },
    {
        id: "hoenn",
        name: "Hoenn",
        generation: "Geração III",
        totalPokemon: 135,
        image: "/regions/hoenn.jpg",
    },
    {
        id: "sinnoh",
        name: "Sinnoh",
        generation: "Geração IV",
        totalPokemon: 107,
        image: "/regions/sinnoh.jpg",
    },
    {
        id: "unova",
        name: "Unova",
        generation: "Geração V",
        totalPokemon: 156,
        image: "/regions/unova.jpg",
    },
    {
        id: "kalos",
        name: "Kalos",
        generation: "Geração VI",
        totalPokemon: 72,
        image: "/regions/kalos.jpg",
    },
    {
        id: "alola",
        name: "Alola",
        generation: "Geração VII",
        totalPokemon: 88,
        image: "/regions/alola.jpg",
    },
    {
        id: "galar",
        name: "Galar",
        generation: "Geração VIII",
        totalPokemon: 89,
        image: "/regions/galar.jpg",
    },
    {
        id: "paldea",
        name: "Paldea",
        generation: "Geração IX",
        totalPokemon: 103,
        image: "/regions/paldea.jpg",
    },
];

export const metadata = {
    title: "Mundo Pokémon · Regiões | Pokédex Control Center",
};

export default function MundoPage() {
    const totalGlobal = REGIONS.reduce(
        (sum, region) => sum + region.totalPokemon,
        0,
    );

    return (
        <div className="space-y-8">
            {/* Cabeçalho da página */}
            <header className="space-y-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                    World Map · Regional Dex
                </p>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Regiões do Mundo Pokémon
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
                    Visão consolidada das principais regiões monitoradas pela Pokédex
                    global. Cada card exibe o{" "}
                    <span className="font-semibold text-sky-400">
                        total de espécies registradas
                    </span>{" "}
                    na Pokédex regional.
                </p>

                <div className="mt-2 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-4 py-1.5 text-[11px] font-medium text-slate-200">
                        Total aproximado em todas as regiões:{" "}
                        <span className="font-mono text-sky-400">
                            {totalGlobal.toLocaleString("pt-BR")}
                        </span>{" "}
                        espécies
                    </span>
                </div>
            </header>

            {/* Grid de cards de regiões */}
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {REGIONS.map((region) => (
                    <Link
                        key={region.id}
                        href={`/mundo/${region.id}`}
                        className="block"
                    >
                        <article className="flex min-h-80 flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-sky-900/40 sm:min-h-[260px]">
                            {/* Imagem da região – bem alta no mobile */}
                            <div className="relative h-125 w-full overflow-hidden bg-slate-900">
                                <Image
                                    src={region.image}
                                    alt={`Região ${region.name}`}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                <div className="absolute left-4 bottom-3 space-y-1 text-left">
                                    <span className="inline-flex rounded-full bg-slate-950/70 px-2 py-0.5 text-[10px] font-mono text-slate-200">
                                        {region.generation}
                                    </span>
                                    <h2 className="text-lg font-semibold text-slate-50">
                                        {region.name}
                                    </h2>
                                </div>
                            </div>

                            {/* Conteúdo do card: só número da Dex regional */}
                            <div className="flex flex-1 flex-col gap-4 p-5 text-xs text-slate-300 sm:text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="space-y-1">
                                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                                            Total de Pokémon na Pokédex regional
                                        </p>
                                        <p className="text-2xl font-semibold text-slate-50">
                                            {region.totalPokemon.toLocaleString("pt-BR")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </section>
        </div>
    );
}
