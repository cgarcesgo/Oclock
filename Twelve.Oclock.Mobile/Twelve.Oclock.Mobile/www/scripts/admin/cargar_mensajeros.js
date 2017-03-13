//Cargar mensajeros
function CargarMensajeros() {
    var uriMensajeros = "http://40.85.92.66:1010/api/Usuarios?rolId=2";
    $.ajax({
        type: "GET",
        url: uriMensajeros,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            mensajeros = msg;
            var concat = "";

            try {
                for (var i = 0; i < msg.length; i++) {
                    if (msg[i].Id != localStorage.getItem("UserId")) {
                        concat += "<button type='button' data-icon='carat-r' data-iconpos='left' data-mini='true' data-inline='true' class='ui-btn ui-btn-icon-carat-r' onclick='Trasladar(" + msg[i].Id + ")'>" + msg[i].Nombre + " " + msg[i].Apellido + "</button>";
                    }
                }
                $("#setpopupMensajeros").html(concat);
            }
            catch (err) {
            }

            try {
                concat = "";
                $("#setVerMensajeros").html(concat).collapsibleset("refresh");
                for (var i = 0; i < mensajeros.length; i++) {
                    concat += "<div data-role='collapsible' id='set' data-collapsed='false'><h3>" + mensajeros[i].Nombre + " " + mensajeros[i].Apellido + "</h3>";
                    concat += "<b>Nombres: </b>" + mensajeros[i].Nombre + "<br />";
                    concat += "<b>Apellidos: </b>" + mensajeros[i].Apellido + "<br />";
                    concat += "<b>Documento Identidad: </b>" + mensajeros[i].Nit + "<br />";
                    concat += "<b>Email: </b>" + mensajeros[i].Email + "<br />";
                    concat += "<b>Celular: </b>" + mensajeros[i].Celular + "<br />";
                    concat += "<hr />";
                    concat += "<a href='#popupEditar' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='edit' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetMensajeroId(" + mensajeros[i].Id + ")'>Editar</button></a>";
                    concat += "<a href='#popupEliminar' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='delete' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetMensajeroId(" + mensajeros[i].Id + ")'>Eliminar</button></a>";
                    concat += "</div>";
                }
                $("#setVerMensajeros").html(concat).collapsibleset("refresh");
            }
            catch (err) {
            }
        }
    });
}