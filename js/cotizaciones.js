var consultaExistencia = (function () {
  var $dt = null;

  var init = function () {


    $("div.date.date-start").datepicker({
      format: "dd/mm/yyyy",
      weekStart: 0,
      maxViewMode: 2,
      todayBtn: "linked",
      language: "es",
      orientation: "bottom auto",
      daysOfWeekHighlighted: "0,6",
      autoclose: true,
      todayHighlight: true,
      startDate: "01/01/1900",
    });


  };

  var listaCotizacion = {
    fill: function () {
      return this.data()
        .then(function (rs) {
          if (!rs) {
            showToastr("Error en la carga", "Aviso", {
              type: typeNotification.warning,
            });
            return false;
          }

          if ($dt) {
            $dt.clear().destroy();
          }
          $dt = document.querySelector("#dt_searchListaCotizacion").rssDataTable({
            order: [0, "asc"],
            scrollX: true,
            searching: true,
            data: rs,
            responsive: true,
            free: function (data, type, row, meta) {
              return renderMustacheTemplate('button_template', { id: 'btn_view', class: 'btn_viewClass', role: 'button', name: 'btn_view', text: 'Ver' })
            },
            rowCallback: function (row, data, api) {
              $(row).find('.btn_viewClass').off().on('click', function (e) {
                console.log('le dio click', data);
              });
            },
          });
          return true;
        })
        .catch(function () {
          showToastr("Error en la carga", "Aviso", {
            type: typeNotification.warning,
          });
          return false;
        });
    },
    data: function () {
      return new Promise(function (resolve, reject) {
        var model = [
          {
            nCotizar: "121213",
            material: "34ddsds",
            descripcion: "Material 1",
            cantidad: "12 pz",
            UnidadMedida: "Mts",
            total: "200",
            accion: "",
          },
          {
            nCotizar: "121213",
            material: "34ddsds",
            descripcion: "Material 1",
            cantidad: "12 pz",
            UnidadMedida: "Mts",
            total: "200",
            accion: "",
          },
        ];
        resolve(model);
      });
    },
  };

  var detallePedido = {
    fill: function () {
      return this.data()
        .then(function (rs) {
          if (!rs) {
            showToastr("Error en la carga", "Aviso", {
              type: typeNotification.warning,
            });
            return false;
          }

          if ($dt) {
            $dt.clear().destroy();
          }
          $dt = document.querySelector("#detallePedido").rssDataTable({
            order: [0, "asc"],
            scrollX: true,
            searching: true,
            data: rs,
            responsive: true,
            free: function (data, type, row, meta) { },
            rowCallback: function (row, data, api) { },
          });
          return true;
        })
        .catch(function () {
          showToastr("Error en la carga", "Aviso", {
            type: typeNotification.warning,
          });
          return false;
        });
    },
    data: function () {
      return new Promise(function (resolve, reject) {
        var model = [
          {
            pos: "121213",
            Nmaterial: "121213",
            descripcion: "34ddsds",
            cant: "Material 1",
            cantEnt: "12 pz",
            total: "Mts",
            um: "200",
            monto: "121",
            precNeto: "1212",
            fecEnt: "12/12/2029",
            Estatus: "",
          },
          {
            pos: "121213",
            Nmaterial: "121213",
            descripcion: "34ddsds",
            cant: "Material 1",
            cantEnt: "12 pz",
            total: "Mts",
            um: "200",
            monto: "121",
            precNeto: "1212",
            fecEnt: "12/12/2029",
            Estatus: "",
          },
        ];
        resolve(model);
      });
    },
  };




  $("#buscar").off().on("click", function () {
    loadMustacheTemplate("listaCotizacion_template", "cardDynamicBody");
    listaCotizacion.fill();
    $("div.hidden").removeClass("hidden");

    $(".collapse").collapse("hide");
    $(".isResizable").matchHeight();
  });

  $("#select_estado").on("change", function () {
    comboLocaliad.fill();
  });

  return {
    init: init,
  };
})();
$(document).ready(function () {
  consultaExistencia.init();
});
