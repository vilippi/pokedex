// app/competitivo/page.tsx
"use client";

import Link from "next/link";
// Se você já usa o Button do shadcn/ui, descomenta a linha abaixo
// import { Button } from "@/components/ui/button";

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
              Monte o seu time, estude o meta e entenda como seus Pokémon
              funcionam em conjunto. Analise sinergias de tipo, fraquezas
              compartilhadas e funções essenciais para dominar as batalhas.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* Se estiver usando shadcn/Button, use o componente. 
                 Vou manter com <Link> estilizado para evitar conflito. */}
              <Link
                href="/competitivo/time"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
              >
                Montar meu time competitivo
              </Link>

              <span className="text-xs text-slate-400">
                Comece escolhendo seus Pokémon e veja o resumo do time.
              </span>
            </div>
          </div>

          {/* LADO DIREITO – placeholder para futuro gráfico/ilustração */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
              Visão rápida do time
            </div>
            <p className="text-sm text-slate-300">
              Em breve aqui você verá um resumo visual do seu time:
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              <li>• Quantidade de tipos diferentes</li>
              <li>• Fraquezas em comum</li>
              <li>• Funções presentes (wall, sweeper, suporte...)</li>
              <li>• Papel de cada Pokémon no conjunto</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Por enquanto, comece montando seu time para ativar essa área.
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
              Estado atual: nenhum time salvo
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5">
            <p className="text-sm text-slate-300">
              Você ainda não montou um time competitivo.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Assim que você escolher seus Pokémon, esta área vai mostrar um
              painel com:
            </p>
            <ul className="mt-2 grid gap-2 text-xs text-slate-300 md:grid-cols-2">
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Cobertura de tipos
                </span>
                <span className="text-sm">
                  Quais tipos ofensivos/defensivos o time cobre bem.
                </span>
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Fraquezas em comum
                </span>
                <span className="text-sm">
                  Quantos Pokémon são fracos ao mesmo tipo.
                </span>
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Funções do time
                </span>
                <span className="text-sm">
                  Quantos sweepers, tanks, suportes, etc.
                </span>
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
                <span className="block text-[11px] text-slate-400">
                  Ameaças comuns
                </span>
                <span className="text-sm">
                  Tipos ou perfis de Pokémon que seu time sofre para enfrentar.
                </span>
              </li>
            </ul>

            <div className="mt-4">
              <Link
                href="/competitivo/time"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-500/60 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/10"
              >
                Começar montando meu primeiro time
              </Link>
            </div>
          </div>
        </section>

        {/* SEÇÃO: META / TENDÊNCIAS */}
        <section className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Visão geral do meta
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-1">
                Pokémon mais usados
              </h3>
              <p className="text-xs text-slate-300">
                Veja quais Pokémon aparecem com mais frequência nos times
                competitivos. Use isso a seu favor: para copiar ideias ou se
                preparar contra eles.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-1">
                Funções essenciais do time
              </h3>
              <p className="text-xs text-slate-300">
                Entenda a importância de ter pelo menos um setter de campo,
                controle de hazards, um sweeper confiável e opções defensivas.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-1">
                Ameaças do momento
              </h3>
              <p className="text-xs text-slate-300">
                Descubra quais estilos de time (chuva, sol, Trick Room, hyper
                offense...) estão em destaque e como seu time pode responder.
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
                Entenda a base de qualquer time competitivo: funções,
                sinergias e como evitar fraquezas óbvias.
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
                O papel de cada Pokémon em campo e por que um time só de
                atacante quase nunca funciona.
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
                Entry hazards, Defog, Rapid Spin e como isso muda totalmente o
                ritmo de uma partida.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
