/********************************
 * Objetivo: Cria a interação com o Banco de dados MySQL para fazer o CRUD de Filmes
 * Data: 09/04/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 *******************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Inserir um novo filme
const insertAtor =  async function(dadosFilme) {
    
    try {

     let sql;
        if( dadosFilme.datafalecimento == null || 
            dadosFilme.datafalecimento == ''   ||
             dadosFilme.datafalecimento == undefined){
             // Script SQL para inserir no banco de dados
            sql = `insert into tbl_filme (
                nome,
                data_nascimento,
                foto,
                data_falecimento,
                biografia,
            ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.data_nascimento}',
                '${dadosFilme.foto}',
                 null,
                '${dadosFilme.biografia}',
          
            )`;

        }else{
             // Script SQL para inserir no banco de dados
            sql = `insert into tbl_filme (
                nome,
                data_nascimento,
                foto,
                data_falecimento,
                biografia,
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.data_nascimento}',
            '${dadosFilme.foto}',
            '${dadosFilme.data_falecimento}',
            '${dadosFilme.biografia}',
         
        )`;
        }
       

        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validação para verificar se o insert funcionou no banco de dados
        if(result )
            return true;
        else
            return false;

    } catch (error) {
        return false;
        
    }
}
const updateAtor = async function(id){

}

const selectAllAtors = async function(){

      // Script sql para listar todos os registros
      let sql = 'select * from tbl_filme order by id desc';

      // $queryRawUnsafe(sql)  = Encaminha apenas a variável
      // $queryRaw('select * from tbl_filme) = Encaminha o script do banco 
  
      // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsFilmes
      let rsAtores = await prisma.$queryRawUnsafe(sql)
       // Para usar await a função necessita ser async(async function)
  
      // Tratamento de erro para retornar dados ou retornar false
       if(rsAtores.length > 0)
       return rsAtores;
       else
          return false
  
}
module.exports = {
    selectAllAtors, 
    insertAtor
}
