$(document).ready(function() {
    $('.isResizable').matchHeight();



    $('#headingThree').prop('disabled',true);
  

    $("#btnContinuarColp1").on("click", function(){
        $('#headingThree').prop('disabled',false);
        $('#headingThree').click();
        $('.isResizable').matchHeight();
    });

    $("#btnContinuarColp2").on("click", function(){
      
    });
});