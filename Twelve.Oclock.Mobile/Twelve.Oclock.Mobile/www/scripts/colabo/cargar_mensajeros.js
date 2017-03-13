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
            for (var i = 0; i < msg.length; i++) {
                if (msg[i].Id != localStorage.getItem("UserId")) {
                    concat += "<button type='button' data-icon='carat-r' data-iconpos='left' data-mini='true' data-inline='true' class='ui-btn ui-btn-icon-carat-r' onclick='Trasladar(" + msg[i].Id + ")'>" + msg[i].Nombre + " " + msg[i].Apellido + "</button>";
                }
            }
            $("#setpopupMensajeros").html(concat);
            return false;
        }
    });
}