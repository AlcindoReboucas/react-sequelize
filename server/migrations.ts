import { DataTypes } from 'sequelize'
import { falhaNoBanco, sequelize } from './database.ts'
import { Filme } from './Filme.ts'
import './Comentario.ts' // registra o model Comentario antes do sync()

// Prepara o banco ao iniciar o servidor.
// Versão simples: o sync() cria as tabelas que ainda não existem (sem apagar nada),
// mas NÃO altera uma tabela que já existe. Em projetos maiores, isso é trabalho
// para migrations de verdade (sequelize-cli ou Umzug).
export async function migrar() {
  // Testa a conexão antes de tudo, para mostrar um erro claro se o SQLite não abrir
  try {
    await sequelize.authenticate()
  } catch (erro) {
    falhaNoBanco(erro)
  }

  await sequelize.sync()

  // Migration: acrescenta a coluna "assistido" em bancos criados antes dela existir.
  // (o sync() acima não adiciona colunas em uma tabela que já existe)
  const queryInterface = sequelize.getQueryInterface()
  const colunas = await queryInterface.describeTable('Filmes')
  if (!colunas.assistido) {
    await queryInterface.addColumn('Filmes', 'assistido', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
  }

  // Seed: se o banco estiver vazio, cadastra os filmes de exemplo
  if ((await Filme.count()) === 0) {
    await Filme.bulkCreate([
      { titulo: 'Central do Brasil', ano: 1998, nota: 8.0, capa: '/media/central-do-brasil.jpg', sinopse: 'Uma ex-professora ajuda um menino a procurar o pai no sertão.' },
      { titulo: 'Cidade de Deus', ano: 2002, nota: 8.6, capa: '/media/cidade-de-deus.jpg', sinopse: 'Dois jovens seguem caminhos diferentes numa favela do Rio de Janeiro.' },
      { titulo: 'O Auto da Compadecida', ano: 2000, nota: 8.5, capa: '/media/auto-da-compadecida.jpg', sinopse: 'As aventuras de João Grilo e Chicó no sertão nordestino.' },
      { titulo: 'Tropa de Elite', ano: 2007, nota: 8.0, capa: '/media/tropa-de-elite.png', sinopse: 'O capitão Nascimento procura um substituto no BOPE do Rio de Janeiro.' },
      { titulo: 'Bacurau', ano: 2019, nota: 7.4, capa: '/media/bacurau.jpg', sinopse: 'Um povoado do sertão some do mapa e passa a ser atacado por estranhos.' },
      { titulo: 'Que Horas Ela Volta?', ano: 2015, nota: 7.6, capa: '/media/que-horas-ela-volta.jpg', sinopse: 'A vida de uma empregada doméstica muda quando a filha chega a São Paulo.' },
      { titulo: 'O Pagador de Promessas', ano: 1962, nota: 8.0, capa: '/media/pagador-de-promessas.jpg', sinopse: 'Zé do Burro carrega uma cruz até Salvador para pagar uma promessa.' },
      { titulo: 'Ainda Estou Aqui', ano: 2024, nota: 8.2, capa: '/media/ainda-estou-aqui.jpg', sinopse: 'Eunice Paiva reconstrói a família depois que o marido desaparece na ditadura.' },
      { titulo: 'Carandiru', ano: 2003, nota: 7.5, capa: '/media/carandiru.jpg', sinopse: 'Um médico conhece as histórias dos presos do maior presídio do país.' },
      { titulo: 'Lisbela e o Prisioneiro', ano: 2003, nota: 7.4, capa: '/media/lisbela.jpg', sinopse: 'Uma moça apaixonada por cinema se encanta por um malandro aventureiro.' },
    ])
  }
}
