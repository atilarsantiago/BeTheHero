const connection = require('../database/connection');


module.exports = {
    async create (request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization; //O id da ONG vem no header, e usará como title "authorization", veja no insominia
        //#Como fazer para que o id passado no header authozation só sirva se estiver cadastrado?
        
        const [id] = await connection('incidents').insert({//esse [id] deixa ele incremental a cara interação
            title,
            description,
            value,
            ong_id,
        });
        return response.json({id});//sempre que estiver com chaves vai ser apresentando como array
    },
    async index (request, response) {//Esse "index" é a listagem de casos 
        const {page=1}=request.query;//valor será o valor da query "page" na url
        
        const [count]= await connection('incidents').count();//esse [] ao redor da var faz ela ser valor único, mesmo que venha como array
        
        const incidents = await connection('incidents')//No array de incidents
            .join('ongs', 'ongs.id','=','incidents.ong_id')//juntar com os dados da tabela ongs, onde ong_id forem iguais
            .limit(5)//me mostre 5 casos por pag
            .offset((page-1)*5)//e a cada "scroll" me traga mais 5
            .select([//me traga esses dados
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

            //usaremos o cabeçalho da resposta para mostrar o count de incidents
            response.header('X-Total-Count', count['count(*)']);//X-total...é um termo padrão
        
        return response.json(incidents);
    },

    async delete (request, response){
        const {id}= request.params;
        const ong_id = request.headers.authorization;
        //Relacionar um incident específico dessa ong que quer deletar
        const incident = await connection('incidents')
            .where('id',id)//O id informado no request é o da coluna id da tabela incidents existentes até então
            .select('ong_id')// seleciona o ong_id da tabela
            .first();//Esperamos apenas 1 resultado e não um array, logo o first serve para isso

        if (incident.ong_id != ong_id){//Se o id da ong conectada não for o mesmo id da ong que criou o incident
            //Dará erro 401
            return response.status(401).json({error:'Operation not permitted.'});
        }
        await connection('incidents').where('id',id).delete();//Se estiver ok irá deletar o incident
        return response.status(204).send();//e mandar status 204
    },
    /*async index2 (request, response) {//Esse "index" irá listar tudo que estiver sendo enviado pelo post para /ongs
        const ongs = await connection('incidents').select('*');
    
        return response.json(ongs);
    },*/
};