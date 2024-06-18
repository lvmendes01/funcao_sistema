
$(document).ready(function () {
    if ($('#gridBeneficiarios').length > 0) {
        $('#gridBeneficiarios').jtable({
            title: 'Beneficiarios',
            paging: true,
            pageSize: 5,
            sorting: true,
            defaultSorting: 'Nome ASC',
            actions: {
                listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: urlPostListaBeneficiários, // Endpoint para buscar beneficiários
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                IdCliente: window.location.pathname.split('/')[3], // Parâmetro para buscar por ID de cliente
                                jtStartIndex: jtParams.jtStartIndex,
                                jtPageSize: jtParams.jtPageSize,
                                jtSorting: jtParams.jtSorting
                            },
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    }).promise();
                }
            },
            fields: {
                Id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                CPF: {
                    title: 'CPF',
                    width: '35%'
                },
                Actions: {
                    title: 'Ações',
                    width: '15%',
                    display: function (data) {
                        return '<button class="edit-button" data-record-id="' + data.record.Id + '">Editar</button>';
                    }
                }
            }
        });

        // Evento de clique para o botão de edição
        $(document).on('click', '.edit-button', function (e) {
            e.preventDefault();
            var recordId = $(this).data('record-id');
            $('#gridBeneficiarios').jtable('openChildTable', {
                title: 'Editar Beneficiário',
                actions: {
                    updateAction: urlPostAtualizarBeneficiário
                },
                fields: {
                    ID: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    Nome: {
                        title: 'Nome',
                        width: '30%',
                        edit: true
                    },
                    CPF: {
                        title: 'CPF',
                        width: '20%',
                        edit: true
                    }
                }
            }, function (data) {
                data.childTable.jtable('load');
            });
        });

        // Carregar lista de beneficiários
        $('#gridBeneficiarios').jtable('load');
    }
});
