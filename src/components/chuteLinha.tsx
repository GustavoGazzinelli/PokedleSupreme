import type { Pokemons } from '../types/pokemon'
import type { ResultadoComparacao } from '../game/verificarResposta'
import '../style/chuteLinha.css'

type ChuteLinhaProps = {
  pokemon: Pokemons
  resultado: ResultadoComparacao
}

export default function ChuteLinha({ pokemon, resultado }: ChuteLinhaProps) {
  return (
    <div className="chute-linha">
      <span className="celula celula-nome">
        <img
          src={pokemon.sprite}
          alt={pokemon.nome}
          className="sprite"
        />
      </span>

      <span className={`celula ${resultado.tipo1}`}>
        {pokemon.tipo1}
      </span>

      <span className={`celula ${resultado.tipo2}`}>
        {pokemon.tipo2}
      </span>
    
      <span className={`celula ${resultado.habitat}`}>
        {pokemon.habitat}
      </span>

      <span className={`celula ${resultado.gen}`}>
        {pokemon.gen}
      </span>

      <span className={`celula ${resultado.altura}`}>
        {pokemon.altura}m
      </span>

      <span className={`celula ${resultado.peso}`}>
        {pokemon.peso}kg
      </span>

      <span className={`celula ${resultado.bst}`}>
        {pokemon.bst}
      </span>
    </div>
  )
}