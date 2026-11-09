import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListaFilmes from './pages/ListaFilmes'
import DetalheFilme from './pages/DetalheFilme'
import CadastroFilme from './pages/CadastroFilme'
import EditarFilme from './pages/EditarFilme'
import './index.css'
import ListaFilmesAA from './pages/ListaFilmes copy'

// Páginas: a lista (/), o detalhe (/filmes/1), a edição (/filmes/1/editar) e o cadastro (/cadastrar)
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ListaFilmes />} />
      <Route path="/filmes/:id" element={<DetalheFilme />} />
      <Route path="/filmes/:id/editar" element={<EditarFilme />} />
      <Route path="/cadastrar" element={<CadastroFilme />} />
      <Route path="/assistidos" element={<ListaFilmesAA />} />
    </Routes>
  </BrowserRouter>,
)
