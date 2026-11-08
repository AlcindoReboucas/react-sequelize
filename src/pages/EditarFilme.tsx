import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Topo } from '../components'
import FormFilme from '../FormFilme'
import type { Filme } from '../types'

export default function EditarFilme() {
  const { id } = useParams() // pega o id da URL: /filmes/:id/editar
  const navigate = useNavigate()
  const [filme, setFilme] = useState<Filme | null>(null)

  // Busca o filme para preencher o formulário
  useEffect(() => {
    fetch(`/api/filmes/${id}`)
      .then((res) => res.json())
      .then(setFilme)
  }, [id])

  // Envia os dados alterados para a API (PUT) e volta para o detalhe
  async function salvar(dados: Record<string, FormDataEntryValue>) {
    await fetch(`/api/filmes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
    navigate(`/filmes/${id}`)
  }

  // Pede confirmação, exclui o filme na API (DELETE) e volta para a Biblioteca
  async function excluir() {
    if (!confirm(`Excluir "${filme?.titulo}"? Os comentários dele também serão apagados.`)) return
    await fetch(`/api/filmes/${id}`, { method: 'DELETE' })
    navigate('/')
  }

  if (!filme) return <p>Carregando...</p>

  return (
    <main className="app">
      <Topo />
      <h1 className="titulo-secao">Editar filme</h1>
      <FormFilme filme={filme} textoBotao="Salvar alterações" aoEnviar={salvar} />
      <button className="excluir" onClick={excluir}>🗑️ Excluir filme</button>
    </main>
  )
}
