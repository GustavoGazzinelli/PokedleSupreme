import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPokemonDoDia } from '../game/pokemonDoDia'
import { verificarResposta } from '../game/verificarResposta'
import type { Pokemons } from '../types/pokemon'
import ChuteInput from '../components/chuteInput'
import ChuteLinha from '../components/chuteLinha'
import '../style/classico.css'

type Tentativa = {
  pokemon: Pokemons
  resultado: ReturnType<typeof verificarResposta>
}

export default function Classico() {
  const [pokemonDoDia, setPokemonDoDia] = useState<Pokemons | null>(null)
  const [tentativas, setTentativas] = useState<Tentativa[]>([])

  useEffect(() => {
    setPokemonDoDia(getPokemonDoDia())
  }, [])

  function processarChute(pokemon: Pokemons) {
    if (!pokemonDoDia) return

    const resultado = verificarResposta(pokemon, pokemonDoDia)

    setTentativas((prev) => [
      ...prev,
      { pokemon, resultado },
    ])
  }

  const jogoFinalizado = tentativas.some((t) => t.resultado.nome)

  if (!pokemonDoDia) {
    return (
      <div className="app">
        <Link to="/">
          <img src="/img/logo.png" alt="logo" />
        </Link>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Link to="/">
        <img src="/img/logo.png" alt="logo" />
      </Link>

      <ChuteInput onChutar={processarChute} disabled={jogoFinalizado} />

      <div className="lista-tentativas">
        {tentativas.map((t, index) => (
          <ChuteLinha
            key={index}
            pokemon={t.pokemon}
            resultado={t.resultado}
          />
        ))}
      </div>
    </div>
  )
}