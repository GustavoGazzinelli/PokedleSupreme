import pokemons from "../data/pokemon.json"
import type { Pokemons } from "../types/pokemon"

const lista: Pokemons[] = pokemons

function hashDate(data: Date, modo: string): number {
  const str = data.toISOString().slice(0, 10) + modo
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash)
}

export function getPokemonDoDia(modo: string): Pokemons {
  const hoje = new Date()
  const index = hashDate(hoje, modo) % lista.length
  return lista[index]
}

export function getPokemonPorData(data: Date, modo: string): Pokemons {
  const index = hashDate(data, modo) % lista.length
  return lista[index]
}