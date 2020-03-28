//Esse arquivo servirá para encapsular a lógica de cadastro das rotas
//será criado um "controller" para cada entidade
const crypto = require('crypto');
const connection = require('../database/connection');



module.exports = {//Exportando esse objeto que tem os métodos index, create...
    async index (request, response) {//Esse "index" irá listar tudo que estiver sendo enviado pelo post para /ongs
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },


    async create (request, response) { //Esse "create" receber o body e criará o cadastro de ongs, e gerará o id
        const {name,email, whatsapp, city, uf}= request.body; //const desestruturada para receber os dados do formulário
        const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({ //Esse await é uma função que irá esperar receber esses dados e inserir no banco com insert
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({id});//após o await irá ter esse return de enviar o id gerado pelo crypto para quem fez o request.body

    }
} 