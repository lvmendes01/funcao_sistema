
$(document).ready(function () {

    $('#Cpf').mask('000.000.000-00');

    $('#btn_Beneficiários').hide();
    $('#formCadastro').submit(function (e) {
        e.preventDefault();

       
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#Cpf").val().replaceAll('.', '').replaceAll('-', '')

                
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
            }
        });
    })
    
})



function Validacao_CPF() {
    $('#btn_submit').attr('disabled', true);
    let cpf = $('#Cpf').val();
    const formattedCpf = cpf.replaceAll('.', '').replaceAll('-', '');
    let validarcpf = isValidCPF(formattedCpf)

    if (validarcpf) {

         validarDuplicidadeCPf(formattedCpf).then(isDuplicate => {
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
       
         const payload = {cpf: cpf};
        
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



function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
