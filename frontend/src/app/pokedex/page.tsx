"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const PAGE_SIZE = 15;

type PokemonRef = {
    id: number;
    name: string;
    url: string;
};

type PokemonCardData = {
    id: number;
    name: string;
    image: string;
    types: string[];
};

type PokeAPIListResult = {
    name: string;
    url: string;
};

type PokeAPIListResponse = {
    count: number;
    results: PokeAPIListResult[];
};

type PokeAPIDetail = {
    id: number;
    name: string;
    types: { type: { name: string } }[];
};

type PokeAPITypePokemonEntry = {
    pokemon: { name: string; url: string };
};

type PokeAPITypeResponse = {
    pokemon: PokeAPITypePokemonEntry[];
};

const POKEMON_IMAGE_BASE =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const POKEMON_TYPES = [
    "all",
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
] as const;

type PokemonTypeFilter = (typeof POKEMON_TYPES)[number];

const SORT_OPTIONS = [
    { value: "id-asc", label: "ID crescente" },
    { value: "id-desc", label: "ID decrescente" },
    { value: "name-asc", label: "Nome A-Z" },
    { value: "name-desc", label: "Nome Z-A" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export default function PokedexPage() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] =
        useState<PokemonTypeFilter>("all");
    const [sortBy, setSortBy] = useState<SortOption>("id-asc");
    const [page, setPage] = useState(1);

    const [refList, setRefList] = useState<PokemonRef[]>([]);
    const [items, setItems] = useState<PokemonCardData[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    const [loadingRefs, setLoadingRefs] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loading = loadingRefs || loadingDetails;

    // Sempre que mudar busca ou tipo, volta pra página 1
    useEffect(() => {
        setPage(1);
    }, [search, typeFilter]);

    // Utilitário pra pegar ID da URL da PokéAPI
    function getIdFromUrl(url: string): number {
        const parts = url.split("/").filter(Boolean);
        const last = parts[parts.length - 1];
        return Number(last);
    }

    // 1) Buscar a LISTA COMPLETA de Pokémon conforme o filtro de tipo
    useEffect(() => {
        let cancelled = false;

        async function loadRefs() {
            setLoadingRefs(true);
            setError(null);

            try {
                if (typeFilter === "all") {
                    // pega todos os Pokémon (só nome+url) – catálogo inteiro
                    const listRes = await fetch(
                        "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0",
                    );
                    if (!listRes.ok) {
                        throw new Error(
                            "Falha ao carregar lista de Pokémon da PokéAPI.",
                        );
                    }
                    const listJson =
                        (await listRes.json()) as PokeAPIListResponse;

                    const refs: PokemonRef[] = listJson.results.map(
                        (p) => ({
                            id: getIdFromUrl(p.url),
                            name: p.name,
                            url: p.url,
                        }),
                    );

                    if (cancelled) return;
                    setRefList(refs);
                    setTotalCount(refs.length);
                } else {
                    // filtro por tipo – catálogo só dessa "categoria"
                    const typeRes = await fetch(
                        `https://pokeapi.co/api/v2/type/${typeFilter}`,
                    );
                    if (!typeRes.ok) {
                        throw new Error("Falha ao carregar Pokémon por tipo.");
                    }
                    const typeJson =
                        (await typeRes.json()) as PokeAPITypeResponse;

                    const refs: PokemonRef[] = typeJson.pokemon.map((entry) => {
                        const url = entry.pokemon.url;
                        return {
                            id: getIdFromUrl(url),
                            name: entry.pokemon.name,
                            url,
                        };
                    });

                    if (cancelled) return;
                    setRefList(refs);
                    setTotalCount(refs.length);
                }
            } catch (err) {
                if (cancelled) return;
                console.error(err);
                setRefList([]);
                setTotalCount(0);
                setError("Ocorreu um erro ao carregar a Pokédex.");
            } finally {
                if (!cancelled) {
                    setLoadingRefs(false);
                }
            }
        }

        loadRefs();

        return () => {
            cancelled = true;
        };
    }, [typeFilter]);

    // 2) Aplicar busca + ordenação em memória na lista inteira
    const filteredSortedRefs = useMemo(() => {
        let refs = [...refList];

        const query = search.trim().toLowerCase();
        if (query) {
            refs = refs.filter((p) => {
                const byName = p.name.toLowerCase().includes(query);
                const byId = p.id.toString() === query;
                return byName || byId;
            });
        }

        switch (sortBy) {
            case "id-asc":
                refs.sort((a, b) => a.id - b.id);
                break;
            case "id-desc":
                refs.sort((a, b) => b.id - a.id);
                break;
            case "name-asc":
                refs.sort((a, b) =>
                    a.name.localeCompare(b.name),
                );
                break;
            case "name-desc":
                refs.sort((a, b) =>
                    b.name.localeCompare(a.name),
                );
                break;
        }

        return refs;
    }, [refList, search, sortBy]);

    // 3) Paginar em memória os refs filtrados e ordenados
    const totalFilteredCount = filteredSortedRefs.length;

    const totalPages = useMemo(() => {
        if (!totalFilteredCount) return 1;
        return Math.max(
            1,
            Math.ceil(totalFilteredCount / PAGE_SIZE),
        );
    }, [totalFilteredCount]);

    const pageRefs = useMemo(() => {
        if (totalFilteredCount === 0) return [];
        const safePage = Math.min(page, totalPages);
        const start = (safePage - 1) * PAGE_SIZE;
        return filteredSortedRefs.slice(start, start + PAGE_SIZE);
    }, [filteredSortedRefs, page, totalPages, totalFilteredCount]);

    const showingRange = useMemo(() => {
        if (totalFilteredCount === 0) return null;
        const currentPage =
            page > totalPages ? totalPages : page;
        const start = (currentPage - 1) * PAGE_SIZE + 1;
        const end = Math.min(
            currentPage * PAGE_SIZE,
            totalFilteredCount,
        );
        return { start, end };
    }, [page, totalPages, totalFilteredCount]);

    // 4) Buscar detalhes (tipos, etc.) apenas dos Pokémon da página atual
    useEffect(() => {
        let cancelled = false;

        async function fetchPokemonDetail(
            id: number,
        ): Promise<PokemonCardData | null> {
            try {
                const res = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`,
                );
                if (!res.ok) return null;
                const data = (await res.json()) as PokeAPIDetail;
                return {
                    id: data.id,
                    name: data.name,
                    image: `${POKEMON_IMAGE_BASE}/${data.id}.png`,
                    types: data.types.map((t) => t.type.name),
                };
            } catch {
                return null;
            }
        }

        async function loadDetails() {
            setLoadingDetails(true);
            setError(null);

            try {
                if (pageRefs.length === 0) {
                    setItems([]);
                    return;
                }

                const details = await Promise.all(
                    pageRefs.map((ref) => fetchPokemonDetail(ref.id)),
                );
                if (cancelled) return;

                const cards = details.filter(
                    (p): p is PokemonCardData => p !== null,
                );

                setItems(cards);
            } catch (err) {
                if (cancelled) return;
                console.error(err);
                setItems([]);
                setError(
                    "Ocorreu um erro ao carregar os detalhes dos Pokémon.",
                );
            } finally {
                if (!cancelled) {
                    setLoadingDetails(false);
                }
            }
        }

        loadDetails();

        return () => {
            cancelled = true;
        };
    }, [pageRefs]);

    return (
        <div className="space-y-6">
            {/* Título da página */}
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Pokédex
                </h1>
                <p className="text-sm text-slate-400">
                    Navegue pelos registros oficiais da Pokédex como se estivesse
                    em uma vitrine de loja: filtre, pesquise e explore as espécies
                    com visual de catálogo.
                </p>
            </div>

            {/* Barra de busca + filtros */}
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/40">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou ID (ex.: pikachu, 25)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        />
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 shadow-sm hover:border-red-500 hover:bg-slate-900/80"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filtros
                    </button>
                </div>

                {/* Filtros (linha abaixo da busca) */}
                <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    {/* Filtro por tipo */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wide text-slate-500">
                            Tipo
                        </span>
                        <select
                            value={typeFilter}
                            onChange={(e) =>
                                setTypeFilter(
                                    e.target.value as PokemonTypeFilter,
                                )
                            }
                            className="h-8 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs text-slate-100 outline-none ring-0 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        >
                            {POKEMON_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type === "all"
                                        ? "Todos os tipos"
                                        : type.charAt(0).toUpperCase() +
                                            type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ordenação */}
                    <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
                        <span className="text-[11px] uppercase tracking-wide text-slate-500">
                            Ordenar por
                        </span>
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as SortOption)
                            }
                            className="h-8 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs text-slate-100 outline-none ring-0 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Infos de resultado + paginação superior */}
            <div className="flex flex-col items-start justify-between gap-2 text-xs text-slate-400 sm:flex-row sm:items-center">
                <div>
                    {loading && <span>Carregando Pokémon...</span>}
                    {!loading && showingRange && (
                        <span>
                            Mostrando{" "}
                            <span className="font-medium text-slate-200">
                                {showingRange.start}–{showingRange.end}
                            </span>{" "}
                            de{" "}
                            <span className="font-medium text-slate-200">
                                {totalFilteredCount.toLocaleString("pt-BR")}
                            </span>{" "}
                            resultados
                        </span>
                    )}
                    {!loading && !showingRange && (
                        <span>Nenhum resultado encontrado.</span>
                    )}
                </div>

                {totalPages > 1 && (
                    <PaginationControls
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>

            {/* Grade de cards (15 por página, até 5 por linha no desktop) */}
            <section>
                {error && (
                    <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                        {error}
                    </div>
                )}

                {items.length === 0 && !loading && !error && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 text-center text-sm text-slate-400">
                        Nenhum Pokémon para exibir no momento. Ajuste sua busca
                        ou filtros.
                    </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {loading && items.length === 0
                        ? Array.from({ length: 10 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))
                        : items.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                </div>
            </section>

            {/* Paginação inferior (loja de roupas) */}
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <PaginationControls
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}

/* ======== Componentes visuais ========= */

function PokemonCard({ pokemon }: { pokemon: PokemonCardData }) {
    const formattedName = pokemon.name
        .replace(/-/g, " ")
        .split(" ")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");

    return (
        <Link
            href={`/pokemon/${pokemon.id}`}
            className="group block"
            >
            <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-3 shadow-md shadow-slate-950/40 transition hover:-translate-y-1 hover:border-red-500/70 hover:shadow-sky-900/40">
                {/* imagem / vitrine */}
                <div className="relative mb-3 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-slate-900/80">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e933,transparent_55%)] opacity-60" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#f9731622,transparent_55%)] opacity-60" />

                    <div className="relative h-24 w-24">
                        <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            fill
                            className="object-contain transition-transform duration-200 group-hover:scale-110"
                        />
                    </div>

                    <span className="absolute right-2 top-2 rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] font-mono text-slate-200">
                        #{pokemon.id.toString().padStart(4, "0")}
                    </span>
                </div>

                {/* info básica */}
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 text-sm font-semibold text-slate-50">
                            {formattedName}
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300"
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </Link>
    );
}


function SkeletonCard() {
    return (
        <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
            <div className="mb-3 h-32 animate-pulse rounded-xl bg-slate-800/80" />
            <div className="mb-2 h-3 w-3/4 animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
        </div>
    );
}

function PaginationControls({
    page,
    totalPages,
    onPageChange,
}: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-300 shadow-md shadow-slate-950/40">
            <button
                type="button"
                disabled={!canPrev}
                onClick={() => canPrev && onPageChange(page - 1)}
                className="rounded-full px-2 py-1 text-[11px] font-medium disabled:cursor-not-allowed disabled:text-slate-600 hover:bg-slate-900"
            >
                Anterior
            </button>
            <span className="text-[11px] text-slate-400">
                Página{" "}
                <span className="font-semibold text-slate-100">
                    {page}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-slate-100">
                    {totalPages}
                </span>
            </span>
            <button
                type="button"
                disabled={!canNext}
                onClick={() => canNext && onPageChange(page + 1)}
                className="rounded-full px-2 py-1 text-[11px] font-medium disabled:cursor-not-allowed disabled:text-slate-600 hover:bg-slate-900"
            >
                Próxima
            </button>
        </div>
    );
}
