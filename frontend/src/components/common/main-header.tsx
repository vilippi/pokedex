// components/layout/main-header.tsx
const MainHeader = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* “Pokébola” estilizada */}
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-red-500 bg-linear-to-br from-red-600 to-red-800 shadow-[0_0_18px_rgba(239,68,68,0.7)]">
                        <div className="absolute inset-x-0 h-0.5 bg-slate-900/90" />
                        <div className="h-3 w-3 rounded-full border border-slate-900 bg-slate-100" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-red-400">
                            Official System
                        </span>
                        <span className="text-lg font-semibold tracking-tight">
                            Pokédex Control Center
                        </span>
                    </div>
                </div>

                <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                    <span>Online · Dados em tempo real da PokéAPI</span>
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
