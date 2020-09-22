(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('#cpf').inputmask('99999999999');
          $( "#remove" ).click(function() {
          event.preventDefault();
          swal({
                  title: "Confirma?",
                  text: "Tem certeza que deseja remover o CPF?",
                  type: "warning",
                  showCancelButton: true,
                  cancelButtonText: 'Não',
                  confirmButtonClass: "btn-danger",
                  confirmButtonText: "Sim",
                  closeOnConfirm: false
              },
              function(isConfirm) {
                  if (isConfirm) {
                      swal("Deletado!", "Deletando registro.", "success");
                      $( "#remove" ).submit();
                  } else {
                      swal("Cancelado", "Ação cancelada :)", "error");
                  }
              });
      });
      $( "#adicionar" ).click(function() {
          event.preventDefault();
          swal({
                  title: "Confirma?",
                  text: "Tem certeza que deseja adicionar o CPF?",
                  type: "warning",
                  showCancelButton: true,
                  cancelButtonText: 'Não',
                  confirmButtonClass: "btn-danger",
                  confirmButtonText: "Sim, adicionar",
                  closeOnConfirm: false
              },
              function(isConfirm) {
                  if (isConfirm) {
                      swal("Adicionado!", "CPF adicionado com sucesso.", "success");
                      $( "#add" ).submit();
                  } else {
                      swal("Cancelado", "Ação cancelada :)", "error");
                  }
              });
      });

  }); // end of document ready
})(jQuery); // end of jQuery name space