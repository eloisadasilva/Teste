var botao = document.getElementById('btnGerar');
botao.addEventListener('click', function (event) {
    event.preventDefault();
    ValidarDados();
});

function ValidarDados() {
    var convenio = document.getElementById("digConvenio").value;
    var senha = document.getElementById("digSenha").value;

    

    if (convenio == '') {
        alert("Campo CONVÊNIO deve ser preenchido.");
    } else if (senha == '') {
        alert("Campo SENHA deve ser preenchido.");
    } else {
        var dataAtual = obterDataFormatada();
        var senhaHMACSHA256 = gerarSenhaHMACSHA256(convenio, senha, dataAtual);
        mostrarResultado(senhaHMACSHA256.toUpperCase());
    }
}

function obterDataFormatada() {
    var data = new Date();
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0');
    var ano = data.getFullYear();
    return dia + mes + ano;
}

function gerarSenhaHMACSHA256(convenio, senha, dataAtual) {
    convenio = convenio.padStart(4, '0');
    senhaTexto = senha.padStart(10, ' ');
    var texto = convenio + '-' + senhaTexto + '-' + dataAtual;
    var hmacSHA256 = CryptoJS.HmacSHA256(texto, senha);
    return hmacSHA256.toString();
}

function mostrarResultado(senhaHMACSHA256) {
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "SENHA HMAC SHA256: " + senhaHMACSHA256;
}