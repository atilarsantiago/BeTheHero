
exports.up = function(knex) {  //Método "up" é o que será feito
    return knex.schema.createTable('incidents', function(table){
        //informar os campos
        table.increments();//Irá gerar um id automático
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();//decimal é um número float 
        
        table.string('ong_id').notNullable();//Só exist incident caso uma ong tenha criado

        // Usando chave estrangeira para dizer que a "ong_id" acima referência a coluna id da tabela "ongs"
        table.foreign('ong_id').references('id').inTable('ongs');
    }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
