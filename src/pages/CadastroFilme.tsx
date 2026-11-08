import { useNavigate } from 'react-router-dom'
import { Topo } from '../components'
import FormFilme from '../FormFilme'
import type { Filme } from '../types'

export default function CadastroFilme() {
  const navigate = useNavigate() // permite trocar de página pelo código

  // Envia os dados para a API (POST) e abre a página do filme criado
  async function cadastrar(dados: Record<string, FormDataEntryValue>) {
    const res = await fetch('/api/filmes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
    const novo: Filme = await res.json()

    navigate(`/filmes/${novo.id}`)
  }

  return (
    <main className="app">
      <Topo />
      <h1 className="titulo-secao">Cadastrar filme</h1>
      <FormFilme textoBotao="Cadastrar" aoEnviar={cadastrar} />
    </main>
  )
}
