import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { REGIONS, type RegionId } from "@/data/regions";

type PokemonListItem = {
    id: number;
    name: string;
    image: string;
};

type SortOption = "number-asc" | "number-desc" | "name-asc" | "name-desc";

// Tipos oficiais da PokéAPI
type PokemonType =
    | "normal"
    | "fire"
    | "water"
    | "grass"
    | "electric"
    | "ice"
    | "fighting"
    | "poison"
    | "ground"
    | "flying"
    | "psychic"
    | "bug"
    | "rock"
    | "ghost"
    | "dragon"
    | "dark"
    | "steel"
    | "fairy";

type PokedexSearchParams = {
    page?: string;
    q?: string;
    region?: string;
    type?: string;
    sort?: SortOption | string;
};

const PER_PAGE = 15;

// Faixas aproximadas por região (Dex nacional)
const REGION_DEX_RANGES: Record<RegionId, { start: number; end: number }> = {
    kanto: { start: 1, end: 151 },
    johto: { start: 152, end: 251 },
    hoenn: { start: 252, end: 386 },
    sinnoh: { start: 387, end: 493 },
    unova: { start: 494, end: 649 },
    kalos: { start: 650, end: 721 },
    alola: { start: 722, end: 809 },
    galar: { start: 810, end: 898 },
    hisui: { start: 899, end: 905 }, // aproximação para formas Hisui
    paldea: { start: 906, end: 1025 },
};

const TYPE_OPTIONS: { value: PokemonType; label: string }[] = [
    { value: "normal", label: "Normal" },
    { value: "fire", label: "Fire (Fogo)" },
    { value: "water", label: "Water (Água)" },
    { value: "grass", label: "Grass (Grama)" },
    { value: "electric", label: "Electric (Elétrico)" },
    { value: "ice", label: "Ice (Gelo)" },
    { value: "fighting", label: "Fighting (Lutador)" },
    { value: "poison", label: "Poison (Venenoso)" },
    { value: "ground", label: "Ground (Terra)" },
    { value: "flying", label: "Flying (Voador)" },
    { value: "psychic", label: "Psychic (Psíquico)" },
    { value: "bug", label: "Bug (Inseto)" },
    { value: "rock", label: "Rock (Pedra)" },
    { value: "ghost", label: "Ghost (Fantasma)" },
    { value: "dragon", label: "Dragon (Dragão)" },
    { value: "dark", label: "Dark (Sombrio)" },
    { value: "steel", label: "Steel (Aço)" },
    { value: "fairy", label: "Fairy (Fada)" },
];

function formatName(name: string): string {
    return name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

async function getAllPokemonBasic(): Promise<PokemonListItem[]> {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025", {
        next: { revalidate: 3600 }, // revalida a cada 1h
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar lista de Pokémon.");
    }

    const data: {
        results: { name: string; url: string }[];
    } = await res.json();

    return data.results.map((item, index) => {
        const match = item.url.match(/\/pokemon\/(\d+)\//);
        const id = match ? Number(match[1]) : index + 1;

        return {
            id,
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
    });
}

// Busca IDs de Pokémon por tipo na PokéAPI
async function getPokemonIdsByType(type: PokemonType): Promise<Set<number>> {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) {
            return new Set();
        }

        const data: {
            pokemon: { pokemon: { url: string } }[];
        } = await res.json();

        const ids = new Set<number>();
        for (const entry of data.pokemon) {
            const url = entry.pokemon.url;
            const match = url.match(/\/pokemon\/(\d+)\//);
            if (match) {
                ids.add(Number(match[1]));
            }
        }

        return ids;
    } catch {
        return new Set();
    }
}

function filterByRegion(list: PokemonListItem[], regionSlug?: string): PokemonListItem[] {
    if (!regionSlug || regionSlug === "all") return list;

    const key = regionSlug.toLowerCase() as RegionId;
    const range = REGION_DEX_RANGES[key];
    if (!range) return list;

    return list.filter((p) => p.id >= range.start && p.id <= range.end);
}

function sortPokemon(list: PokemonListItem[], sort: SortOption): PokemonListItem[] {
    const copy = [...list];

    switch (sort) {
        case "number-desc":
            return copy.sort((a, b) => b.id - a.id);
        case "name-asc":
            return copy.sort((a, b) => a.name.localeCompare(b.name));
        case "name-desc":
            return copy.sort((a, b) => b.name.localeCompare(a.name));
        case "number-asc":
        default:
            return copy.sort((a, b) => a.id - b.id);
    }
}

function buildPageHref(
    page: number,
    q: string,
    region: string,
    typeFilter: string,
    sort: SortOption,
): string {
    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (region && region !== "all") params.set("region", region);
    if (typeFilter && typeFilter !== "all") params.set("type", typeFilter);
    if (sort && sort !== "number-asc") params.set("sort", sort);
    params.set("page", String(page));

    const query = params.toString();
    return query ? `/pokedex?${query}` : "/pokedex";
}

export const metadata = {
    title: "Pokédex | Pokédex Control Center",
};

export default async function PokedexPage({
    searchParams,
}: {
    searchParams: Promise<PokedexSearchParams>;
}) {
    const sp = await searchParams;

    const q = (sp?.q ?? "").trim();
    const region = sp?.region ?? "all";
    const typeFilter = sp?.type ?? "all";
    const sort = (sp?.sort as SortOption) ?? "number-asc";

    const currentPage = Number(sp?.page) > 0 ? Number(sp?.page) : 1;

    const allPokemon = await getAllPokemonBasic();

    // 1. busca por nome ou número
    let filtered = allPokemon;
    if (q) {
        const term = q.toLowerCase();
        filtered = filtered.filter(
            (p) => p.name.toLowerCase().includes(term) || p.id.toString() === term,
        );
    }

    // 2. filtro por região
    filtered = filterByRegion(filtered, region);

    // 3. filtro por tipo (se aplicado)
    if (typeFilter && typeFilter !== "all") {
        const key = typeFilter.toLowerCase() as PokemonType;
        const idsByType = await getPokemonIdsByType(key);
        if (idsByType.size > 0) {
            filtered = filtered.filter((p) => idsByType.has(p.id));
        } else {
            filtered = [];
        }
    }

    // 4. ordenação
    filtered = sortPokemon(filtered, sort);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    const start = (safePage - 1) * PER_PAGE;
    const pageItems = filtered.slice(start, start + PER_PAGE);

    const selectedRegion =
        region !== "all"
            ? REGIONS.find((r) => r.id === region.toLowerCase())
            : undefined;

    const selectedTypeLabel =
        typeFilter !== "all"
            ? TYPE_OPTIONS.find((t) => t.value === (typeFilter as PokemonType))?.label
            : undefined;

    return (
        <div className="space-y-8">
            {/* Cabeçalho */}
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                    Global Pokédex · Listagem
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Pokédex Global
                        </h1>
                        <p className="text-xs text-slate-400 sm:text-sm">
                            Navegue pela Pokédex oficial, filtrando por região, tipo, buscando por nome ou número
                            e explorando os registros da PokéAPI.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                        <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1">
                            {total.toLocaleString("pt-BR")} resultados
                        </span>

                        {selectedRegion && (
                            <span className="rounded-full border border-sky-700 bg-sky-500/10 px-3 py-1 text-sky-200">
                                Região selecionada: {selectedRegion.name}
                            </span>
                        )}

                        {selectedTypeLabel && (
                            <span className="rounded-full border border-emerald-700 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                                Tipo selecionado: {selectedTypeLabel}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* Filtros */}
            <section className="space-y-4">
                <form className="space-y-4" method="GET">
                    {/* Busca */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Input
                            name="q"
                            defaultValue={q}
                            placeholder="Buscar por nome ou número (#0001)..."
                            className="w-full bg-slate-900/80 text-sm"
                        />
                        <Button
                            type="submit"
                            className="h-10 px-6 text-xs font-semibold uppercase tracking-[0.18em]"
                        >
                            Aplicar filtros
                        </Button>
                    </div>

                    {/* Selects: região + tipo + ordenação */}
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {/* Região */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                Região
                            </p>
                            <Select name="region" defaultValue={region ?? "all"}>
                                <SelectTrigger className="h-10 bg-slate-900/80 text-xs">
                                    <SelectValue placeholder="Todas as regiões" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas as regiões</SelectItem>
                                    {REGIONS.map((r) => (
                                        <SelectItem key={r.id} value={r.id}>
                                            {r.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tipo */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                Tipo
                            </p>
                            <Select name="type" defaultValue={typeFilter ?? "all"}>
                                <SelectTrigger className="h-10 bg-slate-900/80 text-xs">
                                    <SelectValue placeholder="Todos os tipos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos os tipos</SelectItem>
                                    {TYPE_OPTIONS.map((t) => (
                                        <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Ordenação */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                Ordenar por
                            </p>
                            <Select name="sort" defaultValue={sort}>
                                <SelectTrigger className="h-10 bg-slate-900/80 text-xs">
                                    <SelectValue placeholder="Ordenar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="number-asc">Nº crescente</SelectItem>
                                    <SelectItem value="number-desc">Nº decrescente</SelectItem>
                                    <SelectItem value="name-asc">Nome A → Z</SelectItem>
                                    <SelectItem value="name-desc">Nome Z → A</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </section>

            {/* Grid de Pokémon */}
            <section className="space-y-4">
                {pageItems.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        Nenhum Pokémon encontrado com os filtros atuais.
                    </p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                            {pageItems.map((pokemon) => (
                                <Link
                                    key={pokemon.id}
                                    href={`/pokemon/${pokemon.id}`}
                                    className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200 shadow-sm shadow-slate-950/40 transition hover:-translate-y-1 hover:border-red-500/70 hover:shadow-red-900/40"
                                >
                                    <div className="relative mb-2 flex h-24 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ef444433,transparent_55%)] opacity-60" />
                                        <div className="relative h-20 w-20">
                                            <Image
                                                src={pokemon.image}
                                                alt={pokemon.name}
                                                fill
                                                className="object-contain transition-transform duration-200 group-hover:scale-110"
                                            />
                                        </div>
                                        <span className="absolute right-2 top-2 rounded-full bg-slate-950/90 px-2 py-0.5 text-[10px] font-mono text-slate-200">
                                            #{pokemon.id.toString().padStart(4, "0")}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="line-clamp-1 text-[11px] font-semibold text-slate-50">
                                            {formatName(pokemon.name)}
                                        </p>
                                        <p className="text-[10px] text-slate-400">
                                            Dex nacional · #{pokemon.id.toString().padStart(4, "0")}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Paginação */}
                        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                            <p>
                                Página {safePage} de {totalPages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    disabled={safePage <= 1}
                                    className="h-8 border-slate-700 bg-slate-900/80 text-xs"
                                >
                                    <Link href={buildPageHref(safePage - 1, q, region, typeFilter, sort)}>
                                        ← Anterior
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    disabled={safePage >= totalPages}
                                    className="h-8 border-slate-700 bg-slate-900/80 text-xs"
                                >
                                    <Link href={buildPageHref(safePage + 1, q, region, typeFilter, sort)}>
                                        Próxima →
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
