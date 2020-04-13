var data2 = [{
  pos: "1",
  mat: "310092",
  Descripcion: "MULTICONECTOR C/VALV-TUERCA UNION INTEG",
  cant: "0",
  cantEnt: "500",
  um: "Pza",
  monto: "$23232,2323",
  precioNeto: "%3434",
  fecEnt: "11-04-2020",
  estatus:"activo",
  
},{
  pos: "1",
  mat: "310092",
  Descripcion: "MULTICONECTOR C/VALV-TUERCA UNION INTEG",
  cant: "0",
  cantEnt: "500",
  um: "Pza",
  monto: "$23232,2323",
  precioNeto: "%3434",
  fecEnt: "11-04-2020",
  estatus:"activo",
  
},{
  pos: "1",
  mat: "310092",
  Descripcion: "MULTICONECTOR C/VALV-TUERCA UNION INTEG",
  cant: "0",
  cantEnt: "500",
  um: "Pza",
  monto: "$23232,2323",
  precioNeto: "%3434",
  fecEnt: "11-04-2020",
  estatus:"activo",
  
}];



var data3 = [{
  docFactura: "2000107301",
  fecha: "12-05-2020",
  impNeto: "$626.68 MXP",
  Monto: "$626.68 MXP",
   
},
  
];



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

  $("#example2").DataTable({
    paging: true,
    searching: false,
    lengthChange: false,
    data: data2,
    scrollY: true,

    columns: [
      { data: "pos", class: "colorLetra" },
      { data: "mat", class: "colorLetra" },
      { data: "Descripcion", class: "colorLetra" },
      { data: "cant", class: "colorLetra" },
      { data: "cantEnt", class: "colorLetra" },
      { data: "um", class: "colorLetra" },
      { data: "monto", class: "colorLetra" },
      { data: "precioNeto", class: "colorLetra" },
      { data: "fecEnt", class: "colorLetra" },
      { data: "estatus", class: "colorLetra" },
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
 
  
  $("#example3").DataTable({
    paging: true,
    searching: false,
    lengthChange: false,
    data: data3,
    scrollY: true,

    columns: [
      { data: "docFactura", class: "colorLetra" },
      { data: "fecha", class: "colorLetra" },
      { data: "impNeto", class: "colorLetra" },
      { data: "Monto", class: "colorLetra" },
     
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


  $(window).off().on('resize', function () {
    setTimeout(function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc().draw();
    }, 100);
});

  $("tbody > tr .colorLetra").on("click", function () {
    
 $("#myModal").modal('toggle');
 
  });
  

// Select all tabs
$('.nav-tabs a').click(function(){
  $(this).tab('show');
})
 

});


// funcion timeline

	var completes = document.querySelectorAll(".complete");

	function toggleComplete(){
	  var lastComplete = completes[completes.length - 1];
	  lastComplete.classList.toggle('complete');
	}