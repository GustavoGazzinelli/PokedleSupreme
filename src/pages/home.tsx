import { Link } from 'react-router-dom'
import '../style/home.css'

export default function Home() {
  return (
    <div className="container">
      <Link to={'./'}><img src="/img/logo.png" alt="logo" className='logo'/></Link>

      <Link className='card' to={'/classico'}>
        <img className='icone' src="/img/ponto.png" alt="ponto" />
        <div>
            <h2>Classico</h2>
            <p>Novas Pistas a cada tentativa</p>
        </div>
      </Link>
      <Link className='card' to={'/descricao'}>
        <img className='icone' src="/img/pokedex.png" alt="pokedex" />
        <div>
            <h2>Descrição</h2>
            <p>Adivinhe o Pokémon pela descrição da Pokedex</p>
        </div>
      </Link>
    </div>
  )
}
