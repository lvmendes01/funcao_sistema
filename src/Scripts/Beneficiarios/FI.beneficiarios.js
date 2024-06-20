

$(document).ready(function () {
    $('#cpfBeneficiario').mask('000.000.000-00');
  
    $('#btn_IncluirBeneficiários').click(function () {
        try {

            let cpfBeneficiario = document.getElementById('cpfBeneficiario').value;
            let nomeBeneficiario = document.getElementById('nomeBeneficiario').value;
            let IDCLIENTE = window.location.pathname.split('/')[3];
            
            $.ajax({
                url: urlPostBeneficiários,
                method: "POST",
                data: {
                    "NOME": nomeBeneficiario,
                    "CPF": cpfBeneficiario,
                    "IDCLIENTE": IDCLIENTE,
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
                        ListaBeneficiarios();
                    }
            });
        } catch (error) {
            console.error('Error loading modal content:', error);
        }
    });

});

