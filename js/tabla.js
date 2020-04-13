var inpescIngreso = [
  {
    DocComercial: 90071871,
    OrdenCompra: 10023818,
    monto: "$29,681.00",
    creado: "11/04/2020",
    estatus: "Verificar SAC",
    destino:
      "Con. Suc. Periférico / Tablaje Castral 97210 Merida Sin distrito / colonia",
  },
  {
    DocComercial: 90071872,
    OrdenCompra: 10023838,
    monto: "$24,681.00",
    creado: "11/04/2020",
    estatus: "Verificar SAC",
    destino:
      "Con. Suc. Periférico / Tablaje Castral 97210 Merida Sin distrito / colonia",
  },
  {
    DocComercial: 90071873,
    OrdenCompra: 10023858,
    monto: "$21,681.00",
    creado: "11/04/2020",
    estatus: "Verificar SAC",
    destino:
      "Con. Suc. Periférico / Tablaje Castral 97210 Merida Sin distrito / colonia",
  },
  {
    DocComercial: 90071874,
    OrdenCompra: 10023858,
    monto: "$20,681.00",
    creado: "11/04/2020",
    estatus: "Verificar SAC",
    destino:
      "Con. Suc. Periférico / Tablaje Castral 97210 Merida Sin distrito / colonia",
  },
  {
    DocComercial: 90071875,
    OrdenCompra: 10023898,
    monto: "$22,681.00",
    creado: "11/04/2020",
    estatus: "Verificar SAC",
    destino:
      "Con. Suc. Periférico / Tablaje Castral 97210 Merida Sin distrito / colonia",
  },
  {
    DocComercial: 90071876,
    OrdenCompra: 10023828,
    monto: "$25,681.00",
    creado: "11/04/2020",
    estatus: "Verificar SAC",
    destino:
      "Con. Suc. Periférico / Tablaje Castral 97210 Merida Sin distrito / colonia",
  },
  {
    DocComercial: 90071871,
    OrdenCompra: 10023818,
    monto: "$27,681.00",
    creado: "11/04/2020",
    estatus: "Verificar SAC",
    destino:
      "Con. Suc. Periférico / Tablaje Castral 97210 Merida Sin distrito / colonia",
  },
];

$(document).ready(function () {
  $("#example").DataTable({
    paging: true,
    searching: false,
    lengthChange: false,
    data: inpescIngreso,
    scrollY: true,

    columns: [
      { data: "DocComercial", class: "colorLetra" },
      { data: "OrdenCompra", class: "colorLetra" },
      { data: "monto", class: "colorLetra" },
      { data: "creado", class: "colorLetra" },
      { data: "estatus", class: "colorLetra" },
      { data: "destino", class: "colorLetra" },
    ],
    columnDefs: [
      {
        targets: -1,
        className: "dt-body-right",
      },
    ],
    fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      if (iDisplayIndex % 2 == 0) {
        $("td", nRow).css("background-color", "#00afd7");
      } else {
        $("td", nRow).css("background-color", "#ffff");
      }
    },
  });

  $(window).resize(function () {
    $("#example").DataTable().columns.adjust().draw();
  });

  $("tbody > tr .colorLetra").on("click", function () {
    
 $("#myModal").modal('toggle');
 
  });



});
