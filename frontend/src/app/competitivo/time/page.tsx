"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnalysisCard } from "../../../components/competitive/analysis-card";
import { Button } from "../../../components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { StrategyAnalysis } from "@/data/comp";

type PokemonRole = "sweeper" | "tank" | "support" | "speedster" | "balanced";

interface PokemonOption {
  id: number;
  name: string;
  types: string[]; // traduzidos pra PT-BR
  role: PokemonRole;
}

// Tradução básica dos tipos da PokeAPI -> PT-BR
const TYPE_TRANSLATIONS: Record<string, string> = {
  electric: "Elétrico",
  fire: "Fogo",
  water: "Água",
  grass: "Grama",
  normal: "Normal",
  ghost: "Fantasma",
  poison: "Venenoso",
  flying: "Voador",
  psychic: "Psíquico",
  dragon: "Dragão",
  ice: "Gelo",
  rock: "Pedra",
  ground: "Terra",
  steel: "Aço",
  dark: "Noturno",
  bug: "Inseto",
  fairy: "Fada",
  fighting: "Lutador",
};

const typeBadgeStyle: Record<string, string> = {
  Elétrico: "border-yellow-500/60 bg-yellow-500/10 text-yellow-200",
  Fogo: "border-orange-500/60 bg-orange-500/10 text-orange-200",
  Voador: "border-sky-400/60 bg-sky-400/10 text-sky-200",
  Normal: "border-slate-400/60 bg-slate-400/10 text-slate-100",
  Fantasma: "border-purple-500/60 bg-purple-500/10 text-purple-200",
  Venenoso: "border-fuchsia-500/60 bg-fuchsia-500/10 text-fuchsia-200",
  Água: "border-blue-500/60 bg-blue-500/10 text-blue-200",
  Grama: "border-emerald-500/60 bg-emerald-500/10 text-emerald-200",
  Psíquico: "border-pink-500/60 bg-pink-500/10 text-pink-200",
  Dragão: "border-indigo-500/60 bg-indigo-500/10 text-indigo-200",
  Gelo: "border-cyan-500/60 bg-cyan-500/10 text-cyan-200",
  Pedra: "border-amber-500/60 bg-amber-500/10 text-amber-200",
  Terra: "border-yellow-700/60 bg-yellow-700/10 text-yellow-200",
  Aço: "border-slate-300/60 bg-slate-300/10 text-slate-100",
  Noturno: "border-gray-700/60 bg-gray-700/10 text-gray-200",
  Inseto: "border-lime-500/60 bg-lime-500/10 text-lime-200",
  Fada: "border-pink-300/60 bg-pink-300/10 text-pink-100",
};

function mapTypeName(apiName: string): string {
  return TYPE_TRANSLATIONS[apiName] ?? apiName;
}

function roleLabel(role: PokemonRole): string {
  switch (role) {
    case "sweeper":
      return "Sweeper";
    case "tank":
      return "Tank";
    case "support":
      return "Suporte";
    case "speedster":
      return "Speedster";
    case "balanced":
      return "Balanceado";
  }
}

// Heurística simples pra deduzir o "role" pelos base stats
function guessRoleFromStats(detail: any): PokemonRole {
  const statsMap: Record<string, number> = {};
  for (const s of detail.stats as any[]) {
    statsMap[s.stat.name] = s.base_stat;
  }

  const hp = statsMap["hp"] ?? 0;
  const atk = statsMap["attack"] ?? 0;
  const def = statsMap["defense"] ?? 0;
  const spa = statsMap["special-attack"] ?? 0;
  const spd = statsMap["special-defense"] ?? 0;
  const spe = statsMap["speed"] ?? 0;

  const offensive = atk + spa;
  const defensive = hp + def + spd;

  if (spe >= 100 && offensive >= defensive) return "speedster";
  if (offensive >= defensive + 30) return "sweeper";
  if (defensive >= offensive + 30) return "tank";
  return "balanced";
}

export default function TimeCompetitivoPage() {
  const [team, setTeam] = useState<(PokemonOption | null)[]>(Array(6).fill(null));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(0);

  const [pokemonPool, setPokemonPool] = useState<PokemonOption[]>([]);
  const [isLoadingPool, setIsLoadingPool] = useState(false);
  const [poolError, setPoolError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  // 🔎 Lista filtrada pela busca
  const filteredPool = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return pokemonPool.filter((p) => p.name.toLowerCase().includes(term));
  }, [pokemonPool, searchTerm]);

  // 🔗 Buscar TODOS os Pokémon (limite alto)
  useEffect(() => {
    async function fetchPokemonPool() {
      try {
        setIsLoadingPool(true);
        setPoolError(null);

        // Pega praticamente todos os Pokémon disponíveis
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"
        );
        if (!res.ok) throw new Error("Falha ao buscar lista de Pokémon");
        const data = await res.json();

        const detailed: PokemonOption[] = await Promise.all(
          (data.results as { name: string; url: string }[]).map(
            async (p) => {
              const detailRes = await fetch(p.url);
              const detail = await detailRes.json();

              const types: string[] = (detail.types as any[]).map((t) =>
                mapTypeName(t.type.name)
              );

              const role = guessRoleFromStats(detail);

              const nameFormatted =
                p.name.charAt(0).toUpperCase() + p.name.slice(1);

              return {
                id: detail.id,
                name: nameFormatted,
                types,
                role,
              };
            }
          )
        );

        setPokemonPool(detailed);
      } catch (err) {
        console.error(err);
        setPoolError("Não foi possível carregar a lista de Pokémon agora.");
      } finally {
        setIsLoadingPool(false);
      }
    }

    fetchPokemonPool();
  }, []);

  function handleSelectPokemon(pokemon: PokemonOption) {
    if (selectedSlot !== null) {
      const newTeam = [...team];
      newTeam[selectedSlot] = pokemon;
      setTeam(newTeam);
      return;
    }

    const firstEmptyIndex = team.findIndex((slot) => slot === null);
    if (firstEmptyIndex !== -1) {
      const newTeam = [...team];
      newTeam[firstEmptyIndex] = pokemon;
      setTeam(newTeam);
    }
  }

  function clearSlot(index: number) {
    const newTeam = [...team];
    newTeam[index] = null;
    setTeam(newTeam);
  }

  const filledTeam = team.filter(Boolean) as PokemonOption[];
  const teamSize = filledTeam.length;

  const analysis: StrategyAnalysis | null = useMemo(() => {
    if (!filledTeam.length) return null;
    return buildAnalysisFromTeam(filledTeam);
  }, [filledTeam]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
        {/* HEADER */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-emerald-400/80">
              <Brain className="h-4 w-4" />
              IA Coach Competitiva
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Criação e análise avançada de time
            </h1>
            <p className="mt-2 text-xs md:text-sm text-slate-300 max-w-2xl">
              Monte o seu time com qualquer Pokémon da PokéAPI e deixe a IA
              Coach analisar sinergia, cobertura de tipos e estratégia
              competitiva.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/competitivo"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-900/70"
            >
              Voltar para o Hub
            </Link>
            <Button
              size="sm"
              className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              disabled={teamSize === 0}
            >
              <Sparkles className="h-4 w-4" />
              Recalcular análise
            </Button>
          </div>
        </header>

        {/* GRID PRINCIPAL */}
        <div className="grid gap-8 md:grid-cols-[1.1fr,1.6fr] items-start">
          {/* COLUNA ESQUERDA – TIME + BUSCA */}
          <section className="space-y-5">
            {/* TIME */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm md:text-base font-semibold">
                    Seu time competitivo
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Selecione um slot e depois um Pokémon para montar o time.
                  </p>
                </div>
                <span className="text-[11px] rounded-full border border-slate-700 px-2 py-0.5 text-slate-300">
                  {teamSize}/6 Pokémon
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {team.map((pokemon, index) => {
                  const isSelected = selectedSlot === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setSelectedSlot((prev) =>
                          prev === index ? null : index
                        )
                      }
                      className={[
                        "flex flex-col items-stretch rounded-xl border px-2 py-2 text-left transition",
                        pokemon
                          ? "border-emerald-500/70 bg-slate-900"
                          : "border-dashed border-slate-700 bg-slate-900/40",
                        isSelected
                          ? "ring-2 ring-emerald-500/70 ring-offset-2 ring-offset-slate-950"
                          : "",
                      ].join(" ")}
                    >
                      <div className="mb-1 flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase tracking-wide text-slate-500">
                          Slot {index + 1}
                        </span>
                        {pokemon && (
                          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200">
                            {roleLabel(pokemon.role)}
                          </span>
                        )}
                      </div>

                      {pokemon ? (
                        <>
                          <span className="text-xs font-semibold text-slate-50">
                            {pokemon.name}
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {pokemon.types.map((t) => (
                              <span
                                key={t}
                                className={[
                                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px]",
                                  typeBadgeStyle[t] ??
                                    "border-slate-600 text-slate-200",
                                ].join(" ")}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearSlot(index);
                            }}
                            className="mt-2 rounded-full border border-red-500/60 px-2 py-0.5 text-[10px] text-red-300 hover:bg-red-500/10"
                          >
                            Remover
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-1 flex-col items-start justify-center">
                          <span className="text-[11px] text-slate-400">
                            Escolher Pokémon
                          </span>
                          <span className="mt-1 text-[10px] text-slate-500">
                            Clique aqui e depois pesquise
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                Dica da IA Coach: tente combinar pelo menos um tank, um sweeper
                principal e um suporte para começar.
              </p>
            </div>

            {/* BUSCA DE POKÉMON – PokeAPI */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">Buscar Pokémon</h3>
                  <p className="text-[11px] text-slate-400">
                    Digite o nome do Pokémon que você quer adicionar ao time.
                  </p>
                </div>
                {isLoadingPool && (
                  <span className="text-[11px] text-slate-400">
                    Carregando PokéAPI...
                  </span>
                )}
                {poolError && (
                  <span className="text-[11px] text-red-400">
                    {poolError}
                  </span>
                )}
              </div>

              {/* Barra de busca */}
              <div className="mb-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ex: Pikachu, Charizard, Gengar..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500"
                />
              </div>

              {!searchTerm.trim() && (
                <p className="text-[11px] text-slate-500">
                  Comece digitando o nome de um Pokémon para ver os resultados.
                </p>
              )}

              {searchTerm.trim() &&
                filteredPool.length === 0 &&
                !isLoadingPool &&
                !poolError && (
                  <p className="text-[11px] text-slate-500">
                    Nenhum Pokémon encontrado para{" "}
                    <span className="font-semibold">{searchTerm}</span>. Verifique
                    o nome ou tente outro.
                  </p>
                )}

              {filteredPool.length > 0 && (
                <div className="mt-2 grid gap-3 max-h-[260px] overflow-y-auto pr-1">
                  {filteredPool.map((pokemon) => (
                    <button
                      key={pokemon.id}
                      type="button"
                      onClick={() => handleSelectPokemon(pokemon)}
                      className="flex items-start justify-between rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-left text-xs text-slate-200 hover:border-emerald-500/70 hover:bg-slate-900 transition"
                    >
                      <div>
                        <span className="font-semibold text-[12px]">
                          {pokemon.name}
                        </span>
                        <span className="mt-1 block text-[10px] text-emerald-300">
                          {roleLabel(pokemon.role)}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {pokemon.types.map((t) => (
                            <span
                              key={t}
                              className={[
                                "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px]",
                                typeBadgeStyle[t] ??
                                  "border-slate-600 text-slate-200",
                              ].join(" ")}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* COLUNA DIREITA – IA COACH */}
          <section className="space-y-4">
            {!analysis ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-sm text-slate-300">
                <p className="mb-2 font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  A IA Coach está esperando o seu time
                </p>
                <p className="text-xs text-slate-400 max-w-md">
                  Adicione pelo menos um Pokémon ao time para que a IA Coach
                  gere uma análise avançada de sinergia, cobertura de tipos,
                  roles e estratégias de batalha.
                </p>
              </div>
            ) : (
              <AnalysisCard analysis={analysis} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/**
 * Transforma o time em um StrategyAnalysis
 */
function buildAnalysisFromTeam(team: PokemonOption[]): StrategyAnalysis {
  const names = team.map((p) => p.name);
  const roles = team.map((p) => p.role);

  const typeCounts: Record<string, number> = {};
  team.forEach((p) =>
    p.types.forEach((t) => {
      typeCounts[t] = (typeCounts[t] ?? 0) + 1;
    })
  );

  const uniqueTypes = Object.keys(typeCounts);
  const diversityScore = Math.min(40, uniqueTypes.length * 7);
  const sizeScore = Math.min(30, team.length * 5);

  const sweeperCount = roles.filter((r) => r === "sweeper").length;
  const tankCount = roles.filter((r) => r === "tank").length;
  const supportCount = roles.filter((r) => r === "support").length;
  const speedsterCount = roles.filter((r) => r === "speedster").length;
  const balancedCount = roles.filter((r) => r === "balanced").length;

  const roleVariety = [
    sweeperCount > 0,
    tankCount > 0,
    supportCount > 0,
    speedsterCount > 0,
    balancedCount > 0,
  ].filter(Boolean).length;

  const roleScore = Math.min(30, roleVariety * 6);

  const rawScore = 40 + diversityScore + sizeScore + roleScore;
  const teamScore = Math.max(45, Math.min(98, Math.round(rawScore / 2)));

  const strengths: StrategyAnalysis["strengths"] = uniqueTypes.map((t) => ({
    type: t,
    coverage: typeCounts[t],
  }));

  const weaknesses: StrategyAnalysis["weaknesses"] = [];

  if (tankCount === 0) {
    weaknesses.push({
      type: "Defesa física frágil",
      severity: "high",
      count: team.length,
      affectedPokemon: names,
    });
  }

  if (supportCount === 0) {
    weaknesses.push({
      type: "Falta de suporte/utility",
      severity: "medium",
      count: team.length,
      affectedPokemon: names,
    });
  }

  if (uniqueTypes.length <= 2) {
    weaknesses.push({
      type: "Baixa diversidade de tipos",
      severity: "critical",
      count: team.length,
      affectedPokemon: names,
    });
  }

  const roleBalance: StrategyAnalysis["roleBalance"] = {
    physicalSweepers: sweeperCount,
    specialSweepers: 0,
    physicalTanks: tankCount,
    specialTanks: 0,
    speedsters: speedsterCount,
    wallBreakers: balancedCount,
    supports: supportCount,
    balanced: balancedCount,
    recommendation: "",
  };

  let recommendation = "";

  if (tankCount === 0) {
    recommendation +=
      "Seu time carece de tanks consistentes. Considere adicionar pelo menos um Pokémon com alto bulk para segurar pressão.\n";
  }
  if (supportCount === 0) {
    recommendation +=
      "Não há suporte claro no time. Moves de utility (screens, status, hazard control) podem fazer muita diferença.\n";
  }
  if (sweeperCount === 0) {
    recommendation +=
      "Você ainda não tem uma win condition ofensiva clara. Um sweeper principal ajuda a definir sua forma de vencer.\n";
  }
  if (!recommendation) {
    recommendation =
      "O balanceamento de roles está saudável. Agora o foco deve ser lapidar detalhes de cobertura de golpes e checks específicos do meta.";
  }

  roleBalance.recommendation = recommendation;

  const synergies: StrategyAnalysis["synergies"] = [];
  for (let i = 0; i < team.length - 1; i++) {
    const a = team[i];
    const b = team[i + 1];
    if (!a || !b) continue;
    synergies.push({
      pokemon1: a.name,
      pokemon2: b.name,
      score: 10 + Math.floor(Math.random() * 15),
      description: `Boa sinergia ofensiva/defensiva entre ${a.name} e ${b.name}, cobrindo fraquezas e mantendo pressão em campo.`,
    });
  }

  const battleStrategyLines: string[] = [];

  battleStrategyLines.push(
    `Este time é construído em torno de ${names[0]} como um dos pilares principais, com suporte de ${names
      .slice(1)
      .join(", ")}.`
  );

  if (sweeperCount > 0) {
    battleStrategyLines.push(
      "A estratégia ofensiva gira em torno de criar janelas seguras para o sweeper entrar em campo e pressionar o oponente."
    );
  }

  if (tankCount > 0) {
    battleStrategyLines.push(
      "Os tanks do time seguram o ritmo da partida, absorvendo dano enquanto você ajusta o posicionamento e prepara suas condições de vitória."
    );
  }

  if (supportCount > 0) {
    battleStrategyLines.push(
      "Os suportes ajudam a controlar o campo com hazards, remoção e status, dificultando a reação do adversário."
    );
  }

  battleStrategyLines.push(
    "Em partidas mais longas, foque em rotacionar bem seus Pokémon, preservar a condição de vitória e punir trocas previsíveis."
  );

  const battleStrategy = battleStrategyLines.join("\n\n");

  const counterTeams: StrategyAnalysis["counterTeams"] = [
    {
      name: "Hyper Offense de prioridade",
      dangerLevel: "high",
      commonPokemon: ["Weavile", "Dragonite", "Scizor"],
      counterStrategy:
        "Mantenha sempre um tank saudável e tente limitar o setup do oponente com pressão constante e controle de hazards.",
    },
    {
      name: "Stall focado em status",
      dangerLevel: "medium",
      commonPokemon: ["Blissey", "Toxapex", "Corviknight"],
      counterStrategy:
        "Valorize seus breakers e não desperdice recursos cedo. Moves de setup, Taunt e wallbreakers fortes são essenciais.",
    },
  ];

  return {
    teamScore,
    strengths,
    weaknesses,
    synergies,
    roleBalance,
    battleStrategy,
    counterTeams,
  };
}
