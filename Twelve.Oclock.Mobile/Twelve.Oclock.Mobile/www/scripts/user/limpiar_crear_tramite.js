//Inicializa el formulario
function Limpiar() {

    //Inicializa variables
    nextId = 1;
    comprobante = false;
    favoritos = [];
    categorias = [];
    localStorage.setItem("TramiteColaboradorId", 0);

    //Se limpia la lista de locations
    var listaLocations = [];
    localStorage.setItem("listaLocations", JSON.stringify(listaLocations));

    //Borra formulario
    $("#set").html("").collapsibleset("refresh");
    $("#comprobante").attr("style", "display: inline");
    $("#add").attr("style", "display: inline");
    $("#programar").flipswitch("refresh");
    $("#priorizado").flipswitch("refresh");
    var panelpriorizado = $(".panelpriorizado");
    var panelprogramar = $(".panelprogramar");
    panelprogramar.attr("style", "display: none");
    panelpriorizado.attr("style", "display: inline");

    //Carga primer trayecto
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
                + "<a href='#popupMap' class='ui-btn ui-icon-location ui-btn-icon-notext' data-icon='location' data-rel='popup' data-iconpos='notext' data-shadow='false' data-iconshadow='false' data-position-to='window' data-transition='slidedown' style='-webkit-border-radius: .3125em; border-radius: .3125em;' onclick=\"SetLocationIndex('salida', " + nextId + ");\">Map</a>"
                + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td>"
                + "<input type='text' name='salida' id='salida" + nextId + "' onchange='cargarSalidas();' style='width: 180px;' />"
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

    //Cargar categorias
    CargarCategorias();

    //Cargar favoritos
    CargarFavoritos();

    //Cargar mensajeros
    CargarMensajeros();

    //Cerrar popups
    $("#popupBuscar").popup("close");
    $("#popupStar").popup("close");
    $("#popupClear").popup("close");
    $("#popupMensajeros").popup("close");
    $("#popupMap").popup("close");
}