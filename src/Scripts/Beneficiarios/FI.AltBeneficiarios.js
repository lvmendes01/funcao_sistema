
$(document).ready(function () {


    document.getElementById('btn_Beneficiários').addEventListener('click', async function () {
        try {
            var random = Math.random().toString().replace('.', '');
            // Fetch the modal content from the other view
            const response = await fetch('../../beneficiario/index');
            if (!response.ok) throw new Error('Failed to load modal content');
            const modalContent = await response.text();           


            var random = Math.random().toString().replace('.', '');
            var texto = '<div id="' + random + '" class="modal fade">  ' + modalContent +'</div> <!-- /.modal -->                                                                                        ';

            $('body').append(texto);
            $('#' + random).modal('show');
        } catch (error) {
            console.error('Error loading modal content:', error);
        }
    });

    
    
})



