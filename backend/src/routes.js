const express = require('express');

//Importando os controllers
const OngController = require('./controllers/Ongcontroller');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();



/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação no backend
 * POST: Criar uma informação no backend
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma infomação no backend
 */
/**
 * Tipos de parâmetros
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 *                  "localhost:3333/?name=atila&pag=2&idade=18"
 * Route Params: Parâmentos utilizados para identificar recursos:
 *                  "/users/:id" (lista todos os recursos "id" da rota /users)
 *                         Se solicita "id" apenas o id será possível de ser informado.
 * Request Body: O corpo da requisição, usado para criar ou alterar recursos.
 */

 /**
  * SQL: MySQL, SQlite, PostgreSQL, Oracle, Microsoft SQL Server
  * NoSQL: MongoDB, CouchDB, etc
  */

  /**
   * Driver: SELECT * FROM users
   * Query Builder: table('users).select('*').where()
   */
/*const params = request.query;
    const params2 = request.params;
    const body = request.body; //Body deve ser usado com POST */
    /**
     * request.query = Acessar as "Querys params" que forem usadas no método, ?name=x&idade=y
     * request.params = Acessar os "Route  params", altere o get para: "/users/:id" para ver
     * request.body = Acessar os dados informados em body, como um formulário, por exemplo.
     */

//Route para Listar Ongs usando GET
/*routes.get('/ongs', async (request, response)=>{//Esse route.get irá listar tudo que estiver sendo enviado pelo post para /ongs
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
})*/

//Routes para cadastrar Ongs com POST
/*routes.post('/ongs', async (request, response) =>{//async para que ligue a operação de request/response com o await e rode a parte dos outros códigos 

});*/

routes.post('/sessions',SessionController.create);//Login

routes.get('/ongs', OngController.index);//Usa no GET o encapsulamento do index la em ongcontroller
routes.post('/ongs', OngController.create);//Usa no POST do encapsulamento toda a rota lá em ongcontroler.create para essa função
routes.post('/incidents', IncidentController.create);
routes.get('/incidents',IncidentController.index);
routes.delete('/incidents/:id',IncidentController.delete);
routes.get('/profile',ProfileController.index);
/*routes.get('/incidents2',IncidentController.index2);*/

module.exports = routes;