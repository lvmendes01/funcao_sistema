
function Validacao_CPF(input) {
    $('#btn_submit').attr('disabled', true);
    let cpf = input.value.replace(/[^\d]/g, '')
    let validarcpf = isValidCPF(cpf)

    if (validarcpf) {

        validarDuplicidadeCPf(cpf).then(isDuplicate => {
            if (isDuplicate) {
                ModalDialog("CPF", "CPF Dupicado");
            } else {
                $('#btn_submit').attr('disabled', false);
            }
        });

    } else {

        ModalDialog("CPF", "CPF invalido");

    }


}

function isValidCPF(cpf) {

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    var soma;
    var resto;
    soma = 0;

    for (var i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (var j = 1; j <= 10; j++) {
        soma += parseInt(cpf.substring(j - 1, j)) * (12 - j);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}


async function validarDuplicidadeCPf(cpf) {


    try {

        const payload = { cpf: cpf };

        const response = await fetch(urlValidarCpf, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
        }


        const data = await response.json();
        return data;
    } catch (error) {

        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
        return false;
    }


}
