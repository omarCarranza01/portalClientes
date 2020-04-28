$(document).ready(function() {

    $('.collapse').collapse('hide');

    $("#item1Header2").on("click", function() {
        $('.collapse').collapse('hide');
        $(this + ' .collapse').collapse('show');
    });
});