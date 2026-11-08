import { DataTypes } from 'sequelize'
import { sequelize } from './database.ts'
import { Filme } from './Filme.ts'

// Model: tabela "Comentarios" (createdAt é usado como a data do comentário)
export const Comentario = sequelize.define('Comentario', {
  nome: { type: DataTypes.STRING, allowNull: false },
  texto: { type: DataTypes.TEXT, allowNull: false },
})

// Associação: 1 filme tem N comentários.
// O Sequelize cria sozinho a coluna FilmeId na tabela Comentarios.
Filme.hasMany(Comentario)
Comentario.belongsTo(Filme)
