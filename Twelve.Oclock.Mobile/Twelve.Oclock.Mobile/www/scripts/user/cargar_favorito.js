//Carga el favorita de la lista de buscar
function CargarFavorito(idFavorito) {
    //Obtiene el objeto favorito
    var favorito = GetItemById(favoritos, idFavorito);

    //Inicializa
    $("#set").html("").collapsibleset("refresh");
    nextId = 0;
    comprobante = false;
    $("#comprobante").attr("style", "display: inline");
    $("#add").attr("style", "display: inline");

    //Recorre los detalles
    for (var i = 0; i < favorito.DetalleFavoritos.length; i++) {
        //Crea los items
        nextId++;
        var content = "";

        if (favorito.DetalleFavoritos[i].CategoriaId == 1) {
            comprobante = true;
            content = "<div data-role='collapsible' id='set" + nextId + "' data-collapsed='false'><h3>Trayecto " + nextId + "</h3>"
                    + "<div>"
                    + "<label for='salida'>Salida</label>"
                    + "<input type='text' name='salida' id='salida" + nextId + "' disabled='true' value='" + favorito.DetalleFavoritos[i].Salida + "' style='width: 180px;' />"
                    + "<label for='llegada'>Llegada</label>"
                    + "<input type='text' name='llegada' id='llegada" + nextId + "' disabled='true' value='" + favorito.DetalleFavoritos[i].Llegada + "' style='width: 180px;' />"
                    + "<a href='#popupEliminarTrayecto' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='gear' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTrayectoIndex(" + nextId + ")'>Eliminar trayecto</button></a>"
                    + "</div>"
                    + "</br>"
                    + "</div>";

            $("#set").append(content).collapsibleset("refresh");
        }
        else {
            //Content
            //Si nextId == 1 Agrega mapa en salida
            //Sino omite el mapa en salida
            if (nextId == 1) {
                content = "<div data-role='collapsible' id='set" + nextId + "' data-collapsed='false'><h3>Trayecto " + nextId + "</h3>"
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
                        + "<a href='#popupMap' class='ui-btn ui-icon-location ui-btn-icon-notext' data-icon='location' data-rel='popup' data-iconpos='notext' data-shadow='false' data-iconshadow='false' data-position-to='window' data-transition='slidedown' style='-webkit-border-radius: .3125em; border-radius: .3125em;' onclick=\"SetLocationIndex('salida', " + nextId + ");\">Map</a>"
                        + "</td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td>"
                        + "<input type='text' name='salida' id='salida" + nextId + "' value='" + favorito.DetalleFavoritos[i].Salida + "' onchange='cargarSalidas();' style='width: 180px;' />"
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
                        + "<input type='text' name='llegada' id='llegada" + nextId + "'  value='" + favorito.DetalleFavoritos[i].Llegada + "' onchange='cargarSalidas();' style='width: 180px;' />"
                        + "</td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td colspan='2'>"
                        + "Descripción"
                        + "</td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td colspan='2'>"
                        + "<textarea cols=26 rows='4' name='descripcion' id='descripcion" + nextId + "' style='width: 220px;'>" + favorito.DetalleFavoritos[i].Descripcion + "</textarea>"
                        + "</td>"
                        + "</tr>"
                        + "</table>"
                        + "<a href='#popupEliminarTrayecto' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='gear' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTrayectoIndex(" + nextId + ")'>Eliminar trayecto</button></a>"
                        + "</div>"
                        + "</div>";
            }
            else {

                content = "<div data-role='collapsible' id='set" + nextId + "' data-collapsed='false'><h3>Trayecto " + nextId + "</h3>"
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
                        + "<input type='text' name='salida' id='salida" + nextId + "' value='" + favorito.DetalleFavoritos[i].Salida + "' onchange='cargarSalidas();' style='width: 180px;' />"
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
                        + "<input type='text' name='llegada' id='llegada" + nextId + "'  value='" + favorito.DetalleFavoritos[i].Llegada + "' onchange='cargarSalidas();' style='width: 180px;' />"
                        + "</td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td colspan='2'>"
                        + "Descripción"
                        + "</td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td colspan='2'>"
                        + "<textarea cols=26 rows='4' name='descripcion' id='descripcion" + nextId + "' style='width: 220px;'>" + favorito.DetalleFavoritos[i].Descripcion + "</textarea>"
                        + "</td>"
                        + "</tr>"
                        + "</table>"
                        + "<a href='#popupEliminarTrayecto' data-rel='popup' data-shadow='false' data-iconshadow='false' data-position-to='window' style='text-decoration: none;'><button type='button' data-icon='gear' data-iconpos='left' data-mini='false' data-inline='false' id='cambiarpass' onclick='SetTrayectoIndex(" + nextId + ")'>Eliminar trayecto</button></a>"
                        + "</div>"
                        + "</div>";
            }

            $("#set").append(content).collapsibleset("refresh");

            //Carga las categorias
            var concat = "";
            for (var j = 0; j < categorias.length; j++) {
                concat += "<option value='" + categorias[j].Id + "'>" + categorias[j].Nombre + "</option>";
            }
            $("#categoria" + nextId + "").append(concat);
        }
        cargarSalidas();
    }

    //valida si hay comprobante agregado
    if (comprobante) {
        $("#comprobante").attr("style", "display: none");
        $("#add").attr("style", "display: none");
    }

    //Cierra el popup
    $("#popupBuscar").popup("close");
}