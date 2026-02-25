import { useMemo, useState } from 'react'
import './App.css'
import type { PokemonLite } from './types/pokemon'

type AtributoStatus = 'acertou' | 'maior' | 'menor' | 'parcial' | 'errou'

type ResultadoChute = {
  id: AtributoStatus
  nome: AtributoStatus
  tipo1: AtributoStatus
  tipo2: AtributoStatus
  gen: AtributoStatus
  fase: AtributoStatus
  cores: AtributoStatus
  habitat: AtributoStatus
  altura: AtributoStatus
  peso: AtributoStatus
  bst: AtributoStatus
}

type Chute = {
  pokemon: PokemonLite
  resultado: ResultadoChute
}

const POKEMONS: PokemonLite[] = [
  {
    id: 25,
    nome: 'Pikachu',
    tipo1: 'Electric',
    tipo2: '',
    gen: 1,
    fase: 1,
    cores: ['amarelo', 'marrom'],
    habitat: 'campina',
    altura: 0.4,
    peso: 6,
    bst: 320,
  },
  {
    id: 1,
    nome: 'Bulbasaur',
    tipo1: 'Grass',
    tipo2: 'Poison',
    gen: 1,
    fase: 1,
    cores: ['verde', 'azul'],
    habitat: 'floresta',
    altura: 0.7,
    peso: 6.9,
    bst: 318,
  },
  {
    id: 4,
    nome: 'Charmander',
    tipo1: 'Fire',
    tipo2: '',
    gen: 1,
    fase: 1,
    cores: ['laranja', 'amarelo'],
    habitat: 'montanha',
    altura: 0.6,
    peso: 8.5,
    bst: 309,
  },
  {
    id: 7,
    nome: 'Squirtle',
    tipo1: 'Water',
    tipo2: '',
    gen: 1,
    fase: 1,
    cores: ['azul', 'marrom'],
    habitat: 'agua',
    altura: 0.5,
    peso: 9,
    bst: 314,
  },
  {
    id: 39,
    nome: 'Jigglypuff',
    tipo1: 'Normal',
    tipo2: 'Fairy',
    gen: 1,
    fase: 1,
    cores: ['rosa', 'branco'],
    habitat: 'cidade',
    altura: 0.5,
    peso: 5.5,
    bst: 270,
  },
]

function comparaNumero(
  chute: number,
  alvo: number,
  toleranciaParcial = 10,
): AtributoStatus {
  if (chute === alvo) return 'acertou'
  if (Math.abs(chute - alvo) <= toleranciaParcial) return 'parcial'
  return chute > alvo ? 'maior' : 'menor'
}

function comparaArrayCores(chute: string[], alvo: string[]): AtributoStatus {
  const intersecao = chute.filter((c) => alvo.includes(c))
  if (intersecao.length === 0) return 'errou'
  if (intersecao.length === alvo.length && alvo.length === chute.length) {
    return 'acertou'
  }
  return 'parcial'
}

function comparaTexto(chute: string, alvo: string): AtributoStatus {
  if (!alvo && !chute) return 'acertou'
  if (!chute || !alvo) return 'errou'
  return chute.toLowerCase() === alvo.toLowerCase() ? 'acertou' : 'errou'
}

function gerarResultadoChute(
  chute: PokemonLite,
  alvo: PokemonLite,
): ResultadoChute {
  return {
    id: comparaNumero(chute.id, alvo.id, 20),
    nome: comparaTexto(chute.nome, alvo.nome),
    tipo1: comparaTexto(chute.tipo1, alvo.tipo1),
    tipo2: comparaTexto(chute.tipo2, alvo.tipo2),
    gen: comparaNumero(chute.gen, alvo.gen, 1),
    fase: comparaNumero(chute.fase, alvo.fase, 1),
    cores: comparaArrayCores(chute.cores, alvo.cores),
    habitat: comparaTexto(chute.habitat, alvo.habitat),
    altura: comparaNumero(chute.altura, alvo.altura, 0.3),
    peso: comparaNumero(chute.peso, alvo.peso, 5),
    bst: comparaNumero(chute.bst, alvo.bst, 30),
  }
}

function labelStatus(status: AtributoStatus): string {
  switch (status) {
    case 'acertou':
      return '✅'
    case 'parcial':
      return '🟡'
    case 'maior':
      return '⬆️'
    case 'menor':
      return '⬇️'
    case 'errou':
    default:
      return '❌'
  }
}

function App() {
  const [pokemonSecreto, setPokemonSecreto] = useState<PokemonLite>(() => {
    const idx = Math.floor(Math.random() * POKEMONS.length)
    return POKEMONS[idx]
  })

  const [idChuteAtual, setIdChuteAtual] = useState<number | ''>('')
  const [chutes, setChutes] = useState<Chute[]>([])

  const jogoGanho = useMemo(
    () =>
      chutes.some(
        (c) =>
          c.pokemon.id === pokemonSecreto.id &&
          c.resultado.nome === 'acertou',
      ),
    [chutes, pokemonSecreto.id],
  )

  function handleChutar() {
    if (idChuteAtual === '') return
    const pokemon = POKEMONS.find((p) => p.id === idChuteAtual)
    if (!pokemon) return

    const resultado = gerarResultadoChute(pokemon, pokemonSecreto)

    setChutes((anterior) => [
      ...anterior,
      {
        pokemon,
        resultado,
      },
    ])
  }

  function handleReiniciar() {
    const idx = Math.floor(Math.random() * POKEMONS.length)
    setPokemonSecreto(POKEMONS[idx])
    setChutes([])
    setIdChuteAtual('')
  }

  return (
    <div className="app">
      <h1>Pokedle Supreme (mini)</h1>

      <p>
        Tente adivinhar o pokémon secreto escolhendo da lista. A cada chute você
        recebe dicas por atributo:
      </p>
      <ul>
        <li>✅ atributo exatamente igual</li>
        <li>🟡 valor próximo / parcial</li>
        <li>⬆️ seu chute é maior que o alvo</li>
        <li>⬇️ seu chute é menor que o alvo</li>
        <li>❌ completamente diferente</li>
      </ul>

      <div className="painel-chute">
        <select
          value={idChuteAtual}
          onChange={(e) =>
            setIdChuteAtual(
              e.target.value === '' ? '' : Number(e.target.value),
            )
          }
        >
          <option value="">Escolha um pokémon...</option>
          {POKEMONS.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.id} - {p.nome}
            </option>
          ))}
        </select>
        <button onClick={handleChutar} disabled={idChuteAtual === ''}>
          Chutar
        </button>
        <button onClick={handleReiniciar}>Novo jogo</button>
      </div>

      {jogoGanho && (
        <div className="mensagem-vitoria">
          Você acertou! O pokémon secreto era {pokemonSecreto.nome}.
        </div>
      )}

      <table className="tabela-chutes">
        <thead>
          <tr>
            <th>Pokémon</th>
            <th>ID</th>
            <th>Tipo 1</th>
            <th>Tipo 2</th>
            <th>Gen</th>
            <th>Fase</th>
            <th>Cores</th>
            <th>Habitat</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>BST</th>
          </tr>
        </thead>
        <tbody>
          {chutes.map((chute, index) => (
            <tr key={`${chute.pokemon.id}-${index}`}>
              <td>{chute.pokemon.nome}</td>
              <td>{labelStatus(chute.resultado.id)}</td>
              <td>{labelStatus(chute.resultado.tipo1)}</td>
              <td>{labelStatus(chute.resultado.tipo2)}</td>
              <td>{labelStatus(chute.resultado.gen)}</td>
              <td>{labelStatus(chute.resultado.fase)}</td>
              <td>{labelStatus(chute.resultado.cores)}</td>
              <td>{labelStatus(chute.resultado.habitat)}</td>
              <td>{labelStatus(chute.resultado.altura)}</td>
              <td>{labelStatus(chute.resultado.peso)}</td>
              <td>{labelStatus(chute.resultado.bst)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
