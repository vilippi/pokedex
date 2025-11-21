"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, Flame, Swords } from "lucide-react";
import {
  getCompetitiveRegionById,
  type CompetitivePokemonType,
} from "@/data/regions-competitive";
import Image from "next/image";

type PokemonBasicInfo = {
  id: number;
  name: string;
  types: CompetitivePokemonType[];
};

function getPokemonSprite(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function capitalize(name: string) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Mapeia tipo -> classes de cor do badge
const TYPE_BADGE_STYLES: Record<CompetitivePokemonType, string> = {
  normal: "bg-neutral-700/70 border-neutral-400/60 text-neutral-50",
  fire: "bg-orange-600/80 border-orange-400/80 text-orange-50",
  water: "bg-sky-700/80 border-sky-400/80 text-sky-50",
  grass: "bg-emerald-700/80 border-emerald-400/80 text-emerald-50",
  electric: "bg-yellow-500/80 border-yellow-300/80 text-slate-900",
  ice: "bg-cyan-500/80 border-cyan-300/80 text-slate-900",
  fighting: "bg-red-800/80 border-red-500/80 text-red-50",
  poison: "bg-fuchsia-700/80 border-fuchsia-400/80 text-fuchsia-50",
  ground: "bg-amber-800/80 border-amber-500/80 text-amber-50",
  flying: "bg-indigo-600/80 border-indigo-300/80 text-indigo-50",
  psychic: "bg-pink-600/80 border-pink-300/80 text-pink-50",
  bug: "bg-lime-700/80 border-lime-400/80 text-lime-50",
  rock: "bg-yellow-900/80 border-yellow-600/80 text-yellow-50",
  ghost: "bg-purple-900/80 border-purple-500/80 text-purple-50",
  dragon: "bg-indigo-900/80 border-indigo-500/80 text-indigo-50",
  dark: "bg-zinc-900/80 border-zinc-600/80 text-zinc-50",
  steel: "bg-slate-600/80 border-slate-300/80 text-slate-50",
  fairy: "bg-rose-500/80 border-rose-200/80 text-slate-900",
};

function getTypeBadgeClass(type: CompetitivePokemonType | undefined) {
  if (!type) {
    return "bg-slate-700/80 border-slate-500/80 text-slate-100";
  }
  return TYPE_BADGE_STYLES[type] ?? "bg-slate-700/80 border-slate-500/80 text-slate-100";
}

// Painel visual de tipo (coluna direita)
function TypePanel({ type }: { type?: CompetitivePokemonType }) {
  const classes = getTypeBadgeClass(type);
  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border p-3 text-xs font-semibold uppercase tracking-wide ${classes}`}
    >
      <span className="opacity-90">Tipo</span>
      <span className="text-sm">{type ?? "—"}</span>
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/10" />
    </div>
  );
}

export default function CompetitiveRegionPage() {
  const { regiao } = useParams<{ regiao: string }>();
  const region = getCompetitiveRegionById(regiao);

  const [pokemonMap, setPokemonMap] = useState<Record<number, PokemonBasicInfo>>(
    {},
  );

  // Coleta todos os IDs de Pokémon usados nesta região
  const teamIds = useMemo(() => {
    if (!region) return [] as number[];

    const idsSet = new Set<number>();

    region.gyms.forEach((gym) => {
      gym.team.forEach((id) => idsSet.add(id));
    });

    region.elite.forEach((trainer) => {
      trainer.team.forEach((id) => idsSet.add(id));
    });

    return Array.from(idsSet);
  }, [region]);

  // Busca nomes e tipos na PokéAPI
  useEffect(() => {
    if (!teamIds.length) return;

    let isCancelled = false;

    async function fetchTeam() {
      try {
        const results = await Promise.all(
          teamIds.map(async (id) => {
            try {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
              if (!res.ok) throw new Error("Falha ao buscar Pokémon");
              const data = await res.json();

              const types: CompetitivePokemonType[] = data.types
                .map(
                  (t: any) =>
                    t.type.name as CompetitivePokemonType | undefined,
                )
                .filter(Boolean);

              const info: PokemonBasicInfo = {
                id,
                name: data.name,
                types,
              };

              return info;
            } catch {
              return {
                id,
                name: `pokemon-${id}`,
                types: [],
              } as PokemonBasicInfo;
            }
          }),
        );

        if (isCancelled) return;

        const map: Record<number, PokemonBasicInfo> = {};
        results.forEach((p) => {
          map[p.id] = p;
        });

        setPokemonMap(map);
      } catch (error) {
        console.error("Erro ao carregar time de Pokémon:", error);
      }
    }

    fetchTeam();

    return () => {
      isCancelled = true;
    };
  }, [teamIds]);

  if (!region) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Região não encontrada</h1>
        <p className="text-slate-400 mb-6">
          Não foi possível localizar dados competitivos para esta região.
        </p>

        <Link
          href="/mundo"
          className="text-red-400 hover:text-red-300 transition underline"
        >
          Voltar para o mapa das regiões
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* HEADER */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <Link
            href={`/mundo/${region.id}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a região
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold">
            Liga Pokémon de {region.name}
          </h1>

          <p className="text-slate-400 max-w-2xl">
            Dossiê competitivo oficial da região — registros completos da
            estrutura de ginásios, líderes, Elite Four e campeão.
          </p>
        </header>

        {/* OVERVIEW */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Visão Geral da Liga
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            {region.overview}
          </p>
        </section>

        {/* GINÁSIOS */}
        <h2 className="text-3xl font-semibold mt-10">Ginásios</h2>

        {region.gyms.map((gym, index) => (
          <section
            key={gym.id}
            className="border border-slate-800 rounded-3xl p-8 bg-slate-950/60 space-y-8"
          >
            {/* TOPO: info + imagens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* LEFT INFO */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">{gym.name}</h3>

                <p className="text-slate-400">
                  <span className="font-semibold text-slate-200">Cidade:</span>{" "}
                  {gym.city}
                </p>

                <p className="text-slate-400">
                  <span className="font-semibold text-slate-200">Líder:</span>{" "}
                  {gym.leader}
                </p>

                <p className="text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-500" />
                  <span>
                    <span className="font-semibold text-slate-200">Tipo:</span>{" "}
                    <span className="capitalize">
                      <span
                        className={`px-2 py-0.5 rounded-full border text-xs uppercase tracking-wide ${getTypeBadgeClass(
                          gym.primaryType,
                        )}`}
                      >
                        {gym.primaryType}
                      </span>
                    </span>
                  </span>
                </p>

                <p className="text-slate-400 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">
                    Insígnia: {gym.badgeName}
                  </span>
                </p>

                <span className="text-xs text-slate-600 block pt-3">
                  Arquivo #{(index + 1).toString().padStart(3, "0")}
                </span>
              </div>

              {/* RIGHT IMAGES (placeholders por enquanto) */}
              <div className="grid grid-cols-3 gap-3">
                {/* Retrato do líder */}
                <div className="relative aspect-square rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  {gym.leaderImage ? (
                    <Image
                      src={gym.leaderImage}
                      alt={gym.leader}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-300 px-2 text-center">
                      Retrato de <span className="font-semibold">{gym.leader}</span>
                    </span>
                  )}
                </div>

                {/* Insígnia */}
                <div className="relative aspect-square rounded-xl border border-emerald-500/50 bg-slate-900/60 overflow-hidden flex items-center justify-center">
                  {gym.badgeImage ? (
                    <Image
                      src={gym.badgeImage}
                      alt={gym.badgeName}
                      fill
                      className="object-contain p-3"
                    />
                  ) : (
                    <span className="text-[11px] text-emerald-300 px-2 text-center">
                      {gym.badgeName}
                    </span>
                  )}
                </div>

                {/* Gym image 👇 */}
                <div className="relative aspect-square rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  {gym.gymImage ? (
                    <Image
                      src={gym.gymImage}
                      alt={gym.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400 px-2 text-center">
                      Estrutura do ginásio
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-slate-300 leading-relaxed">
                {gym.description}
              </p>
            </div>

            {/* TIME DO LÍDER */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold text-slate-200 mb-4">
                Time de {gym.leader}
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {gym.team.map((pokeId) => {
                  const info = pokemonMap[pokeId];
                  return (
                    <div
                      key={pokeId}
                      className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-xl border border-slate-800"
                    >
                      <img
                        src={getPokemonSprite(pokeId)}
                        alt={info ? info.name : `Pokémon ${pokeId}`}
                        className="w-16 h-16 object-contain mb-2"
                      />
                      <span className="text-xs text-slate-200 font-medium">
                        {info ? capitalize(info.name) : `#${pokeId}`}
                      </span>
                      <span className="text-[10px] text-slate-500 mb-1">
                        #{pokeId}
                      </span>
                      <div className="flex flex-wrap justify-center gap-1 mt-1">
                        {info?.types.map((type) => (
                          <span
                            key={type}
                            className={`px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wide ${getTypeBadgeClass(
                              type,
                            )}`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))

        /* ELITE FOUR */
        }
        <h2 className="text-3xl font-semibold">Elite Four</h2>

        {region.elite
          .filter((t) => t.role === "elite-four")
          .map((member, index) => (
            <section
              key={member.id}
              className="border border-slate-800 rounded-3xl p-8 bg-slate-950/60 space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT INFO */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-sky-400">
                    {member.name}
                  </h3>

                  <p className="text-slate-400">
                    <span className="font-semibold text-slate-200">Papel:</span>{" "}
                    Elite Four
                  </p>

                  <p className="text-slate-400 flex items-center gap-2">
                    <span className="font-semibold text-slate-200">
                      Especialidade:
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full border text-xs uppercase tracking-wide ${getTypeBadgeClass(
                        member.specialtyType,
                      )}`}
                    >
                      {member.specialtyType ?? "—"}
                    </span>
                  </p>

                  <span className="text-xs text-slate-600 block pt-3">
                    Registro E4-#{(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                {/* RIGHT: Retrato / Ace / Tipo */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Retrato */}
                  <div className="aspect-square rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] text-slate-300 px-2 text-center">
                        Retrato de{" "}
                        <span className="font-semibold">{member.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Ace Pokémon */}
                  <div className="aspect-square rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-center overflow-hidden">
                    {member.acePokemonId ? (
                      <img
                        src={getPokemonSprite(member.acePokemonId)}
                        alt={`Ace de ${member.name}`}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <span className="text-[11px] text-slate-400 px-2 text-center">
                        Ace não registrado
                      </span>
                    )}
                  </div>

                  {/* Painel de Tipo */}
                  <TypePanel type={member.specialtyType} />
                </div>
              </div>

              {/* DESCRIÇÃO */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-300 leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* TIME */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold text-slate-200 mb-4">
                  Time de {member.name}
                </h4>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {member.team.map((pokeId) => {
                    const info = pokemonMap[pokeId];
                    return (
                      <div
                        key={pokeId}
                        className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-xl border border-slate-800"
                      >
                        <img
                          src={getPokemonSprite(pokeId)}
                          alt={info ? info.name : `Pokémon ${pokeId}`}
                          className="w-16 h-16 object-contain mb-2"
                        />
                        <span className="text-xs text-slate-200 font-medium">
                          {info ? capitalize(info.name) : `#${pokeId}`}
                        </span>
                        <span className="text-[10px] text-slate-500 mb-1">
                          #{pokeId}
                        </span>
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {info?.types.map((type) => (
                            <span
                              key={type}
                              className={`px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wide ${getTypeBadgeClass(
                                type,
                              )}`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}

        {/* CAMPEÃO */}
        <h2 className="text-3xl font-semibold text-red-400">Campeão</h2>

        {region.elite
          .filter((t) => t.role === "champion")
          .map((champion) => (
            <section
              key={champion.id}
              className="border border-red-500/30 rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-slate-950 space-y-8 shadow-red-900/40 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT INFO */}
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-red-400">
                    {champion.name}
                  </h3>

                  <p className="text-slate-400">
                    <span className="font-semibold text-slate-200">Título:</span>{" "}
                    Campeão da Liga
                  </p>

                  {champion.specialtyType && (
                    <p className="text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-slate-200">
                        Estilo:
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full border text-xs uppercase tracking-wide ${getTypeBadgeClass(
                          champion.specialtyType,
                        )}`}
                      >
                        {champion.specialtyType}
                      </span>
                    </p>
                  )}
                </div>

                {/* RIGHT: retrato / Ace / Tipo */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Retrato */}
                  <div className="aspect-square rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-center overflow-hidden">
                    {champion.image ? (
                      <img
                        src={champion.image}
                        alt={champion.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] text-slate-300 px-2 text-center">
                        Retrato de{" "}
                        <span className="font-semibold">{champion.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Ace */}
                  <div className="aspect-square rounded-xl border border-red-500/40 bg-slate-900/60 flex items-center justify-center overflow-hidden">
                    {champion.acePokemonId ? (
                      <img
                        src={getPokemonSprite(champion.acePokemonId)}
                        alt={`Ace de ${champion.name}`}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <span className="text-[11px] text-slate-400 px-2 text-center">
                        Ace não registrado
                      </span>
                    )}
                  </div>

                  {/* Tipo */}
                  <TypePanel type={champion.specialtyType} />
                </div>
              </div>

              {/* DESCRIÇÃO */}
              <div className="pt-4 border-t border-red-500/30">
                <p className="text-slate-300 leading-relaxed">
                  {champion.description}
                </p>
              </div>

              {/* TIME DO CAMPEÃO */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold text-red-300 mb-4">
                  Time do Campeão {champion.name}
                </h4>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {champion.team.map((pokeId) => {
                    const info = pokemonMap[pokeId];
                    return (
                      <div
                        key={pokeId}
                        className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-xl border border-slate-800"
                      >
                        <img
                          src={getPokemonSprite(pokeId)}
                          alt={info ? info.name : `Pokémon ${pokeId}`}
                          className="w-16 h-16 object-contain mb-2"
                        />
                        <span className="text-xs text-slate-200 font-medium">
                          {info ? capitalize(info.name) : `#${pokeId}`}
                        </span>
                        <span className="text-[10px] text-slate-500 mb-1">
                          #{pokeId}
                        </span>
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {info?.types.map((type) => (
                            <span
                              key={type}
                              className={`px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wide ${getTypeBadgeClass(
                                type,
                              )}`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
