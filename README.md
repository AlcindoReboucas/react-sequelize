# Filmes — React + Sequelize + SQLite

## Requisitos

- **Node.js 20.17 ou mais novo** (confira com `node -v`). O driver `sqlite3` não funciona em versões antigas.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:5173

Não precisa instalar o SQLite separadamente. O pacote `sqlite3` já traz o banco, e o arquivo `database.sqlite` é criado sozinho na primeira execução, com 10 filmes de exemplo.

### Levando o projeto para outra máquina

1. Copie a pasta **sem** a pasta `node_modules`. Ela tem arquivos compilados para o sistema de origem e não funciona em outro computador.
2. Na máquina nova, rode `npm install` e depois `npm run dev`.

### Se o SQLite der erro

- Rode `npm rebuild sqlite3`.
- Se o npm não conseguir baixar o driver pronto, ele tenta compilar. Para isso, a máquina precisa de:
  - **Mac:** `xcode-select --install`
  - **Linux:** `sudo apt install build-essential python3`
  - **Windows:** "Visual Studio Build Tools" com "Desenvolvimento para desktop com C++"
- Se o banco estiver estragado, apague o `database.sqlite`. Ele é recriado na próxima execução.

## Estrutura

- `server/` — API Express com Sequelize (porta 3001). Os dados ficam no arquivo `database.sqlite`.
  - `database.ts`: conexão com o SQLite
  - `Filme.ts` e `Comentario.ts`: os models; 1 filme tem N comentários (`hasMany` / `belongsTo`)
  - `api.ts`: as rotas (`/api/filmes`, `/api/filmes/:id/comentarios`...)
  - `migrations.ts`: cria as tabelas (`sync()`) e os filmes de exemplo
  - `index.ts`: junta tudo e sobe o servidor
- `src/` — React (Vite). Páginas: Biblioteca (`/`), filme com comentários (`/filmes/:id`), editar (`/filmes/:id/editar`) e cadastrar (`/cadastrar`).
- `public/media/` — as capas dos filmes, que funcionam sem internet. Os pôsteres foram tirados da Wikipedia e servem só para uso didático.

Para recomeçar do zero, apague o `database.sqlite`. Os 10 filmes de exemplo são criados de novo.

> Se você criar um campo novo no model, também precisa apagar o `database.sqlite`: o `sync()` cria tabelas, mas não altera uma tabela que já existe. Em projetos reais, isso é feito com *migrations*.
