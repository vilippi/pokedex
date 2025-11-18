// components/common/main-header.tsx
"use client";

import React, { useEffect, useState } from "react";
import { CircleUser } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

const MainHeader: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
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

                <div className="flex items-center gap-4">
                    {/* Status (desktop) */}
                    <div className="hidden items-center gap-2 text-xs text-slate-500 dark:text-slate-400 sm:flex">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                        <span>Online · Dados em tempo real da PokéAPI</span>
                    </div>

                    {/* Menu de perfil com switch de Modo Escuro */}
                    <ProfileMenu />
                </div>
            </div>
        </header>
    );
};

const ProfileMenu: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        try {
            const saved = localStorage.getItem("darkMode");
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;

            const initial =
                saved !== null ? saved === "true" : prefersDark;

            setIsDarkMode(initial);

            if (initial) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } catch {
        // ignora erros de localStorage
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
    }, [isDarkMode, mounted]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label="Abrir menu de perfil"
                    className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                >
                    <CircleUser className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Perfil & Aparência</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="flex items-center justify-between gap-2 px-2 py-1.5 text-sm">
                    <span>Modo escuro</span>
                    {mounted && (
                        <Switch
                            checked={isDarkMode}
                            onCheckedChange={(checked: boolean) =>
                                setIsDarkMode(checked)
                            }
                        />
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MainHeader;
