var crearPedido = (function () {
    var $dt = null,
        $dtSeleccionados = null,
        $dtResumenCuentaPartidas = null;

    var init = function () {
        $('.isResizable').matchHeight();
        $('#headingThree').prop('disabled', true);
        initEvents();
        cargarDireccionEntrega.fill();
    };

    var initEvents = function () {
        // BOTONES DE SIGUIENTE
        $("#btn_CrearPedidosNext").off().on("click", function (e) {
            e.preventDefault();
            if (!validStepOne()) {
                return;
            }
            $('#headingOne').prop('disabled', true);
            $('#headingThree').prop('disabled', false).click();
            $('#cardDynamicHeaderTitle').html('Selección de Materiales');
            loadMustacheTemplate('seleccionMateriales_template', 'cardDynamicBody');
            loadMustacheTemplate('cardDynamicFooter_template', 'cardDynamicFooter', {
                isList: {
                    divClass: 'footerButtonsRigth',
                    btnList: [{
                        btnId: 'btn_cancelAll',
                        btnName: 'btn_cancelAll',
                        btnText: 'Cancelar'
                    }]
                }
            });
            $('#cardDynamicFooter').show();
            setTimeout(function () {
                $('.isResizable').matchHeight();
            }, 100)
            initEvents();
        });
        $('#btn_AgregarProductsNext').off().on('click', function (e) {
            e.preventDefault();
            var rowsCount = $dt.rows().count(),
                tableResultArr = [],
                count = 0;

            while (count < rowsCount) {
                var rowCurrent = $dt.row(count),
                    nodesCurrent = rowCurrent.nodes(),
                    inputCantidad = nodesCurrent.to$().find('input.input_searchProductCantidad'),
                    data = rowCurrent.data();

                var model = {
                    cantidad: inputCantidad.val(),
                    data: data
                }
                tableResultArr.push(model);
                count++;
            }

            var filterResult = tableResultArr.filter(function (a, e) { return a.cantidad !== null && a.cantidad !== '' });

            if (filterResult.length === 0) {
                showToastr('Agregue una cantidad al menos en un producto', 'Aviso', {
                    type: typeNotification.warning
                })
                return;
            }

            var totalCantidad = filterResult.reduce(function (a, e, i) { return a + parseInt(e.cantidad); }, 0);

            if (totalCantidad === 0) {
                showToastr('La suma de las cantidades debe ser diferente a 0', 'Aviso', {
                    type: typeNotification.warning
                })
                return;
            }

            RESS.setProductosSeleccionados(filterResult);

            var valuesStepOne = $('#filterStepOne').serializeForm();
            loadMustacheTemplate('selectedProducts_template', 'cardDynamicBody', { noPedido: valuesStepOne.input_numeroPedido, destino: valuesStepOne.select_direccionEntrega, info: true, seguirComprando: true, productSelected: true });
            loadMustacheTemplate('cardDynamicFooter_template', 'cardDynamicFooter', {
                isList: {
                    divClass: 'footerButtonsRigth',
                    btnList: [{
                        btnId: 'btn_cancelAll',
                        btnName: 'btn_cancelAll',
                        btnText: 'Cancelar'
                    },
                    {
                        btnId: 'btn_ListaProductosSeleccionadosNext',
                        btnName: 'btn_adbtn_listaProductosSeleccionadosNextdProducts',
                        btnText: 'Continuar'
                    }
                    ]
                }
            });
            $('#cardDynamicHeaderTitle').html('Lista de Productos Seleccionados');
            cargarDTListProductosSelected.fill()
            initEvents();
        });
        $('#btn_ListaProductosSeleccionadosNext').off().on('click', function (e) {
            var rowsCount = $dtSeleccionados.rows().count();
            if (rowsCount === 0) {
                showToastr('Agregue al menos en un producto', 'Aviso', {
                    type: typeNotification.warning
                })
                return;
            }
            var valuesStepOne = $('#filterStepOne').serializeForm();
            loadMustacheTemplate('selectedProducts_template', 'cardDynamicBody', { noPedido: valuesStepOne.input_numeroPedido, destino: valuesStepOne.select_direccionEntrega, info: true, facturacion: true });
            loadMustacheTemplate('cardDynamicFooter_template', 'cardDynamicFooter', {
                isList: {
                    divClass: 'footerButtonsRigth',
                    btnList: [
                        {
                            btnId: 'btn_cancelAll',
                            btnName: 'btn_cancelAll',
                            btnText: 'Cancelar'
                        },
                        {
                            btnId: 'btn_FacturacionNext',
                            btnName: 'btn_FacturacionNext',
                            btnText: 'Siguiente'
                        }
                    ]
                }
            });
            $('#cardDynamicHeaderTitle').html('Facturación');
            return cargarCFDI.fill()
                .then(function () {
                    return cargarMetodosPago.fill()
                        .then(function () {
                            initEvents();
                        });
                });
        });
        $('#btn_FacturacionNext').off().on('click', function (e) {
            e.preventDefault();
            if (!validFacturacion()) {
                return;
            }
            var values = $('#facturacionForm').serializeForm();
            RESS.setCFDISeleccionado(values.select_cfdi);
            RESS.setMetodoPagoSeleccionado(values.select_metodoPago);
            var valuesStepOne = $('#filterStepOne').serializeForm();
            loadMustacheTemplate('selectedProducts_template', 'cardDynamicBody', { noPedido: valuesStepOne.input_numeroPedido, destino: valuesStepOne.select_direccionEntrega, resumencuenta: true });
            loadMustacheTemplate('cardDynamicFooter_template', 'cardDynamicFooter', {
                isList: {
                    divClass: 'footerButtonsRigth',
                    btnList: [
                        {
                            btnId: 'btn_cancelAll',
                            btnName: 'btn_cancelAll',
                            btnText: 'Cancelar'
                        },
                        {
                            btnId: 'btn_ResumenCuentaPartidasOrdenar',
                            btnName: 'btn_ResumenCuentaPartidasOrdenar',
                            btnText: 'Ordenar'
                        }
                    ]
                }
            });
            return cargarDTResumenCuentaPartidas.fill()
                .then(function () {
                    initEvents();
                });
        });
        //SELECCION DE MATERIALES
        $('div.AMC_content').off().on('click', function (e) {
            e.preventDefault();
            $('#cardDynamicFooter').show();
            loadMustacheTemplate('searchProducts_template', 'cardDynamicBody');
            loadMustacheTemplate('cardDynamicFooter_template', 'cardDynamicFooter', {
                isList: {
                    divClass: 'footerButtonsRigth',
                    btnList: [{
                        btnId: 'btn_cancelAll',
                        btnName: 'btn_cancelAll',
                        btnText: 'Cancelar'
                    },
                    {
                        btnId: 'btn_AgregarProductsNext',
                        btnName: 'btn_AgregarProductsNext',
                        btnText: 'Agregar'
                    }
                    ]
                }
            });
            $('#cardDynamicHeaderTitle').html('Buscar Productos');
            return cargarDTSearchProductos.fill()
                .then(function (rs) {
                    initEvents();
                    if (!rs) {
                        $('#btn_cancelAll').click();
                    }
                });
        });
        // VALIDACIONES
        $('#input_numeroPedido, input.input_searchProductCantidad').off().on('keyup', function (e) {
            e.preventDefault();
            validNumber(e);
        });
        // CANCELAR TODO
        $('#btn_cancelAll').off().on('click', function (e) {
            e.preventDefault();
            RESS.removeRESSObjext();
            $('#cardDynamicFooter, #cardDynamicBody').html(null)
            $('#cardDynamicFooter').hide();
            $('#headingOne').prop('disabled', false).click();
            $('#headingThree').prop('disabled', true);
            $('#cardDynamicHeaderTitle').html('Selección de Materiales');
        });
        // SEGUIR COMPRANDO EN LISTA DE PRODUCTOS SELECCIONADOS
        $('#btn_seguirComprando').off().on('click', function (e) {
            e.preventDefault();
            $('#cardDynamicFooter').show();
            loadMustacheTemplate('searchProducts_template', 'cardDynamicBody');
            loadMustacheTemplate('cardDynamicFooter_template', 'cardDynamicFooter', {
                isList: {
                    divClass: 'footerButtonsRigth',
                    btnList: [{
                        btnId: 'btn_cancelAll',
                        btnName: 'btn_cancelAll',
                        btnText: 'Cancelar'
                    },
                    {
                        btnId: 'btn_AgregarProductsNext',
                        btnName: 'btn_AgregarProductsNext',
                        btnText: 'Agregar'
                    }
                    ]
                }
            });
            $('#cardDynamicHeaderTitle').html('Buscar Productos');
            return cargarDTSearchProductos.fill(true)
                .then(function () {
                    initEvents();
                });
        });
    };

    var cargarDireccionEntrega = {
        fill: function () {
            return this.data()
                .then(function (rs) {
                    if (!rs) {
                        showToastr('No existen direcciones de entrega', 'Aviso', {
                            type: typeNotification.warning
                        });
                        return false;
                    }
                    RESS.setCargarDireccionEntrega(rs);

                    if ($("#select_direccionEntrega").data('select2')) {
                        $("#select_direccionEntrega").select2("destroy");
                        $("#select_direccionEntrega").empty();
                    }

                    var result = [];
                    for (var i = 0; i < rs.length; i++) {
                        result.push({
                            value: rs[i].id,
                            descripcion: rs[i].descripcion,
                            dataAtributos: 'data-id="' + rs[i].id + '"'
                        });
                    }
                    var selectTemplate = renderMustacheTemplate('select2_template', result);

                    $("#select_direccionEntrega").append(selectTemplate);
                    $("#select_direccionEntrega").select2({
                        theme: "bootstrap",
                        allowClear: true,
                        placeholder: "Seleccione una opción",
                        language: Select2Languaje(),
                        multiple: false,
                        width: '100%'
                    });
                    return true;
                })
                .catch(function () {
                    showToastr('No existen direcciones de entrega', 'Aviso', {
                        type: typeNotification.warning
                    });
                    return false;
                });
        },
        data: function () {
            return new Promise(function (resolve, reject) {
                var model = [{
                    id: 1,
                    descripcion: 'SUC. Tecnica Tectonica Aplicada/Av. Adolfo Lopez Mateos 18 Colel Toreo'
                },
                {
                    id: 2,
                    descripcion: 'Fis. Todo Gas Plomeria / Universidad 3214 Col Centro'
                },
                {
                    id: 3,
                    descripcion: 'Agr. Polimar Narvarte/ Carr. a San benito 902 Col El Barrial'
                },
                {
                    id: 4,
                    descripcion: 'Ind. Total Home/ Miguel de la Madrid 7643 Col Unidad Modelo'
                }
                ];
                resolve(model);
            });
        }
    };

    var cargarDTSearchProductos = {
        fill: function (loadPreviusValues) {
            return this.data()
                .then(function (rs) {
                    if (!rs) {
                        showToastr('Favor de contactarnos Correo servicioaclientes@rotoplas.com o al Teléfono 800 506 3000', 'Aviso', {
                            type: typeNotification.warning
                        })
                        return false;
                    }
                    RESS.setProductos(rs);

                    if ($dt) {
                        $dt.clear().destroy();
                    }
                    $dt = document.querySelector('#dt_searchProducts').rssDataTable({
                        order: [0, 'asc'],
                        scrollX: true,
                        searching: true,
                        data: rs,
                        responsive: true,
                        free: function (data, type, row, meta) {
                            if (meta.col === 1) {
                                return renderMustacheTemplate('input_cantidad_template');
                            }
                        },
                        rowCallback: function (row, data, api) {
                            if (loadPreviusValues) {
                                var findData = RESS.getRESSObject().productosSeleccionados.find(function (a, e) {
                                    return a.data.id === data.id;
                                });
                                if (findData) {
                                    $(row).find('.input_searchProductCantidad').val(findData.cantidad);
                                }
                            }
                        }
                    });
                    return true;
                })
                .catch(function () {
                    showToastr('Favor de contactarnos Correo servicioaclientes@rotoplas.com o al Teléfono 800 506 3000', 'Aviso', {
                        type: typeNotification.warning
                    })
                    return false;
                });
        },
        data: function () {
            return new Promise(function (resolve, reject) {
                var model = [{
                    id: 1,
                    descripcion: 'Valvula de esfera desmontable 63 x 63 mm',
                    um: 'PZA',
                    noSku: '12456748'
                },
                {
                    id: 2,
                    descripcion: 'Conector hembra 90 x 3',
                    um: 'PZA',
                    noSku: '487686'
                },
                {
                    id: 3,
                    descripcion: 'Conector macho 75 x 2 1/2',
                    um: 'PZA',
                    noSku: '3547687'
                },
                {
                    id: 4,
                    descripcion: 'Valvula de esfera desmontable  32 x 32 mm',
                    um: 'PZA',
                    noSku: '57468435'
                },
                {
                    id: 5,
                    descripcion: 'Codo 90º de 110 mm',
                    um: 'PZA',
                    noSku: '3545678'
                },
                {
                    id: 6,
                    descripcion: 'Tee de 110 mm',
                    um: 'PZA',
                    noSku: '214567687'
                },
                {
                    id: 7,
                    descripcion: 'Reduccion 110 x 90 mm',
                    um: 'PZA',
                    noSku: '74656894'
                }
                ];
                resolve(model);
            });
        }
    };

    var cargarDTListProductosSelected = {
        fill: function () {
            this.data()
                .then(function () {
                    var ressObj = RESS.getRESSObject(),
                        rs = ressObj.productosSeleccionados;

                    if (!rs) {
                        showToastr('No existen productos seleccionados', 'Aviso', {
                            type: typeNotification.warning
                        })
                        return;
                    }

                    var model = rs.map(function (a, e) {
                        var obj = {
                            id: a.data.id,
                            pos: e + 1,
                            noMaterial: a.data.noSku,
                            descripcion: a.data.descripcion,
                            cantidad: a.cantidad,
                            um: a.data.um,
                            monto: 356,
                            precioNeto: a.cantidad * 3,
                            mon: 'MXN',
                            fecha: moment().utc().format('DD/MM/YYYY')
                        };
                        return obj;
                    });

                    if ($dtSeleccionados) {
                        $dtSeleccionados.clear().destroy();
                    }
                    $dtSeleccionados = document.querySelector('#dt_ProductsSelected').rssDataTable({
                        order: [0, 'asc'],
                        scrollX: true,
                        searching: true,
                        data: model,
                        responsive: true,
                        actions: function (data, type, row, meta) {
                            return renderMustacheTemplate('actions_template');
                        },
                        rowCallback: function (row, data, api) {
                            $(row).find('.eliminarProducto').off().on('click', function (e) {
                                debugger
                                confirmModal('Eliminar elemento', '¿ Seguro que desea eliminar esta partida ?', 'Cancelar', 'Confirmar', true, function (rs) {
                                    if (rs) {
                                        var dta = data,
                                            productosSeleccionados = RESS.getRESSObject().productosSeleccionados,
                                            findIndex = productosSeleccionados.findIndex(function (a, e, i) { return a.data.id === data.id; });

                                        productosSeleccionados.splice(findIndex, 1);
                                        RESS.setProductosSeleccionados(productosSeleccionados);
                                        cargarDTListProductosSelected.fill();
                                    }
                                });
                            });
                        }
                    });
                });
        },
        data: function () {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    };

    var cargarCFDI = {
        fill: function () {
            return this.data()
                .then(function (rs) {
                    if (!rs) {
                        showToastr('No existen CFDI', 'Aviso', {
                            type: typeNotification.warning
                        });
                        return false;
                    }
                    RESS.setCargarDireccionEntrega(rs);

                    if ($("#select_cfdi").data('select2')) {
                        $("#select_cfdi").select2("destroy");
                        $("#select_cfdi").empty();
                    }

                    var result = [];
                    for (var i = 0; i < rs.length; i++) {
                        result.push({
                            value: rs[i].id,
                            descripcion: rs[i].descripcion,
                            dataAtributos: 'data-id="' + rs[i].id + '"'
                        });
                    }
                    var selectTemplate = renderMustacheTemplate('select2_template', result);

                    $("#select_cfdi").append(selectTemplate);
                    $("#select_cfdi").select2({
                        theme: "bootstrap",
                        allowClear: true,
                        placeholder: "Seleccione una opción",
                        language: Select2Languaje(),
                        multiple: false,
                        width: '100%'
                    });
                    return true;
                })
                .catch(function () {
                    showToastr('No existen CFDI', 'Aviso', {
                        type: typeNotification.warning
                    });
                    return false;
                });
        },
        data: function () {
            return new Promise(function (resolve, reject) {
                var model = [{
                    id: 1,
                    descripcion: 'G01 Adquisición de mercancias'
                },
                {
                    id: 2,
                    descripcion: 'G02 Devoluciones, descuentes o bonificaciones'
                },
                {
                    id: 3,
                    descripcion: 'G03 Gastos en general'
                },
                {
                    id: 4,
                    descripcion: '001 Construcciones'
                },
                {
                    id: 5,
                    descripcion: '002 Mobiliario y equipo de oficina para inversiones'
                },
                {
                    id: 6,
                    descripcion: '003 Equipos de transporte'
                },
                {
                    id: 7,
                    descripcion: '004 Equipo de computo y accesorios'
                },
                {
                    id: 8,
                    descripcion: '005 Codos, troqueles, moldes, matrices y herramental'
                },
                {
                    id: 9,
                    descripcion: '006 Comunicaciones Telefónicas'
                },
                {
                    id: 10,
                    descripcion: '007 Comunicaciones Satelitales'
                },
                {
                    id: 11,
                    descripcion: '008 Otra Maquinaria y Equipo'
                }
                ];
                resolve(model);
            });
        }
    };

    var cargarMetodosPago = {
        fill: function () {
            return this.data()
                .then(function (rs) {
                    if (!rs) {
                        showToastr('No existen CFDI', 'Aviso', {
                            type: typeNotification.warning
                        });
                        return false;
                    }
                    RESS.setCargarDireccionEntrega(rs);

                    if ($("#select_metodoPago").data('select2')) {
                        $("#select_metodoPago").select2("destroy");
                        $("#select_metodoPago").empty();
                    }

                    var result = [];
                    for (var i = 0; i < rs.length; i++) {
                        result.push({
                            value: rs[i].id,
                            descripcion: rs[i].descripcion,
                            dataAtributos: 'data-id="' + rs[i].id + '"'
                        });
                    }
                    var selectTemplate = renderMustacheTemplate('select2_template', result);

                    $("#select_metodoPago").append(selectTemplate);
                    $("#select_metodoPago").select2({
                        theme: "bootstrap",
                        allowClear: true,
                        placeholder: "Seleccione una opción",
                        language: Select2Languaje(),
                        multiple: false,
                        width: '100%'
                    });
                    return true;
                })
                .catch(function () {
                    showToastr('No existen CFDI', 'Aviso', {
                        type: typeNotification.warning
                    });
                    return false;
                });
        },
        data: function () {
            return new Promise(function (resolve, reject) {
                var model = [{
                    id: 1,
                    descripcion: 'PPD Pago Parcialidades'
                },
                {
                    id: 2,
                    descripcion: 'PUE Pago una sola exhibición'
                }
                ];
                resolve(model);
            });
        }
    };

    var cargarDTResumenCuentaPartidas = {
        fill: function () {
            return this.data()
                .then(function () {
                    var ressObj = RESS.getRESSObject(),
                        rs = ressObj.productosSeleccionados;

                    if (!rs) {
                        showToastr('No existen productos seleccionados', 'Aviso', {
                            type: typeNotification.warning
                        });
                        return false;
                    }

                    var model = rs.map(function (a, e) {
                        var obj = {
                            id: a.data.id,
                            pos: e + 1,
                            noMaterial: a.data.noSku,
                            descripcion: a.data.descripcion,
                            cantidad: a.cantidad,
                            cantidadEnt: 000,
                            um: a.data.um,
                            monto: 356,
                            precioNeto: a.cantidad * 3,
                            fechaEnt: moment().utc().format('DD/MM/YYYY'),
                            estatus: 'NO SE'
                        };
                        return obj;
                    });

                    if ($dtResumenCuentaPartidas) {
                        $dtResumenCuentaPartidas.clear().destroy();
                    }
                    $dtResumenCuentaPartidas = document.querySelector('#dt_ResumenCuentaPartidas').rssDataTable({
                        order: [0, 'asc'],
                        scrollX: true,
                        searching: true,
                        data: model,
                        responsive: true,
                        rowCallback: function (row, data, api) {

                        }
                    });
                    return true;
                })
                .catch(function () {
                    showToastr('No existen productos seleccionados', 'Aviso', {
                        type: typeNotification.warning
                    });
                    return false;
                });
        },
        data: function () {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    };

    var validStepOne = function () {
        var values = $('#filterStepOne').serializeForm();
        if (!values.select_direccionEntrega) {
            showToastr('Seleccione una dirección de entrega', 'Aviso', {
                type: typeNotification.warning
            })
            return false;
        }
        if (!values.input_numeroPedido) {
            showToastr('Ingrese un número de pedido', 'Aviso', {
                type: typeNotification.warning
            })
            return false;
        }
        return true;
    };

    var validFacturacion = function () {
        var values = $('#facturacionForm').serializeForm();
        if (!values.select_cfdi) {
            showToastr('Seleccione un CFDI', 'Aviso', {
                type: typeNotification.warning
            })
            return false;
        }
        if (!values.select_metodoPago) {
            showToastr('Seleccione un método de pago', 'Aviso', {
                type: typeNotification.warning
            })
            return false;
        }
        return true;
    };

    return {
        init: init,
        initEvents: initEvents
    };
})();
$(document).ready(function () {
    crearPedido.init();
});