const sqlite3 = require('sqlite3')
// pegando apenas a funcionalidade open dentro do sqlite
//sem precisar importar todo o sqlite 
const { open } = require('sqlite')
//  utilizando uma arrow function 
module.exports = () => 
    // abrindo a conexão com banco de dados
    open({
        // nome do arquivo onde vai salvar as info
        filename: './database.sqlite',
        // quem vai vai trabalhar e guardar no arquivo acima
        driver: sqlite3.Database,
});


