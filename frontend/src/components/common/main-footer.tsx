// components/layout/main-footer.tsx
const MainFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-800 bg-slate-950/90">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 sm:flex-row">
                <p>© {currentYear} MELHOR PokeNext. Projeto pessoal não oficial.</p>
                <p className="text-[11px] text-center sm:text-right">
                    Dados fornecidos por{" "}
                    <a
                        href="https://pokeapi.co/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-sky-400 hover:text-sky-300"
                    >
                        PokéAPI.co
                    </a>{" "}
                    · Agradecimentos à comunidade.
                </p>
            </div>
        </footer>
    );
};

export default MainFooter;
