import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Comentarios from '../Comentarios'
import { Capa, Topo } from '../components'
import type { Filme } from '../types'

export default function DetalheFilme() {
  const { id } = useParams() // pega o id da URL: /filmes/:id
  const [filme, setFilme] = useState<Filme | null>(null)

  // Busca na API apenas o filme escolhido
  useEffect(() => {
    fetch(`/api/filmes/${id}`)
      .then((res) => res.json())
      .then(setFilme)
  }, [id])

  if (!filme) return <p>Carregando...</p>

  return (
    <main className="app">
      <Topo />

      <section className="detalhe" style={{ backgroundImage: `url("${filme.capa}")` }}>
        <Capa filme={filme} />
        <div>
          <div className="acoes">
            <Link to="/" className="voltar">← Voltar</Link>
            <Link to={`/filmes/${filme.id}/editar`} className="voltar">✏️ Editar</Link>
          </div>
          <h1>{filme.titulo}</h1>
          <h2> Ja Assistido</h2> 

           <input className='check' type="checkbox" checked={filme.assistido} onChange={(evento) => {
             const novoValor = evento.target.checked
             fetch(`/api/filmes/${filme.id}`, {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ ...filme, assistido: novoValor })
             })
           }} />

          <p className="info">
            <span className="estrela">★</span> {filme.nota} &nbsp;|&nbsp; {filme.ano}
          </p>
          <p>{filme.sinopse}</p>
        </div>
      </section>

      <Comentarios key={filme.id} filmeId={filme.id} iniciais={filme.Comentarios ?? []} />
    </main>
  )
}
