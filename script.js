const formulario =
    document.getElementById("clienteForm");

const nome =
    document.getElementById("nome");

const telefone =
    document.getElementById("telefone");

const erroNome =
    document.getElementById("erroNome");

const erroTelefone =
    document.getElementById("erroTelefone");

const etapaDados =
    document.getElementById("etapaDados");

const etapaServico =
    document.getElementById("etapaServico");

const etapaBarbeiro =
    document.getElementById("etapaBarbeiro");

const etapaHorario =
    document.getElementById("etapaHorario");

const etapaConfirmacao =
    document.getElementById("etapaConfirmacao");

const voltarDados =
    document.getElementById("voltarDados");

const voltarServico =
    document.getElementById("voltarServico");

const voltarBarbeiro =
    document.getElementById("voltarBarbeiro");

const dataAgendamento =
    document.getElementById("dataAgendamento");

const erroData =
    document.getElementById("erroData");

const horarioSection =
    document.getElementById("horarioSection");

const listaHorarios =
    document.getElementById("listaHorarios");

const cancelarAgendamento =
    document.getElementById("cancelarAgendamento");

const novoAgendamento =
    document.getElementById("novoAgendamento");

const botoesServico =
    document.querySelectorAll(
        ".service-card[data-servico]"
    );

const botoesBarbeiro =
    document.querySelectorAll(
        ".barbeiro-card"
    );


let etapaAtual = 1;

let servicoSelecionado = null;
let precoSelecionado = null;
let barbeiroSelecionado = null;
let dataSelecionada = null;
let horarioSelecionado = null;


/* =========================
   NOME
========================= */

nome.addEventListener("input", function () {

    let valor = nome.value;

    // Permite letras, espaços, hífen e apóstrofo
    valor =
        valor.replace(
            /[^\p{L}\s'-]/gu,
            ""
        );

    // Remove espaços duplicados
    valor =
        valor.replace(
            /\s+/g,
            " "
        );

    nome.value = valor;

    if (nome.value.trim().length >= 2) {

        erroNome.textContent = "";

        nome.classList.remove("error");
    }

});


function validarNome() {

    const valor =
        nome.value.trim();

    if (valor.length === 0) {

        erroNome.textContent =
            "Informe seu nome.";

        nome.classList.add("error");

        return false;
    }

    if (valor.length < 2) {

        erroNome.textContent =
            "O nome deve possuir pelo menos 2 caracteres.";

        nome.classList.add("error");

        return false;
    }

    erroNome.textContent = "";

    nome.classList.remove("error");

    nome.value = valor;

    return true;
}


/* =========================
   TELEFONE
========================= */

telefone.addEventListener(
    "input",
    function () {

        let valor =
            telefone.value.replace(
                /\D/g,
                ""
            );

        valor =
            valor.substring(0, 11);

        if (valor.length > 7) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{5})(\d{0,4})/,
                    "($1) $2-$3"
                );

        }

        else if (valor.length > 2) {

            valor =
                valor.replace(
                    /^(\d{2})(\d+)/,
                    "($1) $2"
                );

        }

        else if (valor.length > 0) {

            valor =
                valor.replace(
                    /^(\d{0,2})/,
                    "($1"
                );

        }

        telefone.value = valor;

        const somenteNumeros =
            telefone.value.replace(
                /\D/g,
                ""
            );

        if (
            somenteNumeros.length === 11
        ) {

            erroTelefone.textContent = "";

            telefone.classList.remove(
                "error"
            );
        }

    }
);


function validarTelefone() {

    const somenteNumeros =
        telefone.value.replace(
            /\D/g,
            ""
        );

    if (
        somenteNumeros.length === 0
    ) {

        erroTelefone.textContent =
            "Informe seu telefone.";

        telefone.classList.add("error");

        return false;
    }

    if (
        somenteNumeros.length < 11
    ) {

        const faltam =
            11 - somenteNumeros.length;

        erroTelefone.textContent =
            faltam === 1
                ? "Digite mais 1 número."
                : `Digite mais ${faltam} números.`;

        telefone.classList.add("error");

        return false;
    }

    erroTelefone.textContent = "";

    telefone.classList.remove("error");

    return true;
}


/* =========================
   TROCA DE ETAPAS
========================= */

function mostrarEtapa(numero) {

    etapaAtual = numero;

    const conteudos =
        document.querySelectorAll(
            ".step-content"
        );

    conteudos.forEach(
        function (conteudo) {

            conteudo.classList.remove(
                "active"
            );

        }
    );

    if (numero === 1) {
        etapaDados.classList.add("active");
    }

    if (numero === 2) {
        etapaServico.classList.add("active");
    }

    if (numero === 3) {
        etapaBarbeiro.classList.add("active");
    }

    if (numero === 4) {
        etapaHorario.classList.add("active");
    }

    atualizarProgresso();
}


/* =========================
   PROGRESSO
========================= */

function atualizarProgresso() {

    const etapas =
        document.querySelectorAll(
            ".progress-step"
        );

    etapas.forEach(
        function (etapa, index) {

            etapa.classList.remove(
                "active",
                "completed"
            );

            const numero =
                index + 1;

            if (
                numero < etapaAtual
            ) {

                etapa.classList.add(
                    "completed"
                );
            }

            if (
                numero === etapaAtual
            ) {

                etapa.classList.add(
                    "active"
                );
            }

        }
    );
}


/* =========================
   FORMULÁRIO
========================= */

formulario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const nomeValido =
            validarNome();

        const telefoneValido =
            validarTelefone();

        if (
            !nomeValido ||
            !telefoneValido
        ) {

            return;
        }

        mostrarEtapa(2);
    }
);


/* =========================
   SERVIÇO
========================= */

botoesServico.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                servicoSelecionado =
                    botao.dataset.servico;

                precoSelecionado =
                    botao.dataset.preco;

                mostrarEtapa(3);
            }
        );

    }
);


/* =========================
   BARBEIRO
========================= */

botoesBarbeiro.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                barbeiroSelecionado =
                    botao.dataset.barbeiro;

                mostrarEtapa(4);
            }
        );

    }
);


/* =========================
   LIMITES DA DATA
========================= */

function formatarDataInput(data) {

    const ano =
        data.getFullYear();

    const mes =
        String(
            data.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            data.getDate()
        ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


function configurarLimitesData() {

    const hoje =
        new Date();

    const dataMaxima =
        new Date();

    /*
        Limite de 1 mês a partir
        da data atual.
    */
    dataMaxima.setMonth(
        dataMaxima.getMonth() + 1
    );

    dataAgendamento.min =
        formatarDataInput(hoje);

    dataAgendamento.max =
        formatarDataInput(dataMaxima);
}


configurarLimitesData();


/* =========================
   VALIDAR DATA
========================= */

function validarData() {

    if (
        !dataAgendamento.value
    ) {

        erroData.textContent =
            "Escolha uma data.";

        dataAgendamento.classList.add(
            "error"
        );

        return false;
    }

    const selecionada =
        new Date(
            dataAgendamento.value +
            "T00:00:00"
        );

    const minima =
        new Date(
            dataAgendamento.min +
            "T00:00:00"
        );

    const maxima =
        new Date(
            dataAgendamento.max +
            "T00:00:00"
        );


    if (
        selecionada < minima
    ) {

        erroData.textContent =
            "Não é possível agendar para uma data passada.";

        dataAgendamento.classList.add(
            "error"
        );

        return false;
    }


    if (
        selecionada > maxima
    ) {

        erroData.textContent =
            "O agendamento pode ser realizado com no máximo 1 mês de antecedência.";

        dataAgendamento.classList.add(
            "error"
        );

        return false;
    }


    erroData.textContent = "";

    dataAgendamento.classList.remove(
        "error"
    );

    return true;
}


/* =========================
   SELEÇÃO DA DATA
========================= */

dataAgendamento.addEventListener(
    "change",
    function () {

        if (
            !validarData()
        ) {

            dataSelecionada = null;

            listaHorarios.innerHTML = "";

            horarioSection.classList.remove(
                "visible"
            );

            return;
        }

        dataSelecionada =
            dataAgendamento.value;

        gerarHorarios();
    }
);


/* =========================
   HORÁRIOS
========================= */

function gerarHorarios() {

    const horarios = [
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
    ];

    listaHorarios.innerHTML = "";

    horarios.forEach(
        function (horario) {

            const botao =
                document.createElement(
                    "button"
                );

            botao.type =
                "button";

            botao.classList.add(
                "horario-button"
            );

            botao.textContent =
                horario;

            botao.addEventListener(
                "click",
                function () {

                    horarioSelecionado =
                        horario;

                    confirmarAgendamento();
                }
            );

            listaHorarios.appendChild(
                botao
            );

        }
    );

    horarioSection.classList.add(
        "visible"
    );
}


/* =========================
   CONFIRMAÇÃO
========================= */

function confirmarAgendamento() {

    if (
        !validarData()
    ) {

        return;
    }

    document.getElementById(
        "resumoNome"
    ).textContent =
        nome.value;

    document.getElementById(
        "resumoTelefone"
    ).textContent =
        telefone.value;

    document.getElementById(
        "resumoServico"
    ).textContent =
        `${servicoSelecionado} - R$ ${precoSelecionado}`;

    document.getElementById(
        "resumoBarbeiro"
    ).textContent =
        barbeiroSelecionado;

    document.getElementById(
        "resumoData"
    ).textContent =
        formatarData(
            dataSelecionada
        );

    document.getElementById(
        "resumoHorario"
    ).textContent =
        horarioSelecionado;

    etapaHorario.classList.remove(
        "active"
    );

    etapaConfirmacao.classList.add(
        "active"
    );

    etapaAtual = 5;

    atualizarProgresso();
}


/* =========================
   FORMATAR DATA
========================= */

function formatarData(data) {

    const partes =
        data.split("-");

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}


/* =========================
   LIMPAR AGENDAMENTO
========================= */

function limparAgendamento() {

    servicoSelecionado = null;

    precoSelecionado = null;

    barbeiroSelecionado = null;

    dataSelecionada = null;

    horarioSelecionado = null;

    dataAgendamento.value = "";

    erroData.textContent = "";

    dataAgendamento.classList.remove(
        "error"
    );

    listaHorarios.innerHTML = "";

    horarioSection.classList.remove(
        "visible"
    );
}


/* =========================
   CANCELAR
========================= */

cancelarAgendamento.addEventListener(
    "click",
    function () {

        const confirmar =
            confirm(
                "Tem certeza que deseja cancelar este agendamento?"
            );

        if (!confirmar) {
            return;
        }

        limparAgendamento();

        nome.value = "";
        telefone.value = "";

        erroNome.textContent = "";
        erroTelefone.textContent = "";

        nome.classList.remove("error");
        telefone.classList.remove("error");

        etapaConfirmacao.classList.remove(
            "active"
        );

        mostrarEtapa(1);
    }
);


/* =========================
   NOVO AGENDAMENTO
========================= */

novoAgendamento.addEventListener(
    "click",
    function () {

        limparAgendamento();

        etapaConfirmacao.classList.remove(
            "active"
        );

        mostrarEtapa(2);
    }
);


/* =========================
   VOLTAR
========================= */

voltarDados.addEventListener(
    "click",
    function () {

        mostrarEtapa(1);
    }
);


voltarServico.addEventListener(
    "click",
    function () {

        mostrarEtapa(2);
    }
);


voltarBarbeiro.addEventListener(
    "click",
    function () {

        mostrarEtapa(3);
    }
);