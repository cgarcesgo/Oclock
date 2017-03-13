//Elimina una Mensajero
function Eliminar() {
    var popupEliminarForm = $(".popupEliminarForm");
    var popupEliminarSatisfactorio = $(".popupEliminarSatisfactorio");
    var popupEliminarError = $(".popupEliminarError");


    var uriTramitePost = "http://40.85.92.66:1010/api/Usuarios/" + localStorage.getItem("MensajeroId");

    $.ajax({
        type: "DELETE",
        url: uriTramitePost,
        contentType: "application/json",
        success: function (msg) {
            popupEliminarForm.attr("style", "display: none");
            popupEliminarSatisfactorio.attr("style", "display: inline");
            popupEliminarError.attr("style", "display: none");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            popupEliminarForm.attr("style", "display: none");
            popupEliminarSatisfactorio.attr("style", "display: none");
            popupEliminarError.attr("style", "display: inline");
        }
    });
}