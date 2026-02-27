import pokemons from "../data/pokemon.json"
import type { Pokemons } from "../types/pokemon"

const lista: Pokemons[] = pokemons

const DATA_BASE = new Date(2026, 0, 1) 

function diasDesdeBase(data: Date): number {
  const diff = data.getTime() - DATA_BASE.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
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