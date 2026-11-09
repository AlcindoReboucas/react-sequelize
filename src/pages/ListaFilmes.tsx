import { useEffect, useState } from 'react'
import { CartaoFilme, Topo } from '../components'
import type { Filme } from '../types'

export default function ListaFilmes() {
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

  return (
    <main className="app">
      <Topo />

      <section className="cabecalho-pagina">
        <div>
          <p className="sobretitulo">SUA PRÓXIMA SESSÃO</p>
          <h1 className="titulo-secao">Cinema nacional, sempre por perto.</h1>
          <p className="descricao-secao">Explore sua coleção e acompanhe os filmes que já assistiu.</p>
        </div>
        <span className="contador-filmes">{filmes.length} {filmes.length === 1 ? 'filme' : 'filmes'}</span>
      </section>

      {carregando && <p className="estado-vazio">Carregando sua biblioteca…</p>}
      {erro && <p className="mensagem-erro estado-vazio" role="alert">{erro}</p>}
      {!carregando && !erro && filmes.length === 0 && (
        <p className="estado-vazio">Sua biblioteca está vazia. Cadastre o primeiro filme para começar.</p>
      )}
      {!carregando && !erro && filmes.length > 0 && (
        <section className="grade" aria-label="Biblioteca de filmes">
          {filmes.map((filme) => (
            <CartaoFilme key={filme.id} filme={filme} aoAlterarAssistido={atualizarAssistido} />
          ))}
        </section>
      )}
    </main>
  )
}
