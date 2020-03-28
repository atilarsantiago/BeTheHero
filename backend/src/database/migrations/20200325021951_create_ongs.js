
exports.up = function(knex) { //Método "up" é o que será feito
  //criando a tabela
  return knex.schema.createTable('ongs', function(table){
      //informar os campos
      table.string('id').primary();//It's needed a column primary, será criado pela app em routes.js
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf',2).notNullable();//2 = max characters
  })
};

exports.down = function(knex) {//Método "down" o que fazer se der errado
  return knex.schema.dropTable('ongs');
};
