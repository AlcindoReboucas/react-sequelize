import { useState, type FormEvent } from 'react'
import type { Filme } from './types'

interface Props {
  filme?: Filme // na edição vem preenchido; no cadastro fica vazio
  textoBotao: string
  aoEnviar: (dados: Record<string, FormDataEntryValue>) => void
}

// Formulário usado nas páginas de cadastro e de edição
export default function FormFilme({ filme, textoBotao, aoEnviar }: Props) {
  const [capa, setCapa] = useState(filme?.capa ?? '') // para mostrar a prévia da capa

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    aoEnviar(Object.fromEntries(new FormData(e.currentTarget)))
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <input name="titulo" placeholder="Título" defaultValue={filme?.titulo} required />
      <input name="ano" type="number" placeholder="Ano" defaultValue={filme?.ano} />
      <input name="nota" type="number" step="0.1" min="0" max="10" placeholder="Nota" defaultValue={filme?.nota} />
      <div className="campo-capa">
        <input
          name="capa"
          placeholder="Capa: https://... ou /media/arquivo.jpg"
          value={capa}
          onChange={(e) => setCapa(e.target.value)}
        />
        {capa && <img className="previa-capa" src={capa} alt="Prévia da capa" />}
      </div>
      <textarea name="sinopse" placeholder="Sinopse" defaultValue={filme?.sinopse} />
      <button type="submit">{textoBotao}</button>
    </form>
  )
}
