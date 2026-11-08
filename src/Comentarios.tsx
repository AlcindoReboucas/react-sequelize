import { useState, type FormEvent } from 'react'
import type { Comentario } from './types'

interface Props {
  filmeId: number
  iniciais: Comentario[] // comentários que vieram junto com o filme
}

// Lista de comentários de um filme + formulário para comentar
export default function Comentarios({ filmeId, iniciais }: Props) {
  const [comentarios, setComentarios] = useState(iniciais)

  // Envia o comentário para a API e coloca ele no topo da lista
  async function comentar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const dados = Object.fromEntries(new FormData(form))

    const res = await fetch(`/api/filmes/${filmeId}/comentarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
    const novo: Comentario = await res.json()

    setComentarios([novo, ...comentarios])
    form.reset()
  }

  return (
    <section className="comentarios">
      <h2 className="titulo-secao">💬 Comentários</h2>

      <form className="form-comentario" onSubmit={comentar}>
        <input name="nome" placeholder="Seu nome" required />
        <input name="texto" placeholder="Escreva um comentário..." required />
        <button type="submit">Comentar</button>
      </form>

      {comentarios.length === 0 && <p>Seja o primeiro a comentar!</p>}

      {comentarios.map((c) => (
        <div key={c.id} className="comentario">
          <span className="avatar">{c.nome[0].toUpperCase()}</span>
          <div>
            <strong>{c.nome}</strong>{' '}
            <small>{new Date(c.createdAt).toLocaleDateString('pt-BR')}</small>
            <p>{c.texto}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
