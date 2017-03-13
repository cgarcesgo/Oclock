//Agregar un nuevo trayecto
$(document).on("pagecreate", function () {
    $("#add").click(function () {
        nextId++;
        var content = "<div data-role='collapsible' id='set" + nextId + "' data-collapsed='false'><h3>Trayecto " + nextId + "</h3>"
                    + "<div>"
                    + "<table>"
                    + "<tr>"
                    + "<td colspan='2'>"
                    + "Categoria"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td colspan='2'>"
                    + "<select name='categoria' id='categoria" + nextId + "' data-mini='true' style='width: 220px;'>"
                    + "</select>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td>"
                    + "Salida"
                    + "</td>"
                    + "<td rowspan='2' style='position:relative; top:12px;'>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td>"
                    + "<input type='text' name='salida' id='salida" + nextId + "' disabled='true' style='width: 180px;' />"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td>"
                    + "Llegada"
                    + "</td>"
                    + "<td rowspan='2' style='position:relative; top:12px;'>"
                    + "<a href='#popupMap' class='ui-btn ui-icon-location ui-btn-icon-notext' data-icon='location' data-rel='popup' data-iconpos='notext' data-shadow='false' data-iconshadow='false' data-position-to='window' data-transition='slidedown' style='-webkit-border-radius: .3125em; border-radius: .3125em;' onclick=\"SetLocationIndex('llegada', " + nextId + ");\">Map</a>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td>"
                    + "<input type='text' name='llegada' id='llegada" + nextId + "' onchange='cargarSalidas();' style='width: 180px;' />"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td colspan='2'>"
                    + "Descripción"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td colspan='2'>"
                    + "<textarea cols=26 rows='4' name='descripcion' id='descripcion" + nextId + "' style='width: 220px;'></textarea>"
                    + "</td>"
                    + "</tr>"
                    + "</table>"
                    + "<a href='#popupEliminarTrayecto' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='gear' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTrayectoIndex(" + nextId + ")'>Eliminar trayecto</button></a>"
                    + "</div>"
                    + "</div>";

        $("#set").append(content).collapsibleset("refresh");

        var concat = "";
        for (var i = 0; i < categorias.length; i++) {
            concat += "<option value='" + categorias[i].Id + "'>" + categorias[i].Nombre + "</option>";
        }
        $("#categoria" + nextId + "").append(concat);

        cargarSalidas();
    });
});