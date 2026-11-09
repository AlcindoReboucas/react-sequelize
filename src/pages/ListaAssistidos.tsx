import { useEffect, useState } from 'react'
import { CartaoFilme, Topo } from '../components'
import type { Filme } from '../types'

export default function ListaAssistidos() {
  const [filmes, setFilmes] = useState<Filme[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch('/api/filmes')
      .then((res) => {
        if (!res.ok) throw new Error('Não foi possível carregar os filmes.')
        return res.json()
      })
      .then(setFilmes)
      .catch((error: unknown) => setErro(error instanceof Error ? error.message : 'Erro ao carregar os filmes.'))
      .finally(() => setCarregando(false))
  }, [])

  function atualizarAssistido(id: number, assistido: boolean) {
    setFilmes((atuais) => atuais.map((filme) => filme.id === id ? { ...filme, assistido } : filme))
  }

  const assistidos = filmes.filter((filme) => filme.assistido)

  return (
    <main className="app">
      <Topo />

      <section className="cabecalho-pagina">
        <div>
          <p className="sobretitulo">SUA HISTÓRIA NO CINEMA</p>
          <h1 className="titulo-secao">Filmes que já passaram pela tela.</h1>
          <p className="descricao-secao">Uma coleção dos títulos que você já assistiu.</p>
        </div>
        <span className="contador-filmes">{assistidos.length} {assistidos.length === 1 ? 'assistido' : 'assistidos'}</span>
      </section>

      {carregando && <p className="estado-vazio">Carregando seus filmes…</p>}
      {erro && <p className="mensagem-erro estado-vazio" role="alert">{erro}</p>}
      {!carregando && !erro && assistidos.length === 0 && (
        <p className="estado-vazio">Ainda não há filmes assistidos. Marque um filme na biblioteca quando terminar de assistir.</p>
      )}
      {!carregando && !erro && assistidos.length > 0 && (
        <section className="grade" aria-label="Filmes assistidos">
          {assistidos.map((filme) => (
            <CartaoFilme key={filme.id} filme={filme} aoAlterarAssistido={atualizarAssistido} />
          ))}
        </section>
      )}
    </main>
  )
}
