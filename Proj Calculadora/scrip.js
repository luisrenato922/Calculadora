
"use strict";

// 1. Selecionar o visor
const visor = document.querySelector(".resultado");

// 2. Selecionar os botões numéricos
const botaoZero = document.getElementById("zero");
const botaoUm = document.getElementById("um");
const botaoDois = document.getElementById("dois");
const botaoTres = document.getElementById("tres");
const botaoQuatro = document.getElementById("quatro");
const botaoCinco = document.getElementById("cinco");
const botaoSeis = document.getElementById("seis");
const botaoSete = document.getElementById("sete");
const botaoOito = document.getElementById("oito");
const botaoNove = document.getElementById("nove");

// 3. Selecionar os operadores
const botaoAdicao = document.getElementById("adicao");
const botaoSubtracao = document.getElementById("subtracao");
const botaoMultiplicacao = document.getElementById("multiplicacao");
const botaoDivisao = document.getElementById("divisao");

// 4. Selecionar os restantes botões
const botaoIgual = document.getElementById("igual");
const botaoVirgula = document.getElementById("virgula");
const botaoApagar = document.getElementById("apagar");

// 5. Variáveis da calculadora
let primeiroNumero = null;
let numeroAtual = "0";
let operador = null;
let iniciarNovoNumero = true;
let resultadoMostrado = false;

// Converter os operadores para os símbolos que aparecem no visor
function mostrarOperador(op) {
    const simbolos = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return simbolos[op];
}

// 6. Atualizar o visor com a operação completa
function atualizarVisor() {
    if (operador === null) {
        visor.textContent = numeroAtual;
    } else {
        visor.textContent =
            `${primeiroNumero} ${mostrarOperador(operador)} ${numeroAtual}`;
    }
}

// 7. Introduzir números
function adicionarNumero(numero) {
    // Depois de um resultado, começar um novo cálculo
    if (resultadoMostrado) {
        primeiroNumero = null;
        operador = null;
        numeroAtual = "0";
        iniciarNovoNumero = true;
        resultadoMostrado = false;
    }

    // Começar a introduzir um novo número
    if (iniciarNovoNumero) {
        numeroAtual = numero === "." ? "0." : numero;
        iniciarNovoNumero = false;
    } else {
        // Impedir a introdução de mais de um ponto decimal
        if (numero === "." && numeroAtual.includes(".")) {
            return;
        }

        // Substituir o zero inicial, exceto quando for decimal
        if (numeroAtual === "0" && numero !== ".") {
            numeroAtual = numero;
        } else {
            numeroAtual += numero;
        }
    }

    // Mostrar também os números já introduzidos na operação
    atualizarVisor();
}

// 8. Efetuar os cálculos
function calcular(numero1, numero2, op) {
    switch (op) {
        case "+":
            return numero1 + numero2;

        case "-":
            return numero1 - numero2;

        case "*":
            return numero1 * numero2;

        case "/":
            if (numero2 === 0) {
                return "Não é possível dividir por zero";
            }
            return numero1 / numero2;

        default:
            return null;
    }
}

// 9. Escolher um operador
function escolherOperador(novoOperador) {
    // Se já existe um operador, não aceitar outro sem um segundo número
    if (operador !== null && iniciarNovoNumero) {
        operador = novoOperador;
        atualizarVisor();
        return;
    }

    // Guardar o número que foi introduzido
    primeiroNumero = Number(numeroAtual);
    operador = novoOperador;

    // Preparar o segundo número
    numeroAtual = "0";
    iniciarNovoNumero = true;
    resultadoMostrado = false;

    // Mostrar o primeiro número e o operador
    visor.textContent =
        `${primeiroNumero} ${mostrarOperador(operador)}`;
}

// 10. Associar os botões numéricos
botaoZero.addEventListener("click", () => adicionarNumero("0"));
botaoUm.addEventListener("click", () => adicionarNumero("1"));
botaoDois.addEventListener("click", () => adicionarNumero("2"));
botaoTres.addEventListener("click", () => adicionarNumero("3"));
botaoQuatro.addEventListener("click", () => adicionarNumero("4"));
botaoCinco.addEventListener("click", () => adicionarNumero("5"));
botaoSeis.addEventListener("click", () => adicionarNumero("6"));
botaoSete.addEventListener("click", () => adicionarNumero("7"));
botaoOito.addEventListener("click", () => adicionarNumero("8"));
botaoNove.addEventListener("click", () => adicionarNumero("9"));

// 11. Associar os operadores
botaoAdicao.addEventListener("click", () => escolherOperador("+"));
botaoSubtracao.addEventListener("click", () => escolherOperador("-"));
botaoMultiplicacao.addEventListener("click", () => escolherOperador("*"));
botaoDivisao.addEventListener("click", () => escolherOperador("/"));

// 12. Associar o ponto decimal
botaoVirgula.addEventListener("click", () => adicionarNumero("."));

// 13. Calcular e mostrar a expressão completa
botaoIgual.addEventListener("click", () => {
    if (operador === null || iniciarNovoNumero) {
        return;
    }

    const segundoNumero = Number(numeroAtual);
    const resultado = calcular(
        primeiroNumero,
        segundoNumero,
        operador
    );

    // Mostrar a operação completa e o resultado
    visor.textContent =
        `${primeiroNumero} ${mostrarOperador(operador)} ${segundoNumero} = ${resultado}`;

    // Preparar a calculadora para um novo cálculo
    primeiroNumero = null;
    operador = null;
    numeroAtual = String(resultado);
    iniciarNovoNumero = true;
    resultadoMostrado = true;
});

// 14. Limpar a calculadora
botaoApagar.addEventListener("click", () => {
    primeiroNumero = null;
    numeroAtual = "0";
    operador = null;
    iniciarNovoNumero = true;
    resultadoMostrado = false;

    visor.textContent = "0";
});
