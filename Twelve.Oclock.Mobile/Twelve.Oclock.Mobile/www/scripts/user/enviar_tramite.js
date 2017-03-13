//Enviar el trámite
$(document).on("pagecreate", function () {
    $("#send").click(function () {
        var popupEnviarForm = $(".popupEnviarForm");
        var popupEnviarSatisfactorio = $(".popupEnviarSatisfactorio");
        var popupEnviarVacio = $(".popupEnviarVacio");
        var popupEnviarError = $(".popupEnviarError");

        var uriTramitePost = "http://40.85.92.66:1010/api/Tramites";
        var tramite;
        var isVacio = false;


        if ($('#programar').is(":checked")) {



            var d = new Date($('#fechaprogramado').val());

            tramite = {
                UsuarioId: localStorage.getItem("UserId"),
                ColaboradorId: localStorage.getItem("TramiteColaboradorId"),
                Priorizado: false,
                Comprobante: comprobante,
                FechaProgramado: d,
                DetalleTramites: []
            };

            if ($('#fechaprogramado').val() == '')
                isVacio = true;
        }
        else {
            tramite = {
                UsuarioId: localStorage.getItem("UserId"),
                ColaboradorId: localStorage.getItem("TramiteColaboradorId"),
                Priorizado: $('#priorizado').is(":checked"),
                Comprobante: comprobante,
                DetalleTramites: []
            };
        }

        for (var i = 1; i <= nextId; i++) {
            if (i == nextId && comprobante) {
                tramite.DetalleTramites.push({
                    CategoriaId: 1,
                    Salida: $("#salida" + i + "").val(),
                    Llegada: $("#llegada" + i + "").val(),
                    Descripcion: "Comprobante"
                });

                if ($("#salida" + i + "").val() == ''
                    || $("#llegada" + i + "").val() == '')
                    isVacio = true;
            } else {
                var locationSalida = GetLocation("salida", i);
                var locationLlegada = GetLocation("llegada", i);

                if (locationSalida == null) {
                    locationSalida = {
                        Index: i,
                        Tipo: "salida",
                        Latitud: '',
                        Longitud: ''
                    }
                }
                if (locationLlegada == null) {
                    locationLlegada = {
                        Index: i,
                        Tipo: "llegada",
                        Latitud: '',
                        Longitud: ''
                    }
                }

                tramite.DetalleTramites.push({
                    CategoriaId: $("#categoria" + i + "").find(":selected").val(),
                    Salida: $("#salida" + i + "").val(),
                    Llegada: $("#llegada" + i + "").val(),
                    Descripcion: $("#descripcion" + i + "").val(),
                    LatitudSalida: locationSalida.Latitud,
                    LongitudSalida: locationSalida.Longitud,
                    LatitudLlegada: locationLlegada.Latitud,
                    LongitudLlegada: locationLlegada.Longitud
                });

                if ($("#salida" + i + "").val() == ''
                    || $("#llegada" + i + "").val() == ''
                    || $("#descripcion" + i + "").val() == '')
                    isVacio = true;
            }
        }

        if (isVacio) {
            popupEnviarForm.attr("style", "display: none");
            popupEnviarSatisfactorio.attr("style", "display: none");
            popupEnviarVacio.attr("style", "display: inline");
            popupEnviarError.attr("style", "display: none");
        }
        else {
            $.ajax({
                type: "POST",
                data: JSON.stringify(tramite),
                url: uriTramitePost,
                contentType: "application/json",
                error: function (xhr, status, error) {
                    popupEnviarForm.attr("style", "display: none");
                    popupEnviarSatisfactorio.attr("style", "display: none");
                    popupEnviarVacio.attr("style", "display: none");
                    popupEnviarError.attr("style", "display: inline");
                    $("#lblmensajeerror").text("Se ha producido un error inesperado. Vuelve a intentarlo más tarde.");
                    return false;
                },
                success: function (msg) {
                    if (msg.Mensaje == null) {
                        $("#lblmensaje").text("Su trámite fue enviado con éxito, Sólo faltan " + msg.EnCola + " turnos para ser atendido");
                        popupEnviarForm.attr("style", "display: none");
                        popupEnviarSatisfactorio.attr("style", "display: inline");
                        popupEnviarVacio.attr("style", "display: none");
                        popupEnviarError.attr("style", "display: none");
                        Limpiar();
                    } else {
                        $("#lblmensajeerror").text(msg.Mensaje);
                        popupEnviarForm.attr("style", "display: none");
                        popupEnviarSatisfactorio.attr("style", "display: none");
                        popupEnviarVacio.attr("style", "display: none");
                        popupEnviarError.attr("style", "display: inline");
                        return false;
                    }
                }
            });
        }
    });
});