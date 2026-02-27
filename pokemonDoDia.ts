import pokemons from "../data/pokemon.json"
import type { Pokemons } from "../types/pokemon"

const lista: Pokemons[] = pokemons

const DATA_BASE = new Date(2026, 0, 1) 

function diasDesdeBase(data: Date): number {
  const diaUtc = Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate());
  const diasCorridos = Math.floor((diaUtc - DATA_BASE.getTime()) / (1000 * 60 * 60 * 24));

  const hash = (diasCorridos * 2654435761) ^ (diasCorridos * 1597334677);
  
  return (Math.abs(hash) % 1025) + 1;
}

export function getPokemonDoDia(): Pokemons {
  const hoje = new Date()
  const index = diasDesdeBase(hoje) % lista.length
  return lista[index]
}

export function getPokemonPorData(data: Date): Pokemons {
  const index = diasDesdeBase(data) % lista.length
  return lista[index]
}