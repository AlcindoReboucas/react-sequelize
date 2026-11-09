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

  //Para editar um comentario pegar o comentario
  // que está sendo editado pro formulario
  //  e depois atualizar a lista de comentarios
  //   com o novo comentario

  const [comentarioEditando, setComentarioEditando] = useState<Comentario | null>(null)

  // Pegar o comentário para preencher o formulário
  function editarComentario(id: number) {
    const comentario = comentarios.find((c) => c.id === id)
    if (comentario) {
      setComentarioEditando(comentario)
    }
  }

  // Envia os dados alterados para a API (PUT) e atualiza a lista de comentários
  async function salvarEdicao(id: number, novoTexto: string) {
    const res = await fetch(`/api/filmes/${filmeId}/comentarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: novoTexto }),
    })
    if (res.ok) {
      setComentarios(
        comentarios.map((c) => (c.id === id ? { ...c, texto: novoTexto } : c))
      )
      setComentarioEditando(null)
    } else {
      alert('Erro ao editar comentário')
    }
  }

  //Apagar um comentário api e atualiza a lista de comentários
  async function removerComentario(id: number) {
    const res = await fetch(`/api/filmes/${filmeId}/comentarios/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setComentarios(comentarios.filter((c) => c.id !== id))
    } else {
      alert('Erro ao remover comentário')
    }
  }

  // Renderiza a lista de comentários e o formulário
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
            <button className="button" onClick={() => removerComentario(c.id)}>
              Remover
            </button>
            <button className="button" onClick={() => editarComentario(c.id)}>
              Editar
            </button>
            {comentarioEditando && comentarioEditando.id === c.id && (
              <form
                className="form-edicao"
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const novoTexto = (form.elements.namedItem('novoTexto') as HTMLInputElement).value
                  salvarEdicao(c.id, novoTexto)
                }}
              >
                <input
                  name="novoTexto"
                  defaultValue={comentarioEditando.texto}
                  required
                />
                <button type="submit">Salvar</button>
                <button type="button" className="button" onClick={() => setComentarioEditando(null)}>
                  Cancelar
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}