import { Link, NavLink } from 'react-router-dom'
import type { Filme } from './types'

// Barra do topo, usada em todas as páginas
// O NavLink coloca a classe "active" no link da página atual
export function Topo() {
  return (
    <header className="topo">
      <Link to="/" className="logo">🎬 Filmes Nacionais</Link>
      <nav className="pilula">
        <NavLink to="/" end>🎦 Biblioteca</NavLink>
        <NavLink to="/assistidos" end>✅ Assistidos</NavLink>
        <NavLink to="/cadastrar">➕ Cadastrar filme</NavLink>
      </nav>
    </header>
  )
}

// Mostra a capa do filme; se não tiver, mostra um fundo colorido com o título
export function Capa({ filme }: { filme: Filme }) {
  if (filme.capa) return <img className="capa" src={filme.capa} alt={filme.titulo} />
  return <div className="capa sem-capa">{filme.titulo}</div>
}
