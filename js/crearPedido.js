$(document).ready(function() {
    $('.isResizable').matchHeight();


    $('#headingTwo').prop('disabled',true);
    $('#headingThree').prop('disabled',true);
  

    $("#btnContinuarColp1").on("click", function(){
        $('#headingTwo').prop('disabled',false);
        $('#headingTwo').click();
    });

    $("#btnContinuarColp2").on("click", function(){
        $('#headingThree').prop('disabled',false);
        $('#headingThree').click();
        $('.isResizable').matchHeight();
    });
});