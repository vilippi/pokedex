import Image from "next/image";
import { notFound } from "next/navigation";

const POKEMON_IMAGE_BASE =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

type PokemonAPI = {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other?: {
            ["official-artwork"]?: {
                front_default?: string | null;
            };
        };
    };
    types: { slot: number; type: { name: string; url: string } }[];
    stats: {
        base_stat: number;
        stat: { name: string };
    }[];
    species: { name: string; url: string };
};

type PokemonSpeciesAPI = {
    flavor_text_entries: {
        flavor_text: string;
        language: { name: string };
        version: { name: string };
    }[];
    evolution_chain?: { url: string | null };
    varieties: {
        is_default: boolean;
        pokemon: { name: string; url: string };
    }[];
};

type EvolutionChainNode = {
    species: { name: string; url: string };
    evolves_to: EvolutionChainNode[];
};

type EvolutionChainAPI = {
    chain: EvolutionChainNode;
};

type TypeAPI = {
    damage_relations: {
        double_damage_from: { name: string; url: string }[];
        half_damage_from: { name: string; url: string }[];
        no_damage_from: { name: string; url: string }[];
    };
};

type PokemonDetails = {
    id: number;
    name: string;
    displayName: string;
    image: string;
    types: string[];
    heightMeters: number;
    weightKg: number;
    stats: { name: string; base: number }[];
    description: string;
    weaknesses: string[];
    varieties: { id: number; name: string; displayName: string }[];
    evolutions: { id: number; name: string; displayName: string }[];
};

function getIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return Number(parts[parts.length - 1]);
}

function formatName(name: string): string {
    return name
        .replace(/-/g, " ")
        .split(" ")
        .map(
            (word) =>
            word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join(" ");
}

function cleanFlavorText(text: string): string {
  // remove quebras estranhas da PokéAPI
    return text.replace(/\f/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchJson<T>(
    url: string,
    revalidateSeconds = 3600,
): Promise<T> {
    const res = await fetch(url, {
        next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) {
        throw new Error(`Falha ao buscar ${url}`);
    }
    return (await res.json()) as T;
}

async function getPokemonDetails(
    idOrName: string,
): Promise<PokemonDetails> {
    // 1. Dados principais do Pokémon
    let pokemon: PokemonAPI;
    try {
        pokemon = await fetchJson<PokemonAPI>(
            `https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`,
        );
    } catch {
        notFound();
    }

    const species = await fetchJson<PokemonSpeciesAPI>(
        pokemon.species.url,
    );

    // 2. Descrição (prioridade: pt-BR > en > outra que existir)
    const ptEntry = species.flavor_text_entries.find(
        (e) => e.language.name === "pt-BR",
    );
    const enEntry = species.flavor_text_entries.find(
        (e) => e.language.name === "en",
    );
    const anyEntry = species.flavor_text_entries[0];

    const description = cleanFlavorText(
        ptEntry?.flavor_text ??
            enEntry?.flavor_text ??
            anyEntry?.flavor_text ??
            "Descrição não disponível para esta espécie no momento.",
    );

    // 3. Tipos
    const types = pokemon.types
        .sort((a, b) => a.slot - b.slot)
        .map((t) => t.type.name);

    // 4. Fraquezas (simplificado – união dos tipos que causam dano dobrado)
    const weaknessesSet = new Set<string>();
    try {
        const typeResponses = await Promise.all(
            types.map((typeName) =>
                fetchJson<TypeAPI>(
                    `https://pokeapi.co/api/v2/type/${typeName}`,
                    86400,
                ),
            ),
        );

        typeResponses.forEach((typeApi) => {
            typeApi.damage_relations.double_damage_from.forEach((t) =>
                weaknessesSet.add(t.name),
            );
        });

        // Opcional: remover tipos que também aparecem como no_damage_from
        typeResponses.forEach((typeApi) => {
            typeApi.damage_relations.no_damage_from.forEach((t) => {
                if (weaknessesSet.has(t.name)) {
                    weaknessesSet.delete(t.name);
                }
            });
        });
    } catch {
        // se der erro, simplesmente não mostra fraquezas calculadas
    }

    const weaknesses = Array.from(weaknessesSet).sort((a, b) =>
        a.localeCompare(b),
    );

    // 5. Variedades (outras formas)
    const varieties = species.varieties
    .filter((v) => !v.is_default)
    .map((v) => {
        const id = getIdFromUrl(v.pokemon.url);
        return {
            id,
            name: v.pokemon.name,
            displayName: formatName(v.pokemon.name),
        };
    });

    // 6. Evoluções (flatten da chain)
    let evolutions: { id: number; name: string; displayName: string }[] =
        [];
    try {
        if (species.evolution_chain?.url) {
            const chain = await fetchJson<EvolutionChainAPI>(
                species.evolution_chain.url,
                86400,
            );

            const results: {
                id: number;
                name: string;
                displayName: string;
            }[] = [];

            const traverse = (node: EvolutionChainNode) => {
                const id = getIdFromUrl(node.species.url);
                const name = node.species.name;
                results.push({
                    id,
                    name,
                    displayName: formatName(name),
                });
                node.evolves_to.forEach(traverse);
            };

            traverse(chain.chain);
            evolutions = results;
        }
    } catch {
        // ignora erro de evolução, não é crítico
    }

    // 7. Imagem
    const fallbackImage = `${POKEMON_IMAGE_BASE}/${pokemon.id}.png`;
    const imageFromAPI =
        pokemon.sprites.other?.["official-artwork"]
            ?.front_default ?? fallbackImage;

    return {
        id: pokemon.id,
        name: pokemon.name,
        displayName: formatName(pokemon.name),
        image: imageFromAPI,
        types,
        heightMeters: pokemon.height / 10,
        weightKg: pokemon.weight / 10,
        stats: pokemon.stats.map((s) => ({
            name: s.stat.name,
            base: s.base_stat,
        })),
        description,
        weaknesses,
        varieties,
        evolutions,
    };
}

function formatMeters(value: number): string {
    return value.toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
}

function formatKg(value: number): string {
    return value.toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
}

export default async function PokemonPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const pokemon = await getPokemonDetails(id);


    return (
        <div className="space-y-8">
            {/* Cabeçalho */}
            <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                        Pokédex Entry #{pokemon.id.toString().padStart(4, "0")}
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        {pokemon.displayName}
                        <span className="ml-3 inline-flex rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs font-mono text-slate-300">
                            ID: {pokemon.id}
                        </span>
                    </h1>
                    <p className="text-xs text-slate-400 sm:text-sm">
                        Ficha técnica oficial da espécie dentro do sistema global da
                        Pokédex.
                    </p>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
                    {pokemon.types.map((type) => (
                        <span
                            key={type}
                            className="rounded-full bg-slate-900 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-200"
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </header>

            {/* 1. Imagem grande no centro */}
            <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/40">
                <div className="relative flex flex-col items-center gap-4">
                    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl bg-slate-900/80 sm:h-72">
                        {/* Glow / fundo */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e955,transparent_55%),radial-gradient(circle_at_bottom,#f9731655,transparent_55%)] opacity-70" />
                        <div className="absolute inset-[10%] rounded-3xl border border-slate-700/70" />

                        <div className="relative h-48 w-48 sm:h-60 sm:w-60">
                            <Image
                                src={pokemon.image}
                                alt={pokemon.displayName}
                                fill
                                className="object-contain drop-shadow-[0_0_30px_rgba(15,23,42,0.9)]"
                                priority
                            />
                        </div>
                    </div>

                    {/* linha com info rápida */}
                    <div className="grid w-full gap-3 text-xs text-slate-300 sm:grid-cols-3 sm:text-sm">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-center">
                            <p className="text-[11px] uppercase tracking-wide text-slate-500">
                                Altura
                            </p>
                            <p className="mt-1 text-lg font-semibold text-slate-50">
                                {formatMeters(pokemon.heightMeters)} m
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-center">
                            <p className="text-[11px] uppercase tracking-wide text-slate-500">
                                Peso
                            </p>
                            <p className="mt-1 text-lg font-semibold text-slate-50">
                                {formatKg(pokemon.weightKg)} kg
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-center">
                            <p className="text-[11px] uppercase tracking-wide text-slate-500">
                                Tipos
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-50">
                                {pokemon.types
                                    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                                    .join(" · ")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Descrição */}
            <section className="space-y-2">
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                    Descrição da espécie
                </h2>
                <p className="text-sm text-slate-300 sm:text-base">
                    {pokemon.description}
                </p>
            </section>

            {/* 3. Dados e Stats */}
            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                {/* Stats */}
                <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                    <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-300">
                        Estatísticas base
                    </h3>
                    <div className="space-y-2">
                        {pokemon.stats.map((stat) => {
                            const max = 255; // valor máximo aproximado de base stat
                            const pct = Math.min(
                                100,
                                Math.round((stat.base / max) * 100),
                            );

                            const label =
                                stat.name === "hp"
                                    ? "HP"
                                    : stat.name === "attack"
                                    ? "Ataque"
                                    : stat.name === "defense"
                                    ? "Defesa"
                                    : stat.name === "special-attack"
                                    ? "Ataque Esp."
                                    : stat.name === "special-defense"
                                    ? "Defesa Esp."
                                    : stat.name === "speed"
                                    ? "Velocidade"
                                    : stat.name;

                            return (
                                <div
                                    key={stat.name}
                                    className="space-y-1 text-xs sm:text-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-300">
                                            {label}
                                        </span>
                                        <span className="font-mono text-slate-200">
                                            {stat.base}
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-800">
                                        <div
                                            className="h-2 rounded-full bg-linear-to-r from-sky-500 via-emerald-400 to-amber-300"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dados adicionais */}
                <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 sm:text-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                        Dados complementares
                    </h3>
                    <p>
                        As estatísticas base representam o potencial bruto da espécie em
                        batalhas oficiais. Valores elevados em{" "}
                        <span className="font-semibold text-sky-400">
                            Ataque
                        </span>{" "}
                        ou{" "}
                        <span className="font-semibold text-sky-400">
                            Ataque Esp.
                        </span>{" "}
                        indicam vocação ofensiva, enquanto{" "}
                        <span className="font-semibold text-emerald-400">
                            Defesa
                        </span>{" "}
                        e{" "}
                        <span className="font-semibold text-emerald-400">
                            Defesa Esp.
                        </span>{" "}
                        sugerem foco em resistência.{" "}
                        <span className="font-semibold text-amber-300">
                            Velocidade
                        </span>{" "}
                        impacta a ordem de turnos em combate.
                    </p>
                </div>
            </section>

            {/* 4. Fraquezas */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                    Fraquezas em batalha
                </h2>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 sm:text-sm">
                    {pokemon.weaknesses.length === 0 ? (
                        <p className="text-slate-400">
                            As fraquezas desta espécie não puderam ser determinadas a
                            partir dos dados da PokéAPI neste momento.
                        </p>
                    ) : (
                        <>
                            <p className="mb-3 text-slate-300">
                                Com base nos tipos desta espécie, ela recebe{" "}
                                <span className="font-semibold text-red-400">
                                    dano aumentado
                                </span>{" "}
                                dos seguintes tipos de golpes:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {pokemon.weaknesses.map((type) => (
                                    <span
                                        key={type}
                                        className="rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1 text-[11px] uppercase tracking-wide text-red-200"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-3 text-[11px] text-slate-500">
                                Este cálculo é uma aproximação baseada nas relações de
                                dano fornecidas pela PokéAPI e pode não refletir todas
                                as nuances competitivas.
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* 5. Outras variantes */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                    Outras formas e variantes
                </h2>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 sm:text-sm">
                    {pokemon.varieties.length === 0 ? (
                        <p className="text-slate-400">
                            Não há outras formas registradas para esta espécie na
                            PokéAPI além da forma padrão.
                        </p>
                    ) : (
                        <>
                            <p className="mb-3 text-slate-300">
                                Esta espécie possui outras formas catalogadas na PokéAPI.
                                Selecionar uma delas em um sistema avançado poderia
                                alterar stats, aparência e até o tipo em certos casos.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {pokemon.varieties.map((variant) => (
                                    <a
                                        key={variant.id}
                                        href={`/pokemon/${variant.id}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-100 hover:border-sky-500 hover:bg-slate-900/80"
                                    >
                                        <span className="font-mono text-slate-400">
                                            #{variant.id.toString().padStart(4, "0")}
                                        </span>
                                        <span>{variant.displayName}</span>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* 6. Evoluções */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                    Linha evolutiva
                </h2>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 sm:text-sm">
                    {pokemon.evolutions.length === 0 ? (
                        <p className="text-slate-400">
                            Nenhuma cadeia evolutiva foi encontrada para esta espécie
                            na PokéAPI.
                        </p>
                    ) : (
                        <>
                            <p className="mb-3 text-slate-300">
                                Abaixo está a linha evolutiva registrada para esta família
                                de Pokémon, conforme os dados oficiais da PokéAPI.
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                {pokemon.evolutions.map((evo, index) => (
                                    <div
                                        key={evo.id}
                                        className="flex items-center gap-2"
                                    >
                                        <a
                                            href={`/pokemon/${evo.id}`}
                                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                                                evo.id === pokemon.id
                                                    ? "border-sky-500 bg-sky-500/10 text-sky-100"
                                                    : "border-slate-700 bg-slate-900 text-slate-100 hover:border-sky-500 hover:bg-slate-900/80"
                                            }`}
                                        >
                                            <span className="font-mono text-slate-400">
                                                #{evo.id.toString().padStart(4, "0")}
                                            </span>
                                            <span>{evo.displayName}</span>
                                        </a>
                                        {index < pokemon.evolutions.length - 1 && (
                                            <span className="text-slate-600">⟶</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-3 text-[11px] text-slate-500">
                                Em um sistema avançado, cada estágio poderia exibir
                                diferenças detalhadas de stats, formas regionais e
                                condições específicas de evolução.
                            </p>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
