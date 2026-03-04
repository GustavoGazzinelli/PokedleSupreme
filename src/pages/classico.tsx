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

    const jaChutado = tentativas.some((t) => t.pokemon.id === pokemon.id)
    if (jaChutado) return

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

      <ChuteInput
        onChutar={processarChute}
        disabled={jogoFinalizado}
        pokemonsJaChutadosIds={tentativas.map((t) => t.pokemon.id)}
      />

      <div className='header-container'>
        <div className='header'>
          <span className='header-item'>Pokemon</span>
          <span className='header-item'>Tipo 1</span>
          <span className='header-item'>Tipo 2</span>
          <span className='header-item'>Cores</span>
          <span className='header-item'>Fase</span>
          <span className='header-item'>Gen</span>
          <span className='header-item'>Altura</span>
          <span className='header-item'>Peso</span>
          <span className='header-item'>Stats</span>
        </div>

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
    </div>
  )
}