"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type RegionId =
    | "kanto"
    | "johto"
    | "hoenn"
    | "sinnoh"
    | "unova"
    | "kalos"
    | "alola"
    | "galar"
    | "paldea"
    | "hisui";

type RegionInfo = {
    id: RegionId;
    name: string;
    label: string;
    pokemonCount: number;
    flavorText: string;
};

const REGION_DATA: Record<RegionId, RegionInfo> = {
    kanto: {
        id: "kanto",
        name: "Kanto",
        label: "Região Kanto",
        pokemonCount: 151,
        flavorText:
            "Primeira região oficialmente catalogada. Berço das pesquisas da Liga e palco das jornadas clássicas de Treinadores iniciantes.",
    },
    johto: {
        id: "johto",
        name: "Johto",
        label: "Região Johto",
        pokemonCount: 100,
        flavorText:
            "Região historicamente ligada a Kanto, com tradições antigas, templos e lendas envolvendo Ho-Oh e Lugia.",
    },
    hoenn: {
        id: "hoenn",
        name: "Hoenn",
        label: "Região Hoenn",
        pokemonCount: 135,
        flavorText:
            "Arquipélago quente e úmido, com grande presença de Pokémon aquáticos e lendários que controlam clima e terra.",
    },
    sinnoh: {
        id: "sinnoh",
        name: "Sinnoh",
        label: "Região Sinnoh",
        pokemonCount: 107,
        flavorText:
            "Região montanhosa e fria, conhecida por ruínas antigas e por mitos ligados ao espaço-tempo e ao mundo distorcido.",
    },
    unova: {
        id: "unova",
        name: "Unova",
        label: "Região Unova",
        pokemonCount: 156,
        flavorText:
            "Região vasta e urbanizada, longe de Kanto, com forte diversidade cultural e Pokémon exclusivos de seu ecossistema.",
    },
    kalos: {
        id: "kalos",
        name: "Kalos",
        label: "Região Kalos",
        pokemonCount: 72,
        flavorText:
            "Região elegante e tecnológica, famosa por suas megaevoluções e por grandes centros urbanos de pesquisa Pokémon.",
    },
    alola: {
        id: "alola",
        name: "Alola",
        label: "Região Alola",
        pokemonCount: 86,
        flavorText:
            "Arquipélago tropical sob forte influência cultural local. Apresenta formas regionais únicas de espécies já conhecidas.",
    },
    galar: {
        id: "galar",
        name: "Galar",
        label: "Região Galar",
        pokemonCount: 89,
        flavorText:
            "Região inspirada em grandes ligas esportivas, com estádios e Dynamax, centralizando pesquisas de energia Pokémon.",
    },
    paldea: {
        id: "paldea",
        name: "Paldea",
        label: "Região Paldea",
        pokemonCount: 103,
        flavorText:
            "Região recente nos registros oficiais, com academias, Terastalização e novas espécies em rápido estudo.",
    },
    hisui: {
        id: "hisui",
        name: "Hisui",
        label: "Região Hisui",
        pokemonCount: 7,
        flavorText:
            "Registro histórico da região que mais tarde seria conhecida como Sinnoh. Em Hisui, a relação entre humanos e Pokémon ainda estava em formação, com vastas áreas selvagens.",
    },
};

type GlobalActivitySectionProps = {
    pokemonCount: number;
    regionCount: number;
};

export function GlobalActivitySection({
    pokemonCount,
    regionCount,
}: GlobalActivitySectionProps) {
    const [selectedRegionId, setSelectedRegionId] =
        useState<RegionId>("kanto");

    const selectedRegion = useMemo(
        () => REGION_DATA[selectedRegionId],
        [selectedRegionId],
    );

    const regionalPercent =
        pokemonCount > 0
            ? ((selectedRegion.pokemonCount / pokemonCount) * 100).toFixed(1)
            : null;

    return (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                        Mapa de Atividade da Pokédex Global
                    </h2>
                    <p className="text-xs text-slate-400 sm:text-sm">
                        Selecione uma região no mapa para visualizar a Pokédex regional e
                        seu peso dentro da Pokédex global oficial.
                    </p>
                </div>
                <span className="hidden rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-200 sm:inline-flex">
                    Regiões interativas · Clique nos pings
                </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6">
                {/* grade “tech” */}
                <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22c55e22,transparent_55%),radial-gradient(circle_at_bottom,#38bdf822,transparent_55%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-size-[32px_32px]" />
                </div>

                <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-center">
                    {/* MAPA + PINGS */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60">
                        <Image
                            src="/MAPAPOKEMON.jpeg"
                            alt="Mapa global das regiões Pokémon"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* overlay por cima da imagem */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#22c55e33,transparent_55%),radial-gradient(circle_at_80%_30%,#0ea5e933,transparent_55%),radial-gradient(circle_at_50%_80%,#f9731633,transparent_55%)]" />
                        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-slate-700/80 bg-slate-900/40" />

                        {/* Pings – ajusta as posições conforme seu mapa */}
                        <RegionPing
                            className="left-[65%] top-[45%]"
                            region="kanto"
                            label="Kanto"
                            isActive={selectedRegionId === "kanto"}
                            onClick={() => setSelectedRegionId("kanto")}
                        />
                        <RegionPing
                            className="left-[55%] top-[45%]"
                            region="johto"
                            label="Johto"
                            isActive={selectedRegionId === "johto"}
                            onClick={() => setSelectedRegionId("johto")}
                        />
                        <RegionPing
                            className="left-[60%] top-[60%]"
                            region="hoenn"
                            label="Hoenn"
                            isActive={selectedRegionId === "hoenn"}
                            onClick={() => setSelectedRegionId("hoenn")}
                        />
                        <RegionPing
                            className="left-[56%] top-[25%]"
                            region="sinnoh"
                            label="Sinnoh"
                            isActive={selectedRegionId === "sinnoh"}
                            onClick={() => setSelectedRegionId("sinnoh")}
                        />
                        <RegionPing
                            className="left-[42%] top-[65%]"
                            region="unova"
                            label="Unova"
                            isActive={selectedRegionId === "unova"}
                            onClick={() => setSelectedRegionId("unova")}
                        />
                        <RegionPing
                            className="left-[35%] top-[30%]"
                            region="kalos"
                            label="Kalos"
                            isActive={selectedRegionId === "kalos"}
                            onClick={() => setSelectedRegionId("kalos")}
                        />
                        <RegionPing
                            className="left-[92%] top-[50%]"
                            region="alola"
                            label="Alola"
                            isActive={selectedRegionId === "alola"}
                            onClick={() => setSelectedRegionId("alola")}
                        />
                        <RegionPing
                            className="left-[26%] top-[30%]"
                            region="galar"
                            label="Galar"
                            isActive={selectedRegionId === "galar"}
                            onClick={() => setSelectedRegionId("galar")}
                        />
                        <RegionPing
                            className="left-[32%] top-[45%]"
                            region="paldea"
                            label="Paldea"
                            isActive={selectedRegionId === "paldea"}
                            onClick={() => setSelectedRegionId("paldea")}
                        />
                        <RegionPing
                            className="left-[56%] top-[20%]"
                            region="hisui"
                            label="Hisui"
                            isActive={selectedRegionId === "hisui"}
                            onClick={() => setSelectedRegionId("hisui")}
                        />

                        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[10px] text-slate-100/90 drop-shadow">
                            <span>Signal map · Clique em uma região para detalhar</span>
                            <span>Pokédex Regional · Dados estimados da Liga</span>
                        </div>
                    </div>

                    {/* CARD LATERAL DINÂMICO */}
                    <div className="space-y-4 text-xs text-slate-300 sm:text-sm">
                        <div>
                            <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                Região selecionada
                            </p>
                            <h3 className="text-lg font-semibold text-slate-50">
                                {selectedRegion.label}
                            </h3>
                            <p className="mt-1 text-slate-400">
                                A região de{" "}
                                <span className="font-semibold text-sky-400">
                                    {selectedRegion.name}
                                </span>{" "}
                                possui uma Pokédex própria, com espécies e ecossistemas
                                característicos. Os dados abaixo representam um resumo da
                                Pokédex regional dentro do contexto global.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-3">
                                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                    Pokémon registrados na região
                                </p>
                                <p className="mt-1 text-2xl font-semibold text-slate-50">
                                    {selectedRegion.pokemonCount}
                                </p>
                                {regionalPercent && (
                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Aproximadamente{" "}
                                        <span className="font-medium text-sky-400">
                                            {regionalPercent}%
                                        </span>{" "}
                                        da Pokédex global atualmente conhecida.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-3">
                                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                    Contexto da região
                                </p>
                                <p className="mt-1 text-[11px] text-slate-300">
                                    {selectedRegion.flavorText}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-3">
                            <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                Regiões monitoradas
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-50">
                                {regionCount.toLocaleString("pt-BR")} regiões cadastradas na
                                PokéAPI
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400">
                                Os dados desta tela são um recorte regional da Pokédex global.
                                Use o mapa para alternar rapidamente entre as principais regiões
                                do mundo Pokémon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ===========================
    PING DE REGIÃO CLICÁVEL
   =========================== */

type RegionColorKey =
    | "kanto"
    | "johto"
    | "hoenn"
    | "sinnoh"
    | "unova"
    | "kalos"
    | "alola"
    | "galar"
    | "paldea"
    | "hisui";

type RegionPingProps = {
    className?: string;
    region: RegionColorKey;
    label?: string;
    isActive?: boolean;
    onClick?: () => void;
};

function RegionPing({
    className,
    region,
    label,
    isActive,
    onClick,
}: RegionPingProps) {
    const colorMap: Record<
        RegionColorKey,
        { base: string; ping: string; ring: string }
    > = {
        kanto: {
            base: "bg-red-500",
            ping: "bg-red-500/70",
            ring: "ring-violet-400/80",
        },
        johto: {
            base: "bg-amber-400",
            ping: "bg-amber-400/70",
            ring: "ring-violet-300/80",
        },
        hoenn: {
            base: "bg-emerald-400",
            ping: "bg-emerald-400/70",
            ring: "ring-teal-300/80",
        },
        sinnoh: {
            base: "bg-violet-400",
            ping: "bg-violet-400/70",
            ring: "ring-violet-300/80",
        },
        unova: {
            base: "bg-sky-400",
            ping: "bg-sky-400/70",
            ring: "ring-teal-300/80",
        },
        kalos: {
            base: "bg-pink-400",
            ping: "bg-pink-400/70",
            ring: "ring-violet-300/80",
        },
        alola: {
            base: "bg-teal-400",
            ping: "bg-teal-400/70",
            ring: "ring-teal-300/80",
        },
        galar: {
            base: "bg-purple-400",
            ping: "bg-purple-400/70",
            ring: "ring-violet-300/80",
        },
        paldea: {
            base: "bg-orange-400",
            ping: "bg-orange-400/70",
            ring: "ring-teal-300/80",
        },
        hisui: {
            base: "bg-violet-200",
            ping: "bg-violet-400/70",
            ring: "ring-teal-300/80",
        },
    };

    const c = colorMap[region];

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group absolute -translate-x-1/2 -translate-y-1/2 ${className ?? ""}`}
        >
            {/* círculo de ping */}
            <span
                className={`pointer-events-none absolute inline-flex h-6 w-6 animate-ping rounded-full ${c.ping} opacity-70 group-hover:opacity-100`}
            />
            {/* núcleo */}
            <span
                className={`relative flex h-2.5 w-2.5 items-center justify-center rounded-full ${c.base} ring-2 ring-slate-900/80 transition group-hover:scale-110 group-hover:ring-2 ${
                    isActive ? c.ring : "ring-slate-900/80"
                }`}
            />
            {label && (
                <span className="absolute left-4 top-1 text-[9px] font-medium text-slate-100 drop-shadow">
                    {label}
                </span>
            )}
        </button>
    );
}
