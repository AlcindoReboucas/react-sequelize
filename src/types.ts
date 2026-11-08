// Formato de um filme, igual ao que a API devolve
export interface Filme {
  id: number
  titulo: string
  ano: number
  nota: number
  sinopse: string
  capa: string
  assistido: boolean
  Comentarios?: Comentario[] // só vem na busca de um filme (GET /api/filmes/:id)
}

// Formato de um comentário
export interface Comentario {
  id: number
  nome: string
  texto: string
  createdAt: string // data em que foi criado
}
