import path from 'node:path'
import { Sequelize } from 'sequelize'

// Mostra o que fazer quando o SQLite não funciona e encerra o servidor
export function falhaNoBanco(erro: unknown): never {
  console.error(`
  ❌ Não foi possível abrir o banco SQLite.
     1. Confira a versão do Node (precisa ser 20.17 ou mais nova): node -v
     2. Instale as dependências nesta máquina: npm install
     3. Se continuar, reinstale o driver do SQLite: npm rebuild sqlite3
  Erro original:`, erro)
  process.exit(1)
}

// Conexão com o banco SQLite: os dados ficam no arquivo database.sqlite, na raiz do projeto.
// O caminho é montado a partir desta pasta (server/), então funciona de onde quer que
// o servidor seja iniciado.
function conectar() {
  try {
    return new Sequelize({
      dialect: 'sqlite',
      storage: path.join(import.meta.dirname, '..', 'database.sqlite'),
      logging: false, // mude para console.log para ver o SQL gerado pelo Sequelize
    })
  } catch (erro) {
    falhaNoBanco(erro) // ex.: o pacote sqlite3 não foi instalado
  }
}

export const sequelize = conectar()
