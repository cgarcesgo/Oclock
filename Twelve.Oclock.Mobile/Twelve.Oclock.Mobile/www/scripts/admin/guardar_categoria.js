//Guardar Categoría
function Guardar() {
    var popupGuardarForm = $(".popupGuardarForm");
    var popupGuardarSatisfactorio = $(".popupGuardarSatisfactorio");
    var popupGuardarCamposVacios = $(".popupGuardarCamposVacios");
    var popupGuardarError = $(".popupGuardarError");

    var uriCategoriaPut = "http://40.85.92.66:1010/api/Categorias/";

    var nombreCategoriaNew = $("#nombreCategoriaNew");
    var precioNew = $("#precioNew");
    var precioPriorizadoNew = $("#precioPriorizadoNew");

    if (nombreCategoriaNew.val() == ""
        || precioNew.val() == ""
        || precioPriorizadoNew.val() == "") {
        popupGuardarForm.attr("style", "display: none");
        popupGuardarSatisfactorio.attr("style", "display: none");
        popupGuardarCamposVacios.attr("style", "display: inline");
        popupGuardarError.attr("style", "display: none");
    }
    else {
        var categoria = {
            Nombre: nombreCategoriaNew.val(),
            Precio: precioNew.val(),
            PrecioPriorizado: precioPriorizadoNew.val()
        };


        $.ajax({
            type: "POST",
            data: JSON.stringify(categoria),
            url: uriCategoriaPut,
            contentType: "application/json",
            success: function (msg) {
                popupGuardarForm.attr("style", "display: none");
                popupGuardarSatisfactorio.attr("style", "display: inline");
                popupGuardarCamposVacios.attr("style", "display: none");
                popupGuardarError.attr("style", "display: none");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                popupGuardarForm.attr("style", "display: none");
                popupGuardarSatisfactorio.attr("style", "display: none");
                popupGuardarCamposVacios.attr("style", "display: none");
                popupGuardarError.attr("style", "display: inline");
            }
        });
    }
}