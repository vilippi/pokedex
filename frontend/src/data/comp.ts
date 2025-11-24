// src/types/app.ts

export interface StrategyWeakness {
  type: string;
  severity: "critical" | "high" | "medium" | "low" | string;
  count: number;
  affectedPokemon: string[];
}

export interface StrategyStrength {
  type: string;
  coverage: number;
}

export interface StrategyRoleBalance {
  physicalSweepers: number;
  specialSweepers: number;
  physicalTanks: number;
  specialTanks: number;
  speedsters: number;
  wallBreakers: number;
  supports: number;
  balanced: number;
  recommendation: string;
}

export interface StrategySynergy {
  pokemon1: string;
  pokemon2: string;
  score: number;
  description: string;
}

export interface StrategyCounterTeam {
  name: string;
  dangerLevel: "extreme" | "high" | "medium" | "low" | string;
  commonPokemon: string[];
  counterStrategy: string;
}

export interface StrategyAnalysis {
  teamScore: number;
  weaknesses: StrategyWeakness[];
  strengths: StrategyStrength[];
  roleBalance: StrategyRoleBalance;
  battleStrategy: string;
  synergies: StrategySynergy[];
  counterTeams: StrategyCounterTeam[];
}
