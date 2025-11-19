"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, Flame, Swords } from "lucide-react";
import { getCompetitiveRegionById } from "@/data/regions-competitive";

// Função utilitária simples
function getPokemonSprite(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export default function CompetitiveRegionPage() {
  const { regiao } = useParams<{ regiao: string }>();
  const region = getCompetitiveRegionById(regiao);

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

        {/* =========================== */}
        {/*           HEADER            */}
        {/* =========================== */}
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

        {/* =========================== */}
        {/*           OVERVIEW          */}
        {/* =========================== */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Visão Geral da Liga
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            {region.overview}
          </p>
        </section>

        {/* =========================== */}
        {/*           GINÁSIOS          */}
        {/* =========================== */}
        <h2 className="text-3xl font-semibold mt-10">Ginásios</h2>

        {region.gyms.map((gym, index) => (
          <section
            key={gym.id}
            className="border border-slate-800 rounded-3xl p-8 bg-slate-950/60 space-y-8"
          >
            {/* TOP */}
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
                    <span className="text-sky-400 capitalize">{gym.primaryType}</span>
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

              {/* RIGHT IMAGES */}
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-slate-300 leading-relaxed">
                {gym.description}
              </p>
            </div>

            {/* TEAM GRID */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold text-slate-200 mb-4">
                Time de {gym.leader}
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {gym.team.map((pokeId) => (
                  <div
                    key={pokeId}
                    className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-xl border border-slate-800"
                  >
                    <img
                      src={getPokemonSprite(pokeId)}
                      alt={`Pokémon ${pokeId}`}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <span className="text-xs text-slate-400">
                      #{pokeId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* =========================== */}
        {/*         ELITE FOUR          */}
        {/* =========================== */}
        <h2 className="text-3xl font-semibold">Elite Four</h2>

        {region.elite
          .filter((t) => t.role === "elite-four")
          .map((member, index) => (
            <section
              key={member.id}
              className="border border-slate-800 rounded-3xl p-8 bg-slate-950/60 space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-sky-400">
                    {member.name}
                  </h3>

                  <p className="text-slate-400">
                    <span className="font-semibold text-slate-200">Papel:</span>{" "}
                    Elite Four
                  </p>

                  <p className="text-slate-400">
                    <span className="font-semibold text-slate-200">
                      Especialidade:
                    </span>{" "}
                    <span className="text-sky-400 capitalize">
                      {member.specialtyType ?? "—"}
                    </span>
                  </p>

                  <span className="text-xs text-slate-600 block pt-3">
                    Registro E4-#{(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                {/* RIGHT IMAGES */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                  <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                  <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-300 leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* TEAM GRID */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold text-slate-200 mb-4">
                  Time de {member.name}
                </h4>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {member.team.map((pokeId) => (
                    <div
                      key={pokeId}
                      className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-xl border border-slate-800"
                    >
                      <img
                        src={getPokemonSprite(pokeId)}
                        alt={`Pokémon ${pokeId}`}
                        className="w-16 h-16 object-contain mb-2"
                      />
                      <span className="text-xs text-slate-400">
                        #{pokeId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

        {/* =========================== */}
        {/*           CAMPEÃO           */}
        {/* =========================== */}
        <h2 className="text-3xl font-semibold text-red-400">Campeão</h2>

        {region.elite
          .filter((t) => t.role === "champion")
          .map((champion) => (
            <section
              key={champion.id}
              className="border border-red-500/30 rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-slate-950 space-y-8 shadow-red-900/40 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT */}
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-red-400">
                    {champion.name}
                  </h3>

                  <p className="text-slate-400">
                    <span className="font-semibold text-slate-200">Título:</span>{" "}
                    Campeão da Liga
                  </p>

                  {champion.specialtyType && (
                    <p className="text-slate-400">
                      <span className="font-semibold text-slate-200">
                        Estilo:
                      </span>{" "}
                      <span className="text-red-400 capitalize">
                        {champion.specialtyType}
                      </span>
                    </p>
                  )}
                </div>

                {/* RIGHT IMAGES */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                  <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                  <div className="aspect-square bg-slate-900/40 rounded-xl border border-slate-800" />
                </div>
              </div>

              <div className="pt-4 border-t border-red-500/30">
                <p className="text-slate-300 leading-relaxed">
                  {champion.description}
                </p>
              </div>

              {/* TEAM GRID */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold text-red-300 mb-4">
                  Time do Campeão {champion.name}
                </h4>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {champion.team.map((pokeId) => (
                    <div
                      key={pokeId}
                      className="flex flex-col items-center text-center p-4 bg-slate-900/40 rounded-xl border border-slate-800"
                    >
                      <img
                        src={getPokemonSprite(pokeId)}
                        alt={`Pokémon ${pokeId}`}
                        className="w-16 h-16 object-contain mb-2"
                      />
                      <span className="text-xs text-slate-400">
                        #{pokeId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

      </div>
    </div>
  );
}
