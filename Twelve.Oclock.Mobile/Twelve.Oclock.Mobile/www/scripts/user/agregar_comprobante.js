//Agregar un comprobante
$(document).on("pagecreate", function () {
    $("#comprobante").click(function () {
        $("#popupComprobante").popup("open");
    });

    $('#savecomprobante').click(function () {
        $("#comprobante").attr("style", "display: none");
        $("#add").attr("style", "display: none");

        nextId++;
        comprobante = true;

        var content = "<div data-role='collapsible' id='set" + nextId + "' data-collapsed='false'><h3>Trayecto " + nextId + "</h3>"
                    + "<div>"
                    + "<label for='salida'>Salida</label>"
                    + "<input type='text' name='salida' id='salida" + nextId + "' disabled='true' style='width: 180px;' />"
                    + "<label for='llegada'>Llegada</label>"
                    + "<input type='text' name='llegada' id='llegada" + nextId + "' disabled='true' style='width: 180px;' />"
                    + "</br>"
                    + "<a href='#popupEliminarTrayecto' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='gear' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTrayectoIndex(" + nextId + ")'>Eliminar trayecto</button></a>";
                    + "</div>"
                    + "</br>"
                    + "</div>";

        $("#set").append(content).collapsibleset("refresh");

        cargarSalidas();
        $("#popupComprobante").popup("close");
    });
});