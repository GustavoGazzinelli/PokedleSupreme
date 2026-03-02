import type { Pokemons } from "../types/pokemon"

export type ResultadoComparacao = {
  nome: boolean
  tipo1: "correto" | "errado"
  tipo2: "correto" | "errado"
  cores: "correto" | "errado"
  fase: "maior" | "menor" | "correto"
  gen: "maior" | "menor" | "correto"
  altura: "maior" | "menor" | "correto"
  peso: "maior" | "menor" | "correto"
  bst: "maior" | "menor" | "correto"
}

export function verificarResposta(
  guess: Pokemons,
  alvo: Pokemons
): ResultadoComparacao {
  return {
    nome: guess.nome === alvo.nome,

    tipo1:
      guess.tipo1 === alvo.tipo1 ? "correto" : "errado",

    tipo2:
      guess.tipo2 === alvo.tipo2 ? "correto" : "errado",

    cores:
      guess.cores === alvo.cores ? "correto" : "errado",

    fase:
      guess.fase === alvo.fase
        ? "correto"
        : guess.fase > alvo.fase
        ? "maior"
        : "menor",

    gen:
      guess.gen === alvo.gen
        ? "correto"
        : guess.gen > alvo.gen
        ? "maior"
        : "menor",

    altura:
      guess.altura === alvo.altura
        ? "correto"
        : guess.altura > alvo.altura
        ? "maior"
        : "menor",

    peso:
      guess.peso === alvo.peso
        ? "correto"
        : guess.peso > alvo.peso
        ? "maior"
        : "menor",

    bst:
      guess.bst === alvo.bst
        ? "correto"
        : guess.bst > alvo.bst
        ? "maior"
        : "menor",
  }
}