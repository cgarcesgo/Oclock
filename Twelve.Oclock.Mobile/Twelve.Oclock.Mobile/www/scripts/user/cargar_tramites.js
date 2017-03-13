//Cargar trámites
function CargarTramites() {
    var uriTramites = "http://40.85.92.66:1010/api/tramites?usuarioId=" + localStorage.getItem("UserId");//Home
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

                    var fecha = msg[i].Priorizado ? " - Priorizado" : "";

                    concat += "<div data-role='collapsible' id='set' data-collapsed='false'><h3>" + msg[i].LastEstado.Nombre + fecha + "</h3>";
                    concat += "<b>Fecha: </b>" + msg[i].FechaString;

                    //Novedades
                    if (novedad != "") {
                        concat += "</br>"
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
                    }
                    concat += "</div>";
                }
            }
            else {
                concat = "<center><h3>No se encontraron Trámites</h3></center>";
            }
            $("#setVerTramite").html(concat).collapsibleset("refresh");
            return false;
        }
    });
}