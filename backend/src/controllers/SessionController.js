const connection = require('../database/connection');

//A partir desse método será feito o login na aplicação
//O login neste caso apenas confere se a ong existe no banco de dados
module.exports = {
    async create(request,response){
        const {id}=request.body;//id vem através do body

        const ong = await connection('ongs')//Na tabela ongs
            .where('id',id)//Onde o id do body = id de uma ong cadastrada
            .select('name')//me traga o nome
            .first();//basta o primeiro valor
        if (!ong){//Se o id da ong no login nao constar na tabela de ongs
            return response.status(400).json({error:'No ONG found with this ID'});//lembre do ; 
        }
        return response.json(ong);//Se der certo a resposta é o nome da ong
    }

}