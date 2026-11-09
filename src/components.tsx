import { useState } from 'react'
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

export function ControleAssistido({
  filme,
  aoAtualizar,
  detalhe = false,
}: {
  filme: Filme
  aoAtualizar: (assistido: boolean) => void
  detalhe?: boolean
}) {
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  async function alternarAssistido(assistido: boolean) {
    setSalvando(true)
    setErro('')

    try {
      const resposta = await fetch(`/api/filmes/${filme.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assistido }),
      })

      if (!resposta.ok) throw new Error('Não foi possível atualizar o status do filme.')
      aoAtualizar(assistido)
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao atualizar o status do filme.')
    } finally {
      setSalvando(false)
    }
  }

  const texto = salvando
    ? 'Salvando…'
    : detalhe
      ? filme.assistido ? 'Já assisti' : 'Marcar como assistido'
      : filme.assistido ? 'Assistido' : 'Marcar como assistido'

  return (
    <>
      <label className={`controle-assistido${filme.assistido ? ' marcado' : ''}${detalhe ? ' detalhe-assistido' : ''}`}>
        <input
          type="checkbox"
          checked={filme.assistido}
          disabled={salvando}
          onChange={(evento) => alternarAssistido(evento.target.checked)}
        />
        <span className="controle-icone" aria-hidden="true">{filme.assistido ? '✓' : ''}</span>
        <span>{texto}</span>
      </label>
      {erro && <small className="mensagem-erro" role="alert">{erro}</small>}
    </>
  )
}

export function CartaoFilme({
  filme,
  aoAlterarAssistido,
}: {
  filme: Filme
  aoAlterarAssistido: (id: number, assistido: boolean) => void
}) {
  return (
    <article className="cartao">
      <Link to={`/filmes/${filme.id}`} className="cartao-link">
        <div className="cartao-capa">
          <Capa filme={filme} />
          <span className="nota-filme"><span className="estrela">★</span> {filme.nota}</span>
        </div>
        <div className="cartao-info">
          <strong>{filme.titulo}</strong>
          <small>{filme.ano}</small>
        </div>
      </Link>
      <ControleAssistido
        filme={filme}
        aoAtualizar={(assistido) => aoAlterarAssistido(filme.id, assistido)}
      />
    </article>
  )
}
