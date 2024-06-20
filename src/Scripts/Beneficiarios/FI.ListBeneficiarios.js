
var cachedCityOptions = null;

$(document).ready(function () {
    $('#gridBeneficiarios').jtable({
        title: 'Beneficiarios Existente',
        paging: true,
        pageSize: 10,
        sorting: true,
        multiSorting: true,
        defaultSorting: 'Nome ASC',
        actions: {

            
            listAction: function (postData, jtParams) {
                console.log("Loading from custom function...");
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: urlPostListaBeneficiários,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            IdCliente: window.location.pathname.split('/')[3], // Parâmetro para buscar por ID de cliente
                            jtStartIndex: jtParams.jtStartIndex,
                            jtPageSize: jtParams.jtPageSize,
                            jtSorting: true
                        },
                        success: function (data) {
                            $dfd.resolve(data);
                        },
                        error: function () {
                            $dfd.reject();
                        }
                    });
                });
            },
            deleteAction: function (postData) {
                console.log("deleting from custom function...");
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: urlPostRemover,
                        type: 'POST',
                        dataType: 'json',
                        data: postData,
                        success: function (data) {
                            $dfd.resolve(data);
                        },
                        error: function () {
                            $dfd.reject();
                        }
                    });
                });
            },
            updateAction: function (postData) {
                console.log("updating from custom function...");
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: urlPostAtualizarBeneficiário,
                        type: 'POST',
                        dataType: 'json',
                        data: postData,
                        success: function (data) {
                            $dfd.resolve(data);
                        },
                        error: function () {
                            $dfd.reject();
                        }
                    });
                });
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
                width: '50%',
                edit: true
            },
            CPF: {
                title: 'CPF',
                width: '35%',
                edit: true
            },
        }
    });
    //Load student list from server
    $('#gridBeneficiarios').jtable('load');
});

