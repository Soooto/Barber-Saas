const formulario = document.getElementById("clienteForm");

const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");

const erroNome = document.getElementById("erroNome");
const erroTelefone = document.getElementById("erroTelefone");


/* =========================
   NOME
========================= */

nome.addEventListener("input", function () {

    let valor = nome.value;

    // Permite letras, espaços, hífen e apóstrofo
    valor = valor.replace(/[^\p{L}\s'-]/gu, "");

    // Remove espaços duplicados
    valor = valor.replace(/\s+/g, " ");

    nome.value = valor;

    // Remove o erro automaticamente quando estiver válido
    if (nome.value.trim().length >= 2) {

        erroNome.textContent = "";

        nome.classList.remove("error");
    }

});


function validarNome() {

    const valor = nome.value.trim();

    if (valor.length === 0) {

        erroNome.textContent = "Informe seu nome.";

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

telefone.addEventListener("input", function () {

    let valor = telefone.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Permite no máximo 11 números
    valor = valor.substring(0, 11);

    // Aplica a máscara
    if (valor.length > 7) {

        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{0,4})/,
            "($1) $2-$3"
        );

    } else if (valor.length > 2) {

        valor = valor.replace(
            /^(\d{2})(\d+)/,
            "($1) $2"
        );

    } else if (valor.length > 0) {

        valor = valor.replace(
            /^(\d{0,2})/,
            "($1"
        );

    }

    telefone.value = valor;


    // Quantidade real de números
    const somenteNumeros =
        telefone.value.replace(/\D/g, "");


    // Se chegou a 11 números, remove o erro
    if (somenteNumeros.length === 11) {

        erroTelefone.textContent = "";

        telefone.classList.remove("error");
    }

});


function validarTelefone() {

    const somenteNumeros =
        telefone.value.replace(/\D/g, "");

    if (somenteNumeros.length === 0) {

        erroTelefone.textContent =
            "Informe seu telefone.";

        telefone.classList.add("error");

        return false;
    }

    if (somenteNumeros.length < 11) {

        const faltam = 11 - somenteNumeros.length;

        erroTelefone.textContent =
            `Digite mais ${faltam} número(s).`;

        telefone.classList.add("error");

        return false;
    }

    erroTelefone.textContent = "";

    telefone.classList.remove("error");

    return true;
}


/* =========================
   ENVIO DO FORMULÁRIO
========================= */

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nomeValido = validarNome();
    const telefoneValido = validarTelefone();

    if (!nomeValido || !telefoneValido) {
        return;
    }

    console.log("Tudo certo!");

    console.log("Nome:", nome.value);
    console.log("Telefone:", telefone.value);

});