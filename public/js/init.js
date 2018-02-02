(function($){
    $(function(){
  
      $('.button-collapse').sideNav();
      $('#textarea1').val('New Text');
      $('#textarea1').trigger('autoresize');
      $('.modal').modal();
  
    }); // end of document ready
  })(jQuery); // end of jQuery name space