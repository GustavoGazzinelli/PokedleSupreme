import type { Pokemons } from '../types/pokemon'
import type { ResultadoComparacao } from '../game/verificarResposta'
import { useEffect, useState } from "react"
import '../style/chuteLinha.css'

type ChuteLinhaProps = {
  pokemon: Pokemons
  resultado: ResultadoComparacao
}

export default function ChuteLinha({ pokemon, resultado }: ChuteLinhaProps) {
  const [ehVisivel, setVisivel] = useState<number>(0)

  useEffect(() => {
    let i = 0

    const intervalo = setInterval(() => {
      i++
      setVisivel(i)

      if (i >= 8) {
        clearInterval(intervalo)
      }
    }, 400)

    return () => clearInterval(intervalo)
  }, [])

  return (

    <div className="chute-linha">
      <span className="celula celula-nome revelada">
        <img
          src={pokemon.sprite}
          alt={pokemon.nome}
          className="sprite"
        />
      </span>

      <span className={`celula ${resultado.tipo1} ${ehVisivel >= 1 ? "revelada" : ""
        }`}>
        {pokemon.tipo1}
      </span>

      <span className={`celula ${resultado.tipo2} ${ehVisivel >= 2 ? "revelada" : ""
        }`}>
        {pokemon.tipo2}
      </span>

      <span className={`celula ${resultado.cores} ${ehVisivel >= 3 ? "revelada" : ""
        }`}>
        {pokemon.cores.join(", ")}
      </span>

      <span className={`celula ${resultado.fase} ${ehVisivel >= 4 ? "revelada" : ""
        }`}>
        {pokemon.fase}
      </span>

      <span className={`celula ${resultado.gen} ${ehVisivel >= 5 ? "revelada" : ""
        }`}>
        {pokemon.gen}
      </span>

      <span className={`celula ${resultado.altura} ${ehVisivel >= 6 ? "revelada" : ""
        }`}>
        {pokemon.altura}m
      </span>

      <span className={`celula ${resultado.peso} ${ehVisivel >= 7 ? "revelada" : ""
        }`}>
        {pokemon.peso}kg
      </span>

      <span className={`celula ${resultado.bst} ${ehVisivel >= 8 ? "revelada" : ""
        }`}>
        {pokemon.bst}
      </span>
    </div>
  )
}