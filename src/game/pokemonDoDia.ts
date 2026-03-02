import pokemons from "../data/pokemon.json"
import type { Pokemons } from "../types/pokemon"

const lista: Pokemons[] = pokemons

function hashDate(date: Date): number {
  const str = date.toISOString().slice(0, 10)
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash)
}

export function getPokemonDoDia(): Pokemons {
  const hoje = new Date()
  const index = hashDate(hoje) % lista.length
  return lista[index]
}

export function getPokemonPorData(data: Date): Pokemons {
  const index = hashDate(data) % lista.length
  return lista[index]
}