// Página principal: consulta de CEP usando ViaCEP
var botao = document.getElementById("btnEnviar");

if (botao) {
    botao.addEventListener("click", function () {
        var cep = document.getElementById("cep").value;
        var resultado = document.getElementById("resultado");

        if (cep === "") {
            resultado.innerHTML = "Digite um CEP válido.";
            return;
        }

        fetch("https://viacep.com.br/ws/" + cep + "/json/")
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (dados) {
                if (dados.erro) {
                    resultado.innerHTML = "CEP não encontrado.";
                    return;
                }

                resultado.innerHTML =
                    "Cidade: " + dados.localidade + "<br>" +
                    "Estado: " + dados.uf + "<br>" +
                    "Rua: " + dados.logradouro;
            })
            .catch(function () {
                resultado.innerHTML = "Erro ao buscar CEP.";
            });
    });
}

var chessBotao = document.getElementById("btnChess");
var chessResultado = document.getElementById("chessResultado");

if (chessBotao) {
    chessBotao.addEventListener("click", function () {
        var nome = document.getElementById("chessUser").value;

        if (nome === "") {
            chessResultado.innerHTML = "Digite um nome de jogador.";
            return;
        }

        var urlInfo = "https://api.chess.com/pub/player/" + String(nome);
        var urlStats = "https://api.chess.com/pub/player/" + String(nome) + "/stats";

        fetch(urlInfo)
            .then(function (res) { return res.json(); })
            .then(function (dados) {

                if (dados.code === 0 || dados.username === undefined) {
                    chessResultado.innerHTML = "Jogador não encontrado.";
                    return;
                }

                var texto = "";
                texto += "Nome: " + dados.username + "<br>";
                texto += "Status: " + dados.status + "<br>";
                
                fetch(urlStats)
                    .then(function (res) { return res.json(); })
                    .then(function (stats) {

                        var partidas = stats.chess_rapid;

                        if (!partidas || !partidas.record) {
                            chessResultado.innerHTML = texto + "Sem dados de partidas rápidas.";
                            return;
                        }

                        var wins = partidas.record.win;
                        var losses = partidas.record.loss;
                        var draws = partidas.record.draw;
                        var total = wins + losses + draws;

                        texto += "<br><strong>Partidas rápidas:</strong><br>";
                        texto += "Total: " + total + "<br>";
                        texto += "Vitórias: " + wins + "<br>";
                        texto += "Derrotas: " + losses + "<br>";
                        texto += "Empates: " + draws + "<br>";

                        chessResultado.innerHTML = texto;
                    })
                    .catch(function () {
                        chessResultado.innerHTML = "Erro ao buscar estatísticas.";
                    });
            })
            .catch(function () {
                chessResultado.innerHTML = "Erro ao buscar jogador.";
            });
    });
}


var fipeBotao = document.getElementById("btnFipe");
var fipeResultado = document.getElementById("fipeResultado");

function corrigirNomeMarca(texto) {
    var nome = texto.trim();

    if (nome === "") {
        return "";
    }

    var partes = nome.split("-");

    for (var i = 0; i < partes.length; i++) {
        var p = partes[i].toLowerCase();
        partes[i] = p.charAt(0).toUpperCase() + p.slice(1);
    }

    return partes.join("-");
}

if (fipeBotao) {
    fipeBotao.addEventListener("click", function () {
        var marcaDigitada = document.getElementById("fipeMarca").value;

        var marcaCorrigida = corrigirNomeMarca(marcaDigitada);

        if (marcaCorrigida === "") {
            fipeResultado.innerHTML = "Digite o nome de uma marca.";
            return;
        }

        fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
            .then(function (res) {
                return res.json();
            })
            .then(function (dados) {

                var marcaObj = null;
                for (var i = 0; i < dados.length; i++) {
                    if (dados[i].nome.toLowerCase() === marcaCorrigida.toLowerCase()) {
                        marcaObj = dados[i];
                        break;
                    }
                }

                if (!marcaObj) {
                    fipeResultado.innerHTML = "Marca não encontrada: " + marcaCorrigida;
                    return;
                }

                return fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas/" + marcaObj.codigo + "/modelos");
            })
            .then(function (res) {
                return res.json();
            })
            .then(function (dados) {
                if (!dados || !dados.modelos) {
                    fipeResultado.innerHTML = "Erro ao carregar modelos.";
                    return;
                }

                var qtd = dados.modelos.length;

                var lista = "<ul>";
                for (var j = 0; j < dados.modelos.length && j < 10; j++) {
                    lista += "<li>" + dados.modelos[j].nome + "</li>";
                }
                lista += "</ul>";

                fipeResultado.innerHTML =
                    "<strong>Total de modelos:</strong> " + qtd + "<br><br>" +
                    "<strong>Alguns modelos:</strong><br>" + lista;
            })
            .catch(function () {
                fipeResultado.innerHTML = "Erro ao buscar informações da FIPE.";
            });
    });
}


var btcResultado = document.getElementById("btcResultado");
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

if (btcResultado) {
    fetch(COINGECKO_API_URL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Erro na rede ou status HTTP: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            const precoUsd = data.bitcoin.usd;
            
            const precoFormatado = precoUsd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            btcResultado.innerHTML = precoFormatado;
        })
        .catch(function (error) {
            console.error("Erro ao buscar o preço do Bitcoin:", error);
            btcResultado.innerHTML = "Erro ao carregar preço do Bitcoin.";
        });
}

