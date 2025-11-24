"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { getRegionById } from "@/data/regions";

function formatName(name: string): string {
    return name
        .replace(/-/g, " ")
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

export default function RegionPage() {
    const params = useParams<{ regiao: string }>();
    const regiaoSlug = String(params.regiao ?? "").toLowerCase();
    const data = getRegionById(regiaoSlug);

    if (!data) {
        return (
            <div className="space-y-6">
                <header className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Região não encontrada
                    </h1>
                    <p className="text-sm text-slate-400">
                        O identificador informado não corresponde a nenhuma região
                        registrada na Pokédex.
                    </p>
                </header>
                <Link
                    href="/mundo"
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-sky-500 hover:bg-slate-900"
                >
                    ← Voltar para o mundo
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Cabeçalho + voltar */}
            <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                        Regional Dex · {data.generation}
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Região {data.name}
                    </h1>
                    <p className="text-xs text-slate-400 sm:text-sm">
                        Painel regional da Pokédex. Visualizando dados consolidados da
                        Pokédex de {data.name}.
                    </p>
                </div>

                <div className="flex gap-2 sm:justify-end">
                    <Link
                        href="/mundo"
                        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-sky-500 hover:bg-slate-900"
                    >
                        ← Voltar para o mundo
                    </Link>

                    <Link
                        href={`/mundo/${regiaoSlug}/competitivo`}
                        className="inline-flex items-center rounded-full border border-sky-500/80 bg-sky-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300 hover:bg-sky-500/20 hover:text-sky-100"
                    >
                        Info. Competitiva da região
                    </Link> 
                </div>
            </header>

            {/* 1. Carrossel Swiper */}
            <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-3 shadow-xl shadow-slate-950/40 sm:p-4">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1}
                    className="w-full"
                >
                    {data.images.map((src, index) => (
                        <SwiperSlide key={src}>
                            <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80">
                                <Image
                                    src={src}
                                    alt={`Imagem ${index + 1} da região ${data.name}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 space-y-1">
                                    <span className="inline-flex rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-mono text-slate-200">
                                        {data.generation}
                                    </span>
                                    <p className="text-sm text-slate-100">
                                        Região {data.name} · Imagem {index + 1}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* 2. Cards: Região, Geração, Total de Pokémon */}
            <section className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Região
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-50">
                        {data.name}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Geração
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-50">
                        {data.generation}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Total de Pokémon na Pokédex regional
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-50">
                        {data.totalPokemon.toLocaleString("pt-BR")}
                    </p>
                </div>
            </section>

            {/* 3. História + Curiosidades */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                {/* Card grande de história */}
                <article className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-md shadow-slate-950/40">
                    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                        História da região {data.name}
                    </h2>
                    <p className="mt-3 text-sm text-slate-300 sm:text-base">
                        {data.history}
                    </p>
                </article>

                {/* Cards pequenos de curiosidades */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                        Curiosidades de campo
                    </h3>
                    <div className="space-y-3">
                        {data.facts.map((fact, index) => (
                            <article
                                key={index}
                                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300 sm:text-sm"
                            >
                                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-sky-400">
                                    Registro #{(index + 1).toString().padStart(2, "0")}
                                </p>
                                <p>{fact}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Pokémon em destaque na região */}
            <section className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                            Espécies em destaque na região
                        </h2>
                        <p className="text-xs text-slate-400 sm:text-sm">
                            Amostra de Pokémon fortemente associados à Pokédex regional de{" "}
                            {data.name}. Selecione um para abrir a ficha técnica completa.
                        </p>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {data.featuredPokemon.map((p) => {
                        const displayName = formatName(p.name);
                        const paddedId = p.id.toString().padStart(4, "0");
                        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;

                        return (
                            <Link
                                key={p.id}
                                href={`/pokemon/${p.id}`}
                                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200 shadow-sm shadow-slate-950/40 transition hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-sky-900/40"
                            >
                                <div className="relative mb-2 flex h-20 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e933,transparent_55%)] opacity-60" />
                                    <div className="relative h-16 w-16">
                                        <Image
                                            src={imageUrl}
                                            alt={displayName}
                                            fill
                                            className="object-contain transition-transform duration-200 group-hover:scale-110"
                                        />
                                    </div>
                                    <span className="absolute right-2 top-2 rounded-full bg-slate-950/90 px-2 py-0.5 text-[10px] font-mono text-slate-200">
                                        #{paddedId}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="line-clamp-1 text-[11px] font-semibold text-slate-50">
                                        {displayName}
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                        Dex nacional · #{paddedId}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* 5. CTA: abrir Pokédex completa filtrando pela região */}
            <section className="flex justify-center pt-2">
                <Link
                    href={`/pokedex?region=${data.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-sky-500/80 bg-sky-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300 hover:bg-sky-500/20 hover:text-sky-100"
                >
                    Abrir Pokédex completa de {data.name}
                </Link>
            </section>
        </div>
    );
}
