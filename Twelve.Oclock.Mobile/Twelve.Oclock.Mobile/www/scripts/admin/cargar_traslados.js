//Cargar traslados
function CargarTraslados() {
    var uriTramites = "http://40.85.92.66:1010/api/trasladoes";//Home
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
                    var fecha = msg[i].Priorizado ? "Priorizado" : msg[i].FechaString;

                    concat += "<div data-role='collapsible' id='set' data-collapsed='false'><h3>" + msg[i].Usuario.Nombre + " " + msg[i].Usuario.Apellido + " > " + msg[i].Usuario1.Nombre + " " + msg[i].Usuario1.Apellido + "</h3>";
                    concat += "<b>Mensajero origen: </b>" + msg[i].Usuario.Nombre + " " + msg[i].Usuario.Apellido + "</br>";
                    concat += "<b>Mensajero destino: </b>" + msg[i].Usuario1.Nombre + " " + msg[i].Usuario1.Apellido + "</br>";
                    concat += "<b>Fecha: </b>" + msg[i].Fecha + "</br>";
                    concat += "<b>Estado: </b>" + msg[i].Tramite.LastEstado.Nombre + "</br>";
                    concat += "<b>Usuario: </b>" + msg[i].Tramite.Usuario.Nombre + " " + msg[i].Tramite.Usuario.Apellido + "</br>";
                    concat += "<hr />";
                    for (var j = 0; j < msg[i].Tramite.DetalleTramites.length; j++) {
                        if (msg[i].Tramite.DetalleTramites[j].Categoria.Id != 1) {
                            concat += "<b>Categoria: </b>" + msg[i].Tramite.DetalleTramites[j].Categoria.Nombre + "</br>";
                            concat += "<b>Salida: </b>" + msg[i].Tramite.DetalleTramites[j].Salida + "</br>";
                            concat += "<b>Llegada: </b>" + msg[i].Tramite.DetalleTramites[j].Llegada + "</br>";
                            concat += "<b>Descripción: </b>" + msg[i].Tramite.DetalleTramites[j].Descripcion + "</br>";
                            concat += "<hr />";
                        }
                    }
                    if (msg[i].Tramite.Comprobante == true) {
                        concat += "<b>Con Comprobante</b></br>";
                        concat += "<hr />";
                    }
                    concat += "<a href='#popupTrasladar' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='forward' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTramiteId(" + msg[i].Tramite.Id + ")'>Trasladar</button></a>";
                    concat += "</div>";
                }
            }
            else {
                concat += "<h3>No hay trámites</h3>";
            }
            $("#set").html(concat).collapsibleset("refresh");
            return false;
        }
    });
}