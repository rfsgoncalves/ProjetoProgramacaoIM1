import express from 'express';
import session from 'express-session';
import autenticar, {estaAutenticado} from './seguranca/autenticar.js';

const porta = 4000;
const host = '0.0.0.0'; // a app irá escutar em todas as interfaces de rede do seu computador
const app = express();
//configurar uma sessão para o usuário

app.use(session({
    secret: 'm1nH4Ch4v3S3cr3t4',
    resave: true, //salvar o estado da sessão a requisição
    saveUninitialized: true, //salvar o estado da sessão que ainda não foi inicializada
    cookie: {
        maxAge: 1000 * 60 * 15 //login será válido por 15 minutos
    }
}));
//configurar a aplicação para processar os parâmetros do corpo da requisição
app.use(express.urlencoded({extended: true})); //qs é a biblioteca a ser utilizada pelo express para processar os parâmetros da requisição
//configurar a aplicação web a disponibilizar arquivos da pasta 'publico'
app.get('/', (requisicao, resposta) => {
  resposta.redirect('/login.html');
});

app.get('/login',(requisicao, resposta) =>{
    resposta.redirect('/login.html');
});

app.post('/login',autenticar);

app.use(express.static('./publico'));
app.use(estaAutenticado, express.static('./protegido'));

app.listen(porta, host, () =>{
    //string literals em javascript  ` `
    console.log(`Servidor rodando em http://${host}:${porta}`);
});