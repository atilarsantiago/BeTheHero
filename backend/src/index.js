const express = require('express'); //requeri um pacote para ser minha variável
const routes = require('./routes');// requer com ./ por ser arquivo e estar msm pasta, no caso requer o que o arquivo exporta
const cors = require('cors');//Importando o cors
const app = express();

//cors serve para indicar quem e por qual forma acessam o app, se ele estiver "cors()"=qualquer aplicação frontend acessa
//posteriormente deve ser informado algo como: {'http://meuapp.com'}, por exemplo.
app.use(cors());
app.use(express.json());//Isso diz que todas as requisições serão entendidas como json.
app.use(routes);


app.listen(3333);