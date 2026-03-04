import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPokemonDoDia } from '../game/pokemonDoDia'
import { verificarResposta } from '../game/verificarResposta'
import type { Pokemons } from '../types/pokemon'
import ChuteInput from '../components/chuteInput'
import ChutePokemon from '../components/chutePokemon'
import '../style/descricao.css'

type Tentativa = {
    pokemon: Pokemons
    resultado: ReturnType<typeof verificarResposta>
}

export default function Descricao() {
    const [pokemonDoDia, setPokemonDoDia] = useState<Pokemons | null>(null)
    const [tentativas, setTentativas] = useState<Tentativa[]>([])

    useEffect(() => {
        setPokemonDoDia(getPokemonDoDia('descricao'))
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

            {tentativas.length > 0 && (
                <div className="lista-tentativas">
                    {tentativas.map((t, index) => (
                        <ChutePokemon
                            key={index}
                            pokemon={t.pokemon}
                            resultado={t.resultado}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}