//cargar categorias
function CargarCategorias() {
    var uriCategoriaGet = "http://40.85.92.66:1010/api/Categorias";
    //var uriCategoriaGet = "http://192.168.1.4 :3558/api/Categorias";

    $.ajax({
        type: "GET",
        url: uriCategoriaGet,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            categorias = msg;
            var concat = "";

            try {
                for (var i = 0; i < msg.length; i++) {
                    concat += "<option value='" + msg[i].Id + "'>" + msg[i].Nombre + "</option>";
                }
                $("#categoria" + nextId + "").append(concat);
            }
            catch (err) {
            }

            try {
                concat = "";
                $("#setVerCategorias").append(concat).collapsibleset("refresh");
                for (var i = 0; i < categorias.length; i++) {
                    concat += "<div data-role='collapsible' id='set' data-collapsed='false'><h3>" + categorias[i].Nombre + "</h3>";
                    concat += "<b>Precio: </b>" + categorias[i].Precio + "<br />";
                    concat += "<b>Precio priorizado: </b>" + categorias[i].PrecioPriorizado + "<br />";
                    concat += "</div>";
                }
                $("#setVerCategorias").append(concat).collapsibleset("refresh");

            }
            catch (err) {
            }
            return false;
        }
    });
}