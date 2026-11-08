import express from 'express'
import { Comentario } from './Comentario.ts'
import { Filme } from './Filme.ts'

// Todas as rotas da API (o index.ts coloca o prefixo /api na frente)
export const api = express.Router()

// Lista todos os filmes  (SELECT * FROM Filmes)
api.get('/filmes', async (_req, res) => {
  const filmes = await Filme.findAll()
  res.json(filmes)
})

// Busca um filme pelo id, junto com os comentários dele (mais novos primeiro)
// O "include" faz um JOIN entre Filmes e Comentarios
api.get('/filmes/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id, {
    include: Comentario,
    order: [[Comentario, 'createdAt', 'DESC']],
  })
  if (!filme) {
    res.status(404).json({ erro: 'Filme não encontrado' })
    return
  }
  res.json(filme)
})

// Cadastra um filme novo  (INSERT INTO Filmes ...)
api.post('/filmes', async (req, res) => {
  const filme = await Filme.create(req.body)
  res.status(201).json(filme)
})

// Altera um filme que já existe  (UPDATE Filmes SET ... WHERE id = ?)
api.put('/filmes/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id)
  if (!filme) {
    res.status(404).json({ erro: 'Filme não encontrado' })
    return
  }
  await filme.update(req.body)
  res.json(filme)
})

// Exclui um filme e os comentários dele  (DELETE FROM ... WHERE ...)
api.delete('/filmes/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id)
  if (!filme) {
    res.status(404).json({ erro: 'Filme não encontrado' })
    return
  }
  await Comentario.destroy({ where: { FilmeId: req.params.id } }) // primeiro os comentários
  await filme.destroy()
  res.status(204).end() // 204 = deu certo, sem conteúdo na resposta
})

// Cria um comentário em um filme  (INSERT INTO Comentarios ...)
api.post('/filmes/:id/comentarios', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id)
  if (!filme) {
    res.status(404).json({ erro: 'Filme não encontrado' })
    return
  }
  const comentario = await Comentario.create({
    nome: req.body.nome,
    texto: req.body.texto,
    FilmeId: req.params.id, // liga o comentário ao filme
  })
  res.status(201).json(comentario)
})
