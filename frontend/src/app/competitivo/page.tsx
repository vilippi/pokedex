// app/competitivo/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function CompetitivoHomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">
        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-[1.5fr,1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-2">
              Módulo Competitivo
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              Centro Competitivo Global
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-300 max-w-xl">
              Aqui é o seu hub competitivo. Crie, organize e analise seus times,
              entendendo como cada Pokémon contribui para o conjunto. Descubra
              sinergias, fraquezas em comum e como seu time se encaixa no meta.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* BOTÃO PRINCIPAL → TIME */}
              <Link
                href="/competitivo/time"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
              >
                Ir para o Time (criar, arrumar e analisar)
              </Link>

              <span className="text-xs text-slate-400">
                Clique para montar seu time, ajustar os slots e ver a análise
                completa em conjunto.
              </span>
            </div>
          </div>

          {/* LADO DIREITO – futuro painel de resumo do time */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
              Resumo do time
            </div>
            <p className="text-sm text-slate-300">
              Assim que você montar um time na página de Time, esta área vai
              mostrar um painel rápido com:
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              <li>• Cobertura de tipos ofensivos e defensivos</li>
              <li>• Fraquezas em comum entre os Pokémon</li>
              <li>• Funções do time (tank, sweeper, suporte...)</li>
              <li>• Pontos fortes e ameaças mais críticas</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Por enquanto, comece configurando seu time clicando no botão
              acima.
            </p>
          </div>
        </section>

        {/* SEÇÃO: SEU TIME ATUAL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg md:text-xl font-semibold">
              Seu time competitivo
            </h2>
            <span className="text-xs text-slate-400">
              Estado atual: nenhum time configurado
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5">
            <p className="text-sm text-slate-300">
              Você ainda não configurou um time competitivo.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Ao montar seu time na página de Time, este painel será preenchido
              automaticamente com dados agregados:
            </p>
            <ul className="mt-2 grid gap-2 text-xs text-slate-300 md:grid-cols-2">
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Cobertura de tipos
                </span>
                <span className="text-sm">
                  Quais tipos o seu time cobre bem ofensiva e defensivamente.
                </span>
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Fraquezas em comum
                </span>
                <span className="text-sm">
                  Quantos Pokémon compartilham a mesma fraqueza crítica.
                </span>
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Funções do time
                </span>
                <span className="text-sm">
                  Quantos sweepers, walls, suportes e pivôs seu time possui.
                </span>
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Ameaças comuns
                </span>
                <span className="text-sm">
                  Estilos de time ou tipos que podem pressionar sua composição.
                </span>
              </li>
            </ul>

            <div className="mt-4">
              <Link
                href="/competitivo/time"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-500/60 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/10"
              >
                Ir para o Time e começar a montar
              </Link>
            </div>
          </div>
        </section>

        {/* SEÇÃO: META / TENDÊNCIAS – PÓDIO + MAIS DUAS LINHAS */}
        <section className="space-y-5">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">
              Visão geral do meta
            </h2>
            <p className="text-xs text-slate-400 max-w-lg mt-1">
              Uma visão rápida do cenário competitivo atual. Use essas
              informações como referência para montar e ajustar o seu time.
            </p>
          </div>

          {/* PÓDIO FIXO COM SPRITES */}
          <div className="grid gap-4 md:grid-cols-3 items-end">
            {/* 2° – Pikachu */}
            <div className="order-2 md:order-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col items-center">
              <span className="mb-2 inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                2º lugar
              </span>

              <div className="relative mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-slate-800/70 border border-slate-700">
                <Image
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/892.png"
                  alt="Urshifu"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <span className="text-sm font-semibold text-slate-50">
                Urshifu (Rapid Strike)
              </span>
              <span className="mt-1 text-[11px] text-slate-400">
                Um atacante físico poderoso
              </span>
            </div>

            {/* 1° – Snorlax (CARD CENTRAL DESTACADO) */}
            <div className="order-1 md:order-2 rounded-2xl border border-red-500/60 bg-slate-900 p-5 shadow-xl shadow-red-500/25 scale-[1.05] flex flex-col items-center">
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-red-500/10 border border-red-400 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-red-300">
                🥇 1º lugar
              </span>

              <div className="relative mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-slate-900 border border-red-500/60">
                <Image
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/727.png"
                  alt="Incineroar"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>

              <span className="text-sm font-semibold text-slate-50">
                Incineroar 
              </span>
              <span className="mt-1 text-[11px] text-red-200">
                Popular pelo Fake Out
              </span>
            </div>

            {/* 3° – Chalizard */}
            <div className="order-3 md:order-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col items-center">
              <span className="mb-2 inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                3º lugar
              </span>

              <div className="relative mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-slate-800/70 border border-slate-700">
                <Image
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/812.png"
                  alt="Chalizard"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <span className="text-sm font-semibold text-slate-50">
                Rillaboom
              </span>
              <span className="mt-1 text-[11px] text-slate-400">
                Frequentemente utilizado como atacante
              </span>
            </div>
          </div>

          {/* LINHA EXTRA – MOVES MAIS USADOS & TIMES MAIS USADOS */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Moves mais usados */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                  Moves mais usados
                </span>
                <span className="text-xs text-slate-500">Tendência ofensiva</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-50">
                Golpes que definem partidas
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Visão rápida dos golpes mais presentes nos times competitivos.
              </p>

              {/* 🔵 3 círculos: 2° • 1° • 3° */}
              <div className="mt-4 flex items-end justify-center gap-5">
                {/* 2° lugar */}
                <div className="flex flex-col items-center text-[11px] text-slate-300">
                  <span className="mb-1 text-[12px] uppercase tracking-wide text-slate-400">
                    2º lugar
                  </span>
                  <div className="flex h-18 w-18 items-center justify-center rounded-full bg-slate-800 border border-slate-600">
                    <span className="px-2 text-[10px] text-center leading-tight">
                      Flamethrower
                    </span>
                  </div>
                </div>

                {/* 1° lugar (maiorzinho) */}
                <div className="flex flex-col items-center text-[11px] text-emerald-200">
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-400 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    🥇 1º lugar
                  </span>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 border border-emerald-500 shadow-lg shadow-emerald-500/30">
                    <span className="px-2 text-[14px] text-center leading-tight">
                      Close Combat
                    </span>
                  </div>
                </div>

                {/* 3° lugar */}
                <div className="flex flex-col items-center text-[11px] text-slate-300">
                  <span className="mb-1 text-[12px] uppercase tracking-wide text-slate-400">
                    3º lugar
                  </span>
                  <div className="flex h-18 w-18 items-center justify-center rounded-full bg-slate-800 border border-slate-600">
                    <span className="px-2 text-[10px] text-center leading-tight">
                      Thunderbolt
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                Use essa visão para entender quais golpes são quase obrigatórios no meta
                atual e ajustar a cobertura do seu time.
              </p>
            </div>

            {/* Times mais usados */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                  Times mais usados
                </span>
                <span className="text-xs text-slate-500">Arquétipos populares</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-50">
                Composições que dominam o meta
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Visão dos estilos de time que mais aparecem no cenário competitivo.
              </p>

              {/* 🔵 3 círculos: 2° • 1° • 3° */}
              <div className="mt-4 flex items-end justify-center gap-5">
                {/* 2° lugar */}
                <div className="flex flex-col items-center text-[11px] text-slate-300">
                  <span className="mb-1 text-[12px] uppercase tracking-wide text-slate-400">
                    2º lugar
                  </span>
                  <div className="flex h-18 w-18 items-center justify-center rounded-full bg-slate-800 border border-slate-600">
                    <span className="px-2 text-[12px] text-center leading-tight">
                      Rain Offense
                    </span>
                  </div>
                </div>

                {/* 1° lugar (maiorzinho) */}
                <div className="flex flex-col items-center text-[11px] text-emerald-200">
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-400 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    🥇 1º lugar
                  </span>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 border border-emerald-500 shadow-lg shadow-emerald-500/30">
                    <span className="px-2 text-[14px] text-center leading-tight">
                      Balance Core
                    </span>
                  </div>
                </div>

                {/* 3° lugar */}
                <div className="flex flex-col items-center text-[11px] text-slate-300">
                  <span className="mb-1 text-[12px] uppercase tracking-wide text-slate-400">
                    3º lugar
                  </span>
                  <div className="flex h-18 w-18 items-center justify-center rounded-full bg-slate-800 border border-slate-600">
                    <span className="px-2 text-[12px] text-center leading-tight">
                      Sun Hyper
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                Ideal para entender quais estilos você mais vai enfrentar e como ajustar
                o seu time para não ficar vulnerável a um único arquétipo.
              </p>
            </div>
          </div>
        </section>


        {/* GUIAS RÁPIDOS */}
        <section className="space-y-3 pb-10">
          <h2 className="text-lg md:text-xl font-semibold">
            Guias rápidos para melhorar seu time
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            <Link
              href="#"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-500/70 hover:bg-slate-900 transition"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Guia
              </span>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Como montar um time equilibrado
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Conceitos básicos para criar um time que não dependa só de um
                Pokémon ou de uma única win condition.
              </p>
            </Link>

            <Link
              href="#"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-500/70 hover:bg-slate-900 transition"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Guia
              </span>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Funções: Tank, Sweeper, Suporte
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Entenda a função de cada Pokémon e por que diversidade de
                papéis é essencial em times competitivos.
              </p>
            </Link>

            <Link
              href="#"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-500/70 hover:bg-slate-900 transition"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Guia
              </span>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                Hazards e controle de campo
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Stealth Rock, Spikes, Defog, Rapid Spin e como isso muda o
                resultado de uma partida sem você perceber.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
