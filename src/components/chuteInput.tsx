import { useState, type FormEvent } from 'react'
import type { Pokemons } from '../types/pokemon'
import pokemonsData from '../data/pokemon.json'
import '../style/classico.css'

const POKEMONS: Pokemons[] = pokemonsData as Pokemons[]

type ChuteInputProps = {
  onChutar: (pokemon: Pokemons) => void
  disabled?: boolean
}

export default function ChuteInput({ onChutar, disabled = false }: ChuteInputProps) {
  const [nomeChute, setNomeChute] = useState<string>('')
  const [sugestoes, setSugestoes] = useState<Pokemons[]>([])

  function encontrarPokemonPorNome(nome: string): Pokemons | null {
    const termo = nome.trim().toLowerCase()
    if (!termo) return null

    const encontrado = POKEMONS.find(
      (p) => p.nome.toLowerCase() === termo,
    )
    return encontrado ?? null
  }

  function atualizarSugestoes(valor: string) {
    const termo = valor.trim().toLowerCase()
    if (!termo) {
      setSugestoes([])
      return
    }

    const filtrados = POKEMONS
      .filter((p) => p.nome.toLowerCase().startsWith(termo))
      .slice(0, 10)

    setSugestoes(filtrados)
  }

  function handleChutar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (disabled) return
    const pokemon = encontrarPokemonPorNome(nomeChute)
    if (!pokemon) return

    onChutar(pokemon)
    setNomeChute('')
    setSugestoes([])
  }

  function handleChangeInput(valor: string) {
    if (disabled) return
    setNomeChute(valor)
    atualizarSugestoes(valor)
  }

  function handleSelecionarSugestao(pokemon: Pokemons) {
    if (disabled) return
    setNomeChute(pokemon.nome)
    setSugestoes([])
    onChutar(pokemon)
  }

  return (
    <form className="barra-pesquisa" onSubmit={handleChutar}>
      <input
        type="text"
        placeholder="Digite o nome do Pokémon..."
        value={nomeChute}
        onChange={(e) => handleChangeInput(e.target.value)}
        disabled={disabled}
      />
      {sugestoes.length > 0 && (
        <ul className="lista-sugestoes">
          {sugestoes.map((p) => (
            <li
              key={p.id}
              onClick={() => handleSelecionarSugestao(p)}
            >
              <img
                src={p.sprite}
                alt={p.nome}
                className="sprite-sugestao"
              />
              <span>{p.nome}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

