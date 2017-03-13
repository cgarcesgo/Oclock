//Cargar tramites
function CargarTramites() {
    var uriTramites = "http://40.85.92.66:1010/api/tramites";//Home
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

                    concat += "<div data-role='collapsible' id='set' data-collapsed='false'><h3>" + msg[i].Usuario1.Nombre + " " + msg[i].Usuario1.Apellido + " - " + msg[i].LastEstado.Nombre + "</h3>";
                    concat += "<b>Estado: </b>" + msg[i].LastEstado.Nombre + "</br>";
                    concat += "<b>Fecha: </b>" + msg[i].FechaString + "</br>";
                    concat += "<b>Usuario: </b>" + msg[i].Usuario.Nombre + " " + msg[i].Usuario.Apellido + "</br>";
                    concat += "<b>Teléfono: </b>" + msg[i].Usuario.Celular + "</br>";
                    concat += "<b>Priorizado: </b>" + (msg[i].Priorizado ? "<b>SI</b>" : "No") + "</br>";

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
                            concat += "<b>Llegada: </b>" + msg[i].DetalleTramites[j].Llegada + "</br>";
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
}