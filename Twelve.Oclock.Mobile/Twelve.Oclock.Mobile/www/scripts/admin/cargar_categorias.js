//cargar categorias
function CargarCategorias() {
    var uriCategoriaGet = "http://40.85.92.66:1010/api/Categorias";

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
                concat = "";
                $("#setVerCategorias").append(concat).collapsibleset("refresh");
                for (var i = 0; i < categorias.length; i++) {
                    concat += "<div data-role='collapsible' id='set' data-collapsed='false'><h3>" + categorias[i].Nombre + "</h3>";
                    concat += "<b>Precio: </b>" + categorias[i].Precio + "<br />";
                    concat += "<b>Precio priorizado: </b>" + categorias[i].PrecioPriorizado + "<br />";
                    concat += "<hr />";
                    concat += "<a href='#popupEditar' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='edit' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetCategoriaId(" + categorias[i].Id + ")'>Editar</button></a>";
                    concat += "<a href='#popupEliminar' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='delete' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetCategoriaId(" + categorias[i].Id + ")'>Eliminar</button></a>";
                    concat += "</div>";
                }
                $("#setVerCategorias").html(concat).collapsibleset("refresh");

            }
            catch (err) {
            }
            return false;
        }
    });
}