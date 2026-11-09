import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Capa, Topo } from '../components'
import type { Filme } from '../types'

export default function ListaFilmesAA() {
  const [filmes, setFilmes] = useState<Filme[]>([])

  // Ao abrir a página, busca a lista de filmes na API
  useEffect(() => {
    fetch('/api/filmes')
      .then((res) => res.json())
      .then(setFilmes)
  }, [])

  return (
    <main className="app">
      <Topo />

      <h1 className="titulo-secao">Todos os filmes Assistidos</h1>
      <section className="grade">
        {filmes
          .filter((filme) => filme.assistido)
          .map((filme) => (
            <Link key={filme.id} to={`/filmes/${filme.id}`} className="cartao">
              <Capa filme={filme} />
              <strong>{filme.titulo}</strong>
              <small>
                <span className="estrela">★</span> {filme.nota} &nbsp;|&nbsp; {filme.ano}
              </small>
            </Link>
          ))}
      </section>
    </main>
  )
}
