import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react'
import type { Pokemons } from '../types/pokemon'
import pokemonsData from '../data/pokemon.json'
import '../style/classico.css'

const POKEMONS: Pokemons[] = pokemonsData as Pokemons[]

type ChuteInputProps = {
  onChutar: (pokemon: Pokemons) => void
  disabled?: boolean
  pokemonsJaChutadosIds?: number[]
}

export default function ChuteInput({
  onChutar,
  disabled = false,
  pokemonsJaChutadosIds = [],
}: ChuteInputProps) {
  const [nomeChute, setNomeChute] = useState<string>('')
  const [sugestoes, setSugestoes] = useState<Pokemons[]>([])
  const [indiceAtivo, setIndiceAtivo] = useState<number>(-1)
  const itensRef = useRef<(HTMLLIElement | null)[]>([])

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
      setIndiceAtivo(-1)
      itensRef.current = []
      return
    }

    const filtrados = POKEMONS
      .filter((p) => p.nome.toLowerCase().startsWith(termo))
      .filter((p) => !pokemonsJaChutadosIds.includes(p.id))
      .slice(0, 10)

    setSugestoes(filtrados)
    setIndiceAtivo(filtrados.length > 0 ? 0 : -1)
    itensRef.current = new Array(filtrados.length).fill(null)
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
    setIndiceAtivo(-1)
    itensRef.current = []
    onChutar(pokemon)
  }

  useEffect(() => {
    if (indiceAtivo < 0) return
    const item = itensRef.current[indiceAtivo]
    if (item) {
      item.scrollIntoView({ block: 'nearest' })
    }
  }, [indiceAtivo])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (disabled) return

    if (e.key === 'ArrowDown') {
      if (sugestoes.length === 0) return
      e.preventDefault()
      setIndiceAtivo((prev) => {
        if (prev === -1) return 0
        const next = prev + 1
        return next >= sugestoes.length ? 0 : next
      })
      return
    }

    if (e.key === 'ArrowUp') {
      if (sugestoes.length === 0) return
      e.preventDefault()
      setIndiceAtivo((prev) => {
        if (prev === -1 || prev === 0) return sugestoes.length - 1
        return prev - 1
      })
      return
    }

    if (e.key === 'Enter') {
      if (sugestoes.length === 0) return
      if (indiceAtivo < 0 || indiceAtivo >= sugestoes.length) return

      e.preventDefault()
      const pokemon = sugestoes[indiceAtivo]
      handleSelecionarSugestao(pokemon)
    }
  }

  return (
    <form className="barra-pesquisa" onSubmit={handleChutar}>
      <input
        type="text"
        placeholder="Digite o nome do Pokémon..."
        value={nomeChute}
        onChange={(e) => handleChangeInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      {sugestoes.length > 0 && (
        <ul className="lista-sugestoes">
          {sugestoes.map((p, index) => (
            <li
              key={p.id}
              className={indiceAtivo === index ? 'sugestao-ativa' : ''}
              ref={(el) => {
                itensRef.current[index] = el
              }}
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

