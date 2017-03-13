//Actualizar Categoria
function Actualizar() {
    var popupEditarForm = $(".popupEditarForm");
    var popupEditarSatisfactorio = $(".popupEditarSatisfactorio");
    var popupEditarCamposVacios = $(".popupEditarCamposVacios");
    var popupEditarError = $(".popupEditarError");

    var uriCategoriaPut = "http://40.85.92.66:1010/api/Categorias/" + localStorage.getItem("CategoriaId");

    var nombreCategoria = $("#nombreCategoria");
    var precio = $("#precio");
    var precioPriorizado = $("#precioPriorizado");

    if (nombreCategoria.val() == ""
        || precio.val() == ""
        || precioPriorizado.val() == "") {
        popupEditarForm.attr("style", "display: none");
        popupEditarSatisfactorio.attr("style", "display: none");
        popupEditarCamposVacios.attr("style", "display: inline");
        popupEditarError.attr("style", "display: none");
    }
    else {
        var categoria = getCategoriaById(localStorage.getItem("CategoriaId"));
        categoria.Nombre = nombreCategoria.val();
        categoria.Precio = precio.val();
        categoria.PrecioPriorizado = precioPriorizado.val();

        $.ajax({
            type: "PUT",
            data: JSON.stringify(categoria),
            url: uriCategoriaPut,
            contentType: "application/json",
            success: function (msg) {
                popupEditarForm.attr("style", "display: none");
                popupEditarSatisfactorio.attr("style", "display: inline");
                popupEditarCamposVacios.attr("style", "display: none");
                popupEditarError.attr("style", "display: none");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                popupEditarForm.attr("style", "display: none");
                popupEditarSatisfactorio.attr("style", "display: none");
                popupEditarCamposVacios.attr("style", "display: none");
                popupEditarError.attr("style", "display: inline");
            }
        });
    }
}