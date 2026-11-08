import express from 'express'
import { api } from './api.ts'
import { migrar } from './migrations.ts'

const app = express()
app.use(express.json()) // permite ler o corpo JSON das requisições POST e PUT
app.use('/api', api) // todas as rotas de api.ts ficam em /api/...

await migrar() // cria as tabelas e os filmes de exemplo, se precisar

app.listen(3001, () => console.log('API rodando em http://localhost:3001'))
