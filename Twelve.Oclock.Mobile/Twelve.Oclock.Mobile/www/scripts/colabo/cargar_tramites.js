//Cargar tramites
function CargarTramites() {
    var uriTramites = "http://40.85.92.66:1010/api/tramites?colaboradorId=" + localStorage.getItem("UserId");//Home
    $.ajax({
        type: "GET",
        url: uriTramites,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var concat = "";
            if (msg.length > 0) {
                for (var i = 0; i < msg.length; i++) {

                    //Novedades
                    var novedad = "";
                    for (var j = 0; j < msg[i].EstadosTramites.length; j++) {
                        if (msg[i].EstadosTramites[j].Novedad != null && msg[i].EstadosTramites[j].Novedad != "") {
                            novedad = msg[i].EstadosTramites[j].Novedad;
                        }
                    }
                    //Novedades

                    var fecha = msg[i].Priorizado ? "Priorizado" : msg[i].FechaString;

                    concat += "<div data-role='collapsible' id='set' data-collapsed='false'><h3>" + fecha + " - " + msg[i].LastEstado.Nombre + "</h3>";
                    concat += "<b>Estado: </b>" + msg[i].LastEstado.Nombre + "</br>";
                    concat += "<b>Fecha: </b>" + msg[i].FechaString + "</br>";
                    concat += "<b>Usuario: </b>" + msg[i].Usuario.Nombre + " " + msg[i].Usuario.Apellido + "</br>";
                    concat += "<b>Teléfono: </b>" + msg[i].Usuario.Celular + "</br>";

                    //Novedades
                    if (novedad != "") {
                        concat += "<b>Novedad: </b>" + novedad;
                    }
                    //Novedades

                    concat += "<hr />";
                    for (var j = 0; j < msg[i].DetalleTramites.length; j++) {
                        if (msg[i].DetalleTramites[j].Categoria.Id != 1) {
                            concat += "<b>Categoria: </b>" + msg[i].DetalleTramites[j].Categoria.Nombre + "</br>";
                            concat += "<b>Salida: </b>" + msg[i].DetalleTramites[j].Salida + "</br>";
                            //mapa salida
                            if (!(msg[i].DetalleTramites[j].LatitudSalida == '' || msg[i].DetalleTramites[j].LatitudSalida == null)) {
                                SetLocationIndex("salida" + i, j);
                                SetLocation("salida" + i, j, msg[i].DetalleTramites[j].LatitudSalida, msg[i].DetalleTramites[j].LongitudSalida);
                                concat += "<a href='#popupMap' class='ui-btn ui-icon-location' data-icon='location' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' data-transition='slidedown' style='-webkit-border-radius: .3125em; border-radius: .3125em;' onclick=\"SetLocationIndex('salida" + i + "'," + j + ");\">Ver mapa salida</a>"
                            }
                            concat += "<b>Llegada: </b>" + msg[i].DetalleTramites[j].Llegada + "</br>";
                            //mapa llegada
                            if (!(msg[i].DetalleTramites[j].LatitudLlegada == '' || msg[i].DetalleTramites[j].LatitudLlegada == null)) {
                                SetLocationIndex("llegada" + i, j);
                                SetLocation("llegada" + i, j, msg[i].DetalleTramites[j].LatitudLlegada, msg[i].DetalleTramites[j].LongitudLlegada);
                                concat += "<a href='#popupMap' class='ui-btn ui-icon-location' data-icon='location' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' data-transition='slidedown' style='-webkit-border-radius: .3125em; border-radius: .3125em;' onclick=\"SetLocationIndex('llegada" + i + "'," + j + ");\">Ver mapa llegada</a>"
                            }
                            concat += "<b>Descripción: </b>" + msg[i].DetalleTramites[j].Descripcion + "</br>";
                            concat += "<hr />";
                        }
                    }
                    if (msg[i].Comprobante == true) {
                        concat += "<b>Con Comprobante</b></br>";
                        concat += "<hr />";
                    }
                    concat += "<a href='#popupCambiarEstado' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='gear' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTramiteId(" + msg[i].Id + ")'>Cambiar Estado</button></a>";
                    concat += "<a href='#popupTrasladar' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='forward' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTramiteId(" + msg[i].Id + ")'>Trasladar</button></a>";
                    concat += "</div>";
                }
            }
            else {
                concat = "<center><h3>No se encontraron Trámites</h3></center>";
            }
            $("#set").html(concat).collapsibleset("refresh");
            return false;
        }
    });

    //Registra localización
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    var localizacion = {
        UsuarioId: localStorage.getItem("UserId"),
        Longitud: position.coords.longitude,
        Latitud: position.coords.latitude
    };

    var uriLocalizacionPost = "http://40.85.92.66:1010/api/Localizaciones";

    $.ajax({
        type: "POST",
        data: JSON.stringify(localizacion),
        url: uriLocalizacionPost,
        contentType: "application/json"
    });
}

function onError(error) {
    //Mostrar algún mensaje de q no se ha podido registrar la localización
}