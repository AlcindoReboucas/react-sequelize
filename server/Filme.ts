import { DataTypes } from 'sequelize'
import { sequelize } from './database.ts'

// Model: descreve a tabela "Filmes" (o Sequelize cria id, createdAt e updatedAt sozinho)
export const Filme = sequelize.define('Filme', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  ano: DataTypes.INTEGER,
  nota: DataTypes.FLOAT,
  sinopse: DataTypes.TEXT,
  // caminho (/media/bacurau.jpg) ou URL da internet (https://...)
  // TEXT porque URLs podem passar de 255 caracteres (o SQLite não limita, outros bancos sim)
  capa: DataTypes.TEXT,
  // true = já assistido; todo filme novo começa como não assistido
  assistido: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
})
