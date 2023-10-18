export default function autenticar(requisicao, resposta, next) {
    const email = "renato@dominio";
    const senha = "123456";

    const emailInformado = requisicao.body.email;
    const senhaInformada = requisicao.body.senha;
    if (emailInformado === email && senhaInformada === senha) {
        requisicao.session.autenticado = true;
        resposta.redirect('/cadastroUsuario.html');
    }
    else{
        requisicao.session.autenticado = false;
        resposta.redirect('/login.html');
    }

}

export function estaAutenticado(requisicao, resposta, next){
    if (requisicao.session.autenticado) {
        next();
    }
    else{
        resposta.redirect('/login.html');
    }
}
   