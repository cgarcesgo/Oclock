//Cargar favoritos
function CargarFavoritos() {
    var uriFavoritos = "http://40.85.92.66:1010/api/Favoritoes?usuarioId=" + localStorage.getItem("UserId");
    favoritos = null;
    $.ajax({
        type: "GET",
        url: uriFavoritos,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            favoritos = msg;
            var concat = "";
            for (var i = 0; i < msg.length; i++) {
                concat += "<button type='button' data-icon='carat-r' data-iconpos='left' data-mini='true' data-inline='true' class='ui-btn ui-btn-icon-carat-r' onclick='CargarFavorito(" + msg[i].Id + ")'>" + msg[i].Nombre + "</button>";
            }
            $("#setVerFavoritos").html(concat);
            return false;
        }
    });
}