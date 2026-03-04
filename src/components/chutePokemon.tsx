import type { Pokemons } from '../types/pokemon'
import type { ResultadoComparacao } from '../game/verificarResposta'
import { useEffect, useState } from "react"
import '../style/chutePokemon.css'

type ChutePokemonProps = {
    pokemon: Pokemons
    resultado: ResultadoComparacao
}

export default function ChutePokemon({ pokemon, resultado }: ChutePokemonProps) {
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

        <div className="chute">
            <div className='containerSprite'>
                <img src={pokemon.sprite} alt={pokemon.nome} className="spriteDesc" />
            </div>
            <p className='nome'>{pokemon.nome}</p>
            <p>{resultado.nome}</p>
        </div>
    )
}